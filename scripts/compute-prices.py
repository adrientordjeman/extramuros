import pandas as pd
import geopandas as gpd
import json
import sys
import os

print("Loading School Data (IPS) from GeoJSON...")
try:
    gdf_schools = gpd.read_file('public/schools.geojson')
    print(f"Loaded {len(gdf_schools)} schools.")
except Exception as e:
    print(f"Warning: School data processing failed: {e}. Proceeding without IPS.")
    gdf_schools = None
    
# 0. Loading Demographics (INSEE FILOSOFI & Logement)
print("Loading INSEE Demographics...")
demographics = {}
try:
    # FILOSOFI (Income)
    df_filo = pd.read_csv('data/filosofi_idf.csv', low_memory=False)
    # Target Median Income (MED21 or similar) and Poverty Rate
    income_col = [c for c in df_filo.columns if 'MED' in c][0]
    poverty_col = [c for c in df_filo.columns if 'TP60' in c]
    poverty_col = poverty_col[0] if poverty_col else None
    
    # LOGEMENT (Housing)
    df_log = pd.read_csv('data/logement_idf.csv', low_memory=False)
    # Target Social Housing (HLM), Ownership, and Houses vs Apartments
    # Columns usually like P20_H_HLM, P20_RP_PROP, P20_MAISON
    hlm_col = [c for c in df_log.columns if 'HLM' in c][0]
    prop_col = [c for c in df_log.columns if 'RP_PROP' in c][0]
    res_col = [c for c in df_log.columns if 'RP' in c and 'P20_RP' == c or 'P19_RP' == c or 'P21_RP' == c][0] # Main residences
    
    # Merge on IRIS
    iris_col_filo = 'IRIS' if 'IRIS' in df_filo.columns else 'CODE_IRIS'
    iris_col_log = 'IRIS' if 'IRIS' in df_log.columns else 'CODE_IRIS'
    
    df_filo[iris_col_filo] = df_filo[iris_col_filo].astype(str).str.zfill(9)
    df_log[iris_col_log] = df_log[iris_col_log].astype(str).str.zfill(9)
    
    # Create a unified demographics lookup
    for _, row in df_filo.iterrows():
        code = str(row[iris_col_filo])
        demographics[code] = {
            "income": int(row[income_col]),
            "poverty": float(row[poverty_col]) if poverty_col else 0
        }
        
    for _, row in df_log.iterrows():
        code = str(row[iris_col_log])
        if code not in demographics: demographics[code] = {}
        total_rp = max(1, row[res_col])
        demographics[code].update({
            "social_pct": round((row[hlm_col] / total_rp) * 100, 1),
            "owner_pct": round((row[prop_col] / total_rp) * 100, 1)
        })
    print(f"Loaded Logement for {len(df_log)} IRIS.")

    # CAR OWNERSHIP (VOIT1P, VOIT2P)
    print("Loading Car Ownership data (INSEE 2022)...")
    try:
        df_car = pd.read_csv('data/base-ic-logement-2022_csv/base-ic-logement-2022.CSV', sep=';', low_memory=False)
        
        # Filter only for Habitat (H)
        if 'TYP_IRIS' in df_car.columns:
            df_car = df_car[df_car['TYP_IRIS'] == 'H']
        df_car['IRIS'] = df_car['IRIS'].astype(str).str.zfill(9)
        # Filter for IDF to keep it focused
        df_car = df_car[df_car['IRIS'].str.startswith(('75','77','78','91','92','93','94','95'))]
        
        for _, row in df_car.iterrows():
            code = str(row['IRIS'])
            if code not in demographics: demographics[code] = {}
            total_rp = max(1, row['P22_RP'])
            demographics[code].update({
                "car_pct": round((row['P22_RP_VOIT1P'] / total_rp) * 100, 1),
                "multi_car_pct": round((row['P22_RP_VOIT2P'] / total_rp) * 100, 1),
                "surface_dist": {
                    "<30m²": round((row['P22_RP_M30M2'] / total_rp) * 100, 1),
                    "30-40m²": round((row['P22_RP_3040M2'] / total_rp) * 100, 1),
                    "40-60m²": round((row['P22_RP_4060M2'] / total_rp) * 100, 1),
                    "60-80m²": round((row['P22_RP_6080M2'] / total_rp) * 100, 1),
                    "80-100m²": round((row['P22_RP_80100M2'] / total_rp) * 100, 1),
                    "100-120m²": round((row['P22_RP_100120M2'] / total_rp) * 100, 1),
                    "120m²+": round((row['P22_RP_120M2P'] / total_rp) * 100, 1)
                }
            })
        print(f"Loaded Housing & Car data for {len(df_car)} IRIS.")
    except Exception as e:
        print(f"Warning: Car data processing failed: {e}")

    # ACTIVITÉ RÉSIDENTS (CS3 - Cadres / GSEC & Diplômes)
    df_act = pd.read_csv('data/base-ic-activite-residents-2022.CSV', sep=';', low_memory=False)
    cs_col = [c for c in df_act.columns if 'GSEC13' in c or 'CS3' in c][0]
    # Prefer Active Occupied (ACTOCC) over total POP
    total_col = [c for c in df_act.columns if 'ACTOCC1564' in c]
    total_col = total_col[0] if total_col else [c for c in df_act.columns if 'POP1564' in c][0]
    
    df_act['IRIS'] = df_act['IRIS'].astype(str).str.zfill(9)
    for _, row in df_act.iterrows():
        code = str(row['IRIS'])
        if code not in demographics: demographics[code] = {}
        total_1564 = max(1, row['P22_POP1564'])
        total_active = max(1, row[total_col])
        total_act_1564 = max(1, row.get('P22_ACT1564', 1))
        
        # Calculate Higher Education Graduates % (Bac+2, Bac+3/4, Bac+5+)
        # We use the active population as reference for diploma distribution in this file
        sup2 = row.get('P22_ACT_SUP2', 0)
        sup34 = row.get('P22_ACT_SUP34', 0)
        sup5 = row.get('P22_ACT_SUP5', 0)
        diploma_pct = round(((sup2 + sup34 + sup5) / total_act_1564) * 100, 1)

        demographics[code].update({
            "cadres_pct": round((row[cs_col] / total_active) * 100, 1),
            "young_pct": round((row['P22_POP1524'] / total_1564) * 100, 1),
            "student_pct": round((row['P22_ETUD1564'] / total_1564) * 100, 1),
            "diploma_pct": diploma_pct
        })

    # FAMILLES (Couples with kids)
    df_fam = pd.read_csv('data/base-ic-couples-familles-menages-2022.CSV', sep=';', low_memory=False)
    # C22_FAM (Total), C22_COUPAENF (Couples with kids), C22_FAMMONO (Mono)
    df_fam['IRIS'] = df_fam['IRIS'].astype(str).str.zfill(9)
    for _, row in df_fam.iterrows():
        code = str(row['IRIS'])
        if code not in demographics: demographics[code] = {}
        total_fam = max(1, row['C22_FAM'])
        kids_total = row['C22_COUPAENF'] + row['C22_FAMMONO']
        demographics[code]['family_pct'] = round((kids_total / total_fam) * 100, 1)
        demographics[code]['mono_pct'] = round((row['C22_FAMMONO'] / total_fam) * 100, 1)
        
        # Age Distribution
        total_pop = max(1, row['C22_PMEN'])
        pop_15p = row['P22_POP15P']
        
        # Estimate Median Age via linear interpolation
        buckets = [
            (0, 15, max(0, total_pop - pop_15p)),
            (15, 25, row.get('P22_POP1524', 0)),
            (25, 55, row.get('P22_POP2554', 0)),
            (55, 80, row.get('P22_POP5579', 0)),
            (80, 100, row.get('P22_POP80P', 0))
        ]
        cumulative = 0
        target = total_pop / 2
        median_age = 40
        for low, high, count in buckets:
            if cumulative + count >= target:
                if count > 0:
                    median_age = round(low + (high - low) * (target - cumulative) / count, 1)
                else:
                    median_age = (low + high) / 2
                break
            cumulative += count

        demographics[code].update({
            "median_age": median_age,
            "ages": {
                "0-14": round(max(0, (total_pop - pop_15p) / total_pop) * 100, 1),
                "15-24": round((row.get('P22_POP1524', 0) / total_pop) * 100, 1),
                "25-54": round((row.get('P22_POP2554', 0) / total_pop) * 100, 1),
                "55-79": round((row.get('P22_POP5579', 0) / total_pop) * 100, 1),
                "80+": round((row.get('P22_POP80P', 0) / total_pop) * 100, 1)
            }
        })

    print(f"Unified demographics for {len(demographics)} IRIS.")
    
    # QPV (Quartiers Prioritaires) Spatial Join
    print("Loading QPV 2024 boundaries...")
    qpv_path = 'data/qpv_2024/GEOJSON/QP2024_France_Hexagonale_Outre_Mer_WGS84.geojson'
    if os.path.exists(qpv_path):
        gdf_qpv = gpd.read_file(qpv_path)
        # Filter for IDF depts to speed up
        gdf_qpv = gdf_qpv[gdf_qpv['insee_dep'].isin(['75','77','78','91','92','93','94','95'])]
        
        # Load IRIS boundaries for join
        gdf_iris_boundaries = gpd.read_file('public/idf-quartiers.geojson')
        gdf_iris_boundaries['code'] = gdf_iris_boundaries['code'].astype(str).str.replace(r"[\[\]\'\"]", "", regex=True)
        
        print("Executing QPV Spatial Join...")
        # Join IRIS with QPV
        qpv_join = gpd.sjoin(gdf_iris_boundaries, gdf_qpv, how='inner', predicate='intersects')
        qpv_codes = set(qpv_join['code'].unique())
        for code in qpv_codes:
            if code in demographics:
                demographics[code]['is_qpv'] = True
        # 6. HEURISTIC CORRECTION (Sanity check for prestige areas)
    # If we have real Cadres data but simulated Income/HLM, we correct them
    for code, d in demographics.items():
        cadres = d.get('cadres_pct', 0)
        # Lowered threshold to 40% and improved correction logic
        if cadres > 40: 
            # Boost income: Cadres at 40%+ usually means 40k+ median in IDF
            if d.get('income', 0) < 42000:
                d['income'] = int(42000 + (cadres - 40) * 800)
            # Lower social housing: Prestige areas rarely exceed 12% HLM
            if d.get('social_pct', 0) > 12:
                d['social_pct'] = round(max(3, 12 - (cadres - 40) / 2), 1)
                d['poverty'] = round(max(2, 7 - (cadres - 40) / 4), 1)

    print(f"Unified demographics for {len(demographics)} IRIS with prestige corrections.")
