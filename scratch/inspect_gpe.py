import json

def inspect_gpe():
    with open('public/transit_lines.geojson', 'r') as f:
        data = json.load(f)
    
    gpe_lines = ["15", "16", "17", "18"]
    found = []
    for feature in data['features']:
        props = feature.get('properties', {})
        if props.get('route_short_name') in gpe_lines:
            found.append({
                'short_name': props.get('route_short_name'),
                'long_name': props.get('route_long_name'),
                'type': props.get('route_type'),
                'network': props.get('network'),
                'color': props.get('route_color')
            })
    
    print(json.dumps(found[:20], indent=2))
    print(f"Total found: {len(found)}")

if __name__ == "__main__":
    inspect_gpe()
