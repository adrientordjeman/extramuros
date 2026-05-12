import json
with open('public/idf_prices.json', 'r') as f:
    data = json.load(f)
    for code, props in data.items():
        if "Vaucresson (Jardy-Centre Ville)" in props.get('nom', ''):
            print(f"Code: {code}")
            print(json.dumps(props, indent=2))
