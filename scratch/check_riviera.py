import json
with open('public/baked_index.json', 'r') as f:
    data = json.load(f)
    
points = data.get('points', {})
count = 0
for k, v in points.items():
    if 'riviera' in v and len(v['riviera']) > 0:
        count += 1
        # print(f"IRIS {k}: {len(v['riviera'])} riviera points")

print(f"Total IRIS with Riviera: {count}")
