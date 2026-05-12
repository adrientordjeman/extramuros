import json
import os

def clean_geojson():
    input_path = 'public/idf-quartiers-optimized.geojson'
    output_path = 'public/idf-quartiers-optimized-cleaned.geojson'
    
    with open(input_path, 'r') as f:
        data = json.load(f)
    
    features = data['features']
    print(f"Initial features: {len(features)}")
    
    seen_codes = {}
    cleaned_features = []
    duplicates_removed = 0
    
    for f in features:
        props = f.get('properties', {})
        code = props.get('code')
        nom = props.get('nom', 'Unknown')
        
        if not code:
            # Keep features without code (if any) but log them
            cleaned_features.append(f)
            continue
            
        if code in seen_codes:
            duplicates_removed += 1
            print(f"Removing duplicate code: {code} ({nom})")
            # We skip this one. 
            # If we want to be smarter, we could merge properties, but usually they are just redundant.
            continue
        
        seen_codes[code] = True
        cleaned_features.append(f)
    
    print(f"Duplicates removed: {duplicates_removed}")
    
    # Also check for exact geometry duplicates if codes are different (unlikely but possible)
    # Actually, let's just stick to codes for now as it's safer.
    
    data['features'] = cleaned_features
    
    # Save back to the same file
    with open(input_path, 'w') as f:
        json.dump(data, f)
    
    print(f"Final features: {len(cleaned_features)}")

if __name__ == "__main__":
    clean_geojson()
