import json

def find_duplicates():
    with open('public/idf-quartiers-optimized.geojson', 'r') as f:
        data = json.load(f)
    
    features = data['features']
    codes = {}
    for i, f in enumerate(features):
        code = f['properties'].get('code')
        if code in codes:
            codes[code].append(i)
        else:
            codes[code] = [i]
    
    duplicates = {k: v for k, v in codes.items() if len(v) > 1}
    for code, indices in duplicates.items():
        print(f"Code {code} has {len(indices)} occurrences at indices {indices}")
        for idx in indices:
            print(f"  Index {idx}: {features[idx]['properties'].get('nom')}")

if __name__ == "__main__":
    find_duplicates()
