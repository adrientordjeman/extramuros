import json
import os

def calculate_heatwave_resilience():
    print("🌡️ Calculating Heatwave Resilience Score (SUHI + Nocturnal Cooling)...")
    
    prices_file = 'public/idf_prices.json'
    if not os.path.exists(prices_file):
        print(f"❌ Error: {prices_file} not found.")
        return

    with open(prices_file, 'r') as f:
        data = json.load(f)

    for code, iris in data.items():
        # --- 1. LST (LAND SURFACE TEMPERATURE) PROXY ---
        # Mineral density (Urban Vibe) is the primary driver of high LST
        urban_vibe = iris.get('vibes', {}).get('urban', 50)
        nature_score = iris.get('nature', 50)
        
        # Base LST Score: 100 is cool, 0 is extreme heat
        # Denser areas get lower scores. Parks boost it.
        lst_score = 100 - (urban_vibe * 0.7) + (nature_score * 0.3)
        lst_score = max(0, min(100, lst_score))
        
        # --- 2. NOCTURNAL COOLING (RECOVERY INDEX) ---
        # How well does it cool down? 
        # Large mineral masses (high IPS/Density) and lack of trees prevent cooling.
        # social_pct/owner_pct often correlate with dense rental blocks vs pavillionaire
        ips = iris.get('ips', 100)
        owner_pct = iris.get('demo', {}).get('owner_pct', 50)
        
        # Density Factor (IPS as proxy for built volume)
        density_penalty = (ips - 70) * 0.5 if ips > 70 else 0
        
        # Recovery Index: Higher is better cooling
        recovery_index = 100 - (urban_vibe * 0.4) - density_penalty
        if owner_pct > 60: recovery_index += 10 # Pavillionaire areas cool faster
        
        recovery_index = max(0, min(100, recovery_index))
        
        # --- 3. FINAL RESILIENCE SCORE ---
        # Weighted average: 50% LST (Peak Heat), 50% Recovery (Night Cooling)
        resilience = (lst_score * 0.5) + (recovery_index * 0.5)
        
        # Ensure it's stored as a clean float
        iris['heat_resilience'] = round(resilience, 1)
        
        # Add a qualitative label
        if resilience > 80: iris['heat_label'] = 'Exceptionnelle'
        elif resilience > 65: iris['heat_label'] = 'Bonne'
        elif resilience > 45: iris['heat_label'] = 'Moyenne'
        else: iris['heat_label'] = 'Critique'

    with open(prices_file, 'w') as f:
        json.dump(data, f)
    
    print(f"✅ Updated {len(data)} IRIS with Heatwave Resilience scores.")

if __name__ == "__main__":
    calculate_heatwave_resilience()
