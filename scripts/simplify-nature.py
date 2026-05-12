import json
import os

def simplify_nature():
    print("Simplifying nature data for frontend...")
    with open('public/nature.json', 'r') as f:
        nature_data = json.load(f)
    
    geojson = {"type": "FeatureCollection", "features": []}
    
    for el in nature_data.get('elements', []):
        tags = el.get('tags', {})
        if 'geometry' in el:
            coords = [[round(p['lon'], 5), round(p['lat'], 5)] for p in el['geometry']]
            if len(coords) < 2: continue
            
            # Type of vegetation
            v_type = 'grass'
            if tags.get('leisure') == 'park': v_type = 'park'
            elif tags.get('natural') == 'wood' or tags.get('landuse') == 'forest': v_type = 'forest'
            elif tags.get('natural') == 'tree_row': v_type = 'tree_row'
            else: continue # Skip minor stuff
            
            # For forests/parks, only keep if they are polygons
            is_poly = coords[0] == coords[-1] and len(coords) >= 4
            
            # Additional filtering for performance if needed
            # (In a real app we'd simplify geometry with shapely)
            
            geojson['features'].append({
                "type": "Feature",
                "properties": {"type": v_type},
                "geometry": {
                    "type": "Polygon" if is_poly else "LineString",
                    "coordinates": [coords] if is_poly else coords
                }
            })

    output_path = 'public/nature_infra.geojson'
    with open(output_path, 'w') as f:
        json.dump(geojson, f)
    print(f"✅ Created simplified nature GeoJSON with {len(geojson['features'])} features.")

if __name__ == "__main__":
    simplify_nature()
