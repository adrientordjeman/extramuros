import geopandas as gpd
import pandas as pd
import json

# Load data
gdf_iris = gpd.read_file('/Users/adrientordjeman/Documents/quartier_ideal/public/idf-quartiers-optimized.geojson')
gdf_iris['geometry'] = gdf_iris['geometry'].buffer(0)
gdf_iris['commune_code'] = gdf_iris['code'].str[:5]
gdf_communes = gdf_iris.dissolve(by='commune_code').reset_index()

gdf_schools = gpd.read_file('/Users/adrientordjeman/Documents/quartier_ideal/public/schools.geojson')

# Spatial join
schools_with_commune = gpd.sjoin(gdf_schools, gdf_communes[['commune_code', 'geometry']], how='left', predicate='within')

# Check Bry-sur-Marne (94015)
bry_schools = schools_with_commune[schools_with_commune['commune_code'] == '94015']
print("Schools in Bry-sur-Marne (94015):")
print(bry_schools[['name', 'type', 'city']].to_string())

# Check types distribution
print("\nTypes distribution in Bry-sur-Marne:")
print(bry_schools['type'].value_counts())

# Join result for silhouette
silhouette_joined = schools_with_commune[schools_with_commune['name'].str.contains("Etienne de Silhouette", case=False)]
print("\nEtienne de Silhouette joined result:")
print(silhouette_joined[['name', 'type', 'commune_code']])
