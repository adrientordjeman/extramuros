import requests
import json
import os

def fetch_bio_stores():
    query = """
    [out:json][timeout:60];
    (
      node["shop"="organic"](48.1, 1.4, 49.2, 3.6);
      node["name"~"Naturalia",i](48.1, 1.4, 49.2, 3.6);
      node["name"~"Biocoop",i](48.1, 1.4, 49.2, 3.6);
      node["name"~"Bio c' Bon",i](48.1, 1.4, 49.2, 3.6);
      node["name"~"La Vie Claire",i](48.1, 1.4, 49.2, 3.6);
    );
    out body;
    """
    
    print("🛰️ Calling Overpass API...")
    url = "https://overpass-api.de/api/interpreter"
    headers = {
        'User-Agent': 'QuartierIdealBot/1.0 (https://github.com/adrientordjeman/quartier_ideal)',
        'Content-Type': 'application/x-www-form-length'
    }
    try:
        # Overpass expects the query in the 'data' parameter or as raw body
        response = requests.post(url, data={'data': query}, headers=headers, timeout=90)
        if response.status_code == 200:
            data = response.json()
            with open('/tmp/bio_stores_osm.json', 'w') as f:
                json.dump(data, f)
            print(f"✅ Success! Found {len(data.get('elements', []))} elements.")
        else:
            print(f"❌ Error {response.status_code}: {response.text}")
    except Exception as e:
        print(f"❌ Exception: {e}")

if __name__ == "__main__":
    fetch_bio_stores()
