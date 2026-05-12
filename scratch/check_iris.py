import json

with open('public/idf-quartiers-optimized.geojson', 'r') as f:
    data = json.load(f)

for feature in data['features']:
    if feature['properties'].get('code') == '940520109':
        print(json.dumps(feature['properties'], indent=4))
        break
