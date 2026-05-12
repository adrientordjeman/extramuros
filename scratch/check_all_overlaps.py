import json
from shapely.geometry import shape

def check_all_overlaps():
    with open('public/idf-quartiers-optimized.geojson', 'r') as f:
        data = json.load(f)
    
    features = data['features']
    shapes = []
    for i, f in enumerate(features):
        try:
            shapes.append(shape(f['geometry']))
        except:
            shapes.append(None)
    
    n = len(features)
    for i in range(n):
        if shapes[i] is None: continue
        for j in range(i + 1, n):
            if shapes[j] is None: continue
            
            # Use bounds for fast check
            if not (shapes[i].bounds[0] > shapes[j].bounds[2] or 
                    shapes[i].bounds[2] < shapes[j].bounds[0] or 
                    shapes[i].bounds[1] > shapes[j].bounds[3] or 
                    shapes[i].bounds[3] < shapes[j].bounds[1]):
                
                if shapes[i].equals(shapes[j]):
                    print(f"EXACT OVERLAP: {i} ({features[i]['properties'].get('nom')}) and {j} ({features[j]['properties'].get('nom')})")
                elif shapes[i].intersects(shapes[j]):
                    intersection = shapes[i].intersection(shapes[j])
                    if intersection.area > 1e-7:
                        # If intersection area is very close to the area of one of the shapes, it's almost a duplicate
                        area_i = shapes[i].area
                        area_j = shapes[j].area
                        if intersection.area / area_i > 0.99 or intersection.area / area_j > 0.99:
                            print(f"MAJOR OVERLAP: {i} ({features[i]['properties'].get('nom')}) and {j} ({features[j]['properties'].get('nom')}) - Area: {intersection.area}")

if __name__ == "__main__":
    check_all_overlaps()