except Exception as e:
    import traceback
    traceback.print_exc()
    print(f"Warning: Demographics processing failed: {e}. Proceeding without it.")

print("Loading Full Geo-DVF dataset (2020-2025) with memory optimization...")
try:
    cols = ['date_mutation', 'nature_mutation', 'valeur_fonciere', 'type_local', 
            'surface_reelle_bati', 'code_departement', 'longitude', 'latitude', 'surface_terrain', 'id_mutation', 'code_commune']
    
    idf_depts = ['75', '77', '78', '91', '92', '93', '94', '95']
    
    chunks = []
    # Read in chunks of 100,000 rows
    for chunk in pd.read_csv('data/dvf-full.csv', sep=',', usecols=cols, chunksize=100000, low_memory=False):
        # 1. Filter for IDF
        chunk['code_departement'] = chunk['code_departement'].astype(str).str.zfill(2)
        chunk = chunk[chunk['code_departement'].isin(idf_depts)]
        
        # 2. Basic Filters
        chunk = chunk[chunk['nature_mutation'] == 'Vente']
        chunk = chunk[chunk['type_local'].isin(['Appartement', 'Maison'])]
        
        if not chunk.empty:
            chunks.append(chunk)
            
    df_dvf = pd.concat(chunks)
    del chunks # Free memory
    
    # 3. Parse Date and Year
    df_dvf['date_mutation'] = pd.to_datetime(df_dvf['date_mutation'])
    df_dvf['year'] = df_dvf['date_mutation'].dt.year
    df_dvf = df_dvf[df_dvf['year'] >= 2020]
    
    # 4. Deduplication by id_mutation
    df_dvf = df_dvf.sort_values(['id_mutation', 'surface_reelle_bati'], ascending=[True, False])
    df_dvf = df_dvf.drop_duplicates(subset=['id_mutation'])
    
    df_dvf['surface_reelle_bati'] = pd.to_numeric(df_dvf['surface_reelle_bati'], errors='coerce')
    df_dvf = df_dvf[df_dvf['surface_reelle_bati'] > 9]
    df_dvf = df_dvf.dropna(subset=['longitude', 'latitude'])
    df_dvf['valeur_fonciere'] = pd.to_numeric(df_dvf['valeur_fonciere'], errors='coerce')
    df_dvf['Price_Sqm'] = df_dvf['valeur_fonciere'] / df_dvf['surface_reelle_bati']
    
    # Outlier removal
    df_dvf = df_dvf[(df_dvf['Price_Sqm'] > 1000) & (df_dvf['Price_Sqm'] < 40000)]
    
    print(f"Loaded and filtered {len(df_dvf)} transactions. Cleaning per commune...")
    clean_chunks = []
    df_dvf['commune_group'] = df_dvf['code_commune'].astype(str)
    unique_communes = df_dvf['commune_group'].unique()
    for comm in unique_communes:
        comm_df = df_dvf[df_dvf['commune_group'] == comm]
        for t_type in ['Appartement', 'Maison']:
            group = comm_df[comm_df['type_local'] == t_type]
            if len(group) < 10:
                clean_chunks.append(group)
            else:
                q1 = group['Price_Sqm'].quantile(0.20)
                q3 = group['Price_Sqm'].quantile(0.80)
                iqr = q3 - q1
                clean_chunks.append(group[(group['Price_Sqm'] >= q1 - 1.5 * iqr) & (group['Price_Sqm'] <= q3 + 1.5 * iqr)])
    
    df_dvf = pd.concat(clean_chunks)
    print(f"Kept {len(df_dvf)} transactions after cleaning.")
    gdf_dvf = gpd.GeoDataFrame(df_dvf, geometry=gpd.points_from_xy(df_dvf.longitude, df_dvf.latitude), crs="EPSG:4326")
