import requests
import json
import os
import time

def fetch_osm_amenities():
    print("Fetching lifestyle amenities from OSM Overpass API...")
    # Categories:
    # 🏊 Swimming Pool: leisure=swimming_pool
    # 🏋️ Gyms: leisure=fitness_centre
    # 🎾 Tennis: sport=tennis
    # 🎬 Cinema: amenity=cinema
    # 🎭 Theatre: amenity=theatre
    # 📚 Library: amenity=library
    # 🎠 Playground: leisure=playground
    # 👶 Crèche: amenity=creche, amenity=kindergarten
    
    query = """
    [out:json][timeout:300];
    area["name"="Île-de-France"]->.searchArea;
    (
      nwr["leisure"="fitness_centre"](area.searchArea);
      nwr["sport"="tennis"](area.searchArea);
      nwr["leisure"="sports_centre"]["sport"="tennis"](area.searchArea);
      nwr["amenity"="cinema"](area.searchArea);
      nwr["amenity"="theatre"](area.searchArea);
      nwr["amenity"="library"](area.searchArea);
      nwr["leisure"="playground"](area.searchArea);
      nwr["amenity"="place_of_worship"](area.searchArea);
    );
    out center;
    """
    
    url = "https://overpass-api.de/api/interpreter"
    headers = {
        'User-Agent': 'QuartierIdeal_Amenities_Bot/1.0',
        'Accept': 'application/json'
    }
    
    for attempt in range(3):
        try:
            response = requests.post(url, data={'data': query}, headers=headers)
            if response.status_code == 200:
                data = response.json()
                break
            elif response.status_code in [504, 429]:
                print(f"⚠️ Overpass busy ({response.status_code}), retrying in 10s... (Attempt {attempt+1}/3)")
                time.sleep(10)
                continue
            else:
                print(f"❌ Failed to fetch OSM data: {response.status_code}")
                return
        except Exception as e:
            print(f"⚠️ Connection error: {e}, retrying...")
            time.sleep(5)
            continue
    else:
        print("❌ All attempts failed. Please try again later.")
        return
        
    elements = data.get('elements', [])
    geojson = {
        "type": "FeatureCollection",
        "features": []
    }
    
    for el in elements:
        # Get coordinates from node or center of way/relation
        lat = el.get('lat') if el.get('lat') is not None else el.get('center', {}).get('lat')
        lon = el.get('lon') if el.get('lon') is not None else el.get('center', {}).get('lon')
        
        if lat is None or lon is None:
            continue
            
        tags = el.get('tags', {})
        category = "other"
        
        # Logic to assign category
        if tags.get('leisure') == 'fitness_centre' or (tags.get('leisure') == 'sports_centre' and tags.get('sport') != 'tennis' and tags.get('sport') != 'swimming'):
            category = "gym"
        elif tags.get('sport') == 'tennis' or (tags.get('leisure') == 'sports_centre' and tags.get('sport') == 'tennis'):
            category = "tennis"
        elif tags.get('amenity') in ['cinema', 'theatre']:
            category = "culture"
        elif tags.get('amenity') == 'library':
            category = "library"
        elif tags.get('leisure') == 'playground':
            category = "playground"
        elif tags.get('amenity') == 'place_of_worship':
            category = "church"
        
        feature = {
            "type": "Feature",
            "id": el.get('id'),
            "geometry": {
                "type": "Point",
                "coordinates": [lon, lat]
            },
            "properties": {
                "name": tags.get('name', 'Sans nom'),
                "category": category,
                "type": tags.get('amenity') or tags.get('leisure') or tags.get('sport'),
                "operator": tags.get('operator'),
                "operator_type": tags.get('operator:type')
            }
        }
        geojson['features'].append(feature)
    
    with open('public/amenities.geojson', 'w') as f:
        json.dump(geojson, f)
    print(f"✅ Successfully fetched {len(geojson['features'])} lifestyle amenities.")

if __name__ == "__main__":
    fetch_osm_amenities()
