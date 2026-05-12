
import json
import urllib.request
import urllib.parse
import ssl
import time

# IDF bounding box (S, W, N, E)
IDF_BBOX = "48.12,1.45,49.24,3.56"

# macOS SSL fix
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

def overpass_query(query_body: str) -> dict:
    query = f"""
[out:json][timeout:300];
(
  {query_body}
);
out geom;
"""
    url = "https://overpass-api.de/api/interpreter"
    data = urllib.parse.urlencode({"data": query}).encode()
    req = urllib.request.Request(url, data=data, headers={"User-Agent": "quartier-ideal/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=400, context=ssl_ctx) as resp:
            return json.loads(resp.read())
    except Exception as e:
        print(f"Error querying Overpass: {e}")
        return {"elements": []}

def process_to_geojson(osm_data: dict) -> dict:
    features = []
    for el in osm_data.get("elements", []):
        tags = el.get("tags", {})
        geometry = None
        
        if el["type"] == "way":
            if "geometry" in el:
                coords = [[p["lon"], p["lat"]] for p in el["geometry"]]
                
                # Check if it should be a polygon (water, or closed natural)
                is_closed = coords[0] == coords[-1] and len(coords) >= 4
                
                nat = tags.get("natural")
                if nat == "water" and is_closed:
                    geometry = {"type": "Polygon", "coordinates": [coords]}
                elif nat == "tree_row":
                    geometry = {"type": "LineString", "coordinates": coords}
                elif nat == "water": # Linear water or non-closed
                    geometry = {"type": "LineString", "coordinates": coords}
                else:
                    # Generic handling
                    if is_closed:
                        geometry = {"type": "Polygon", "coordinates": [coords]}
                    else:
                        geometry = {"type": "LineString", "coordinates": coords}
        
        # Relations are complex with out geom, members have geometries but we need to stitch them.
        # For now, let's focus on ways which cover 90% of the small elements.
            
        if geometry:
            features.append({
                "type": "Feature",
                "geometry": geometry,
                "properties": {
                    "osm_id": el["id"],
                    "natural": tags.get("natural"),
                    "water": tags.get("water"),
                    "name": tags.get("name"),
                    "source": "osm"
                }
            })
    return {"type": "FeatureCollection", "features": features}

def main():
    print("Fetching OSM Context (Tree Rows, Water)...")
    
    # We'll split the query to avoid timeouts
    queries = [
        ('way["natural"="tree_row"]', "tree_rows"),
        ('way["natural"="water"]', "water_bodies")
    ]
    
    all_features = []
    
    for query_body, label in queries:
        print(f"Querying {label}...")
        full_query = f'{query_body}({IDF_BBOX});'
        data = overpass_query(full_query)
        geojson = process_to_geojson(data)
        print(f"  Found {len(geojson['features'])} features.")
        all_features.extend(geojson['features'])
        time.sleep(2)
        
    output_path = "public/osm_context.geojson"
    with open(output_path, "w") as f:
        json.dump({"type": "FeatureCollection", "features": all_features}, f, ensure_ascii=False)
    
    print(f"\n✓ Saved {len(all_features)} context elements to {output_path}")

if __name__ == "__main__":
    main()