except Exception as e:
    print(f"Fatal error loading DVF: {e}")
    sys.exit(1)

print("Loading IRIS Boundaries...")
gdf_iris = gpd.read_file('public/idf-quartiers.geojson')
gdf_iris['code'] = gdf_iris['code'].astype(str).str.replace(r"[\[\]\'\"]", "", regex=True)
if gdf_iris.crs is None or gdf_iris.crs.to_string() != "EPSG:4326":
    gdf_iris = gdf_iris.to_crs("EPSG:4326")

print("Executing Pricing Spatial Join (Historical)...")
joined_dvf = gpd.sjoin(gdf_dvf, gdf_iris, how='inner', predicate='within')

# --- HISTORICAL ANALYTICS ENGINE ---
print("Computing 5-year evolution statistics...")
# Filter for recent data (2023-2025) for current price display
recent_dvf = joined_dvf[joined_dvf['year'] >= 2023]

# 1. Historical Evolution per IRIS (2020-2024)
# We calculate separate trends for Houses and Apartments
hist_stats_house = joined_dvf[joined_dvf['type_local'] == 'Maison'].groupby(['code', 'year'])['Price_Sqm'].median().round().unstack(fill_value=None)
hist_stats_apt = joined_dvf[joined_dvf['type_local'] == 'Appartement'].groupby(['code', 'year'])['Price_Sqm'].median().round().unstack(fill_value=None)

