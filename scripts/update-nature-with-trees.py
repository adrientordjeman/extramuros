import json
import os

def update_nature_with_trees():
    base_dir = '/Users/adrientordjeman/Documents/quartier_ideal'
    
    # 1. Load Aggregated Tree Data
    trees_path = os.path.join(base_dir, 'public/trees_aggregated.json')
    if not os.path.exists(trees_path):
        print("Error: trees_aggregated.json not found")
        return
    with open(trees_path, 'r') as f:
        trees_agg = json.load(f)
        
    # 2. Load Prices/Scores Data
    prices_path = os.path.join(base_dir, 'public/idf_prices.json')
    with open(prices_path, 'r') as f:
        prices = json.load(f)
        
    # 3. Update Scores
    print("Updating nature scores with tree data...")
    for code, data in trees_agg.items():
        if code in prices:
            current_nature = prices[code].get('nature', 50)
            
            # Bonus: 
            # +0.5 point per 10 street trees (max +15)
            # +3 points per remarkable tree (max +15)
            street_bonus = min(15, data['street_trees'] * 0.05)
            rem_bonus = min(15, data['remarkable_trees'] * 3.0)
            
            new_nature = min(100, current_nature + street_bonus + rem_bonus)
            prices[code]['nature'] = round(new_nature)
            
    # 4. Save
    with open(prices_path, 'w') as f:
        json.dump(prices, f)
        
    print("✅ Nature scores updated successfully!")

if __name__ == "__main__":
    update_nature_with_trees()
