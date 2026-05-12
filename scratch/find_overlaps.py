import json
from shapely.geometry import shape

def find_overlaps():
    input_path = 'public/idf-quartiers-optimized.geojson'
    
    with open(input_path, 'r') as f:
        data = json.load(f)
    
    features = data['features']
    print(f"Checking {len(features)} features for overlaps...")
    
    shapes = []
    for i, f in enumerate(features):
        geom = f.get('geometry')
        if geom:
            shapes.append({
                'id': i,
                'shape': shape(geom),
                'props': f.get('properties', {})
            })
    
    overlaps_found = 0
    to_remove = set()
    
    # This is O(N^2), but let's try to focus on Bry/Saint-Maur
    # Actually, let's just do it for all, 5000 is small enough for a quick check
    for i in range(len(shapes)):
        s1 = shapes[i]['shape']
        p1 = shapes[i]['props']
        
        for j in range(i + 1, len(shapes)):
            s2 = shapes[j]['shape']
            p2 = shapes[j]['props']
            
            # Quick bounding box check
            if not s1.bounds[2] < s2.bounds[0] and not s2.bounds[2] < s1.bounds[0] and \
               not s1.bounds[3] < s2.bounds[1] and not s2.bounds[3] < s1.bounds[1]:
                
                try:
                    # Check intersection area
                    if s1.intersects(s2):
                        intersection = s1.intersection(s2).area
                        a1 = s1.area
                        a2 = s2.area
                        
                        if a1 > 0 and intersection / a1 > 0.95:
                            print(f"Feature {i} ({p1.get('nom')}) is mostly covered by {j} ({p2.get('nom')})")
                            to_remove.add(i)
                        elif a2 > 0 and intersection / a2 > 0.95:
                            print(f"Feature {j} ({p2.get('nom')}) is mostly covered by {i} ({p1.get('nom')})")
                            to_remove.add(j)
                except Exception as e:
                    pass
    
    print(f"Found {len(to_remove)} overlapping features to remove.")
    
    cleaned_features = [f for i, f in enumerate(features) if i not in to_remove]
    data['features'] = cleaned_features
    
    with open('public/idf-quartiers-optimized.geojson', 'w') as f:
        json.dump(data, f)
    
    print(f"Final count: {len(cleaned_features)}")

if __name__ == "__main__":
    find_overlaps()
