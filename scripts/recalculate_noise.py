import json
import os
from shapely.geometry import shape, Point, MultiLineString, LineString
from shapely.strtree import STRtree

def recalculate_noise():
    print("🚗 Recalculating noise scores based on infrastructure...")
    
    quartiers_path = 'public/idf-quartiers.geojson'
    noise_infra_path = 'public/noise_infra.geojson'
    prices_path = 'public/idf_prices.json'
    
    if not all(os.path.exists(p) for p in [quartiers_path, noise_infra_path, prices_path]):
        print("❌ Missing files.")
        return

    with open(quartiers_path, 'r') as f:
        quartiers_data = json.load(f)
    
    with open(noise_infra_path, 'r') as f:
        infra_data = json.load(f)

    with open(prices_path, 'r') as f:
        prices_data = json.load(f)

    # 1. Build spatial index for noise infra
    print("🏗️ Building spatial index for noise infrastructure...")
    infra_geoms = []
    infra_weights = []
    
    for f in infra_data['features']:
        geom = shape(f['geometry'])
        if geom.is_empty:
            continue
            
        infra_geoms.append(geom)
        
        # Determine weight based on type and major status
        props = f['properties']
        weight = 0
        t = props.get('type', '')
        is_major = props.get('is_major', False)
        
        if is_major:
            weight = 40 if t == 'rail' else 50
        elif t in ['motorway', 'trunk']:
            weight = 30
        elif t == 'primary':
            weight = 15
        elif t == 'secondary':
            weight = 5
        else:
            weight = 2
            
        infra_weights.append(weight)

    tree = STRtree(infra_geoms)
    geom_to_idx = {id(g): i for i, g in enumerate(infra_geoms)}

    # 2. Process each quartier
    print("📊 Updating quartier noise scores...")
    for f in quartiers_data['features']:
        poly = shape(f['geometry'])
        
        search_geom = poly.buffer(0.0001) 
        intersecting_indices = tree.query(search_geom)
        
        weighted_penalties = []
        area = poly.area
        char_length = area ** 0.5
        
        for idx in intersecting_indices:
            infra_geom = infra_geoms[idx]
            if poly.intersects(infra_geom):
                intersection = poly.intersection(infra_geom)
                if intersection.is_empty: continue
                inter_len = intersection.length
                
                props = infra_data['features'][idx]['properties']
                t = props.get('type', '')
                is_major = props.get('is_major', False)
                
                base_w = 2
                if is_major:
                    base_w = 30 if t == 'rail' else 45
                elif t in ['motorway', 'trunk']:
                    base_w = 25
                elif t == 'primary':
                    base_w = 12
                elif t == 'secondary':
                    base_w = 4
                
                impact_ratio = min(1.0, inter_len / (char_length * 0.4))
                if impact_ratio < 0.1: impact_ratio *= 0.5
                
                weighted_penalties.append(base_w * impact_ratio)

        if weighted_penalties:
            weighted_penalties.sort(reverse=True)
            final_noise = weighted_penalties[0]
            for p in weighted_penalties[1:4]:
                final_noise += p * 0.15
        else:
            final_noise = 0

        # Cap penalty at 90
        final_noise = min(90, final_noise)
        
        # Baseline noise for urban areas (ips is a proxy for density/wealth)
        if final_noise < 10:
            ips = f['properties'].get('ips', 100)
            baseline = 5 + (ips / 60)
            final_noise = max(final_noise, baseline)
        
        noise_val = round(float(final_noise), 1)
        f['properties']['noise'] = noise_val
        
        # Also update prices_data
        insee = f['properties']['code']
        if isinstance(insee, list): insee = insee[0]
        if insee in prices_data:
            prices_data[insee]['noise'] = noise_val

    # 3. Save back
    with open(quartiers_path, 'w') as f:
        json.dump(quartiers_data, f)
    
    with open(prices_path, 'w') as f:
        json.dump(prices_data, f)
    
    print(f"✅ Recalculated noise scores and updated both GeoJSON and idf_prices.json.")

if __name__ == "__main__":
    recalculate_noise()
