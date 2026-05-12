import requests
import json
import os

def fetch_osm_nature():
    print("Fetching vegetation and nature from OSM Overpass API...")
    # Query for parks, gardens, hedges, grass, etc. in IDF
    query = """
    [out:json][timeout:300];
    area["name"="Île-de-France"]->.searchArea;
    (
      way["leisure"~"park|garden|common"](area.searchArea);
      way["landuse"~"forest|grass|orchard|vineyard|meadow|village_green|allotments|recreation_ground|cemetery|flowerbed"](area.searchArea);
      way["natural"~"wood|tree_row|scrub|heath|grassland"](area.searchArea);
      way["barrier"="hedge"](area.searchArea);
      node["natural"="tree"](area.searchArea);
    );
    out geom;
    """
    url = "https://overpass-api.de/api/interpreter"
    headers = {
        'User-Agent': 'QuartierIdeal_Nature_Bot/1.0',
        'Accept': 'application/json'
    }
    
    try:
        response = requests.post(url, data={'data': query}, headers=headers)
        if response.status_code == 200:
            data = response.json()
            with open('public/nature.json', 'w') as f:
                json.dump(data, f)
            print(f"✅ Successfully fetched {len(data.get('elements', []))} nature elements.")
        else:
            print(f"❌ Failed to fetch OSM data: {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    fetch_osm_nature()
