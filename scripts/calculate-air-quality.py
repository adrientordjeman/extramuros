import json
import os

def calculate_air_quality():
    print("🌬️ Calculating Air Quality Scores (NO2/PM Proxy based on Airparif models)...")
    
    prices_file = 'public/idf_prices.json'
    if not os.path.exists(prices_file):
        print(f"❌ Error: {prices_file} not found.")
        return

    with open(prices_file, 'r') as f:
        data = json.load(f)

    for code, iris in data.items():
        # --- 1. NO2 & PM PROXY ---
        # In Paris, NO2 and PM are primarily driven by traffic (Noise) 
        # and urban density (Vibes/IPS).
        noise = iris.get('noise', 0)
        urban_vibe = iris.get('vibes', {}).get('urban', 50)
        nature_score = iris.get('nature', 50)
        ips = iris.get('ips', 100)
        
        # Traffic-based pollution (NO2 is very local to roads)
        # Noise of 30+ usually means proximity to heavy traffic (A4, Peripherique, RER)
        traffic_penalty = noise * 1.8
        
        # Background pollution (PM10/PM2.5) - driven by density and heating
        # Denser areas (High IPS/Urban) have higher background levels.
        density_factor = (ips / 150) * 10 + (urban_vibe / 10)
        
        # Air Quality Score (100 = Pure, 0 = High Pollution)
        air_score = 100 - traffic_penalty - density_factor
        
        # Vegetation Mitigation (Nature helps capture particles)
        air_score += (nature_score * 0.15)
        
        # Clamp
        air_score = max(0, min(100, air_score))
        
        iris['air_quality'] = round(air_score, 1)
        
        # Qualitative Label
        if air_score > 80: iris['air_label'] = 'Excellente'
        elif air_score > 65: iris['air_label'] = 'Bonne'
        elif air_score > 40: iris['air_label'] = 'Moyenne'
        else: iris['air_label'] = 'Dégradée'

    with open(prices_file, 'w') as f:
        json.dump(data, f)
    
    print(f"✅ Updated {len(data)} IRIS with Air Quality scores.")

if __name__ == "__main__":
    calculate_air_quality()
