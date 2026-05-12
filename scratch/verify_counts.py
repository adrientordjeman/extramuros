import json
import os

def verify():
    path = "public/idf-quartiers-optimized.geojson"
    if not os.path.exists(path):
        print("Optimized file not found.")
        return
    
    with open(path, 'r') as f:
        data = json.load(f)
        
    v = [f for f in data['features'] if f['properties']['code'] == '930770107']
    if not v:
        print("Villemomble IRIS not found.")
        return
    
    props = v[0]['properties']
    counts = props['counts']
    print(f"--- Verification for {props['nom']} ---")
    print(f"Supermarkets: {counts.get('supermarket')}")
    print(f"Tennis: {counts.get('tennis')}")
    print(f"Services Score: {props['staticScores'].get('services')}")
    print(f"Infra Score: {props['staticScores'].get('infra')}")

if __name__ == "__main__":
    verify()
