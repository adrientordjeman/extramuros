import requests
import json
import os

# OSM Overpass API
OVERPASS_URL = "https://overpass-api.de/api/interpreter"

def fetch_osm_paths():
    print("Fetching Cycle, Pedestrian and HIKING paths from OSM Overpass API...")
    # Wider bounding box for ALL of Île-de-France
    bbox = "48.1,1.4,49.3,3.6"
    
    # Query including ways AND hiking relations (GR, PR, etc.)
    query = f"""
    [out:json][timeout:400];
    (
      // Dedicated cycleways
      way["highway"="cycleway"]({bbox});
      way["bicycle"="designated"]({bbox});
      
      // Pedestrian roads and designated paths
      way["highway"="pedestrian"]({bbox});
      way["highway"="path"]["foot"="designated"]({bbox});
      
      // Hiking routes (Relations)
      rel["route"="hiking"]({bbox});
      rel["route"="foot"]({bbox});
    );
    out body;
    >;
    out skel qt;
    """
    
    headers = {
        "User-Agent": "QuartierIdeal/1.0",
        "Accept": "application/json"
    }
    
    try:
        print("Sending request to Overpass (this includes hiking relations)...")
        response = requests.post(OVERPASS_URL, data={"data": query}, headers=headers, timeout=600)
        if response.status_code == 200:
            data = response.json()
            elements = data.get("elements", [])
            
            # 1. Map nodes
            nodes = {el["id"]: (el["lon"], el["lat"]) for el in elements if el["type"] == "node"}
            
            # 2. Map ways to their data (for relation lookup)
            way_data = {el["id"]: el for el in elements if el["type"] == "way"}
            
            # 3. Track which ways belong to a hiking route
            hiking_way_ids = {} # way_id -> network_type (GR, PR, etc.)
            
            for el in elements:
                if el["type"] == "relation":
                    tags = el.get("tags", {})
                    network = tags.get("network", "unknown").upper()
                    symbol = tags.get("symbol", "")
                    name = tags.get("name", "Randonnée")
                    
                    # Determine route type
                    route_type = "PR" # Default
                    if "GR" in network or "GR" in name: route_type = "GR"
                    
                    # Tag all ways in this relation
                    for member in el.get("members", []):
                        if member["type"] == "way":
                            wid = member["ref"]
                            # Prioritize GR over PR if overlapping
                            if wid not in hiking_way_ids or route_type == "GR":
                                hiking_way_ids[wid] = {
                                    "type": route_type,
                                    "network": network,
                                    "name": name
                                }

            features = []
            for wid, el in way_data.items():
                tags = el.get("tags", {})
                way_nodes = el.get("nodes", [])
                coords = [nodes[node_id] for node_id in way_nodes if node_id in nodes]
                
                if len(coords) < 2: continue
                
                # Default Categorization
                category = "other"
                h_tags = tags.get("highway")
                b_tags = tags.get("bicycle")
                f_tags = tags.get("foot")
                
                if h_tags == "cycleway" or b_tags == "designated":
                    category = "cycle"
                elif h_tags == "pedestrian" or f_tags == "designated":
                    category = "pedestrian"
                
                # Override with Hiking data if present
                if wid in hiking_way_ids:
                    category = "hiking"
                    # Merge tags
                    tags.update(hiking_way_ids[wid])
                
                features.append({
                    "type": "Feature",
                    "geometry": { "type": "LineString", "coordinates": coords },
                    "properties": {
                        "category": category,
                        "name": tags.get("name") or tags.get("route_name") or "Chemin",
                        "network": tags.get("type"), # GR or PR
                        "surface": tags.get("surface"),
                        "smoothness": tags.get("smoothness"),
                        "lit": tags.get("lit")
                    }
                })
            
            output_path = "public/osm_paths.geojson"
            with open(output_path, "w") as f:
                json.dump({ "type": "FeatureCollection", "features": features }, f)
            
            print(f"✅ Saved {len(features)} paths (including hiking routes) to {output_path}")
        else:
            print(f"Error: {response.status_code}")
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    fetch_osm_paths()
