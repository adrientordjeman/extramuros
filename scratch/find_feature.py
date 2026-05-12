import json

def find_feature_at(lat, lon):
    with open('public/idf-quartiers-optimized.geojson', 'r') as f:
        data = json.load(f)
    
    from shapely.geometry import shape, Point
    
    p = Point(lon, lat)
    for feature in data['features']:
        s = shape(feature['geometry'])
        if s.contains(p):
            print(f"MATCH: {feature['id']} - {feature['properties'].get('nom', 'Unknown')}")
            print(f"PROPS: {feature['properties']}")

if __name__ == "__main__":
    find_feature_at(48.837, 2.523) # Center of Bry-sur-Marne
