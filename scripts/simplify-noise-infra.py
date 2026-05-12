import json
import os
import math

def simplify_noise_infra():
    print("Simplifying noise infrastructure with accuracy improvements (Tunnel detection & Parallel merging)...")
    
    infra_file = 'public/infrastructure.json'
    if not os.path.exists(infra_file):
        print(f"❌ Error: {infra_file} not found. Run fetch-infrastructure.py first.")
        return

    with open(infra_file, 'r') as f:
        infra_data = json.load(f)
    
    geojson = {"type": "FeatureCollection", "features": []}
    
    # Tracking to avoid double-counting parallel tracks
    # We'll use a simple grid-based spatial hash for segment midpoints
    seen_segments = set()

    for el in infra_data.get('elements', []):
        tags = el.get('tags', {})
        h_type = tags.get('highway')
        r_type = tags.get('railway')
        ref = tags.get('ref', '').upper()
        name = tags.get('name', '').upper()
        operator = tags.get('operator', '').upper()
        usage = tags.get('usage', '').upper()
        is_tunnel = tags.get('tunnel') == 'yes' or tags.get('covered') == 'yes'
        is_bridge = tags.get('bridge') == 'yes'
        
        # Only keep noisy infrastructure
        is_road = h_type in ['motorway', 'trunk', 'primary', 'secondary']
        is_rail = r_type in ['rail', 'subway', 'light_rail']
        
        if not (is_road or is_rail):
            continue

        if 'geometry' not in el:
            continue
            
        coords = [[p['lon'], p['lat']] for p in el['geometry']]
        if len(coords) < 2: 
            continue
            
        # --- TUNNEL ATTENUATION ---
        # Underground infrastructure has significantly less acoustic impact at surface
        noise_multiplier = 1.0
        if is_tunnel:
            noise_multiplier = 0.05 # 95% reduction for tunnels
        elif r_type == 'subway' and not is_bridge:
            noise_multiplier = 0.1 # Subways are mostly underground
            
        # --- DATA-DRIVEN WEIGHTING ---
        weight = 0.1
        if h_type == 'motorway': 
            weight = 0.9
            if any(x in ref for x in ['A1', 'A4', 'A6', 'A10', 'A13', 'A86', 'PERIPHERIQUE']):
                weight = 1.0 
        elif h_type == 'trunk': 
            weight = 0.7
        elif h_type == 'primary': 
            weight = 0.5
        elif h_type == 'secondary': 
            weight = 0.2

        if r_type == 'rail':
            weight = 0.8
            if 'RER' in name or 'RER' in ref or 'RATP' in operator or usage == 'MAIN':
                weight = 1.0 
        elif r_type == 'subway':
            weight = 0.4 # Surface subway
        
        final_weight = weight * noise_multiplier
        
        # Skip silent segments (deep tunnels)
        if final_weight < 0.05:
            continue

        # --- PARALLEL TRACK MERGING (Heuristic) ---
        # Generate a key for the segment to avoid duplicates in multi-track lines
        # We round coordinates to ~50m to catch parallel ways
        mid_idx = len(coords) // 2
        mid_pt = (round(coords[mid_idx][0], 4), round(coords[mid_idx][1], 4))
        
        # If we've seen a similar segment recently, skip it to avoid "double noise"
        if mid_pt in seen_segments:
            continue
        seen_segments.add(mid_pt)
        
        geojson['features'].append({
            "type": "Feature",
            "properties": {
                "type": h_type or r_type,
                "weight": final_weight,
                "is_bridge": is_bridge
            },
            "geometry": {
                "type": "LineString",
                "coordinates": coords
            }
        })

    output_path = 'public/noise_infra.geojson'
    with open(output_path, 'w') as f:
        json.dump(geojson, f)
    print(f"✅ Created improved noise GeoJSON with {len(geojson['features'])} features (Parallel ways merged).")

if __name__ == "__main__":
    simplify_noise_infra()
