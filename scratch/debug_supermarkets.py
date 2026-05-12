import json
from shapely.geometry import shape, Point
from math import radians, cos, sqrt

def check():
    with open('public/idf-quartiers-optimized.geojson', 'r') as f:
        gj = json.load(f)
    
    iris = next(f for f in gj['features'] if f['properties']['code'] == '930770107')
    centroid = Point(iris['properties']['lon'], iris['properties']['lat'])
    print(f"IRIS: {iris['properties']['nom']} ({centroid.x}, {centroid.y})")
    
    with open('public/baked_index.json', 'r') as f:
        baked = json.load(f)
    
    all_points = []
    for insee, pts in baked['points'].items():
        for cat, features in pts.items():
            for f in features:
                all_points.append(f)
    
    print(f"Total points in baked index: {len(all_points)}")
    
    nearby_supermarkets = []
    for p in all_points:
        lon2, lat2 = p['geometry']['coordinates']
        lat1, lon1 = centroid.y, centroid.x
        
        dx = (lon2 - lon1) * 111320 * cos(radians((lat1 + lat2) / 2))
        dy = (lat2 - lat1) * 110574
        dist = sqrt(dx*dx + dy*dy)
        
        if dist <= 800:
            scat = p['properties'].get('category', '').lower()
            name = (p['properties'].get('name') or "").lower()
            if scat in ['supermarché', 'supermarket', 'supermarche'] or 'picard' in name:
                nearby_supermarkets.append(p)
    
    print(f"Supermarkets within 800m: {len(nearby_supermarkets)}")
    for s in nearby_supermarkets:
        print(f"  - {s['properties'].get('name')} ({s['properties'].get('category')}) at {s['geometry']['coordinates']}")

check()
