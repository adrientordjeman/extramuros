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

with open("public/heavy_transit_lines.geojson") as f:
    data = json.load(f)

all_f = get_all_features(data)
results = { "15": [], "16": [], "17": [], "18": [] }
for f in all_f:
    p = f.get("properties", {})
    short_name = str(p.get("route_short_name", ""))
    long_name = str(p.get("route_long_name", ""))
    
    for line in results.keys():
        # Check if the line number is in any of the relevant fields
        if line == short_name or f" {line} " in f" {long_name} " or long_name.startswith(f"{line} ") or long_name.endswith( f" {line}"):
            results[line].append(p)

for line, items in results.items():
    print(f"Line {line}: Found {len(items)} matching features.")
    if items:
        # Print unique short names found
        shorts = sorted(list(set(str(item.get("route_short_name")) for item in items)))
        print(f"  Short names: {shorts}")
        print(f"  Example properties: {items[0]}")
