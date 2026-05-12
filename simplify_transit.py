import json

def simplify_transit():
    input_file = 'public/transit_lines.geojson'
    output_file = 'public/transit_lines_simplified.geojson'
    
    # We want to include Metro, RER, Trains, Trams, and other fixed-rail transit
    target_types = {'Subway', 'Rail', 'Tram', 'Funicular', 'CableWay'}
    
    print(f"Filtering for types: {target_types}")
    
    try:
        with open(input_file, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: {input_file} not found.")
        return

    filtered_features = []
    for feature in data.get('features', []):
        props = feature.get('properties', {})
        short_name = props.get('route_short_name')
        route_type = props.get('route_type')
        
        # Include all targeted types, but skip very short routes or specific bus-like rail if any
        if route_type in target_types:
            # Optimize coordinates by rounding to 5 decimal places (~1.1m precision)
            if feature['geometry']['type'] == 'LineString':
                feature['geometry']['coordinates'] = [
                    [round(coord[0], 5), round(coord[1], 5)] 
                    for coord in feature['geometry']['coordinates']
                ]
            elif feature['geometry']['type'] == 'MultiLineString':
                feature['geometry']['coordinates'] = [
                    [[round(coord[0], 5), round(coord[1], 5)] for coord in line]
                    for line in feature['geometry']['coordinates']
                ]

            # Keep only necessary properties to save space
            feature['properties'] = {
                'route_short_name': short_name,
                'route_long_name': props.get('route_long_name'),
                'route_color': props.get('route_color'),
                'route_text_color': props.get('route_text_color'),
                'route_type': route_type
            }
            filtered_features.append(feature)
    
    print(f"Found {len(filtered_features)} matching features.")
    
    new_data = {
        'type': 'FeatureCollection',
        'features': filtered_features
    }
    
    with open(output_file, 'w') as f:
        json.dump(new_data, f, separators=(',', ':')) # Compact JSON
    
    print(f"Saved to {output_file}")

if __name__ == '__main__':
    simplify_transit()
