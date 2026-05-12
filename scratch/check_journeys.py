import json

def check_journeys():
    input_path = 'public/precomputed_journeys.json'
    
    with open(input_path, 'r') as f:
        data = json.load(f)
    
    total = len(data)
    with_bastille = sum(1 for insee in data if 'bastille' in data[insee])
    
    print(f"Total neighborhoods in journeys: {total}")
    print(f"Neighborhoods with 'bastille' data: {with_bastille}")
    
    # Check a few random ones
    keys = list(data.keys())
    for k in keys[:10]:
        print(f"Code {k}: {list(data[k].keys())}")

if __name__ == "__main__":
    check_journeys()
