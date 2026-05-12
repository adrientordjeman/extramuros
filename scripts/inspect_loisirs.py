import json
import glob
import os

def inspect_files():
    files = glob.glob('data/loisirs/*.geojson')
    for f in files:
        print(f"--- {f} ---")
        try:
            with open(f, 'r', encoding='utf-8') as f_in:
                data = json.load(f_in)
                if 'features' in data and len(data['features']) > 0:
                    feat = data['features'][0]
                    print(json.dumps(feat['properties'], indent=2, ensure_ascii=False))
                    print(f"Total features: {len(data['features'])}")
                else:
                    print("Empty or invalid GeoJSON")
        except Exception as e:
            print(f"Error reading {f}: {e}")

if __name__ == "__main__":
    inspect_files()
