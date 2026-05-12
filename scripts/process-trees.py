import pandas as pd
import geopandas as gpd
import json
import os
from shapely.geometry import Point

def process_trees():
    base_dir = '/Users/adrientordjeman/Documents/quartier_ideal'
    
    # 1. Load Remarkable Trees
    print("Loading remarkable trees...")
    rem_gdf = gpd.read_file(os.path.join(base_dir, 'public/arbres_remarquables.geojson'))
    
    # 2. Load Street Trees (CSV)
    print("Loading street trees sample...")
    df_street = pd.read_csv(os.path.join(base_dir, 'data/trees.csv'), sep=';')
    
    # Convert street trees to GeoDataFrame
    # The CSV has geo_point_2d as "lat,lon"
    def parse_coords(val):
        try:
            lat, lon = map(float, val.split(','))
            return Point(lon, lat)
        except:
            return None

    df_street['geometry'] = df_street['geo_point_2d'].apply(parse_coords)
    df_street = df_street.dropna(subset=['geometry'])
    street_gdf = gpd.GeoDataFrame(df_street, geometry='geometry', crs="EPSG:4326")

    # 3. Load Neighborhoods
    print("Loading neighborhoods...")
    neighbors_gdf = gpd.read_file(os.path.join(base_dir, 'public/idf-quartiers-optimized.geojson'))
    neighbors_gdf = neighbors_gdf.to_crs(epsg=4326)

    # 4. Spatial Join: Assign IRIS to each tree
    print("Performing spatial joins...")
    street_with_iris = gpd.sjoin(street_gdf, neighbors_gdf[['code', 'geometry']], how='inner', predicate='intersects')
    rem_with_iris = gpd.sjoin(rem_gdf, neighbors_gdf[['code', 'geometry']], how='inner', predicate='intersects')

    # 5. Aggregate
    print("Aggregating results...")
    street_counts = street_with_iris.groupby('code').size().to_dict()
    rem_counts = rem_with_iris.groupby('code').size().to_dict()

    # 6. Combine and save
    aggregated = {}
    all_codes = set(street_counts.keys()).union(set(rem_counts.keys()))
    
    for code in all_codes:
        aggregated[code] = {
            'street_trees': int(street_counts.get(code, 0)),
            'remarkable_trees': int(rem_counts.get(code, 0))
        }

    with open(os.path.join(base_dir, 'data/trees_aggregated.json'), 'w') as f:
        json.dump(aggregated, f)

    # 7. Create Sampled GeoJSON for Map (Visuals)
    # We take all remarkable trees + a sample of street trees
    sample_street = street_gdf.sample(n=min(len(street_gdf), 10000))
    
    # Add a type property
    sample_street['tree_type'] = 'street'
    rem_gdf['tree_type'] = 'remarkable'
    
    # Standardize columns for concatenation
    s_sub = sample_street[['geometry', 'tree_type']].copy()
    s_sub['name'] = sample_street['libellefrancais']
    
    r_sub = rem_gdf[['geometry', 'tree_type']].copy()
    r_sub['name'] = rem_gdf['com']
    
    map_gdf = pd.concat([s_sub, r_sub], ignore_index=True)
    
    map_gdf.to_file(os.path.join(base_dir, 'public/trees_map.geojson'), driver='GeoJSON')
    
    print(f"✅ Processing complete! Aggregated {len(all_codes)} neighborhoods. Saved map layer with {len(map_gdf)} points.")

if __name__ == "__main__":
    process_trees()
