import json

with open('/Users/adrientordjeman/Documents/quartier_ideal/public/transit_lines_simplified.geojson', 'r') as f:
    data = json.load(f)

lines = set()
for feature in data['features']:
    props = feature['properties']
    line_name = props.get('route_short_name')
    if line_name:
        lines.add(line_name)

print("Available lines in transit_lines_simplified.geojson:")
print(sorted(list(lines)))

gpe_lines = ['15', '16', '17', '18']
found_gpe = [l for l in gpe_lines if l in lines]
print("\nGPE lines found:", found_gpe)
