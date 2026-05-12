import json

def get_all_features(obj):
    features = []
    if isinstance(obj, dict):
        if obj.get("type") == "Feature":
            features.append(obj)
        elif "features" in obj:
            for f in obj["features"]:
                features.extend(get_all_features(f))
    elif isinstance(obj, list):
        for i in obj:
            features.extend(get_all_features(i))
    return features

with open("public/metro_lines.geojson") as f:
    data = json.load(f)

all_f = get_all_features(data)
results = { "15": [], "16": [], "17": [], "18": [] }
for f in all_f:
    p = f.get("properties", {})
    short_name = str(p.get("route_short_name", ""))
    long_name = str(p.get("route_long_name", ""))
    
    for line in results.keys():
        if short_name == line or f"M{line}" in long_name or f"Ligne {line}" in long_name:
            # Check if it's likely a subway line
            if p.get("route_type") in ["Subway", "Rail"] or "Métro" in long_name or "Express" in long_name:
                results[line].append(p)

for line, items in results.items():
    print(f"Line {line}: Found {len(items)} matching features.")
    if items:
        print(f"  Example: {items[0]}")
