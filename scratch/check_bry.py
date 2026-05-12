import json

def check_bry():
    input_path = 'public/idf-quartiers-optimized.geojson'
    
    with open(input_path, 'r') as f:
        data = json.load(f)
    
    features = data['features']
    bry_features = []
    
    for f in features:
        props = f.get('properties', {})
        nom = props.get('nom', '').lower()
        if 'bry' in nom or 'perreux' in nom or 'saint-maur' in nom:
            bry_features.append(props)
            
    print(f"Found {len(bry_features)} features for Bry/Perreux/St-Maur")
    for p in bry_features:
        print(f"Code: {p.get('code')}, Nom: {p.get('nom')}, Commune: {p.get('commune_nom')}")

if __name__ == "__main__":
    check_bry()
