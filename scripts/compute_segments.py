import json
import pandas as pd
import math
import os
import sys

# Import the LLM-derived expert rules
from expert_rules import apply_expert_rule

def compute_segments():
    print("🚀 Starting segmentation logic...")
    
    csv_path = "/Users/adrientordjeman/Documents/quartier_ideal/data/base-ic-logement-2022_csv/base-ic-logement-2022.CSV"
    geojson_path = "/Users/adrientordjeman/Documents/quartier_ideal/public/idf-quartiers-optimized.geojson"
    
    print("Loading Housing CSV...")
    df = pd.read_csv(csv_path, sep=';', low_memory=False)
    
    # Filter only for Habitat (H)
    if 'TYP_IRIS' in df.columns:
        print(f"Filtering habitat IRIS... (Initial count: {len(df)})")
        df = df[df['TYP_IRIS'] == 'H']
        print(f"Habitat IRIS kept: {len(df)}")
    
    iris_col = 'IRIS' if 'IRIS' in df.columns else 'CODE_IRIS'
    df[iris_col] = df[iris_col].astype(str).str.zfill(9)
    df.set_index(iris_col, inplace=True)
    
    print("Loading GeoJSON...")
    with open(geojson_path, 'r') as f:
        data = json.load(f)
        
    for feature in data['features']:
        insee = feature['properties']['code']
        
        # Default scores
        scores = {
            "Le Village Urbain": 0,
            "Le Standing Patrimonial": 0,
            "La Riviera (Bords de l'Eau)": 0,
            "Le Coteau résidentiel": 0,
            "Le Néo-Résidentiel": 0,
            "Le Faubourg / Maison de Ville": 0,
            "Le Pavillonnaire Familial": 0
        }
        
        props = feature['properties']
        static = props.get('staticScores', {})
        
        # Data from GeoJSON
        connectivity = static.get('connectivity', 0)
        services = static.get('services', 0)
        is_blue = props.get('is_blue', False)
        nom = str(props.get('nom', '')).lower()
        commune = str(props.get('commune', '')).lower()
        price_dict = props.get('all') or {}
        price_all = price_dict.get('price', 0) if isinstance(price_dict, dict) else 0
        
        if insee in df.index:
            row = df.loc[insee]
            rp_tot = float(row.get('P22_RP', 0))
            if pd.isna(rp_tot) or rp_tot == 0: rp_tot = 1
            
            # Ages
            rp_1919 = float(row.get('P22_RP_ACH1919', 0)) if not pd.isna(row.get('P22_RP_ACH1919')) else 0
            rp_1945 = float(row.get('P22_RP_ACH1945', 0)) if not pd.isna(row.get('P22_RP_ACH1945')) else 0
            rp_1970 = float(row.get('P22_RP_ACH1970', 0)) if not pd.isna(row.get('P22_RP_ACH1970')) else 0
            rp_1990 = float(row.get('P22_RP_ACH1990', 0)) if not pd.isna(row.get('P22_RP_ACH1990')) else 0
            rp_2005 = float(row.get('P22_RP_ACH2005', 0)) if not pd.isna(row.get('P22_RP_ACH2005')) else 0
            rp_2019 = float(row.get('P22_RP_ACH2019', 0)) if not pd.isna(row.get('P22_RP_ACH2019')) else 0
            
            rp_old = (rp_1919 + rp_1945) / rp_tot
            rp_recent = (rp_2005 + rp_2019) / rp_tot
            rp_mid = (rp_1945 + rp_1970 + rp_1990) / rp_tot
            
            # Types
            rp_maison_tot = float(row.get('P22_RPMAISON_ACHTOT', 0)) if not pd.isna(row.get('P22_RPMAISON_ACHTOT')) else 0
            rp_maison = rp_maison_tot / rp_tot
            
            rp_appart_tot = float(row.get('P22_RPAPPART_ACHTOT', 0)) if not pd.isna(row.get('P22_RPAPPART_ACHTOT')) else 0
            rp_appart = rp_appart_tot / rp_tot
            
            m19 = float(row.get('P22_RPMAISON_ACH1919', 0)) if not pd.isna(row.get('P22_RPMAISON_ACH1919')) else 0
            m45 = float(row.get('P22_RPMAISON_ACH1945', 0)) if not pd.isna(row.get('P22_RPMAISON_ACH1945')) else 0
            maison_1919_1945 = (m19 + m45) / rp_tot
            
            # Surfaces & Wealth
            l100 = float(row.get('P22_RP_100120M2', 0)) if not pd.isna(row.get('P22_RP_100120M2')) else 0
            l120 = float(row.get('P22_RP_120M2P', 0)) if not pd.isna(row.get('P22_RP_120M2P')) else 0
            rp_large = (l100 + l120) / rp_tot
            
            p_prop = float(row.get('P22_RP_PROP', 0)) if not pd.isna(row.get('P22_RP_PROP')) else 0
            rp_prop = p_prop / rp_tot
            
            # Cars
            v2p = float(row.get('P22_RP_VOIT2P', 0)) if not pd.isna(row.get('P22_RP_VOIT2P')) else 0
            rp_voit2p = v2p / rp_tot
            
            # 1. Le Village Urbain
            scores["Le Village Urbain"] = (
                (connectivity / 100) * 40 +
                (services / 100) * 40 +
                rp_old * 20
            )
            if rp_maison > 0.4: scores["Le Village Urbain"] -= 30
            
            # 2. Le Standing Patrimonial
            price_score = min(100, max(0, (price_all - 6000) / (12000 - 6000) * 100))
            scores["Le Standing Patrimonial"] = (
                (price_score / 100) * 30 +
                rp_old * 20 +
                maison_1919_1945 * 20 * 5 + # Boost early houses
                rp_large * 15 +
                rp_prop * 15
            )
            if price_all < 5000: scores["Le Standing Patrimonial"] -= 50
            if maison_1919_1945 > 0.1 and rp_prop > 0.5: scores["Le Standing Patrimonial"] += 40
            
            # 3. La Riviera (Bords de l'Eau)
            riviera_count = props.get('counts', {}).get('riviera', 0)
            if is_blue or riviera_count > 0:
                scores["La Riviera (Bords de l'Eau)"] = 70 + (10 if is_blue else 0) + min(20, riviera_count * 5) + rp_prop * 10
            else:
                scores["La Riviera (Bords de l'Eau)"] = 0
                
            # 4. Le Coteau résidentiel
            coteau_keywords = ['mont', 'coteau', 'coteaux', 'haut', 'hauts', 'hauteur', 'bellevue', 'panorama', 'colline']
            if any(k in nom for k in coteau_keywords) or any(k in commune for k in coteau_keywords):
                scores["Le Coteau résidentiel"] = 80 + rp_prop * 20 + rp_maison * 10
            else:
                scores["Le Coteau résidentiel"] = 0
                
            # 5. Le Néo-Résidentiel
            scores["Le Néo-Résidentiel"] = (
                rp_recent * 100 +
                (connectivity / 100) * 10
            )
            if rp_recent > 0.25: scores["Le Néo-Résidentiel"] += 40
            
            # 6. Le Faubourg / Maison de Ville
            if connectivity > 50 and 0.05 < rp_maison < 0.4 and rp_old > 0.2:
                scores["Le Faubourg / Maison de Ville"] = 60 + rp_old * 20 + rp_maison * 20
            else:
                scores["Le Faubourg / Maison de Ville"] = rp_old * 10 + (connectivity / 100) * 10
                
            # 7. Le Pavillonnaire Familial
            scores["Le Pavillonnaire Familial"] = (
                rp_maison * 50 +
                rp_mid * 20 +
                rp_voit2p * 30 +
                rp_large * 10
            )
            if rp_maison > 0.6: scores["Le Pavillonnaire Familial"] += 30
            
            best_segment = max(scores, key=scores.get)
            best_score = scores[best_segment]
            
            if best_score < 15:
                if rp_maison > 0.5:
                    best_segment = "Le Pavillonnaire Familial"
                else:
                    best_segment = "Le Village Urbain" if connectivity > 50 else "Le Néo-Résidentiel"
                    
            # 8. LLM / EXPERT OVERRIDE
            expert_segment = apply_expert_rule(commune, nom)
            if expert_segment:
                best_segment = expert_segment
                scores[expert_segment] = 100 # Force it to be the max so it's obvious in scores too
                
        else:
            best_segment = "Le Village Urbain"
            
        segments_map = {
            "Le Village Urbain": {"id": 1, "color": "#e74c3c"},
            "Le Standing Patrimonial": {"id": 2, "color": "#f39c12"},
            "La Riviera (Bords de l'Eau)": {"id": 3, "color": "#3498db"},
            "Le Coteau résidentiel": {"id": 4, "color": "#2ecc71"},
            "Le Néo-Résidentiel": {"id": 5, "color": "#9b59b6"},
            "Le Faubourg / Maison de Ville": {"id": 6, "color": "#e67e22"},
            "Le Pavillonnaire Familial": {"id": 7, "color": "#34495e"}
        }
        
        props['segment_id'] = segments_map[best_segment]["id"]
        props['segment_name'] = best_segment
        props['segment_color'] = segments_map[best_segment]["color"]
        props['segment_scores'] = {k: round(v, 2) for k, v in scores.items()}
        
        # Save age distribution for frontend display
        if insee in df.index:
            row = df.loc[insee]
            rp_tot_val = float(row.get('P22_RP', 0))
            if rp_tot_val > 0:
                props['age_dist'] = {
                    "avant_1919": round(float(row.get('P22_RP_ACH1919', 0)) / rp_tot_val * 100, 1),
                    "1919_1945": round(float(row.get('P22_RP_ACH1945', 0)) / rp_tot_val * 100, 1),
                    "1945_1970": round(float(row.get('P22_RP_ACH1970', 0)) / rp_tot_val * 100, 1),
                    "1970_1990": round(float(row.get('P22_RP_ACH1990', 0)) / rp_tot_val * 100, 1),
                    "1990_2005": round(float(row.get('P22_RP_ACH2005', 0)) / rp_tot_val * 100, 1),
                    "apres_2005": round((float(row.get('P22_RP_ACH2005', 0)) + float(row.get('P22_RP_ACH2019', 0))) / rp_tot_val * 100, 1)
                }
            else:
                props['age_dist'] = None
        else:
            props['age_dist'] = None

    output_path = "/Users/adrientordjeman/Documents/quartier_ideal/public/idf-quartiers-optimized.geojson"
    with open(output_path, 'w') as f:
        json.dump(data, f)
        
    print(f"✅ Saved segmented GeoJSON to {output_path}")
    
    # Calculate stats
    stats = {}
    for f in data['features']:
        sn = f['properties']['segment_name']
        stats[sn] = stats.get(sn, 0) + 1
    
    print("\n📊 Segment Distribution:")
    for k, v in stats.items():
        print(f" - {k}: {v} IRIS ({round(v/len(data['features'])*100, 1)}%)")

if __name__ == "__main__":
    compute_segments()
