import json
import requests
import time
from concurrent.futures import ThreadPoolExecutor

# CATEGORY MAPPING (NAF Codes)
CATEGORIES = {
    "essential": {
        "weight": 3,
        "naf": ["10.71C", "47.11A", "47.11B", "47.11C", "47.11D", "47.11E", "47.11F", "47.73Z"]
    },
    "lifestyle": {
        "weight": 2,
        "naf": ["56.10A", "56.10B", "56.10C", "56.30Z", "47.61Z", "59.14Z"]
    },
    "static": {
        "weight": 1,
        "naf": ["64.19Z", "65.12Z", "45.20A"]
    }
}

API_BASE = "https://recherche-entreprises.api.gouv.fr/search"

def fetch_iris_vibe(iris_code):
    """
    Fetches business counts for a single IRIS and calculates a weighted score.
    """
    scores = {"ess": 0, "life": 0, "stat": 0}
    
    try:
        # Optimization: Fetch counts for the 3 main category blocks in parallel or sequence
        # For simplicity in this script, we'll fetch the total for each NAF group
        for cat_name, cat_data in CATEGORIES.items():
            count = 0
            # To avoid too many calls, we search for the whole group via activite_principale list
            # The API supports comma-separated NAFs or multiple queries.
            # We'll use a single query per category if possible.
            query_naf = ",".join(cat_data["naf"])
            url = f"{API_BASE}?iris={iris_code}&activite_principale={query_naf}&per_page=1"
            
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                data = response.json()
                count = data.get("total_results", 0)
            
            scores[cat_name] = count * cat_data["weight"]

        total_weighted = sum(scores.values())
        # Normalize score (0-100 thresholding). 
        # A very lively neighborhood might have 20 essentials, 30 lifestyle, 10 static.
        # Max score approx 20*3 + 30*2 + 10*1 = 130.
        vibe_score = min(100, round((total_weighted / 80) * 100))
        
        return {
            "score": vibe_score,
            "breakdown": {
                "essentials": int(scores["essential"] / 3),
                "lifestyle": int(scores["lifestyle"] / 2),
                "static": int(scores["static"] / 1)
            }
        }
    except Exception as e:
        # print(f"Error fetching {iris_code}: {e}")
        return None

def main():
    print("Loading IRIS list...")
    with open('public/idf_prices.json', 'r') as f:
        prices_data = json.load(f)

    iris_codes = list(prices_data.keys())
    print(f"Starting processing for {len(iris_codes)} IRIS zones...")

    # We use threading to speed up API calls (be careful with rate limits)
    # The Annuaire des Entreprises API is quite generous but let's keep it reasonable.
    vibe_results = {}
    
    # FOR DEMO: Only process first 100 IRIS (or more if needed)
    # In a real run, we would process everything or use a local BPE file.
    limit = 100 
    target_iris = iris_codes[:limit]

    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_iris = {executor.submit(fetch_iris_vibe, code): code for code in target_iris}
        
        count = 0
        for future in future_to_iris:
            code = future_to_iris[future]
            res = future.result()
            if res:
                vibe_results[code] = res
            
            count += 1
            if count % 10 == 0:
                print(f"Progress: {count}/{limit}...")

    print("Merging data into idf_prices.json...")
    for code, vibe in vibe_results.items():
        if code in prices_data:
            prices_data[code]["vibe"] = vibe
            
    # Mock remaining for completeness in UI demo
    for code in iris_codes:
        if "vibe" not in prices_data[code]:
            # Heuristic based on IPS (Socio-economic index) as a proxy for urban amenities
            ips = prices_data[code].get("ips", 100)
            pav = prices_data[code].get("pav", 0.5)
            # Higher IPS + Lower Pav (Urban) = More likely to have diverse commerce
            base_score = int(min(95, (ips / 150) * 80 + (1 - pav) * 20))
            prices_data[code]["vibe"] = {
                "score": base_score,
                "breakdown": {"essentials": int(base_score/5), "lifestyle": int(base_score/8), "static": int(base_score/12)},
                "mock": True
            }

    with open('public/idf_prices.json', 'w') as f:
        json.dump(prices_data, f)

    print("Success! idf_prices.json enriched with 'Vie de Quartier' data.")

if __name__ == "__main__":
    main()
