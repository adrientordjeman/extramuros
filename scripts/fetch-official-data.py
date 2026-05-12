import requests
import pandas as pd
import json
import os
import zipfile
import io
import ssl

# Workaround for SSL certificate verification on some macOS/Python setups
ssl._create_default_https_context = ssl._create_unverified_context

def fetch_official_data():
    print("📥 Indexing official French data (RES, CAF, INSEE)...")
    idf_prefixes = ('75', '77', '78', '91', '92', '93', '94', '95')
    
    # 1. RES Pools
    res_equip_url = "https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es-equipement/exports/csv"
    res_inst_url = "https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es-installation/exports/csv"
    
    pools_idf = pd.DataFrame()
    print("🏊 Fetching RES Sports Equipment...")
    try:
        df_equip = pd.read_csv(res_equip_url, sep=';', low_memory=False, encoding='utf-8-sig')
        # Filter for pools using 'type' column
        pools = df_equip[df_equip['type'].str.contains('Bassin|Piscine|Bassins', case=False, na=False)].copy()
        
        print("📍 Fetching RES Installations for coordinates...")
        df_inst = pd.read_csv(res_inst_url, sep=';', low_memory=False, encoding='utf-8-sig')
        
        # Merge using 'installation_numero' from equip and 'numero' from inst
        pools_merged = pd.merge(pools, df_inst[['numero', 'nom', 'cp', 'coordonnees', 'insee']], 
                               left_on='installation_numero', right_on='numero', how='left', suffixes=('_equip', '_inst'))
        
        def split_coords(c):
            if pd.isna(c): return None, None
            try:
                parts = str(c).split(',')
                return float(parts[1].strip()), float(parts[0].strip()) # Lon, Lat (API gives Lat, Lon)
            except: return None, None

        pools_merged[['lon', 'lat']] = pools_merged['coordonnees'].apply(lambda x: pd.Series(split_coords(x)))
        pools_merged['insee_clean'] = pools_merged['insee'].astype(str).str.zfill(5)
        pools_idf = pools_merged[pools_merged['insee_clean'].str.startswith(idf_prefixes)]
        print(f"✅ Found {len(pools_idf)} IDF pools.")
    except Exception as e:
        print(f"❌ Failed to process RES data: {e}")

    # 2. CAF EAJE (Crèches)
    print("👶 Fetching CAF EAJE data (Childcare)...")
    # Historic capacity data handle communes well
    caf_slugs = [
        "nbpla_pe_com_hist",
        "donnees-sur-les-structures-de-la-petite-enfance-eaje"
    ]
    
    df_caf = None
    applied_slug = None
    for slug in caf_slugs:
        url = f"https://data.caf.fr/api/explore/v2.1/catalog/datasets/{slug}/exports/csv?use_labels=true&delimiter=%3B"
        print(f"  Trying CAF slug: {slug}...")
        try:
            df_caf = pd.read_csv(url, sep=';', low_memory=False, encoding='utf-8-sig')
            if not df_caf.empty:
                print(f"  ✅ Found CAF data with slug: {slug}")
                applied_slug = slug
                break
        except:
            continue
            
    commune_capacity = {}
    caf_idf = pd.DataFrame()
    if df_caf is not None:
        try:
            if applied_slug == "nbpla_pe_com_hist":
                insee_col = "Numéro commune"
                capacity_col = "Places offertes - Ensemble"
                year_col = "Date référence"
            else:
                insee_col = [c for c in df_caf.columns if 'Insee' in c or 'INSEE' in c][0]
                capacity_col = [c for c in df_caf.columns if 'apacit' in c or 'offre' in c][0]
                year_col = None
            
            df_caf[insee_col] = df_caf[insee_col].astype(str).str.zfill(5)
            caf_idf = df_caf[df_caf[insee_col].str.startswith(idf_prefixes)].copy()
            
            if year_col and year_col in caf_idf.columns:
                max_year = caf_idf[year_col].max()
                caf_idf = caf_idf[caf_idf[year_col] == max_year]
            
            commune_capacity = caf_idf.groupby(insee_col)[capacity_col].sum().to_dict()
            print(f"✅ Aggregated capacity for {len(commune_capacity)} IDF communes.")
        except Exception as e:
            print(f"❌ Failed to parse CAF data columns: {e}")
    else:
        print("❌ All CAF slugs failed. Skipping crèche markers/scores.")

    # 3. INSEE Population (< 3 years old)
    print("📊 Fetching INSEE Population stats...")
    insee_url = "https://www.insee.fr/fr/statistiques/fichier/1893153/base-cc-serie-historique-2020.zip"
    commune_scores = {}
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        r = requests.get(insee_url, headers=headers, verify=False)
        if r.status_code == 200:
            z = zipfile.ZipFile(io.BytesIO(r.content))
            csv_name = [name for name in z.namelist() if name.endswith('.csv') and 'base-cc-serie-historique' in name][0]
            df_pop = pd.read_csv(z.open(csv_name), sep=';', low_memory=False)
            
            df_pop['CODGEO'] = df_pop['CODGEO'].astype(str).str.zfill(5)
            pop_idf = df_pop[df_pop['CODGEO'].str.startswith(idf_prefixes)]
            
            for insee_code, capacity in commune_capacity.items():
                pop_row = pop_idf[pop_idf['CODGEO'] == insee_code]
                if not pop_row.empty:
                    pop_02 = pop_row.iloc[0]['P20_POP0002']
                    if pop_02 > 0:
                        score = (capacity / pop_02) * 100
                        commune_scores[insee_code] = round(min(score, 100), 1)
                    else:
                        commune_scores[insee_code] = 0
            print(f"✅ Calculated daycare scores for {len(commune_scores)} communes.")
    except Exception as e:
        print(f"❌ Failed to process INSEE data: {e}")

    # Generate official_amenities.geojson
    features = []
    
    # Add Pools
    if not pools_idf.empty:
        for _, row in pools_idf.iterrows():
            if pd.isna(row['lon']) or pd.isna(row['lat']): continue
            features.append({
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [float(row['lon']), float(row['lat'])]},
                "properties": {
                    "name": row['nom_inst'],
                    "category": "pool",
                    "type": row['type'],
                    "detail": row['nom_equip']
                }
            })
        
    # Add Crèches (only if we have points)
    if not caf_idf.empty and applied_slug != "nbpla_pe_com_hist":
        try:
            lat_col = [c for c in df_caf.columns if 'atitude' in c][0]
            lon_col = [c for c in df_caf.columns if 'ongitude' in c][0]
            name_col = [c for c in df_caf.columns if 'om' in c][0]
            type_col = [c for c in df_caf.columns if 'Type' in c or 'type' in c][0]

            for _, row in caf_idf.iterrows():
                if pd.isna(row[lon_col]) or pd.isna(row[lat_col]): continue
                features.append({
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [float(row[lon_col]), float(row[lat_col])]},
                    "properties": {
                        "name": row[name_col],
                        "category": "creche",
                        "type": row[type_col]
                    }
                })
        except: pass
        
    geojson = {"type": "FeatureCollection", "features": features}
    with open('public/official_amenities.geojson', 'w') as f:
        json.dump(geojson, f)
        
    with open('public/commune_scores.json', 'w') as f:
        json.dump(commune_scores, f)
        
    print(f"✨ Official data ready! {len(features)} official amenities found.")

if __name__ == "__main__":
    fetch_official_data()
