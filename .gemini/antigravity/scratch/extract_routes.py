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
        for item in obj:
            features.extend(get_all_features(item))
    return features

with open("public/metro_lines.geojson") as f:
    data = json.load(f)

all_features = get_all_features(data)
target_lines = ["15", "16", "17", "18"]
found = {line: False for line in target_lines}

for f in all_features:
    props = f.get("properties", {})
    name = str(props.get("route_short_name"))
    if name in target_lines:
        found[name] = True

print(found)
