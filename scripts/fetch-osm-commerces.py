import requests
import json
import time

# OSM Overpass API
OVERPASS_URL = "https://overpass-api.de/api/interpreter"

# Mapping OSM tags to our requested pillars
CONFIG = [
    {"label": "boulangerie", "emoji": "🥖", "query": 'nwr["shop"="bakery"]'},
    {"label": "supermarché", "emoji": "🛒", "query": 'nwr["shop"~"supermarket|convenience"]'},
    {"label": "restaurant", "emoji": "🍴", "query": 'nwr["amenity"="restaurant"]["cuisine"!~"fast_food|kebab|burger|pizza|sandwich|taco"]'},
    {"label": "fast_food", "emoji": "🍔", "query": 'nwr["amenity"="fast_food"]'},
    {"label": "fromagerie", "emoji": "🧀", "query": 'nwr["shop"="cheese"]'},
    {"label": "boucherie", "emoji": "🥩", "query": 'nwr["shop"="butcher"]'},
    {"label": "bio", "emoji": "🥗", "query": 'nwr["shop"~"organic|health_food"]'},
    {"label": "librairie", "emoji": "📚", "query": 'nwr["shop"="books"]'},
    {"label": "caviste", "emoji": "🍷", "query": 'nwr["shop"="wine"]'},
    {"label": "poissonnerie", "emoji": "🐟", "query": 'nwr["shop"="seafood"]'},
    {"label": "fleuriste", "emoji": "💐", "query": 'nwr["shop"="florist"]'},
    {"label": "chocolatier", "emoji": "🍫", "query": 'nwr["shop"~"chocolate|confectionery"]'},
    {"label": "epicerie_fine", "emoji": "🍯", "query": 'nwr["shop"="delicatessen"]'},
    {"label": "culture", "emoji": "🎭", "query": 'nwr["amenity"~"cinema|theatre"]'},
    {"label": "picard", "emoji": "❄️", "query": 'nwr["shop"="frozen_food"]["brand"~"Picard"]'},
    {"label": "pharmacie", "emoji": "✚", "query": 'nwr["amenity"="pharmacy"]'},
    {"label": "bar", "emoji": "🍻", "query": 'nwr["amenity"~"bar|pub|cafe"]'},
    {"label": "primeur", "emoji": "🥦", "query": 'nwr["shop"="greengrocer"]'},
    {"label": "habillement", "emoji": "👕", "query": 'nwr["shop"="clothes"]'},
    {"label": "jouets", "emoji": "🧸", "query": 'nwr["shop"="toys"]'},
    {"label": "chaussures", "emoji": "👞", "query": 'nwr["shop"="shoes"]'},
]

def fetch_all_osm():
    # Wider bounding box for ALL of Île-de-France
    # [min_lat, min_lon, max_lat, max_lon]
    bbox = "48.1,1.4,49.3,3.6"
    
    queries = []
    for item in CONFIG:
        queries.append(f'{item["query"]}({bbox});')

    overpass_query = f"""
    [out:json][timeout:180];
    (
      {"".join(queries)}
    );
    out center;
    """
    
    headers = {
        "User-Agent": "QuartierIdeal/1.0 (https://github.com/adrientordjeman/quartier_ideal)",
        "Accept": "application/json"
    }
    
    print(f"Fetching ALL requested commerces for IDF (bbox: {bbox})...")
    try:
        response = requests.post(OVERPASS_URL, data={"data": overpass_query}, headers=headers, timeout=300)
        if response.status_code == 200:
            elements = response.json().get("elements", [])
            print(f"Success! Found {len(elements)} establishments.")
            
            features = []
            for el in elements:
                tags = el.get("tags", {})
                lat = el.get("lat") or el.get("center", {}).get("lat")
                lon = el.get("lon") or el.get("center", {}).get("lon")
                if not lat or not lon: continue
                
                label = "commerce"
                emoji = "🛒"
                shop = tags.get("shop")
                amenity = tags.get("amenity")
                brand = tags.get("brand", "").lower()
                name = tags.get("name", "").lower()
                is_bio = any(b in brand or b in name for b in ["biocoop", "naturalia", "bio c bon", "la vie claire", "l'eau vive", "satur’ne", "la louve", "marché léopold", "comptoirs de la bio"])

                if shop in ["organic", "health_food"] or is_bio:
                    label, emoji = "bio", "🥗"
                elif shop == "bakery":
                    label, emoji = "boulangerie", "🥖"
                elif shop in ["supermarket", "convenience"]:
                    # Refine supermarket/convenience: only keep branded ones if it's convenience
                    brands = ["carrefour", "monoprix", "franprix", "casino", "auchan", "lidl", "aldi", "u express", "market", "city", "intermarché", "g20", "coccinelle", "sherpa"]
                    is_branded = any(b in brand or b in name for b in brands)
                    if shop == "supermarket" or is_branded:
                        label, emoji = "supermarché", "🛒"
                    else:
                        continue # Skip generic supérettes
                elif amenity == "restaurant":
                    label, emoji = "restaurant", "🍴"
                elif amenity == "fast_food":
                    label, emoji = "fast_food", "🍔"
                elif shop == "cheese":
                    label, emoji = "fromagerie", "🧀"
                elif shop == "butcher":
                    label, emoji = "boucherie", "🥩"
                elif shop == "books":
                    label, emoji = "librairie", "📚"
                elif shop == "wine":
                    label, emoji = "caviste", "🍷"
                elif amenity in ["cinema", "theatre"]:
                    label, emoji = "culture", "🎭"
                elif amenity == "pharmacy":
                    label, emoji = "pharmacie", "✚"
                elif "picard" in brand or "picard" in name:
                    label, emoji = "Picard", "❄️"
                elif shop == "seafood":
                    label, emoji = "poissonnerie", "🐟"
                elif shop == "florist":
                    label, emoji = "fleuriste", "💐"
                elif shop in ["chocolate", "confectionery"]:
                    label, emoji = "chocolatier", "🍫"
                elif shop == "delicatessen":
                    label, emoji = "epicerie_fine", "🍯"
                elif amenity == "pub":
                    label, emoji = "pub", "🍺"
                elif amenity == "bar":
                    label, emoji = "bar", "🍸"
                elif amenity == "cafe":
                    label, emoji = "cafe", "☕"
                elif shop == "greengrocer":
                    label, emoji = "primeur", "🥦"
                elif shop == "clothes":
                    label, emoji = "habillement", "👕"
                elif shop == "toys":
                    label, emoji = "jouets", "🧸"
                elif shop == "shoes":
                    label, emoji = "chaussures", "👞"

                
                features.append({
                    "type": "Feature",
                    "geometry": { "type": "Point", "coordinates": [float(lon), float(lat)] },
                    "properties": {
                        "name": tags.get("name") or tags.get("operator") or "Établissement",
                        "category": label,
                        "emoji": emoji,
                        "address": tags.get("addr:full") or f"{tags.get('addr:housenumber', '')} {tags.get('addr:street', '')} {tags.get('addr:city', '')}".strip() or "IDF"
                    }
                })
            
            with open("public/commerces.geojson", "w") as f:
                json.dump({ "type": "FeatureCollection", "features": features }, f)
            print(f"Saved {len(features)} points to public/commerces.geojson")
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    fetch_all_osm()