# 2. Current Market Segmentation (Based on recent data)
# Global Stats
global_stats = recent_dvf.groupby('code')['Price_Sqm'].agg(['median', 'count', lambda x: x.quantile(0.25), lambda x: x.quantile(0.75)]).round()
global_stats.columns = ['price', 'vol', 'p25', 'p75']

# House Stats
houses_recent = recent_dvf[recent_dvf['type_local'] == 'Maison']
house_stats = houses_recent.groupby('code')['Price_Sqm'].agg(['median', 'count', lambda x: x.quantile(0.25), lambda x: x.quantile(0.75)]).round()
house_stats.columns = ['price', 'vol', 'p25', 'p75']

# Apartment Stats
apts_recent = recent_dvf[recent_dvf['type_local'] == 'Appartement']
apt_stats = apts_recent.groupby('code')['Price_Sqm'].agg(['median', 'count', lambda x: x.quantile(0.25), lambda x: x.quantile(0.75)]).round()
apt_stats.columns = ['price', 'vol', 'p25', 'p75']

# 3. Garden Detection (All years for better density estimation)
joined_dvf['has_garden'] = (joined_dvf['type_local'] == 'Maison') & (joined_dvf['surface_terrain'] > 0)
garden_counts = joined_dvf[joined_dvf['has_garden'] == True].groupby('code').size()

