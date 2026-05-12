import json
import os
import geopandas as gpd
from shapely.geometry import shape, LineString, Point, Polygon
from shapely.validation import make_valid
import shapely
import pandas as pd

def compute_nature_score():
    print("Loading nature data (this may take a moment)...")
    with open('public/nature.json', 'r') as f:
        nature_data = json.load(f)
    
    with open('public/idf-quartiers-optimized.geojson', 'r') as f:
        neighborhoods_gj = json.load(f)

    # 1. Prepare Nature GeoDataFrame (Polygons and buffered lines)
    polys = []
    tree_points = []
    hedge_lines = []
    tree_lines_geoms = []

    for el in nature_data.get('elements', []):
        tags = el.get('tags', {})
        if 'geometry' in el:
            coords = [[p['lon'], p['lat']] for p in el['geometry']]
            if len(coords) < 2: continue
            
            # If it's a closed way, treat as polygon
            if coords[0] == coords[-1] and len(coords) >= 4:
                geom = Polygon(coords)
                # Weights: Forest/Park/Wood > Garden/Grass
                weight = 1.0
                t_leisure = tags.get('leisure', '')
                t_landuse = tags.get('landuse', '')
                t_natural = tags.get('natural', '')
                
                if t_leisure in ['park', 'nature_reserve'] or t_natural == 'wood' or t_landuse == 'forest':
                    weight = 1.2
                elif t_leisure == 'garden' or t_landuse in ['allotments', 'orchard', 'vineyard']:
                    weight = 1.1
                
                polys.append({'geometry': geom, 'weight': weight})
            else:
                # Open way: check for rows or hedges
                geom = LineString(coords)
                if tags.get('natural') == 'tree_row':
                    tree_lines_geoms.append({'geometry': geom, 'weight': 1.0})
                elif tags.get('barrier') == 'hedge':
                    hedge_lines.append({'geometry': geom, 'weight': 1.0})
        elif el.get('type') == 'node' and tags.get('natural') == 'tree':
            tree_points.append({'geometry': Point(el['lon'], el['lat']), 'weight': 1.0})

    # 1.5 Convert Trees, Rows and Hedges to polygons using buffers
    gdf_polys = gpd.GeoDataFrame(polys, crs="EPSG:4326")
    gdf_trees = gpd.GeoDataFrame(tree_points, crs="EPSG:4326")
    gdf_rows = gpd.GeoDataFrame(tree_lines_geoms, crs="EPSG:4326")
    gdf_hedges = gpd.GeoDataFrame(hedge_lines, crs="EPSG:4326")

    # Reproject to meters for accurate buffering
    for df in [gdf_polys, gdf_trees, gdf_rows, gdf_hedges]:
        if not df.empty:
            df.to_crs(epsg=2154, inplace=True)

    # Buffer trees (12m), rows (10m), hedges (3m)
    if not gdf_trees.empty: gdf_trees['geometry'] = gdf_trees.buffer(12)
    if not gdf_rows.empty: gdf_rows['geometry'] = gdf_rows.buffer(10)
    if not gdf_hedges.empty: gdf_hedges['geometry'] = gdf_hedges.buffer(3)

    # Combine all green fragments
    gdf_nature = pd.concat([gdf_polys, gdf_trees, gdf_rows, gdf_hedges], ignore_index=True)
    
    print(f"Extracted {len(polys)} green polygons, {len(tree_points)} trees, {len(tree_lines_geoms)} tree rows. Processing spatial intersections...")
    

    # 2. Prepare Neighborhoods
    neighbor_polys = []
    for f in neighborhoods_gj['features']:
        insee = f['properties']['code']
        neighbor_polys.append({'insee': insee, 'geometry': shape(f['geometry'])})
    
    gdf_neighbors = gpd.GeoDataFrame(neighbor_polys, crs="EPSG:4326").to_crs(epsg=2154)
    gdf_neighbors['full_area'] = gdf_neighbors.area

    # 3. Calculate Intersection Area
    print("Calculating green coverage percentage per neighborhood...")
    
    # Spatial join to find which nature fragments are in which neighborhood
    joined = gpd.sjoin(gdf_nature, gdf_neighbors, how='inner', predicate='intersects')
    
    green_stats = {}
    total_neighbors = joined['insee'].nunique()
    count = 0
    
    # Group by neighborhood to calculate area without double-counting overlaps
    for insee, group in joined.groupby('insee'):
        count += 1
        if count % 100 == 0:
            print(f"  Processed {count}/{total_neighbors} neighborhoods...")
            
        # Ensure geometries are valid
        valid_geoms = [make_valid(g) if not g.is_valid else g for g in group.geometry]
        
        # Dissolve fragments in this neighborhood to handle overlaps
        fragments_dissolved = shapely.unary_union(valid_geoms)
        
        # Get the neighborhood polygon
        neighbor_geom = gdf_neighbors[gdf_neighbors['insee'] == insee].geometry.iloc[0]
        if not neighbor_geom.is_valid:
            neighbor_geom = make_valid(neighbor_geom)
        
        # Intersect the dissolved mass with neighborhood boundary and get area
        try:
            intersected_geom = fragments_dissolved.intersection(neighbor_geom)
            green_stats[insee] = intersected_geom.area
        except Exception:
            try:
                intersected_geom = make_valid(fragments_dissolved).intersection(make_valid(neighbor_geom))
                green_stats[insee] = intersected_geom.area
            except:
                green_stats[insee] = 0

    # 4. Final Scoring
    print("Finalizing nature scores...")
    nature_scores = {}
    for idx, row in gdf_neighbors.iterrows():
        insee = row['insee']
        g_area = green_stats.get(insee, 0)
        ratio = g_area / row['full_area'] if row['full_area'] > 0 else 0
        
        # Scaling: Square root scaling because even small green patches 
        # (4-10% coverage) contribute significantly to perception of nature.
        # min(100, (ratio ** 0.5) * 180)
        # 1% -> 18, 4% -> 36, 10% -> 56, 30% -> 98
        score = min(100, (ratio ** 0.5) * 180)
        nature_scores[insee] = round(score)

    # 5. Update idf_prices.json
    with open('public/idf_prices.json', 'r') as f:
        prices = json.load(f)
    
    for insee, score in nature_scores.items():
        if insee in prices:
            prices[insee]['nature'] = score
        else:
            prices[insee] = {'nature': score}

    with open('public/idf_prices.json', 'w') as f:
        json.dump(prices, f)
    
    print("✅ Nature calculation complete!")

if __name__ == "__main__":
    compute_nature_score()
