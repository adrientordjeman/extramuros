"""
fetch_osm_supplement.py
-----------------------
Queries Overpass API for cultural venues in IDF that are MISSING from the
official Région IDF dataset (lieux_spectacle_vivant_idf.geojson).

Targets:
  - amenity=theatre          → category: theatre
  - amenity=library          → category: bibliotheque
  - amenity=arts_centre      → category: institution_culturelle

Deduplication: any OSM point within 150m of an existing IDF dataset point
of the same category is dropped as a duplicate.

Output: data/loisirs/osm_supplement.geojson
"""

import json
import math
import time
import ssl
import urllib.request
import urllib.parse

# macOS SSL fix: Python doesn't use the system keychain by default
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

# ── IDF bounding box (S, W, N, E) ──────────────────────────────────────────
IDF_BBOX = "48.12,1.45,49.24,3.56"

# ── OSM tags to fetch + their local category mapping ───────────────────────
QUERIES = [
    ("amenity=theatre",     "theatre"),
    ("amenity=library",     "bibliotheque"),
    ("amenity=arts_centre", "institution_culturelle"),
]

DEDUP_RADIUS_M = 150   # drop OSM point if existing IDF point within this distance


def haversine(lat1, lon1, lat2, lon2):
    R = 6371000
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def overpass_query(tag_filter: str) -> list[dict]:
    """Fetch nodes + ways centroids from Overpass for a given tag in IDF."""
    query = f"""
[out:json][timeout:60];
(
  node[{tag_filter}]({IDF_BBOX});
  way[{tag_filter}]({IDF_BBOX});
);
out center tags;
"""
    url = "https://overpass-api.de/api/interpreter"
    data = urllib.parse.urlencode({"data": query}).encode()
    req = urllib.request.Request(url, data=data,
                                 headers={"User-Agent": "quartier-ideal/1.0"})
    with urllib.request.urlopen(req, timeout=90, context=ssl_ctx) as resp:
        return json.loads(resp.read())["elements"]


def load_existing_points(path: str) -> list[dict]:
    """Load existing IDF dataset points as {lat, lon, category}."""
    try:
        with open(path) as f:
            data = json.load(f)
        out = []
        for feat in data.get("features", []):
            geom = feat.get("geometry")
            if not geom or geom["type"] != "Point":
                continue
            lon, lat = geom["coordinates"]
            out.append({
                "lat": lat, "lon": lon,
                "cat": feat["properties"].get("category", ""),
                "name": feat["properties"].get("name", ""),
            })
        return out
    except Exception as e:
        print(f"  Warning: could not load {path}: {e}")
        return []


def is_duplicate(lat, lon, cat, existing, radius=DEDUP_RADIUS_M):
    for p in existing:
        if p["cat"] != cat:
            continue
        if haversine(lat, lon, p["lat"], p["lon"]) < radius:
            return True
    return False


def main():
    # Load existing processed loisirs points (already assigned IRIS)
    existing_path = "public/loisirs.geojson"
    print(f"Loading existing loisirs points from {existing_path}...")
    existing = load_existing_points(existing_path)
    print(f"  {len(existing)} existing points loaded.")

    features = []
    for tag_filter, category in QUERIES:
        print(f"\nQuerying Overpass: [{tag_filter}] …")
        try:
            elements = overpass_query(tag_filter)
        except Exception as e:
            print(f"  ERROR: {e}")
            time.sleep(3)
            continue

        print(f"  {len(elements)} elements returned by OSM.")
        added = 0
        skipped_dup = 0
        skipped_no_coords = 0

        for el in elements:
            # Get coordinates (node → lat/lon, way → center)
            if el["type"] == "node":
                lat, lon = el.get("lat"), el.get("lon")
            elif el["type"] == "way":
                center = el.get("center", {})
                lat, lon = center.get("lat"), center.get("lon")
            else:
                continue

            if lat is None or lon is None:
                skipped_no_coords += 1
                continue

            # IDF bounding box guard
            if not (1.45 <= lon <= 3.56 and 48.12 <= lat <= 49.24):
                continue

            tags = el.get("tags", {})
            name = (tags.get("name:fr") or tags.get("name") or "").strip()
            if not name:
                continue   # skip unnamed venues

            if is_duplicate(lat, lon, category, existing):
                skipped_dup += 1
                continue

            features.append({
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [lon, lat]},
                "properties": {
                    "category": category,
                    "name": name,
                    "source": "osm",
                    "osm_id": el.get("id"),
                }
            })
            # Add to existing so intra-batch dedup also works
            existing.append({"lat": lat, "lon": lon, "cat": category, "name": name})
            added += 1

        print(f"  → {added} new venues added, {skipped_dup} duplicates skipped, "
              f"{skipped_no_coords} without coordinates.")

        time.sleep(2)  # be polite to Overpass

    out_path = "data/loisirs/osm_supplement.geojson"
    geojson = {"type": "FeatureCollection", "features": features}
    with open(out_path, "w") as f:
        json.dump(geojson, f, ensure_ascii=False)

    print(f"\n✓ Saved {len(features)} new OSM venues → {out_path}")


if __name__ == "__main__":
    main()