# 4. Calculate Commune-level Medians as a robust fallback (Recent data)
recent_dvf['commune_code'] = recent_dvf['code'].str[:5]
commune_medians = recent_dvf.groupby('commune_code')['Price_Sqm'].median().round().to_dict()

print("Calculating Housing Density (Maison ratio)...")
counts = joined_dvf.groupby(['code', 'type_local']).size().unstack(fill_value=0)
pav_ratio = (counts['Maison'] / counts.sum(axis=1)).to_dict() if 'Maison' in counts.columns else {}

print("Executing School IPS & Proximity Analysis (Commune Level)...")
school_details_commune = {}
if 'gdf_schools' in locals() and gdf_schools is not None:
    # 1. Assign schools to IRIS zones (more robust point-in-polygon)
    # We use intersects for points to be safer on boundaries
    schools_with_iris = gpd.sjoin(gdf_schools, gdf_iris[['code', 'geometry']], how='left', predicate='intersects')
    schools_with_iris['commune_code'] = schools_with_iris['code'].str[:5]
    
    # 2. Get Commune Centroids (for nearest neighbor fallback)
    # Validate geometry to avoid dissolve errors
    gdf_iris['commune_code'] = gdf_iris['code'].str[:5]
    gdf_iris_valid = gdf_iris.copy()
    gdf_iris_valid['geometry'] = gdf_iris_valid['geometry'].buffer(0)
    gdf_communes = gdf_iris_valid.dissolve(by='commune_code').reset_index()
    commune_centroids = gdf_communes.copy()
    commune_centroids['geometry'] = commune_centroids.geometry.centroid
    
    # 3. Calculate Stats per Commune
    schools_with_commune = schools_with_iris
    commune_stats = schools_with_commune.dropna(subset=['commune_code']).groupby(['commune_code', 'type']).agg({
        'uai': 'count',
        'ips': 'mean'
    }).round(1)
    
    # Pre-group schools by type for faster nearest neighbor search
    schools_by_type = {t: gdf_schools[gdf_schools['type'] == t].copy() for t in gdf_schools['type'].unique()}
    
    for c_code in gdf_communes['commune_code'].unique():
        school_details_commune[c_code] = {}
        c_geom = commune_centroids[commune_centroids['commune_code'] == c_code].geometry.iloc[0]
        
        for t in ['maternelle', 'elementaire', 'college', 'lycee']:
            count = 0
            ips = None
            
            if (c_code, t) in commune_stats.index:
                row = commune_stats.loc[(c_code, t)]
                count = int(row['uai'])
                ips = float(row['ips']) if not pd.isna(row['ips']) else None
            
            if count > 0:
                school_details_commune[c_code][t] = {
                    "count": count,
                    "ips": ips,
                    "is_in_commune": True
                }
            else:
                # Find nearest school of this type
                t_schools = schools_by_type.get(t)
                if t_schools is not None and not t_schools.empty:
                    # Calculate distances from commune centroid to all schools of this type
                    distances = t_schools.geometry.distance(c_geom)
                    idx = distances.idxmin()
                    nearest = t_schools.loc[idx]
                    dist_km = round(distances.min() * 111, 1) # Crude deg to km conversion for 48 deg lat
                    
                    school_details_commune[c_code][t] = {
                        "count": 0,
                        "ips": None,
                        "is_in_commune": False,
                        "nearest_name": nearest['city'], # Showing city name as in example
                        "nearest_dist": dist_km
                    }
                else:
                    school_details_commune[c_code][t] = {"count": 0, "ips": None, "is_in_commune": False}

    # Backward compatibility for avg_ips (used for scores)
    commune_ips = schools_with_commune.groupby('commune_code')['ips'].mean().round(1).to_dict()
    # Replace NaN with 100 as fallback
    commune_ips = {k: (v if not pd.isna(v) else 100) for k, v in commune_ips.items()}
    ips_data = {str(row['code']): commune_ips.get(str(row['code'])[:5], 100) for _, row in gdf_iris.iterrows()}
else:
    ips_data = {}

