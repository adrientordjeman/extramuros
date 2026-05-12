import json
from shapely.geometry import shape

def clean_geojson_by_geometry():
    input_path = 'public/idf-quartiers-optimized.geojson'
    
    with open(input_path, 'r') as f:
        data = json.load(f)
    
    features = data['features']
    print(f"Initial features: {len(features)}")
    
    cleaned_features = []
    seen_geoms = []
    duplicates_removed = 0
    
    for i, f in enumerate(features):
        geom = f.get('geometry')
        if not geom:
            cleaned_features.append(f)
            continue
            
        # We'll use a string representation of the geometry as a quick hash
        # but Shapely is better.
        try:
            s = shape(geom)
            # Check if this geometry is already in seen_geoms
            is_duplicate = False
            for prev_s in seen_geoms:
                if s.equals(prev_s):
                    is_duplicate = True
                    break
            
            if is_duplicate:
                duplicates_removed += 1
                props = f.get('properties', {})
                print(f"Removing duplicate geometry: {props.get('code')} ({props.get('nom')})")
                continue
            
            seen_geoms.append(s)
            cleaned_features.append(f)
        except Exception as e:
            print(f"Error processing geometry {i}: {e}")
            cleaned_features.append(f)
    
    print(f"Duplicates removed: {duplicates_removed}")
    
    data['features'] = cleaned_features
    
    with open(input_path, 'w') as f:
        json.dump(data, f)
    
    print(f"Final features: {len(cleaned_features)}")

if __name__ == "__main__":
    clean_geojson_by_geometry()
