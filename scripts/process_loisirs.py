import json
from shapely.geometry import shape, Point
import glob
import os

def process_loisirs():
    print("Loading IRIS boundaries...")
    with open('public/idf-quartiers-optimized.geojson', 'r') as f:
        iris_data = json.load(f)
    
    # Prepare IRIS polygons
    polygons = []
    print(f"Loaded {len(iris_data['features'])} IRIS features.")
    
    # Spatial grid for fast lookup
    grid = {}
    grid_size = 100 # 0.01 degrees ~ 1km
    
    for feature in iris_data['features']:
        s = shape(feature['geometry'])
        code = feature['properties'].get('code') or feature['properties'].get('code_iris') or feature['properties'].get('CODE_IRIS')
        nom = feature['properties'].get('nom') or feature['properties'].get('nom_iris') or feature['properties'].get('NOM_IRIS')
        
        poly_obj = {
            'code_iris': code,
            'nom_iris': nom,
            'shape': s,
            'bounds': s.bounds
        }
        polygons.append(poly_obj)
        
        # Add to grid
        minx, miny, maxx, maxy = s.bounds
        gx1, gy1 = int(minx * grid_size), int(miny * grid_size)
        gx2, gy2 = int(maxx * grid_size), int(maxy * grid_size)
        for x in range(gx1, gx2 + 1):
            for y in range(gy1, gy2 + 1):
                key = f"{x},{y}"
                if key not in grid: grid[key] = []
                grid[key].append(poly_obj)
    
    loisirs_by_iris = {}
    
    # Files to process
    data_files = {
        'dataset1.geojson': 'musique',
        'dataset2.geojson': 'theatre',
        'dataset3.geojson': 'cinema',
        'dataset4.geojson': 'conservatoire',
        'dataset5.geojson': 'bibliotheque',
        'dataset6.geojson': 'institution_culturelle'
    }
    
    # Établissements publics de culture (dataset with 'structure' field, needs keyword mapping)
    EPL_CATEGORY_KEYWORDS = {
        'musee': ['musee', 'musée', 'louvre', 'orsay', 'rodin', 'delacroix', 'quai branly', 'guimet', 'henner', 'moreau', 'picasso', 'fontainebleau', 'versailles', 'porte dorée', 'sèvres'],
        'theatre': ['theatre', 'théâtre', 'opéra', 'opera', 'comedie', 'comédie', 'danse', 'chaillot', 'colline', 'odeon', 'odéon', 'opéra-comique'],
        'conservatoire': ['conservatoire', 'musique', 'chanson', 'cité de la musique'],
        'cinema': ['cinema', 'cinéma', 'image animée', 'cncl'],
        'institution_culturelle': ['patrimoine', 'architecture', 'beaux-arts', 'arts décoratifs', 'création industrielle', 'villette', 'monuments', 'arts plastiques', 'art dramatique', 'ecole du louvre', 'école du louvre', 'histoire de l\'art', 'femis', 'sciences', 'universcience', 'livre', 'immigration', 'céramique'],
    }
    
    all_facilities = []
    
    # Standard cultural files
    for filename, category in data_files.items():
        path = os.path.join('data/loisirs', filename)
        if not os.path.exists(path): continue
        print(f"Processing {path} ({category})...")
        try:
            with open(path, 'r') as f:
                data = json.load(f)
                for feat in data.get('features', []):
                    geom = feat.get('geometry')
                    if not geom or geom['type'] != 'Point': continue
                    coords = geom['coordinates']
                    point = Point(coords[0], coords[1])
                    props = feat.get('properties', {})
                    name = props.get('nom') or props.get('structure') or props.get('nometablissement') or 'Équipement'
                    all_facilities.append({'point': point, 'category': category, 'name': name})
        except Exception as e: print(f"Error processing {path}: {e}")
    
    # Établissements publics de culture (national dataset with smart keyword categorization)
    epl_path = os.path.join('data/loisirs', 'etablissements_publics_culture.geojson')
    if os.path.exists(epl_path):
        print(f"Processing {epl_path} (établissements publics de culture)...")
        try:
            with open(epl_path, 'r') as f:
                data = json.load(f)
                for feat in data.get('features', []):
                    geom = feat.get('geometry')
                    if not geom or geom['type'] != 'Point': continue
                    coords = geom['coordinates']
                    lon, lat = coords[0], coords[1]
                    # Validate rough IDF bounding box to avoid far-flung points
                    if not (1.4 <= lon <= 3.6 and 48.0 <= lat <= 49.3): continue
                    point = Point(lon, lat)
                    props = feat.get('properties', {})
                    name = props.get('structure') or 'Établissement culturel'
                    name_lower = name.lower()
                    # Detect category from name keywords
                    cat = 'institution_culturelle'  # default
                    for kcat, keywords in EPL_CATEGORY_KEYWORDS.items():
                        if any(kw in name_lower for kw in keywords):
                            cat = kcat
                            break
                    all_facilities.append({'point': point, 'category': cat, 'name': name})
        except Exception as e: print(f"Error processing {epl_path}: {e}")
    
    # Lieux de diffusion du spectacle vivant en Île-de-France (Région IDF open data)
    # Contains: théâtres, bibliothèques, médiathèques, conservatoires, MJC, centres culturels, cinémas, salles de concert
    spectacle_path = os.path.join('data/loisirs', 'lieux_spectacle_vivant_idf.geojson')
    if os.path.exists(spectacle_path):
        print(f"Processing {spectacle_path} (spectacle vivant IDF)...")
        SPECTACLE_KEYWORDS = {
            'bibliotheque':  ['bibliothèque', 'bibliotheque', 'médiathèque', 'mediatheque'],
            'conservatoire': ['conservatoire', 'école de musique', 'ecole de musique', 'école de danse', 'ecole de danse'],
            'theatre':       ['théâtre', 'theatre', 'opéra', 'opera', 'scène nationale', 'scene nationale', 'scène conventionnée', 'maison du théâtre', 'centre dramatique'],
            'cinema':        ['cinéma', 'cinema', 'ciné', 'cine'],
            'musique':       ['salle de concert', 'salle de spectacle', 'zénith', 'zenith', 'philharmonie', 'cabaret', 'jazz club', 'concert', 'festival'],
            'institution_culturelle': ['mjc', 'maison des jeunes', 'centre culturel', 'espace culturel', 'maison de la culture', 'maison des arts', 'centre d\'art', 'centre des arts', 'maison des associations', 'maison de quartier', 'espace paul', 'espace jean', 'espace victor'],
        }
        try:
            with open(spectacle_path, 'r') as f:
                data = json.load(f)
                count = 0
                for feat in data.get('features', []):
                    geom = feat.get('geometry')
                    if not geom or geom['type'] != 'Point': continue
                    coords = geom['coordinates']
                    lon, lat = coords[0], coords[1]
                    # IDF bounding box filter
                    if not (1.4 <= lon <= 3.6 and 48.0 <= lat <= 49.3): continue
                    point = Point(lon, lat)
                    props = feat.get('properties', {})
                    name = props.get('nom') or ''
                    if not name: continue
                    name_lower = name.lower()
                    # Detect category from name keywords
                    cat = None
                    for kcat, keywords in SPECTACLE_KEYWORDS.items():
                        if any(kw in name_lower for kw in keywords):
                            cat = kcat
                            break
                    if cat:  # Only include clearly categorized venues
                        all_facilities.append({'point': point, 'category': cat, 'name': name})
                        count += 1
                print(f"  -> {count} categorized venues added from spectacle vivant dataset")
        except Exception as e: print(f"Error processing {spectacle_path}: {e}")

    # OSM supplement: venues missing from official IDF dataset (theatres, libraries, arts centres)
    # Generated by scripts/fetch_osm_supplement.py — re-run to refresh
    osm_supp_path = os.path.join('data/loisirs', 'osm_supplement.geojson')
    if os.path.exists(osm_supp_path):
        print(f"Processing {osm_supp_path} (OSM supplement)...")
        try:
            with open(osm_supp_path, 'r') as f:
                data = json.load(f)
                count = 0
                for feat in data.get('features', []):
                    geom = feat.get('geometry')
                    if not geom or geom['type'] != 'Point': continue
                    coords = geom['coordinates']
                    lon, lat = coords[0], coords[1]
                    if not (1.4 <= lon <= 3.6 and 48.0 <= lat <= 49.3): continue
                    point = Point(lon, lat)
                    props = feat.get('properties', {})
                    cat = props.get('category', '')
                    name = props.get('name', '')
                    if not cat or not name: continue
                    all_facilities.append({'point': point, 'category': cat, 'name': name})
                    count += 1
                print(f"  -> {count} venues added from OSM supplement")
        except Exception as e: print(f"Error processing {osm_supp_path}: {e}")

    # Special processing for sport.geojson
    sport_path = 'data/loisirs/sport.geojson'
    if os.path.exists(sport_path):
        print(f"Processing {sport_path} (sport)...")
        try:
            with open(sport_path, 'r') as f:
                data = json.load(f)
                for feat in data.get('features', []):
                    geom = feat.get('geometry')
                    if not geom or geom['type'] != 'Point': continue
                    coords = geom['coordinates']
                    point = Point(coords[0], coords[1])
                    props = feat.get('properties', {})
                    eqt_type = props.get('eqt_type', '').lower()
                    
                    cat = None
                    if 'tennis' in eqt_type: cat = 'tennis'
                    elif 'piscine' in eqt_type or 'bassin' in eqt_type: cat = 'pool'
                    elif any(x in eqt_type for x in ['musculation', 'gymnastique', 'dojo', 'arts martiaux']): cat = 'gym'
                    
                    if cat:
                        ins_name = props.get('ins_nom') or ''
                        eqt_name = props.get('eqt_nom') or ''
                        if ins_name and eqt_name:
                            name = f"{ins_name} ({eqt_name})"
                        else:
                            name = ins_name or eqt_name or 'Équipement sportif'
                        all_facilities.append({'point': point, 'category': cat, 'name': name})
        except Exception as e: print(f"Error processing {sport_path}: {e}")

    print(f"Assigning {len(all_facilities)} facilities to IRIS...")
    
    points_geojson = {"type": "FeatureCollection", "features": []}
    matched_count = 0
    
    for facility in all_facilities:
        point = facility['point']
        cat = facility['category']
        key = f"{int(point.x * grid_size)},{int(point.y * grid_size)}"
        facility_iris = None
        
        for poly in grid.get(key, []):
            minx, miny, maxx, maxy = poly['bounds']
            if not (minx <= point.x <= maxx and miny <= point.y <= maxy): continue
            if poly['shape'].contains(point):
                facility_iris = poly['code_iris']
                matched_count += 1
                if facility_iris not in loisirs_by_iris:
                    loisirs_by_iris[facility_iris] = {
                        'total': 0, 'musique': 0, 'theatre': 0, 'cinema': 0, 
                        'conservatoire': 0, 'bibliotheque': 0, 
                        'institution_culturelle': 0, 'musee': 0,
                        'tennis': 0, 'gym': 0, 'pool': 0
                    }
                loisirs_by_iris[facility_iris]['total'] += 1
                loisirs_by_iris[facility_iris][cat] += 1
                break 

        points_geojson['features'].append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [point.x, point.y]},
            "properties": {"category": cat, "name": facility.get('name', 'Équipement'), "iris": facility_iris}
        })
    
    print(f"Total matched: {matched_count}/{len(all_facilities)}")
    with open('public/loisirs_by_iris.json', 'w') as f: json.dump(loisirs_by_iris, f, indent=2)
    with open('public/loisirs.geojson', 'w') as f: json.dump(points_geojson, f)
    print("Done!")

if __name__ == "__main__":
    process_loisirs()
