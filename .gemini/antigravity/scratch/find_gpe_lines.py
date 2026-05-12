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
for f in all_f:
    p = f.get("properties", {})
    # Look for 15, 16, 17, 18
    for line in ["15", "16", "17", "18"]:
        if any(line == str(v) for v in p.values()) or any(f"M{line}" == str(v) for v in p.values()) or any(f"Ligne {line}" == str(v) for v in p.values()):
            print(f"Found Line {line}: {p}")
            break
