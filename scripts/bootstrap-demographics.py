import pandas as pd
import numpy as np
import os

def bootstrap_demographics():
    print("🛠️  Bootstrapping realistic demographic data for IDF...")
    data_dir = "/Users/adrientordjeman/Documents/quartier_ideal/data"
    os.makedirs(data_dir, exist_ok=True)
    
    # Load existing IRIS codes from GeoJSON to be consistent
    import json
    with open('public/idf-quartiers.geojson', 'r') as f:
        gj = json.load(f)
    
    iris_codes = []
    for f in gj['features']:
        code = f['properties']['code']
        if isinstance(code, list): code = code[0]
        iris_codes.append(str(code))
    
    # 1. Generate FILOSOFI (Income)
    # 75: 45k, 92: 50k, 78: 48k, 91: 35k, 94: 35k, 77: 32k, 95: 30k, 93: 22k
    dept_income = {
        '75': 48000, '92': 52000, '78': 46000, '77': 33000, 
        '91': 35000, '94': 36000, '95': 31000, '93': 22000
    }
    
    filo_rows = []
    for code in iris_codes:
        dept = code[:2]
        base = dept_income.get(dept, 30000)
        # Add some randomness and local variation (e.g. west of Paris is richer)
        # For Paris (75), higher income if iris code is lower (central/west)
        variation = np.random.normal(0, base * 0.2)
        income = int(base + variation)
        poverty = max(5, min(50, 60 - (income / 1000))) # Inverse correlation
        
        filo_rows.append({
            'IRIS': code,
            'MED21': income,
            'TP6021': round(poverty, 1)
        })
    
    df_filo = pd.DataFrame(filo_rows)
    df_filo.to_csv(os.path.join(data_dir, "filosofi_idf.csv"), index=False)
    
    # 2. Generate LOGEMENT (Housing)
    dept_hlm = {
        '93': 45, '94': 35, '75': 25, '91': 28, 
        '95': 25, '77': 20, '92': 22, '78': 18
    }
    dept_owner = {
        '77': 65, '78': 60, '91': 58, '95': 55,
        '94': 45, '92': 40, '93': 35, '75': 30
    }
    
    log_rows = []
    for code in iris_codes:
        dept = code[:2]
        base_hlm = dept_hlm.get(dept, 25)
        base_owner = dept_owner.get(dept, 40)
        
        hlm_rate = max(5, min(80, base_hlm + np.random.normal(0, 10)))
        owner_rate = max(10, min(90, base_owner + np.random.normal(0, 10)))
        
        # Consistent with P20_H_HLM, P20_RP_PROP, P20_RP
        total_rp = 1000 # Dummy total
        log_rows.append({
            'IRIS': code,
            'P20_H_HLM': int(total_rp * (hlm_rate / 100)),
            'P20_RP_PROP': int(total_rp * (owner_rate / 100)),
            'P20_RP': total_rp
        })
        
    df_log = pd.DataFrame(log_rows)
    df_log.to_csv(os.path.join(data_dir, "logement_idf.csv"), index=False)
    
    print(f"✅ Generated realistic datasets for {len(iris_codes)} IRIS codes.")

if __name__ == "__main__":
    bootstrap_demographics()
