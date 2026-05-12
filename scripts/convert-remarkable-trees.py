import geopandas as gpd
import json
import os

def convert_to_geojson():
    base_dir = '/Users/adrientordjeman/Documents/quartier_ideal'
    shp_path = os.path.join(base_dir, 'data/arbres_remarquables_clean/arbre_remarquable.shp')
    if not os.path.exists(shp_path):
        print(f"Error: {shp_path} not found")
        return

    print(f"Reading {shp_path}...")
    gdf = gpd.read_file(shp_path)
    
    # Ensure CRS is WGS84 for Leaflet
    if gdf.crs != 'EPSG:4326':
        print(f"Reprojecting from {gdf.crs} to EPSG:4326...")
        gdf = gdf.to_crs(epsg=4326)

    # Save as GeoJSON
    output_path = os.path.join(base_dir, 'public/arbres_remarquables.geojson')
    print(f"Saving to {output_path}...")
    gdf.to_file(output_path, driver='GeoJSON')
    print("✅ Conversion complete!")

if __name__ == "__main__":
    convert_to_geojson()
