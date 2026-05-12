import json
from shapely.geometry import shape

def check_overlaps():
    with open('public/idf-quartiers-optimized.geojson', 'r') as f:
        data = json.load(f)
    
    features = data['features']
    shapes = [shape(f['geometry']) for f in features]
    
    # Check specifically for Bry vs Le Perreux
    bry_indices = [i for i, f in enumerate(features) if 'Bry-sur-Marne' in f['properties'].get('nom', '')]
    perreux_indices = [i for i, f in enumerate(features) if 'Perreux' in f['properties'].get('nom', '')]
    
    for b in bry_indices:
        for p in perreux_indices:
            if shapes[b].intersects(shapes[p]):
                overlap_area = shapes[b].intersection(shapes[p]).area
                if overlap_area > 1e-7:
                    print(f"OVERLAP: Bry({features[b]['id']}) and Perreux({features[p]['id']}) - Area: {overlap_area}")

if __name__ == "__main__":
    try:
        check_overlaps()
    except Exception as e:
        print(f"ERROR: {e}")
