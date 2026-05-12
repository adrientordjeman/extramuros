import geopandas as gpd
import pandas as pd

gdf_iris = gpd.read_file('/Users/adrientordjeman/Documents/quartier_ideal/public/idf-quartiers.geojson')
gdf_iris['code'] = gdf_iris['code'].astype(str).str.replace(r"[\[\]\'\"]", "", regex=True)
if gdf_iris.crs is None or gdf_iris.crs.to_string() != "EPSG:4326":
    gdf_iris = gdf_iris.to_crs("EPSG:4326")

gdf_schools = gpd.read_file('/Users/adrientordjeman/Documents/quartier_ideal/public/schools.geojson')

# Join
joined = gpd.sjoin(gdf_schools, gdf_iris[['code', 'geometry']], how='left', predicate='intersects')

missing = joined[joined['code'].isna()]
print(f"Total schools: {len(gdf_schools)}")
print(f"Schools with no matching IRIS: {len(missing)}")

# Check Bry schools from before
bry_uaus = ['0941490J', '0940188U'] # Silhouette Maternelle and Elementaire
for uai in bry_uaus:
    row = joined[joined['uai'] == uai]
    if not row.empty:
        print(f"School {uai} ({row['name'].iloc[0]}) matches IRIS: {row['code'].iloc[0]}")
    else:
        print(f"School {uai} not found in joined data")
