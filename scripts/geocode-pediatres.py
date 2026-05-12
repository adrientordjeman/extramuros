import csv
import json
import requests
import os
from io import StringIO

def geocode_pediatres():
    print("🌍 Geocoding pediatricians and indexing by commune...")
    psv_file = 'scratch/pediatres_idf.psv'
    output_geojson = 'public/pediatres.geojson'
    output_index = 'public/pediatres_by_commune.json'
    
    if not os.path.exists(psv_file):
        print("❌ Error: psv file not found.")
        return

    csv_data = StringIO()
    writer = csv.writer(csv_data)
    writer.writerow(['id', 'nom', 'prenom', 'structure', 'address', 'postcode', 'city', 'commune_code'])
    
    with open(psv_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='|')
        for i, row in enumerate(reader):
            if len(row) < 38: continue
            nom = row[7]
            prenom = row[8]
            structure = row[24]
            num = row[28] or ""
            type_voie = row[31] or ""
            lib_voie = row[32] or ""
            addr = f"{num} {type_voie} {lib_voie}".strip()
            cp = row[35]
            city = row[37]
            commune_code = row[36] # Column 37 is commune code
            writer.writerow([i, nom, prenom, structure, addr, cp, city, commune_code])

    print("🚀 Sending batch to BAN API...")
    files = {
        'data': ('pediatres.csv', csv_data.getvalue()),
        'columns': (None, 'address'),
        'postcode': (None, 'postcode'),
        'city': (None, 'city')
    }
    
    response = requests.post('https://api-adresse.data.gouv.fr/search/csv/', files=files)
    if response.status_code != 200:
        print(f"❌ Error from BAN API: {response.status_code}")
        return

    print("📦 Processing results...")
    result_reader = csv.DictReader(StringIO(response.text))
    features = []
    by_commune = {}
    
    for row in result_reader:
        if row['latitude'] and row['longitude']:
            feat = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [float(row['longitude']), float(row['latitude'])]
                },
                "properties": {
                    "name": f"Dr {row['prenom']} {row['nom']}",
                    "structure": row['structure'],
                    "address": f"{row['address']}, {row['postcode']} {row['city']}",
                    "category": "health",
                    "type": "pediatre"
                }
            }
            features.append(feat)
            
            # Index by commune code (5 digits)
            cc = row['commune_code']
            if cc not in by_commune: by_commune[cc] = []
            by_commune[cc].append(feat)

    # Save GeoJSON
    with open(output_geojson, 'w', encoding='utf-8') as f:
        json.dump({"type": "FeatureCollection", "features": features}, f, ensure_ascii=False)
        
    # Save index
    with open(output_index, 'w', encoding='utf-8') as f:
        json.dump(by_commune, f, ensure_ascii=False)
        
    print(f"✅ Successfully geocoded {len(features)} pediatricians and indexed by commune.")

if __name__ == "__main__":
    geocode_pediatres()
