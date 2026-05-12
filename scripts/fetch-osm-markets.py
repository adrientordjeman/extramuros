import json
import time
import ssl
import urllib.request
import urllib.parse
import os

# macOS SSL fix
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

# ── IDF bounding box (S, W, N, E) ──────────────────────────────────────────
IDF_BBOX = "48.1,1.4,49.3,3.6"

def overpass_query(query_str: str) -> list[dict]:
    url = "https://overpass-api.de/api/interpreter"
    data = urllib.parse.urlencode({"data": query_str}).encode()
    req = urllib.request.Request(url, data=data,
                                 headers={"User-Agent": "quartier-ideal/1.0"})
    with urllib.request.urlopen(req, timeout=120, context=ssl_ctx) as resp:
        return json.loads(resp.read())["elements"]

def fetch_markets():
    print(f"Fetching markets (amenity=market_place) for IDF...")
    
    query = f"""
    [out:json][timeout:120];
    (
      node["amenity"~"marketplace|market_place"]({IDF_BBOX});
      way["amenity"~"marketplace|market_place"]({IDF_BBOX});
      relation["amenity"~"marketplace|market_place"]({IDF_BBOX});
    );
    out center tags;
    """
    
    try:
        elements = overpass_query(query)
        print(f"Success! Found {len(elements)} market elements.")
        
        features = []
        for el in elements:
            tags = el.get("tags", {})
            
            # Get coordinates
            if el["type"] == "node":
                lat, lon = el.get("lat"), el.get("lon")
            else:
                center = el.get("center", {})
                lat, lon = center.get("lat"), center.get("lon")
            
            if lat is None or lon is None:
                continue
                
            name = tags.get("name:fr") or tags.get("name") or "Marché"
            covered = tags.get("covered") == "yes"
            
            features.append({
                "type": "Feature",
                "geometry": { "type": "Point", "coordinates": [float(lon), float(lat)] },
                "properties": {
                    "name": name,
                    "category": "marche",
                    "emoji": "🏪" if covered else "🧺",
                    "is_covered": covered,
                    "osm_id": el.get("id"),
                    "source": "osm"
                }
            })
            
        output_path = "public/markets.geojson"
        with open(output_path, "w") as f:
            json.dump({ "type": "FeatureCollection", "features": features }, f, ensure_ascii=False)
        
        print(f"Saved {len(features)} markets to {output_path}")
        
    except Exception as e:
        print(f"Error fetching markets: {e}")

if __name__ == "__main__":
    fetch_markets()
