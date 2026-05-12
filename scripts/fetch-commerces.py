import requests
import json
import time

# Final NAF mapping for the 3 pillars
CONFIG = [
    {"label": "boulangerie", "emoji": "🥖", "nafs": ["10.71C"]},
    {"label": "supermarché", "emoji": "🛒", "nafs": ["47.11D", "47.11C", "47.11F"]},
    {"label": "restaurant", "emoji": "🍴", "nafs": ["56.10A"]},
]

# Core Departments (can expand if needed, but 75, 92, 93, 94 covers the densest areas)
DEPTS = ["75", "92", "93", "94"]
API_BASE = "https://recherche-entreprises.api.gouv.fr/search"
OUTPUT_FILE = "public/commerces.geojson"

def fetch_all():
    features = []
    
    for item in CONFIG:
        label = item["label"]
        print(f"Fetching ALL {label}...")
        for naf in item["nafs"]:
            for dept in DEPTS:
                page = 1
                while True:
                    url = f"{API_BASE}?activite_principale={naf}&departement={dept}&per_page=1000&page={page}&etablissement_siege=true"
                    try:
                        print(f"  - {naf} in {dept} [Page {page}]...")
                        response = requests.get(url, timeout=20)
                        
                        if response.status_code == 200:
                            data = response.json()
                            results = data.get("results", [])
                            if not results:
                                break
                            
                            print(f"    - +{len(results)} features")
                            for entry in results:
                                siege = entry.get("siege", {})
                                lat, lon = siege.get("latitude"), siege.get("longitude")
                                if lat and lon:
                                    features.append({
                                        "type": "Feature",
                                        "geometry": { "type": "Point", "coordinates": [float(lon), float(lat)] },
                                        "properties": {
                                            "name": entry.get("nom_complet") or "Établissement",
                                            "category": label,
                                            "emoji": item["emoji"],
                                            "address": siege.get("adresse")
                                        }
                                    })
                            
                            # Incremental write
                            with open(OUTPUT_FILE, "w") as f:
                                json.dump({ "type": "FeatureCollection", "features": features }, f)
                            
                            if len(results) < 1000:
                                break
                            
                            page += 1
                            time.sleep(4) # Safe buffer for 429
                        elif response.status_code == 429:
                            print("    - 429! Sleeping 10s...")
                            time.sleep(10)
                        else:
                            print(f"    - Error {response.status_code}")
                            break
                    except Exception as e:
                        print(f"    - Exception: {e}")
                        time.sleep(5)
                        break

    print(f"Exhaustive Harvest Done! Total features: {len(features)}")

if __name__ == "__main__":
    fetch_all()
