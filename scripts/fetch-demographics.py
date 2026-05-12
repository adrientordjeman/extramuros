import requests
import pandas as pd
import zipfile
import io
import os
import ssl

# Workaround for SSL certificate verification on some macOS/Python setups
ssl._create_default_https_context = ssl._create_unverified_context

def fetch_demographics():
    print("📥 Fetching latest INSEE Demographic data (2023 Reference)...")
    data_dir = "/Users/adrientordjeman/Documents/quartier_ideal/data"
    os.makedirs(data_dir, exist_ok=True)
    
    idf_prefixes = ('75', '77', '78', '91', '92', '93', '94', '95')
    
    # 1. FILOSOFI (Income/Poverty)
    # Using the most recent available IRIS level data (targetting 2022/2021)
    filosofi_url = "https://www.insee.fr/fr/statistiques/fichier/6654955/filosofi_iris.zip"
    print(f"💰 Fetching FILOSOFI (Income)...")
    try:
        r = requests.get(filosofi_url, headers={'User-Agent': 'Mozilla/5.0'}, verify=False)
        if r.status_code == 200:
            z = zipfile.ZipFile(io.BytesIO(r.content))
            # Find the main data CSV (usually starts with 'filosofi_iris')
            csv_name = [n for n in z.namelist() if n.endswith('.csv') and 'iris' in n.lower()][0]
            df = pd.read_csv(z.open(csv_name), sep=';', low_memory=False, encoding='utf-8')
            
            # Filter for IDF
            df['IRIS'] = df['IRIS'].astype(str).str.zfill(9)
            df_idf = df[df['IRIS'].str.startswith(idf_prefixes)]
            
            output_path = os.path.join(data_dir, "filosofi_idf.csv")
            df_idf.to_csv(output_path, index=False)
            print(f"✅ Saved FILOSOFI IDF: {len(df_idf)} rows.")
    except Exception as e:
        print(f"❌ FILOSOFI Fetch failed: {e}")

    # 2. LOGEMENT (Housing characteristics)
    # Targetting the "Base Infracommunale Logement 2023" mentioned by the user
    # Trying the pattern for the latest release
    logement_url = "https://www.insee.fr/fr/statistiques/fichier/7637172/base-ic-logement-2023.zip" 
    # Fallback to 2020 if 2023 is not at this exact URL
    
    print(f"🏠 Fetching LOGEMENT (Housing)...")
    try:
        r = requests.get(logement_url, headers={'User-Agent': 'Mozilla/5.0'}, verify=False)
        if r.status_code != 200:
            print("  ⚠️ 2023 URL failed, trying 2020 fallback...")
            logement_url = "https://www.insee.fr/fr/statistiques/fichier/7637172/base-ic-logement-2020.zip"
            r = requests.get(logement_url, headers={'User-Agent': 'Mozilla/5.0'}, verify=False)
            
        if r.status_code == 200:
            z = zipfile.ZipFile(io.BytesIO(r.content))
            csv_name = [n for n in z.namelist() if n.endswith('.csv') and 'iris' in n.lower()][0]
            df = pd.read_csv(z.open(csv_name), sep=';', low_memory=False)
            
            # IRIS column is usually 'IRIS' or 'CODE_IRIS'
            iris_col = 'IRIS' if 'IRIS' in df.columns else 'CODE_IRIS'
            df[iris_col] = df[iris_col].astype(str).str.zfill(9)
            df_idf = df[df[iris_col].str.startswith(idf_prefixes)]
            
            output_path = os.path.join(data_dir, "logement_idf.csv")
            df_idf.to_csv(output_path, index=False)
            print(f"✅ Saved LOGEMENT IDF: {len(df_idf)} rows.")
    except Exception as e:
        print(f"❌ LOGEMENT Fetch failed: {e}")

    # 3. POPULATION 2023 (Reference)
    # The user specifically mentioned this release from Dec 2025
    pop_url = "https://www.insee.fr/fr/statistiques/fichier/8525792/base-ic-evol-struct-pop-2023.zip"
    print(f"📊 Fetching POPULATION 2023...")
    try:
        r = requests.get(pop_url, headers={'User-Agent': 'Mozilla/5.0'}, verify=False)
        if r.status_code == 200:
            z = zipfile.ZipFile(io.BytesIO(r.content))
            csv_name = [n for n in z.namelist() if n.endswith('.csv') and 'iris' in n.lower()][0]
            df = pd.read_csv(z.open(csv_name), sep=';', low_memory=False)
            
            iris_col = 'IRIS' if 'IRIS' in df.columns else 'CODE_IRIS'
            df[iris_col] = df[iris_col].astype(str).str.zfill(9)
            df_idf = df[df[iris_col].str.startswith(idf_prefixes)]
            
            output_path = os.path.join(data_dir, "population_2023_idf.csv")
            df_idf.to_csv(output_path, index=False)
            print(f"✅ Saved POPULATION 2023 IDF: {len(df_idf)} rows.")
    except Exception as e:
        print(f"❌ POPULATION Fetch failed: {e}")

if __name__ == "__main__":
    fetch_demographics()
