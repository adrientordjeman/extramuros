import requests
import json
import os
import time

# OSM Overpass API
OVERPASS_URL = "https://overpass-api.de/api/interpreter"
bbox = "48.1,1.4,49.3,3.6"
headers = {
    "User-Agent": "QuartierIdeal/1.0",
    "Accept": "application/json"
}

def overpass_query(tags_filter):
    query = f"""
    [out:json][timeout:300];
    (
      {tags_filter}({bbox});
    );
    out center;
    """
    try:
        response = requests.post(OVERPASS_URL, data={"data": query}, headers=headers, timeout=400)
        if response.status_code == 200:
            return response.json().get("elements", [])
        else:
            print(f"Error {response.status_code} for {tags_filter}")
            return []
    except Exception as e:
        print(f"Exception for {tags_filter}: {e}")
        return []

def fetch_osm_riviera():
    print("Fetching Riviera features from OSM (Marinas, Slipways, Guinguettes, Towpaths)...")
    
    queries = [
        ('nwr["leisure"="marina"]', "marina", "⛵"),
        ('nwr["leisure"="slipway"]', "slipway", "🚤"),
        ('nwr["cuisine"="guinguette"]', "guinguette", "💃"),
        ('nwr["amenity"="restaurant"]["name"~"Guinguette",i]', "guinguette", "💃"),
        ('way["highway"="path"]["towpath"="yes"]', "towpath", "🚴")
    ]
    
    all_elements = []
    for q, cat, emo in queries:
        print(f"Querying {q}...")
        elements = overpass_query(q)
        for el in elements:
            el["_category"] = cat
            el["_emoji"] = emo
        all_elements.extend(elements)
        time.sleep(2) # Be polite
    
    print(f"Success! Found {len(all_elements)} elements total.")
    
    features = []
    seen_ids = set()
    for el in all_elements:
        if el["id"] in seen_ids: continue
        seen_ids.add(el["id"])
        
        tags = el.get("tags", {})
        lat = el.get("lat") or el.get("center", {}).get("lat")
        lon = el.get("lon") or el.get("center", {}).get("lon")
        
        if not lat or not lon: continue
        
        features.append({
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [float(lon), float(lat)] },
            "properties": {
                "name": tags.get("name") or tags.get("operator") or el["_category"].capitalize(),
                "category": el["_category"],
                "emoji": el["_emoji"],
                "osm_id": el.get("id"),
                "tags": tags
            }
        })
    
    output_path = "public/riviera.geojson"
    with open(output_path, "w") as f:
        json.dump({ "type": "FeatureCollection", "features": features }, f)
    print(f"✅ Saved {len(features)} Riviera features to {output_path}")

if __name__ == "__main__":
    fetch_osm_riviera()
