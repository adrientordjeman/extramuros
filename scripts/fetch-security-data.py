import os
import json
import ssl
import py7zr
import geopandas as gpd
import pandas as pd
import urllib.request
import tempfile
import zipfile
import io
import math

ssl._create_default_https_context = ssl._create_unverified_context

def fetch_security_data():
    print("🚓 Fetching security data...")
    public_dir = "/Users/adrientordjeman/Documents/quartier_ideal/public"
    os.makedirs(public_dir, exist_ok=True)
    
    # 1. Delinquency Data
    print("📊 Downloading and processing delinquency dataset...")
    url_delinquency = "https://static.data.gouv.fr/resources/bases-statistiques-communale-departementale-et-regionale-de-la-delinquance-enregistree-par-la-police-et-la-gendarmerie-nationales/20260326-124144/donnee-data.gouv-2025-geographie2025-produit-le2026-02-03.csv.gz"
    
    # Read the data, specifying usecols to save memory
    df = pd.read_csv(url_delinquency, sep=';', compression='gzip', 
                     usecols=['CODGEO_2025', 'annee', 'indicateur', 'nombre', 'insee_pop'])
                     
    # Filter for IDF regions: '75', '77', '78', '91', '92', '93', '94', '95'
    df['CODGEO_2025'] = df['CODGEO_2025'].astype(str).str.zfill(5)
    idf_prefixes = ('75', '77', '78', '91', '92', '93', '94', '95')
    df = df[df['CODGEO_2025'].str.startswith(idf_prefixes)]
    
    # Use most recent year available
    max_year = df['annee'].max()
    df = df[df['annee'] == max_year]
    
    # Categories mapping
    categories = {
        'burglaries': ['Cambriolages de logement'],
        'assaults': [
            'Violences physiques hors cadre familial',
            'Violences sexuelles'
        ],
        'thefts': [
            'Vols avec armes',
            'Vols violents sans arme',
            'Vols sans violence contre des personnes',
            'Vols de véhicule',
            'Vols dans les véhicules',
            "Vols d'accessoires sur véhicules"
        ]
    }
    
    # We will build a per-commune dictionary: { insee: { population: x, burglaries: y, assaults: z, thefts: w } }
    commune_safety = {}
    
    for _, row in df.iterrows():
        insee = row['CODGEO_2025']
        ind = row['indicateur']
        val = row['nombre']
        pop = row['insee_pop']
        
        # In case some rows have 'nd' (non disponible), skip them
        try:
            val = float(str(val).replace(',', '.'))
            if math.isnan(val): val = 0
        except:
            val = 0
            
        try:
            pop = float(str(pop).replace(',', '.'))
            if math.isnan(pop): pop = 0
        except:
            pop = 0
            
        if insee not in commune_safety:
            commune_safety[insee] = {'population': pop, 'burglaries': 0, 'assaults': 0, 'thefts': 0}
            
        if ind in categories['burglaries']:
            commune_safety[insee]['burglaries'] += val
        elif ind in categories['assaults']:
            commune_safety[insee]['assaults'] += val
        elif ind in categories['thefts']:
            commune_safety[insee]['thefts'] += val
            
    # Normalize per 1000 inhabitants
    for insee, metrics in commune_safety.items():
        pop = metrics['population']
        if pop > 0:
            metrics['burglaries_rate'] = round((metrics['burglaries'] / pop) * 1000, 2)
            metrics['assaults_rate'] = round((metrics['assaults'] / pop) * 1000, 2)
            metrics['thefts_rate'] = round((metrics['thefts'] / pop) * 1000, 2)
        else:
            metrics['burglaries_rate'] = 0
            metrics['assaults_rate'] = 0
            metrics['thefts_rate'] = 0

    with open(os.path.join(public_dir, 'commune_safety.json'), 'w') as f:
        json.dump(commune_safety, f)
        
    print(f"✅ Processed delinquency data for {len(commune_safety)} communes.")

    # 2. ZSP Data
    print("🗺️ Fetching ZSP boundaries...")
    zsp_url = "https://static.data.gouv.fr/resources/decoupage-des-zones-de-securite-prioritaires-zsp-1/20190206-100821/zsp-2018.7z"
    
    with tempfile.TemporaryDirectory() as tmpdir:
        archive_path = os.path.join(tmpdir, "zsp.7z")
        urllib.request.urlretrieve(zsp_url, archive_path)
        
        try:
            with py7zr.SevenZipFile(archive_path, mode='r') as z:
                z.extractall(path=tmpdir)
        except Exception as e:
            print(f"❌ Failed to extract ZSP 7z archive: {e}")
            return
            
        # Find the shapefile
        shp_file = None
        for root, dirs, files in os.walk(tmpdir):
            for file in files:
                if file.endswith('.shp'):
                    shp_file = os.path.join(root, file)
                    break
        
        if shp_file:
            print(f"📍 Found shapefile: {shp_file}, converting to GeoJSON...")
            gdf = gpd.read_file(shp_file)
            
            # Ensure it is WGS84
            if gdf.crs is None or gdf.crs.to_string() != "EPSG:4326":
                gdf = gdf.to_crs("EPSG:4326")
                
            geojson_path = os.path.join(public_dir, 'zsp.geojson')
            gdf.to_file(geojson_path, driver='GeoJSON')
            print(f"✅ ZSP GeoJSON saved to {geojson_path}")
        else:
            print("⚠️ No shapefile found in the extracted ZSP archive.")

if __name__ == "__main__":
    fetch_security_data()
