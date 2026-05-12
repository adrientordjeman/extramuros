import geopandas as gpd
import json
from shapely.validation import make_valid
from shapely.geometry import Point, Polygon, LineString

# Load IRIS geometries
quartiers = gpd.read_file('public/idf-quartiers-optimized.geojson')
target = quartiers[quartiers['code'] == '940680402']

if target.empty:
    print("IRIS code 940680402 not found")
    exit()

target_geom = target.iloc[0].geometry

# Load Nature data
print("Loading nature data...")
with open('public/nature.json', 'r') as f:
    nature_data = json.load(f)

elements = nature_data.get('elements', [])

# Collect all fragments
from shapely.ops import unary_union
fragments = []

def to_2154(geom):
    # Quick dirty reprojection for debugging (approximate)
    # Centroid of Saint-Maur is around 2.48, 48.81
    # 1 deg lon approx 73km, 1 deg lat approx 111km
    # Better to use Geopandas for real area
    return geom

for el in elements:
    tags = el.get('tags', {})
    if el.get('type') == 'node' and tags.get('natural') == 'tree':
        p = Point(el['lon'], el['lat'])
        if target_geom.intersects(p):
            fragments.append(p.buffer(0.00008)) # 8m approx
    elif 'geometry' in el:
        coords = [[p['lon'], p['lat']] for p in el['geometry']]
        if len(coords) < 2: continue
        if coords[0] == coords[-1] and len(coords) >= 4:
            g = Polygon(coords)
        else:
            g = LineString(coords)
            if tags.get('natural') == 'tree_row':
                g = g.buffer(0.00005) # 5m approx
            elif tags.get('barrier') == 'hedge':
                g = g.buffer(0.00002) # 2m approx
            else:
                continue
        
        if target_geom.intersects(g):
            fragments.append(g)

if fragments:
    # Accurate neighborhood area
    target_area = target.to_crs(epsg=2154).area.iloc[0]
    
    # Analyze fragments individually
    frag_data = []
    for f in fragments:
        # Reproject for area
        gdf_f = gpd.GeoDataFrame([{'geometry': f}], crs="EPSG:4326").to_crs(epsg=2154)
        frag_data.append({'area': gdf_f.area.iloc[0]})
    
    import pandas as pd
    df_f = pd.DataFrame(frag_data)
    print(f"Top 10 Green Fragments Areas (m²):")
    print(df_f.sort_values('area', ascending=False).head(10))

    # Dissolve to avoid overlaps
    combined_green = unary_union(fragments).intersection(target_geom)
    gdf_green = gpd.GeoDataFrame([{'geometry': combined_green}], crs="EPSG:4326").to_crs(epsg=2154)
    green_area = gdf_green.area.iloc[0]
    
    ratio = green_area / target_area
    score_linear = min(100, ratio * 200)
    score_sqrt = min(100, (ratio ** 0.5) * 180) # Adjusted constant
    
    print(f"\n - Actual total green area (dissolved): {green_area:.2f} m²")
    print(f" - Neighborhood total area: {target_area:.2f} m²")
    print(f" - Coverage ratio: {ratio:.4f}")
    print(f" - Score (Linear * 200): {score_linear:.2f}")
    print(f" - Score (Sqrt * 180): {score_sqrt:.2f}")
else:
    print(" - No green fragments found.")