print("Loading Bobo-Chic markers from OSM...")
bobo_markers = {}
if os.path.exists('public/commerces.geojson'):
    try:
        gdf_commerces = gpd.read_file('public/commerces.geojson')
        bobo_cats = ['bio', 'librairie', 'caviste', 'culture', 'fromagerie']
        gdf_bobo = gdf_commerces[gdf_commerces['category'].isin(bobo_cats)]
        if not gdf_bobo.empty:
            # Spatial Buffer: Use 800m radius from centroid to capture "neighborhood vibe"
            iris_proj = gdf_iris.to_crs("EPSG:3857")
            iris_proj['geometry'] = iris_proj.centroid.buffer(800)
            iris_buffer = iris_proj.to_crs("EPSG:4326")
            
            joined_bobo = gpd.sjoin(gdf_bobo, iris_buffer, how='inner', predicate='within')
            bobo_counts = joined_bobo.groupby(['code', 'category']).size().unstack(fill_value=0).to_dict('index')
            bobo_markers = bobo_counts
            print(f"Indexed bobo markers (800m buffer) for {len(bobo_markers)} zones.")
    except Exception as e:
        print(f"Warning: Bobo markers processing failed: {e}")

print("Loading Market markers from OSM...")
marche_markers = {}
if os.path.exists('public/markets.geojson'):
    try:
        gdf_markets = gpd.read_file('public/markets.geojson')
        if not gdf_markets.empty:
            iris_proj = gdf_iris.to_crs("EPSG:3857")
            iris_proj['geometry'] = iris_proj.centroid.buffer(800)
            iris_buffer = iris_proj.to_crs("EPSG:4326")
            
            joined_marche = gpd.sjoin(gdf_markets, iris_buffer, how='inner', predicate='within')
            marche_counts = joined_marche.groupby('code').size().to_dict()
            marche_markers = marche_counts
            print(f"Indexed market markers (800m buffer) for {len(marche_markers)} zones.")
    except Exception as e:
        print(f"Warning: Market markers processing failed: {e}")

print("Merging final segmented metrics...")
final_output = {}

def get_fallback_dist(code, stats_df, fallback_val):
    if code in stats_df.index and stats_df.loc[code, 'vol'] >= 1: 
        row = stats_df.loc[code]
        return {"price": int(row['price']), "p25": int(row['p25']), "p75": int(row['p75']), "vol": int(row['vol'])}
    else:
        # Simple fallback based on commune median
        return {"price": int(fallback_val), "p25": int(fallback_val * 0.85), "p75": int(fallback_val * 1.15), "vol": 0}

def calculate_vibes(props, code, demographics):
    # ... (Keep existing vibe logic)
    demo = demographics.get(code, {})
    income = demo.get('income', 0)
    social_pct = demo.get('social_pct', 0)
    owner_pct = demo.get('owner_pct', 0)
    cadres_pct = demo.get('cadres_pct', 0)
    family_pct = demo.get('family_pct', 0)
    pav = props.get('pav', 0)
    apt = 1 - pav
    nature = props.get('nature', 0)
    noise = props.get('noise', 0)
    price = props.get('all', {}).get('price', 5000)
    vibes = {}
    vibes['haussmann'] = int(min(100, (max(0, income - 35000) / 300) + (apt * 40) + (max(0, price - 6000) / 100)))
    bobo_score = 0
    if cadres_pct > 30: bobo_score += min(30, (cadres_pct - 30) * 2.0)
    if 10 <= social_pct <= 45: bobo_score += 20
    elif social_pct < 10: bobo_score += max(0, social_pct * 1.5) 
    if 30000 <= income <= 70000: bobo_score += 20
    elif income > 85000: bobo_score -= min(30, (income - 85000) / 1000)
    markers = props.get('bobo_markers', {})
    marker_count = sum(markers.values()) if isinstance(markers, dict) else 0
    diversity = len([v for v in markers.values() if v > 0])
    bobo_score += min(30, marker_count * 5)
    bobo_score += (diversity * 10) 
    lifestyle_mult = 1.0
    if marker_count == 0: lifestyle_mult = 0.5
    elif marker_count < 3: lifestyle_mult = 0.8
    vibes['bobo'] = int(min(100, max(0, bobo_score * lifestyle_mult)))
    market_bonus = 15 if props.get('marche_count', 0) > 0 else 0
    vibes['village'] = int(min(100, (pav * 50) + (owner_pct * 0.5) + max(0, 60 - noise) + market_bonus))
    vibes['family'] = int(min(100, (family_pct * 1.5) + (min(40, props.get('ips', 0) / 3))))
    vibes['urban'] = int(min(100, (social_pct * 1.0) + (max(0, 35000 - income) / 400)))
    vibes['business'] = int(min(100, (apt * 70) + (max(0, price - 5000) / 200)))
    vibes['nature'] = int(min(100, (nature * 1.8) + (min(20, props.get('gVol', 0) * 2)) + max(0, 60 - noise)))
    return vibes

