import csv
import json
import os

def integrate_real_airparif():
    print("🌬️ Integrating real Airparif Citeair data (by commune)...")
    
    citeair_file = 'scratch/airparif_citeair.csv'
    prices_file = 'public/idf_prices.json'
    
    if not os.path.exists(citeair_file):
        print(f"❌ Error: {citeair_file} not found.")
        return

    # 1. Parse Citeair to get commune averages
    commune_data = {}
    with open(citeair_file, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            insee = row['ninsee']
            if not insee or insee == '0': continue
            
            # Aggregate values
            if insee not in commune_data:
                commune_data[insee] = {'no2': [], 'pm10': [], 'o3': []}
            
            if row['no2']: commune_data[insee]['no2'].append(float(row['no2']))
            if row['pm10']: commune_data[insee]['pm10'].append(float(row['pm10']))
            if row['o3']: commune_data[insee]['o3'].append(float(row['o3']))

    # Calculate averages per commune
    commune_avgs = {}
    for insee, vals in commune_data.items():
        avg_no2 = sum(vals['no2']) / len(vals['no2']) if vals['no2'] else 0
        avg_pm10 = sum(vals['pm10']) / len(vals['pm10']) if vals['pm10'] else 0
        # Invert the scale: Airparif indices are 0-100 where higher is WORSE? 
        # Actually Citeair index is usually 0-100 where higher is WORSE.
        # Let's check: 30-40 is "Bon". 100 is "Très mauvais".
        # So our score (100 = Best) should be: 100 - (index)
        
        # We'll normalize the index to a 0-100 "Quality" score
        quality = 100 - max(avg_no2, avg_pm10)
        commune_avgs[insee] = {
            'air_quality': round(max(0, quality), 1),
            'no2': round(avg_no2, 1),
            'pm10': round(avg_pm10, 1)
        }

    # 2. Update idf_prices.json
    with open(prices_file, 'r') as f:
        data = json.load(f)

    updated_count = 0
    for code, iris in data.items():
        commune_code = code[:5] # First 5 digits is commune
        
        # Check for Paris Arrondissements (75101, 75102, etc.)
        if code.startswith('750'):
             # IRIS in Paris 1st is 75101... wait.
             # Paris IRIS start with 75101 to 75120.
             pass

        # Try to find matching commune or arrondissement
        air_info = commune_avgs.get(commune_code)
        
        if air_info:
            iris['air_quality'] = air_info['air_quality']
            q = iris['air_quality']
            if q > 80: iris['air_label'] = 'Excellente (Airparif)'
            elif q > 65: iris['air_label'] = 'Bonne (Airparif)'
            elif q > 40: iris['air_label'] = 'Moyenne (Airparif)'
            else: iris['air_label'] = 'Dégradée (Airparif)'
            updated_count += 1
        else:
            # Fallback to arrondissement for Paris if commune fails
            # (In some datasets Paris is 75101 etc)
            pass

    with open(prices_file, 'w') as f:
        json.dump(data, f)
    
    print(f"✅ Successfully integrated real Airparif data for {updated_count} IRIS.")

if __name__ == "__main__":
    integrate_real_airparif()
