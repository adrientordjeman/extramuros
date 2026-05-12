import json
from shapely.geometry import shape, Point

def check():
    with open('public/idf-quartiers-optimized.geojson', 'r') as f:
        gj = json.load(f)
    
    iris = next(f for f in gj['features'] if f['properties']['code'] == '930770107')
    print(f"IRIS: {iris['properties']['nom']}")
    print(f"Counts: {iris['properties']['counts']}")

    with open('public/baked_index.json', 'r') as f:
        baked = json.load(f)
    
    pts = baked['points']['930770107']
    print(f"Points inside IRIS: { {cat: len(items) for cat, items in pts.items()} }")
    
    for cat, items in pts.items():
        if cat == 'commerces':
            for item in items:
                print(f"  - {item['properties'].get('name')} ({item['properties'].get('category')})")

check()