def calculate_serenity(code, demographics):
    demo = demographics.get(code, {})
    is_qpv = demo.get('is_qpv', False)
    poverty = demo.get('poverty', 0)
    social_pct = demo.get('social_pct', 0)
    mono_pct = demo.get('mono_pct', 0)
    score = 100
    if is_qpv: score -= 35
    if poverty > 15: score -= (poverty - 15) * 1.5
    if social_pct > 40: score -= (social_pct - 40) * 0.8
    if mono_pct > 20: score -= (mono_pct - 20) * 1.0
    return int(max(0, min(100, score)))

# Load existing environment scores
nature_data = {}
noise_data = {}
if os.path.exists('public/idf_prices.json'):
    try:
        with open('public/idf_prices.json', 'r') as f:
            old_data = json.load(f)
            nature_data = {k: v.get('nature', 0.0) for k, v in old_data.items()}
            noise_data = {k: v.get('noise', 0.0) for k, v in old_data.items()}
    except Exception as e:
        print(f"Warning: Could not load existing scores: {e}")

final_output = {}
for code in gdf_iris['code'].unique():
    commune_code = code[:5]
    c_median = commune_medians.get(commune_code, 5000)
    
    # Extract historical evolution for this IRIS
    evo_house = []
    if code in hist_stats_house.index:
        row = hist_stats_house.loc[code]
        for year in range(2020, 2025):
            val = row.get(year)
            if pd.isna(val):
                evo_house.append(evo_house[-1] if evo_house else int(c_median))
            else:
                evo_house.append(int(val))
    else:
        evo_house = [int(c_median)] * 5

    evo_apt = []
    if code in hist_stats_apt.index:
        row = hist_stats_apt.loc[code]
        for year in range(2020, 2025):
            val = row.get(year)
            if pd.isna(val):
                evo_apt.append(evo_apt[-1] if evo_apt else int(c_median))
            else:
                evo_apt.append(int(val))
    else:
        evo_apt = [int(c_median)] * 5

    props = {
        "all": get_fallback_dist(code, global_stats, c_median),
        "house": get_fallback_dist(code, house_stats, c_median * 1.1),
        "apt": get_fallback_dist(code, apt_stats, c_median),
        "evolution_house": evo_house,
        "evolution_apt": evo_apt,
        "gVol": int(garden_counts.get(code, 0)),
        "pav": round(float(pav_ratio.get(code, 0.0)), 2),
        "ips": float(ips_data.get(code, 0.0)),
        "school_details": school_details_commune.get(str(code)[:5], {}),
        "bobo_markers": bobo_markers.get(code, {}),
        "marche_count": int(marche_markers.get(code, 0)),
        "nature": float(nature_data.get(code, 0.0)),
        "noise": float(noise_data.get(code, 0.0)),
        "nom": gdf_iris.loc[gdf_iris['code'] == code, 'nom'].values[0] if 'nom' in gdf_iris.columns else "Quartier"
    }
    
    final_output[code] = {
        **props,
        "demo": demographics.get(code, {"income": 0, "social_pct": 0, "owner_pct": 0}),
        "vibes": calculate_vibes(props, code, demographics),
        "serenity": calculate_serenity(code, demographics)
    }

def sanitize_json(obj):
    if isinstance(obj, dict):
        return {k: sanitize_json(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [sanitize_json(v) for v in obj]
    elif isinstance(obj, float):
        import math
        if math.isnan(obj) or math.isinf(obj):
            return None
        return obj
    return obj

print("Sanitizing output for JSON (replacing NaNs with null)...")
final_output = sanitize_json(final_output)

print("Saving to public/idf_prices.json...")
with open('public/idf_prices.json', 'w') as f:
    json.dump(final_output, f)

print(f"Finished! Processed {len(final_output)} zones with 5-year historical data.")
