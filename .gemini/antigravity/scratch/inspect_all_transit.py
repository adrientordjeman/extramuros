import json

def inspect_geojson(file_path):
    print(f"Inspecting {file_path}...")
    with open(file_path, 'r') as f:
        try:
            data = json.load(f)
        except Exception as e:
            print(f"Error loading JSON: {e}")
            return

    lines = set()
    if 'features' in data:
        for feature in data['features']:
            props = feature.get('properties', {})
            # Look for common property names for route numbers
            line_name = props.get('route_short_name') or props.get('line') or props.get('ref') or props.get('numero')
            if line_name:
                lines.add(str(line_name))
    
    found_gpe = [l for l in ['15', '16', '17', '18'] if l in lines]
    print(f"GPE lines found: {found_gpe}")
    if found_gpe:
        print(f"Sample properties for line {found_gpe[0]}:")
        for feature in data['features']:
            props = feature.get('properties', {})
            line_name = props.get('route_short_name') or props.get('line') or props.get('ref') or props.get('numero')
            if str(line_name) == found_gpe[0]:
                print(props)
                break

inspect_geojson('/Users/adrientordjeman/Documents/quartier_ideal/public/metro_lines.geojson')
inspect_geojson('/Users/adrientordjeman/Documents/quartier_ideal/public/heavy_transit_lines.geojson')
inspect_geojson('/Users/adrientordjeman/Documents/quartier_ideal/public/transit_lines.geojson')
