import requests
import json

def test_overpass():
    query = '[out:json];node(48.85,2.34,48.86,2.35);out;'
    url = "https://overpass-api.de/api/interpreter"
    print(f"Testing Overpass with query: {query}")
    headers = {'User-Agent': 'Mozilla/5.0'}
    try:
        response = requests.get(url, params={'data': query}, headers=headers, timeout=30)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Success! Found {len(data.get('elements', []))} elements.")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    test_overpass()
