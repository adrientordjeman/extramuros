import zipfile
import csv
import json
import io
import os

zip_path = 'scratch/bpe_points.zip'
csv_filename = 'BPE24.csv'

pediatres = []
by_iris = {}

# Ile-de-France departments
idf_deps = {'75', '77', '78', '91', '92', '93', '94', '95'}

print("Starting extraction from BPE24.zip...")

if not os.path.exists(zip_path):
    print(f"Error: {zip_path} not found.")
    exit(1)

count = 0
try:
    with zipfile.ZipFile(zip_path) as z:
        with z.open(csv_filename) as f:
            # Wrap in TextIOWrapper to read as string
            # BPE files from INSEE are often latin-1 or utf-8. Trying utf-8 first.
            wrapper = io.TextIOWrapper(f, encoding='utf-8', errors='replace')
            reader = csv.DictReader(wrapper, delimiter=';')
            for row in reader:
                count += 1
                if count % 100000 == 0:
                    print(f"Processed {count} rows...")
                
                # Strip quotes from everything
                row = {k: (v.strip('"') if v else v) for k, v in row.items()}
                
                # TYPEQU D272 = Spécialiste en pédiatrie (BPE 2024)
                if row.get('TYPEQU') == 'D272' and row.get('DEP') in idf_deps:
                    try:
                        lon_str = row.get('LONGITUDE', '').replace(',', '.')
                        lat_str = row.get('LATITUDE', '').replace(',', '.')
                        
                        if not lon_str or not lat_str:
                            continue
                            
                        lon = float(lon_str)
                        lat = float(lat_str)
                        iris = row.get('DCIRIS', '')
                        
                        # Clean name
                        name = row.get('NOMRS', 'Pédiatre').strip()
                        
                        pediatre = {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [lon, lat]
                            },
                            "properties": {
                                "name": name,
                                "address": f"{row.get('NUMVOIE', '')} {row.get('LIBVOIE', '')}, {row.get('LIBCOM', '')}".strip(),
                                "iris": iris
                            }
                        }
                        pediatres.append(pediatre)
                        
                        # Aggregation by IRIS
                        if iris:
                            by_iris[iris] = by_iris.get(iris, 0) + 1
                    except (ValueError, TypeError):
                        continue
except Exception as e:
    print(f"An error occurred: {e}")
    exit(1)

# Save as GeoJSON
geojson = {
    "type": "FeatureCollection",
    "features": pediatres
}

os.makedirs('public', exist_ok=True)

with open('public/pediatres.geojson', 'w', encoding='utf-8') as f:
    json.dump(geojson, f, ensure_ascii=False, indent=2)

with open('public/pediatres_by_iris.json', 'w', encoding='utf-8') as f:
    json.dump(by_iris, f, ensure_ascii=False, indent=2)

print(f"Successfully extracted {len(pediatres)} pediatricians across {len(by_iris)} IRIS.")
print(f"Total rows scanned: {count}")
