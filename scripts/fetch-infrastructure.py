import requests
import json
import os
import time

def fetch_osm_infrastructure():
    print("Fetching infrastructure from OSM Overpass API...")
    # More robust query: divide IDF into pieces if needed, but let's try one more time with proper headers
    query = """
    [out:json][timeout:300];
    area["name"="Île-de-France"]->.searchArea;
    (
      way["highway"~"motorway|trunk|primary|secondary"](area.searchArea);
      way["railway"~"rail|subway|light_rail|tram"](area.searchArea);
    );
    out geom;
    """
    url = "https://overpass-api.de/api/interpreter"
    headers = {
        'User-Agent': 'QuartierIdeal_Analytics_Bot/1.0',
        'Accept': 'application/json'
    }
    
    try:
        response = requests.post(url, data={'data': query}, headers=headers)
        if response.status_code == 200:
            data = response.json()
            with open('public/infrastructure.json', 'w') as f:
                json.dump(data, f)
            print(f"✅ Successfully fetched {len(data.get('elements', []))} infrastructure elements.")
        else:
            print(f"❌ Failed to fetch OSM data: {response.status_code}")
            print(f"Response: {response.text[:200]}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    fetch_osm_infrastructure()
