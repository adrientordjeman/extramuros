import json
from shapely.geometry import Point, Polygon, LineString
import geopandas as gpd

# Load IRIS geometries
quartiers = gpd.read_file('public/idf-quartiers-optimized.geojson')
target = quartiers[quartiers['code'] == '940680402']
target_geom = target.iloc[0].geometry

# Load ALL nature data (or I should fetch more tags?)
# Actually, nature.json only has specific tags.
# I might need to fetch ALL elements in this area to see what's there.

with open('public/nature.json', 'r') as f:
    nature_data = json.load(f)

elements = nature_data.get('elements', [])
all_tags_in_neighborhood = []

for el in elements:
    tags = el.get('tags', {})
    if el.get('type') == 'node':
        p = Point(el['lon'], el['lat'])
        if target_geom.intersects(p):
            all_tags_in_neighborhood.append(tags)
    elif 'geometry' in el:
        coords = [[p['lon'], p['lat']] for p in el['geometry']]
        if len(coords) < 2: continue
        # Treat as poly if closed
        if coords[0] == coords[-1] and len(coords) >= 4:
            g = Polygon(coords)
        else:
            g = LineString(coords)
        if target_geom.intersects(g):
            all_tags_in_neighborhood.append(tags)

print(f"All tags for elements in neighborhood 940680402 (from current nature.json):")
for t in all_tags_in_neighborhood:
    print(t)
