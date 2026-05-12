import json
from shapely.geometry import shape, Point
from math import radians, cos, sqrt

def check():
    with open('public/idf-quartiers-optimized.geojson', 'r') as f:
        gj = json.load(f)
    
    iris = next(f for f in gj['features'] if f['properties']['code'] == '930770107')
    centroid = Point(iris['properties']['lon'], iris['properties']['lat'])
    
    with open('public/baked_index.json', 'r') as f:
        baked = json.load(f)
    
    all_points = []
    for insee, pts in baked['points'].items():
        for cat, features in pts.items():
            for f in features:
                all_points.append(f)
    
    nearby_tennis = []
    for p in all_points:
        lon2, lat2 = p['geometry']['coordinates']
        lat1, lon1 = centroid.y, centroid.x
        dx = (lon2 - lon1) * 111320 * cos(radians((lat1 + lat2) / 2))
        dy = (lat2 - lat1) * 110574
        dist = sqrt(dx*dx + dy*dy)
        if dist <= 800:
            scat = p['properties'].get('category', '').lower()
            if scat == 'tennis':
                nearby_tennis.append(p)
    
    print(f"Tennis courts within 800m: {len(nearby_tennis)}")
    for s in nearby_tennis:
        print(f"  - {s['properties'].get('name')} at {s['geometry']['coordinates']}")

check()
