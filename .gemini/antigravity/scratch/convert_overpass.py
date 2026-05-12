import json

def overpass_to_geojson(input_path, output_path):
    with open(input_path, 'r') as f:
        data = json.load(f)
    
    features = []
    for el in data.get('elements', []):
        props = el.get('tags', {})
        # Only keep lines 15, 16, 17, 18
        ref = props.get('ref', '')
        if not any(line in ref for line in ['15', '16', '17', '18']):
            continue
            
        geometry = None
        if el['type'] == 'way':
            if 'geometry' in el:
                coords = [[pt['lon'], pt['lat']] for pt in el['geometry']]
                geometry = {"type": "LineString", "coordinates": coords}
        elif el['type'] == 'relation':
            # For relations with geom, it usually comes as a list of members with geometry
            # or a single geometry field. Overpass 'out geom' on relations provides geometry for each member.
            multi_coords = []
            for member in el.get('members', []):
                if 'geometry' in member and member['type'] == 'way':
                    multi_coords.append([[pt['lon'], pt['lat']] for pt in member['geometry']])
            if multi_coords:
                geometry = {"type": "MultiLineString", "coordinates": multi_coords}
        
        if geometry:
            features.append({
                "type": "Feature",
                "properties": {
                    "line": ref,
                    "name": props.get('name', f"Line {ref}"),
                    "color": get_color(ref)
                },
                "geometry": geometry
            })
    
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }
    
    with open(output_path, 'w') as f:
        json.dump(geojson, f, indent=2)
    print(f"Saved {len(features)} features to {output_path}")

def get_color(ref):
    if '15' in ref: return '#B50070' # Line 15 (Dark Red/Pink)
    if '16' in ref: return '#ED1C24' # Line 16 (Red)
    if '17' in ref: return '#00A651' # Line 17 (Green)
    if '18' in ref: return '#00AEEF' # Line 18 (Blue)
    return '#888888'

overpass_to_geojson('/Users/adrientordjeman/Documents/quartier_ideal/public/gpe_lines_raw.json', 
                     '/Users/adrientordjeman/Documents/quartier_ideal/public/gpe_lines.geojson')
