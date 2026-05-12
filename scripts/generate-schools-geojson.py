import pandas as pd
import json
import os

def generate_schools_geojson():
    input_file = 'data/schools_full.csv'
    output_file = 'public/schools.geojson'
    
    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found.")
        return

    print("Loading school data...")
    # Read CSV with semicolon delimiter (based on head output)
    df = pd.read_csv(input_file, sep=';', low_memory=False)
    
    # --- IPS INTEGRATION ---
    print("Loading IPS datasets...")
    uai_ips_map = {}
    ips_files = [
        ('/tmp/ips-ecoles.csv', 'ips'),
        ('/tmp/ips-colleges-new.csv', 'ips'),
        ('/tmp/ips-lycees.csv', 'ips_etab')
    ]
    for path, col in ips_files:
        if os.path.exists(path):
            try:
                idf_ips = pd.read_csv(path, sep=';', low_memory=False)
                idf_ips[col] = pd.to_numeric(idf_ips[col], errors='coerce')
                idf_ips = idf_ips.dropna(subset=[col])
                for _, row in idf_ips.iterrows():
                    uai_ips_map[str(row['uai'])] = float(row[col])
                print(f"  Loaded IPS data from {path}")
            except Exception as e:
                print(f"  Warning: Failed to load {path}: {e}")

    # Filter for Ile-de-France (Region 11 or Academies Paris/Versailles/Creteil)
    # Based on previous head: libelle_region == 'Ile-de-France'
    print("Filtering for Ile-de-France...")
    df_idf = df[df['libelle_region'] == 'Ile-de-France'].copy()
    
    # Filter for open establishments
    df_idf = df_idf[df_idf['etat_etablissement'] == 1]
    
    # Drop rows without coordinates
    df_idf = df_idf.dropna(subset=['latitude', 'longitude'])
    
    print(f"Found {len(df_idf)} schools in IDF.")
    
    features = []
    for _, row in df_idf.iterrows():
        uai = str(row['numero_uai'])
        # Determine a simple 'type' for icons
        nature = str(row['nature_uai_libe']).upper()
        school_type = 'autre'
        if 'MATERNELLE' in nature: school_type = 'maternelle'
        elif 'ELEMENTAIRE' in nature or 'PRIMAIRE' in nature: school_type = 'elementaire'
        elif 'COLLEGE' in nature or 'GEN. ET PROF. ADAPTE' in nature: school_type = 'college'
        elif 'LYCEE' in nature or 'ENSEIGNEMENT PROFESSIONNEL' in nature or 'ENSEIGT GENERAL ET TECHNOLOGIQUE' in nature: school_type = 'lycee'
        
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [float(row['longitude']), float(row['latitude'])]
            },
            "properties": {
                "uai": uai,
                "name": row['appellation_officielle'],
                "type": school_type,
                "nature": row['nature_uai_libe'],
                "sector": row['secteur_public_prive_libe'],
                "city": row['libelle_commune'],
                "ips": uai_ips_map.get(uai)
            }
        }
        features.append(feature)
        
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(geojson, f, ensure_ascii=False)
    
    print(f"GeoJSON generated: {output_file}")

if __name__ == "__main__":
    generate_schools_geojson()
