import json
import os
import geopandas as gpd
from shapely.geometry import shape, LineString, Point
from shapely.ops import nearest_points
import pandas as pd

def compute_noise_score():
    print("Loading infrastructure and neighborhoods...")
    with open('public/infrastructure.json', 'r') as f:
        infra_data = json.load(f)
    
    # Load IRIS boundaries
    with open('public/idf-quartiers-optimized.geojson', 'r') as f:
        neighborhoods_gj = json.load(f)

    # 1. Prepare Infrastructure GeoDataFrame
    features = []
    for el in infra_data.get('elements', []):
        if 'geometry' in el:
            coords = [(p['lon'], p['lat']) for p in el['geometry']]
            if len(coords) < 2: continue
            geom = LineString(coords)
            
            # Weighted noise influence
            tags = el.get('tags', {})
            weight = 0.5 # Default minimum
            hw = tags.get('highway')
            rw = tags.get('railway')
            
            if hw == 'motorway': weight = 2.0
            elif hw == 'trunk': weight = 1.5
            elif hw == 'primary': weight = 1.2
            elif hw == 'secondary': weight = 0.7
            elif rw in ['rail', 'subway']: weight = 1.8
            
            features.append({'geometry': geom, 'weight': weight, 'type': hw or rw})

    gdf_infra = gpd.GeoDataFrame(features, crs="EPSG:4326")
    # Reproject to local meter-based CRS for distance (e.g. Lambert 93)
    gdf_infra = gdf_infra.to_crs(epsg=2154)

    # 2. Prepare Neighborhoods (Centroids)
    neighbor_points = []
    for f in neighborhoods_gj['features']:
        insee = f['properties']['code']
        poly = shape(f['geometry'])
        centroid = poly.centroid
        neighbor_points.append({'insee': insee, 'geometry': centroid})
    
    gdf_neighbors = gpd.GeoDataFrame(neighbor_points, crs="EPSG:4326").to_crs(epsg=2154)

    print(f"Calculating proximity for {len(gdf_neighbors)} neighborhoods to {len(gdf_infra)} line elements...")
    
    # Create spatial index for infra
    print("Building spatial index...")
    sindex = gdf_infra.sindex
    
    noise_scores = {}
    for idx, row in gdf_neighbors.iterrows():
        pt = row['geometry']
        # Search within 500m
        possible_matches_index = list(sindex.intersection(pt.buffer(500).bounds))
        possible_matches = gdf_infra.iloc[possible_matches_index]
        
        if len(possible_matches) == 0:
            noise_scores[row['insee']] = 0
            continue
        
        # Calculate score: sum of (weight / (distance + alpha))
        total_nuisance = 0
        for _, infra in possible_matches.iterrows():
            dist = pt.distance(infra['geometry'])
            if dist < 300:
                # Formula: impact is strong at 0m, drops to near-0 at 300m
                impact = (infra['weight'] * 50) * (1 - (dist / 300))
                total_nuisance = max(total_nuisance, impact) # We take the maximum nuisance (the closest loud road)

        noise_scores[row['insee']] = round(min(100, total_nuisance))

    # 3. Update idf_prices.json
    print("Updating idf_prices.json with noise scores...")
    with open('public/idf_prices.json', 'r') as f:
        prices = json.load(f)
    
    for insee, score in noise_scores.items():
        if insee in prices:
            prices[insee]['noise'] = score
        else:
            # Maybe some Irises only exist in GeoJSON but have no price data
            prices[insee] = {'noise': score}

    with open('public/idf_prices.json', 'w') as f:
        json.dump(prices, f)
    
    print("✅ Noise calculation complete!")

if __name__ == "__main__":
    compute_noise_score()
