import pandas as pd
import json
import os

def compute_finances():
    print("📊 Computing local finances data...")
    data_dir = "/Users/adrientordjeman/Documents/quartier_ideal/data"
    public_dir = "/Users/adrientordjeman/Documents/quartier_ideal/public"
    
    # 1. Load Population (Proxy: C22_PMEN from couples-familles)
    print("👥 Loading population data...")
    pop_df = pd.read_csv(os.path.join(data_dir, "base-ic-couples-familles-menages-2022.CSV"), sep=';', low_memory=False)
    pop_df['COM'] = pop_df['COM'].astype(str).str.zfill(5)
    commune_pop = pop_df.groupby('COM')['C22_PMEN'].sum().to_dict()
    
    # 2. Load Balance Data
    # The file is a trial balance: SD = debit closing balance, SC = credit closing balance
    # BEDEB = debit movements, BECRE = credit movements
    print("💰 Loading trial balance data (this may take a minute)...")
    balance_path = os.path.join(data_dir, "Balance_Commune_2024_Dec2025.csv")
    
    commune_data = {}

    def clean_val(x):
        if pd.isna(x): return 0.0
        if isinstance(x, str):
            return float(x.replace(',', '.'))
        return float(x)

    use_cols = ['NDEPT', 'INSEE', 'LBUDG', 'COMPTE', 'BEDEB', 'BECRE', 'OBNETDEB', 'OBNETCRE', 'SD', 'SC']
    
    try:
        df = pd.read_csv(balance_path, sep=';', encoding='latin-1', low_memory=False, usecols=use_cols)
        
        def get_full_insee(row):
            try:
                if pd.isna(row['NDEPT']) or pd.isna(row['INSEE']):
                    return None
                dep_str = str(row['NDEPT']).strip().split('.')[0].zfill(3)
                if dep_str.startswith('0'):
                    dep_str = dep_str[1:]
                com_str = str(row['INSEE']).strip().split('.')[0].zfill(3)
                return dep_str + com_str
            except:
                return None

        df['COM'] = df.apply(get_full_insee, axis=1)
        df = df[df['COM'].notna()]
        
        # Clean numeric columns
        for col in ['BEDEB', 'BECRE', 'OBNETDEB', 'OBNETCRE', 'SD', 'SC']:
            df[col] = df[col].apply(clean_val)
        
        # Convert COMPTE to string for matching
        df['COMPTE'] = df['COMPTE'].astype(str).str.strip()

        print("📈 Aggregating financial accounts...")
        
        for com, group in df.groupby('COM'):
            if com not in commune_pop: continue
            
            pop = commune_pop[com]
            if pop == 0: continue
            
            # === DEBT (Dette) ===
            # Account 16x: Emprunts et dettes assimilées - Credit closing balance (SC)
            debt = group[group['COMPTE'].str.match(r'^16')]['SC'].sum()
            
            # === INVESTMENT (Investissement) ===
            # Annual capital expenditure = net debit movements (OBNETDEB) on accounts 20, 21, 23
            # OBNETDEB = net flow for the fiscal year, not the cumulative closing balance
            invest_accounts = group[group['COMPTE'].str.match(r'^(20|21|23)')]
            invest = invest_accounts['OBNETDEB'].sum()
            
            # === FUNCTIONING REVENUES (Produits de fonctionnement) ===
            # Account 7: Annual net credit movements (OBNETCRE)
            rev_accounts = group[group['COMPTE'].str.match(r'^7')]
            rev = rev_accounts['OBNETCRE'].sum()
            
            # === FUNCTIONING EXPENSES (Charges de fonctionnement) ===
            # Account 6: Annual net debit movements (OBNETDEB)
            exp_accounts = group[group['COMPTE'].str.match(r'^6')]
            exp = exp_accounts['OBNETDEB'].sum()
            
            # === ÉPARGNE BRUTE ===
            savings_abs = rev - exp
            savings_pct = round((savings_abs / rev * 100), 1) if rev > 0 else 0.0
            
            # === CAPACITÉ DE DÉSENDETTEMENT ===
            if savings_abs > 0 and debt > 0:
                debt_capacity = round(debt / savings_abs, 1)
            elif debt == 0:
                debt_capacity = 0.0
            else:
                debt_capacity = 99.0
            
            # Clamp values to sane ranges
            savings_pct = max(-50.0, min(savings_pct, 50.0))
            debt_capacity = min(debt_capacity, 99.0)
            
            commune_name = group['LBUDG'].iloc[0]
            
            commune_data[com] = {
                "nom": commune_name,
                "pop": int(pop),
                "dette_total": round(debt, 2),
                "dette_hab": int(round(debt / pop)),
                "invest_total": round(invest, 2),
                "invest_hab": int(round(invest / pop)),
                "epargne_pct": savings_pct,
                "capacite_desendettement": debt_capacity,
                "taxe_fonciere": 0  # filled below
            }
            
        print(f"✅ Calculated metrics for {len(commune_data)} communes.")

    except Exception as e:
        import traceback
        print(f"❌ Failed to process balance data: {e}")
        traceback.print_exc()
        return

    # 3. Fetch REI 2024 tax rates
    print("🏛️ Loading tax rates from REI_2024.csv...")
    rei_path = os.path.join(data_dir, "REI_2024.csv")
    if os.path.exists(rei_path):
        try:
            # The file is semicolons-delimited, headerless
            # Col 1: Dept, Col 3: Commune, Col 15: TFB Commune, Col 116: TFB Interco
            with open(rei_path, 'r', encoding='latin-1') as f:
                applied_count = 0
                for line in f:
                    parts = line.strip().split(';')
                    if len(parts) > 116:
                        dept = parts[0].zfill(2)
                        commune_code = parts[2].zfill(3)
                        insee = f"{dept}{commune_code}"
                        
                        if insee in commune_data:
                            try:
                                com_rate = float(parts[14].replace(',', '.')) if parts[14] else 0
                                int_rate = float(parts[115].replace(',', '.')) if parts[115] else 0
                                
                                # Heuristic: if com_rate > 50, it's likely TFPNB (Non Bâti). 
                                # TFB is usually in Col 71 for these cases.
                                if com_rate > 50:
                                    com_rate = float(parts[70].replace(',', '.')) if parts[70] else com_rate
                                    # For Nogent-sur-Marne specifically, Col 71 is the total (commune+interco)
                                    if insee == "94052":
                                        int_rate = 0 
                                
                                commune_data[insee]['taxe_fonciere'] = round(com_rate + int_rate, 2)
                                applied_count += 1
                            except ValueError:
                                continue
                print(f"  ✅ Tax rates applied for {applied_count} communes from REI file.")
        except Exception as e:
            print(f"  ⚠️ REI file parsing failed: {e}")
    else:
        print("  ⚠️ REI_2024.csv not found.")
    
    # Optional: Keep a few hardcoded overrides if needed, but the REI file should cover most.
    reference_taxes = {
        # "92025": 28.54, # Colombes 2024 (22.10 + 6.44)
    }
    
    applied = 0
    for com, rate in reference_taxes.items():
        if com in commune_data:
            commune_data[com]['taxe_fonciere'] = rate
            applied += 1
    print(f"  ✅ Applied hardcoded rates for {applied} communes.")

    # Save to public/commune_finances.json
    output_path = os.path.join(public_dir, 'commune_finances.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(commune_data, f, ensure_ascii=False, separators=(',', ':'))
    
    size_kb = os.path.getsize(output_path) / 1024
    print(f"✨ Finance data ready! ({size_kb:.0f} KB, {len(commune_data)} communes)")
    
    # Quick sanity check for Colombes
    if '92025' in commune_data:
        c = commune_data['92025']
        print(f"\n📍 Colombes sanity check:")
        print(f"   Dette: {c['dette_hab']}€/hab (expected ~1665)")
        print(f"   Invest: {c['invest_hab']}€/hab (expected ~1158)")
        print(f"   Épargne: {c['epargne_pct']}% (expected ~16.6%)")
        print(f"   Désendettement: {c['capacite_desendettement']} ans (expected ~5.4)")
        print(f"   Taxe Foncière: {c['taxe_fonciere']}% (expected 34.24%)")

if __name__ == "__main__":
    compute_finances()
