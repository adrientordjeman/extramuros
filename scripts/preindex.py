import json
import os
from shapely.geometry import shape, Point, mapping
from shapely.strtree import STRtree
import pandas as pd

def run_preindex():
    print("🚀 Starting pre-indexation...")
    
    public_dir = "/Users/adrientordjeman/Documents/quartier_ideal/public"
    
    # Files
    neighborhoods_path = os.path.join(public_dir, "idf-quartiers.geojson")
    commerces_path = os.path.join(public_dir, "commerces.geojson")
    stations_path = os.path.join(public_dir, "stations.geojson")
    schools_path = os.path.join(public_dir, "schools.geojson")
    amenities_path = os.path.join(public_dir, "amenities.geojson")
    markets_path = os.path.join(public_dir, "markets.geojson")
    prices_path = os.path.join(public_dir, "idf_prices.json")
    pediatres_path = os.path.join(public_dir, "pediatres.geojson")
    safety_path = os.path.join(public_dir, "commune_safety.json")
    zsp_path = os.path.join(public_dir, "zsp.geojson")
    caf_path = os.path.join("/Users/adrientordjeman/Documents/quartier_ideal", "data/caf_coverage.csv")
    riviera_path = os.path.join(public_dir, "riviera.geojson")
    finances_path = os.path.join(public_dir, "commune_finances.json")
    
    with open(neighborhoods_path, 'r') as f:
        neighborhoods_gj = json.load(f)
    
    with open(prices_path, 'r') as f:
        prices_data = json.load(f)
        
    commune_safety = {}
    if os.path.exists(safety_path):
        with open(safety_path, 'r') as f:
            commune_safety = json.load(f)
            
    # Calculate department and IDF averages for safety
    dept_safety_avg = {}
    idf_safety_total = {'pop': 0, 'burg': 0, 'ass': 0, 'theft': 0}
    
    for insee, m in commune_safety.items():
        if not insee.isdigit() or len(insee) != 5: continue
        dept = insee[:2]
        if dept not in dept_safety_avg:
            dept_safety_avg[dept] = {'pop': 0, 'burg': 0, 'ass': 0, 'theft': 0}
        
        pop = m.get('population', 0)
        dept_safety_avg[dept]['pop'] += pop
        dept_safety_avg[dept]['burg'] += m.get('burglaries', 0)
        dept_safety_avg[dept]['ass'] += m.get('assaults', 0)
        dept_safety_avg[dept]['theft'] += m.get('thefts', 0)
        
        idf_safety_total['pop'] += pop
        idf_safety_total['burg'] += m.get('burglaries', 0)
        idf_safety_total['ass'] += m.get('assaults', 0)
        idf_safety_total['theft'] += m.get('thefts', 0)

    for dept in dept_safety_avg:
        d = dept_safety_avg[dept]
        if d['pop'] > 0:
            d['burglaries_rate'] = round((d['burg'] / d['pop']) * 1000, 2)
            d['assaults_rate'] = round((d['ass'] / d['pop']) * 1000, 2)
            d['thefts_rate'] = round((d['theft'] / d['pop']) * 1000, 2)
        else:
            d['burglaries_rate'] = 0
            d['assaults_rate'] = 0
            d['thefts_rate'] = 0

    if idf_safety_total['pop'] > 0:
        idf_safety_avg = {
            'burglaries_rate': round((idf_safety_total['burg'] / idf_safety_total['pop']) * 1000, 2),
            'assaults_rate': round((idf_safety_total['ass'] / idf_safety_total['pop']) * 1000, 2),
            'thefts_rate': round((idf_safety_total['theft'] / idf_safety_total['pop']) * 1000, 2)
        }
    else:
        idf_safety_avg = {'burglaries_rate': 2.74, 'assaults_rate': 5.57, 'thefts_rate': 29.79}

    commune_finances = {}
    if os.path.exists(finances_path):
        with open(finances_path, 'r') as f:
            commune_finances = json.load(f)
        print(f"✅ Loaded finances for {len(commune_finances)} communes.")
    else:
        print("⚠️ commune_finances.json not found. Run compute-finances.py first.")
            
    zsp_polygons = []
    if os.path.exists(zsp_path):
        with open(zsp_path, 'r') as f:
            zsp_gj = json.load(f)
            for zf in zsp_gj.get('features', []):
                if zf.get('geometry'):
                    zsp_polygons.append(shape(zf['geometry']))
    
    commune_caf = {}
    if os.path.exists(caf_path):
        try:
            df_caf = pd.read_csv(caf_path, sep=';', low_memory=False)
            # Filter for most recent year if multiple
            if 'Date référence' in df_caf.columns:
                max_year = df_caf['Date référence'].max()
                df_caf = df_caf[df_caf['Date référence'] == max_year]
            
            for _, row in df_caf.iterrows():
                insee_c = str(row['Numéro commune']).zfill(5)
                commune_caf[insee_c] = {
                    'taux_couv_eaje': float(str(row.get('Taux de couv EAJE - ensemble', 0)).replace(',', '.')),
                    'taux_couv_global': float(str(row.get('Taux de couv global', 0)).replace(',', '.'))
                }
        except Exception as e:
            print(f"⚠️ Error loading CAF data: {e}")
        
    # 1. Create Polygons and spatial index
    polygons = []
    idx_to_insee = {}
    
    for i, feature in enumerate(neighborhoods_gj['features']):
        insee = feature['properties']['code']
        if isinstance(insee, list): insee = insee[0]
        poly = shape(feature['geometry'])
        polygons.append(poly)
        idx_to_insee[i] = insee
        
    tree = STRtree(polygons)
    print(f"✅ Created spatial index for {len(polygons)} neighborhoods.")

    # 1b. Load nature areas for centroid weighting
    print("🌳 Loading nature areas to adjust centroids...")
    nature_path = os.path.join(public_dir, "espaces-verts-et-boises-surfaciques-ouverts-ou-en-projets-douverture-au-public.geojson")
    nature_polygons = []
    if os.path.exists(nature_path):
        with open(nature_path, 'r') as f:
            nature_gj = json.load(f)
            for nf in nature_gj.get('features', []):
                if nf.get('geometry'):
                    nature_polygons.append(shape(nf['geometry']))
    
    nature_tree = STRtree(nature_polygons)
    print(f"✅ Loaded {len(nature_polygons)} nature polygons.")

    # Calculate habitable centroids (IRIS minus nature)
    print("⚖️  Calculating habitable centroids (excluding nature)...")
    habitable_centroids = {} # insee -> Point
    for i, poly in enumerate(polygons):
        insee = idx_to_insee[i]
        habitable_poly = poly
        
        # Find intersecting nature areas
        potential_nature_idx = nature_tree.query(poly)
        for n_idx in potential_nature_idx:
            n_poly = nature_polygons[n_idx]
            if habitable_poly.intersects(n_poly):
                try:
                    # Subtract nature from the IRIS polygon
                    habitable_poly = habitable_poly.difference(n_poly)
                except Exception:
                    continue
        
        if not habitable_poly.is_empty and habitable_poly.area > (poly.area * 0.01):
            habitable_centroids[insee] = habitable_poly.centroid
        else:
            habitable_centroids[insee] = poly.centroid
    print("✅ Habitable centroids computed.")

    baked_index = {
        "neighbors": {},
        "points": {insee: {"commerces": [], "stations": [], "schools": [], "amenities": [], "sport": [], "culture": [], "pediatres": [], "marche": [], "riviera": []} for insee in idx_to_insee.values()},
        "transactions": {}
    }

    # 2. Neighbors
    print("📏 Computing adjacency...")
    for i, poly in enumerate(polygons):
        insee = idx_to_insee[i]
        query_indices = tree.query(poly)
        neighbors = []
        for q_idx in query_indices:
            if q_idx != i and poly.touches(polygons[q_idx]):
                neighbors.append(idx_to_insee[q_idx])
        baked_index["neighbors"][insee] = neighbors

    # 3. Map points
    def map_points(path, category):
        print(f"📍 Mapping {category}...")
        if not os.path.exists(path):
            print(f"⚠️  File not found: {path}")
            return
        with open(path, 'r') as f:
            data = json.load(f)
        
        count = 0
        for feature in data['features']:
            # Brand detection for bio stores
            name = feature['properties'].get('name', '')
            if name:
                low_name = name.lower()
                if any(brand in low_name for brand in ['biocoop', 'naturalia', 'bio c\' bon', 'la vie claire', 'l\'eau vive', 'natur\u00e9o', 'so.bio']):
                    feature['properties']['category'] = 'bio'
                    feature['properties']['emoji'] = '\ud83c\udf3f' # 🌿
                    if 'biocoop' in low_name:
                        feature['properties']['is_biocoop'] = True
                    if 'naturalia' in low_name:
                        feature['properties']['is_naturalia'] = True
                
                if 'picard' in low_name:
                    feature['properties']['is_picard'] = True
                    feature['properties']['emoji'] = '\u2744\ufe0f' # ❄️

            # Market-specific logic
            if category == "marche":
                name = feature['properties'].get('name', '').lower()
                # Basic heuristic: if name contains 'halle' or 'couvert', mark as covered
                if any(x in name for x in ['halle', 'couvert']):
                    feature['properties']['is_covered'] = True
                else:
                    feature['properties']['is_covered'] = False

            pt = Point(feature['geometry']['coordinates'])
            potential_idx = tree.query(pt)
            for idx in potential_idx:
                if polygons[idx].contains(pt):
                    insee = idx_to_insee[idx]
                    baked_index["points"][insee][category].append(feature)
                    count += 1
                    break
        print(f"✅ Mapped {count} {category}.")

    map_points(commerces_path, "commerces")
    map_points(stations_path, "stations")
    map_points(schools_path, "schools")
    map_points(amenities_path, "amenities")
    map_points(pediatres_path, "pediatres")
    map_points(markets_path, "marche")
    map_points(riviera_path, "riviera")

    # Map Loisirs (split into sport and culture)
    print("📍 Mapping loisirs (sport & culture)...")
    loisirs_path = os.path.join(public_dir, "loisirs.geojson")
    if os.path.exists(loisirs_path):
        with open(loisirs_path, 'r') as f:
            data = json.load(f)
        
        sport_cats = {'tennis', 'gym', 'pool'}
        count_sport = 0
        count_culture = 0
        for feature in data['features']:
            pt = Point(feature['geometry']['coordinates'])
            potential_idx = tree.query(pt)
            for idx in potential_idx:
                if polygons[idx].contains(pt):
                    insee = idx_to_insee[idx]
                    cat = feature['properties'].get('category', '')
                    if cat in sport_cats:
                        baked_index["points"][insee]["sport"].append(feature)
                        count_sport += 1
                    else:
                        baked_index["points"][insee]["culture"].append(feature)
                        count_culture += 1
                    break
        print(f"✅ Mapped {count_sport} sport and {count_culture} culture.")

    # 4. Map DVF Transactions
    print("📍 Mapping official DVF transactions...")
    
    # --- Path Length Calculation ---
    print("📍 Calculating path lengths for runner paradise badge...")
    paths_path = "public/osm_paths.geojson"
    path_lengths = {} # insee -> length_in_meters
    
    if os.path.exists(paths_path):
        with open(paths_path, 'r') as f:
            paths_data = json.load(f)
            
        def get_dist(p1, p2):
            # Simple equirectangular approximation for small distances
            from math import cos, radians, sqrt
            R = 6371000 # Earth radius in meters
            x = (radians(p2[0]) - radians(p1[0])) * cos(radians((p1[1] + p2[1]) / 2))
            y = radians(p2[1]) - radians(p1[1])
            return sqrt(x*x + y*y) * R

        for feature in paths_data['features']:
            coords = feature['geometry']['coordinates']
            length = 0
            for i in range(len(coords) - 1):
                length += get_dist(coords[i], coords[i+1])
            
            # Assign to the IRIS of the midpoint
            mid_pt = Point(coords[len(coords)//2][0], coords[len(coords)//2][1])
            potential_idx = tree.query(mid_pt)
            for idx in potential_idx:
                if polygons[idx].contains(mid_pt):
                    insee = idx_to_insee[idx]
                    path_lengths[insee] = path_lengths.get(insee, 0) + length
                    break
    
    # Store in baked index (we'll merge it into iris properties later)
    baked_index["path_lengths"] = path_lengths
    transactions_path = "data/dvf-full.csv.gz"
    if os.path.exists(transactions_path):
        try:
            df = pd.read_csv(transactions_path, compression='gzip', low_memory=False)
            df = df.dropna(subset=['latitude', 'longitude', 'valeur_fonciere', 'surface_reelle_bati'])
            idf_depts = ['75', '77', '78', '91', '92', '93', '94', '95']
            df['code_departement'] = df['code_departement'].astype(str).str.zfill(2)
            df = df[df['code_departement'].isin(idf_depts)]
            df = df[df['nature_mutation'] == 'Vente']
            
            # Deduplicate by id_mutation to avoid price repetition for multi-lot sales
            # Take the mutation with the largest surface or just the first one
            df = df.sort_values(['id_mutation', 'surface_reelle_bati'], ascending=[True, False])
            df = df.drop_duplicates(subset=['id_mutation'])
            
            # Basic filtering for consistency with pricing script
            df['Price_Sqm'] = df['valeur_fonciere'] / df['surface_reelle_bati']
            df = df[(df['Price_Sqm'] > 1000) & (df['Price_Sqm'] < 35000)]

            # Re-sort by date desc for recent history
            df = df.sort_values('date_mutation', ascending=False)
            
            # Mapping with type priority (10 houses + 10 apts per Iris)
            count = 0
            for _, row in df.iterrows():
                pt = Point(row['longitude'], row['latitude'])
                potential_idx = tree.query(pt)
                for idx in potential_idx:
                    if polygons[idx].contains(pt):
                        insee = idx_to_insee[idx]
                        if insee not in baked_index["transactions"]:
                            baked_index["transactions"][insee] = {"house": [], "apt": []}
                        
                        t_type = "house" if row['type_local'] == 'Maison' else "apt"
                        if len(baked_index["transactions"][insee][t_type]) < 10:
                            # Construct address string carefully (handle NaN)
                            num = str(row['adresse_numero']) if not pd.isna(row['adresse_numero']) else ""
                            suf = str(row['adresse_suffixe']) if not pd.isna(row['adresse_suffixe']) else ""
                            voie = str(row['adresse_nom_voie']) if not pd.isna(row['adresse_nom_voie']) else ""
                            addr = f"{num} {suf} {voie}".strip().replace("  ", " ")
                            
                            baked_index["transactions"][insee][t_type].append({
                                "type": row['type_local'],
                                "price": int(row['valeur_fonciere']),
                                "sqm": int(row['surface_reelle_bati']),
                                "rooms": int(row.get('nombre_pieces_principales', 0)),
                                "date": row['date_mutation'],
                                "addr": addr,
                                "lat": float(row['latitude']),
                                "lng": float(row['longitude'])
                            })
                            count += 1
                        break
            print(f"✅ Mapped {count} deduplicated transactions.")
        except Exception as e:
            print(f"⚠️  DVF Processing failed: {e}")
    else:
        print("⚠️  DVF file not found, skipping official records.")

    # 5. Save Baked Index
    baked_output = os.path.join(public_dir, "baked_index.json")
    with open(baked_output, 'w') as f:
        # Include path_lengths in the baked index
        json.dump({
            "points": baked_index["points"],
            "neighbors": baked_index["neighbors"],
            "transactions": baked_index["transactions"],
            "path_lengths": baked_index.get("path_lengths", {})
        }, f)
    print(f"💾 Saved baked index to {baked_output}")

    # 6. Pre-calculate 800m counts for happiness score
    print("🧮 Pre-calculating 800m facility counts for happiness score...")
    # Create centroid points for all neighborhoods using habitable centroids
    neighborhood_centroids = []
    for i in range(len(polygons)):
        insee = idx_to_insee[i]
        neighborhood_centroids.append(habitable_centroids[insee])
    
    # We use a point-in-radius query. STRtree doesn't support radius directly, 
    # so we use a buffer query or just a bbox + distance check.
    # But wait, we can also just use the points already assigned to IRIS and their neighbors.
    # Actually, the 800m radius is more precise.
    
    # Let's combine all points into one big list with their category
    all_points = []
    for insee, pts in baked_index["points"].items():
        for cat, features in pts.items():
            for f in features:
                all_points.append({
                    "pos": Point(f['geometry']['coordinates']),
                    "cat": cat,
                    "sub_cat": f['properties'].get('category', ''),
                    "name": f['properties'].get('name', ''),
                    "props": f['properties']
                })
    
    point_tree = STRtree([p["pos"] for p in all_points])
    
    aggregated_counts = {}
    for i, centroid in enumerate(neighborhood_centroids):
        insee = idx_to_insee[i]
        # Query points in a ~1km box around centroid
        buffer_val = 0.015 # roughly 1.5km
        query_geom = centroid.buffer(buffer_val)
        potential_pt_indices = point_tree.query(query_geom)
        
        counts = {
            "commerces": 0, "stations": 0, "schools": 0, "amenities": 0, "sport": 0, "culture": 0,
            "boulangerie": 0, "pharmacie": 0, "supermarket": 0, "bio": 0, "restaurants": 0, "fast_food": 0, "bars": 0, "cafes": 0, "pubs": 0,
            "theatres": 0, "cinemas": 0, "musees": 0, "gym": 0, "pool": 0, "pediatres": 0, "jeux": 0,
            "tennis": 0, "biblios": 0, "conservatoires": 0, "concerts": 0,
            "boucherie": 0, "fromagerie": 0, "caviste": 0, "marche": 0, "picard": 0, "poste": 0, "church": 0,
            "poissonnerie": 0, "fleuriste": 0, "chocolatier": 0, "epicerie_fine": 0,
            "primeur": 0, "habillement": 0, "jouets": 0, "chaussures": 0,
            "riviera": 0,
            "marina": 0, "slipway": 0, "guinguette": 0, "towpath": 0,
            "transport_lines": set() # Internal use for connectivity within 800m
        }
        
        for pt_idx in potential_pt_indices:
            p = all_points[pt_idx]
            # More accurate distance calculation
            from math import radians, cos, sqrt
            lat1, lon1 = centroid.y, centroid.x
            lat2, lon2 = p["pos"].y, p["pos"].x
            
            dx = (lon2 - lon1) * 111320 * cos(radians((lat1 + lat2) / 2))
            dy = (lat2 - lat1) * 110574
            dist = sqrt(dx*dx + dy*dy)

            if dist <= 800:
                counts[p["cat"]] += 1
                props = p.get("props", {})
                
                if p["cat"] == "stations":
                    mode = (props.get("mode") or "").upper()
                    if "TRAM" in mode: mode = "TRAM"
                    ls = props.get("lines", [])
                    if not ls:
                        ls = [props.get("line") or props.get("res_com")]
                    elif not isinstance(ls, list):
                        ls = [ls]
                        
                    for l in ls:
                        if l:
                            counts["transport_lines"].add(f"{mode}:{l}")

                scat = p["sub_cat"]
                if scat == 'boulangerie': counts["boulangerie"] += 1
                elif scat == 'pharmacie': counts["pharmacie"] += 1
                elif scat in ['supermarché', 'supermarket', 'supermarche']: counts["supermarket"] += 1
                if scat == 'bio' or 'bio' in (p["sub_cat"] or "").lower(): counts["bio"] += 1
                if scat == 'restaurant': counts["restaurants"] += 1
                if scat == 'fast_food': counts["fast_food"] += 1
                if scat == 'bar': counts["bars"] += 1
                if scat == 'cafe': counts["cafes"] += 1
                if scat == 'pub': counts["pubs"] += 1
                if scat == 'poissonnerie': counts["poissonnerie"] += 1
                if scat == 'fleuriste': counts["fleuriste"] += 1
                if scat == 'chocolatier': counts["chocolatier"] += 1
                if scat == 'epicerie_fine': counts["epicerie_fine"] += 1
                elif scat == 'primeur': counts["primeur"] += 1
                elif scat == 'habillement': counts["habillement"] += 1
                elif scat == 'jouets': counts["jouets"] += 1
                elif scat == 'chaussures': counts["chaussures"] += 1
                if scat == 'theatre': counts["theatres"] += 1
                if scat == 'cinema': counts["cinemas"] += 1
                if scat == 'musique': counts["concerts"] += 1
                if scat in ['musee', 'institution_culturelle']: counts["musees"] += 1
                if scat == 'gym': counts["gym"] += 1
                if scat == 'pool': counts["pool"] += 1
                if scat in ['playground', 'ludotheque']: counts["jeux"] += 1
                if scat == 'tennis': counts["tennis"] += 1
                if scat == 'bibliotheque': counts["biblios"] += 1
                if scat == 'conservatoire': counts["conservatoires"] += 1
                
                # New categories
                if scat == 'butcher' or scat == 'boucherie': counts["boucherie"] += 1
                if scat == 'cheese' or scat == 'fromagerie': counts["fromagerie"] += 1
                if scat == 'wine' or scat == 'caviste' or scat == 'alcohol': counts["caviste"] += 1
                if scat == 'marketplace' or scat == 'marche': counts["marche"] += 1
                if scat == 'post_office' or scat == 'bureau_de_poste': counts["poste"] += 1
                if scat == 'church': counts["church"] += 1
                
                # Riviera sub-categories
                if scat == 'marina': counts["marina"] += 1
                elif scat == 'slipway': counts["slipway"] += 1
                elif scat == 'guinguette': counts["guinguette"] += 1
                elif scat == 'towpath': counts["towpath"] += 1
                
                # Brand checks
                name = (p.get("name") or "").lower()
                if 'picard' in name: counts["picard"] += 1

        # Calculate 800m connectivity score and flags
        connectivity = 0
        has_metro = False
        has_rer = False
        has_train = False
        has_tram = False
        
        for line_key in counts.get("transport_lines", []):
            mode = line_key.split(":")[0]
            if mode == 'METRO':
                connectivity += 50
                has_metro = True
            elif mode == 'RER':
                connectivity += 50
                has_rer = True
            elif mode == 'TRAIN':
                connectivity += 50
                has_train = True
            elif mode == 'TRAM':
                connectivity += 25
                has_tram = True
            elif mode == 'BUS':
                connectivity += 10
        
        counts["connectivity"] = min(100, connectivity)
        counts["has_metro"] = has_metro
        counts["has_rer"] = has_rer
        counts["has_train"] = has_train
        counts["has_tram"] = has_tram
        
        # Remove set for JSON serialization
        if "transport_lines" in counts:
            del counts["transport_lines"]

        aggregated_counts[insee] = counts

    # 6b. Pre-calculate Commune/Arrondissement counts for infrastructures
    print("🏙️ Pre-calculating Commune/Arrondissement infrastructure counts...")
    commune_counts = {}
    infra_cats = ['biblios', 'conservatoires', 'tennis', 'pool', 'cinemas', 'theatres', 'musees', 'jeux', 'marche', 'concerts']
    
    for insee, counts in aggregated_counts.items():
        commune_code = insee[:5] # This naturally handles Paris Arrondissements (75101-75120)
        if commune_code not in commune_counts:
            commune_counts[commune_code] = {cat: 0 for cat in infra_cats}
        
        # We need to be careful: aggregated_counts[insee] already has 800m counts.
        # We should use the RAW counts per IRIS instead of the 800m ones to avoid overcounting.
        # Wait, I don't have RAW counts per IRIS here yet.
    
    # Let's do it properly by iterating over points
    raw_iris_counts = {insee: {cat: 0 for cat in infra_cats} for insee in idx_to_insee.values()}
    for insee, pts in baked_index["points"].items():
        if insee not in raw_iris_counts: continue
        for cat_type, features in pts.items():
            for f in features:
                scat = f['properties'].get('category', '')
                if scat in ['bibliotheque', 'mediatheque']: raw_iris_counts[insee]['biblios'] += 1
                elif scat == 'conservatoire': raw_iris_counts[insee]['conservatoires'] += 1
                elif scat == 'tennis': raw_iris_counts[insee]['tennis'] += 1
                elif scat == 'pool': raw_iris_counts[insee]['pool'] += 1
                elif scat == 'cinema': raw_iris_counts[insee]['cinemas'] += 1
                elif scat == 'theatre': raw_iris_counts[insee]['theatres'] += 1
                elif scat == 'musique': raw_iris_counts[insee]['concerts'] += 1
                elif scat in ['musee', 'institution_culturelle']: raw_iris_counts[insee]['musees'] += 1
                elif scat in ['playground', 'ludotheque']: raw_iris_counts[insee]['jeux'] += 1
                elif scat == 'marche': raw_iris_counts[insee]['marche'] += 1

    commune_infra = {}
    for insee, counts in raw_iris_counts.items():
        commune_code = insee[:5]
        if commune_code not in commune_infra:
            commune_infra[commune_code] = {cat: 0 for cat in infra_cats}
        for cat in infra_cats:
            commune_infra[commune_code][cat] += counts[cat]

    # 7. Optimize GeoJSON & Merge properties
    print("💎 Optimizing geometry & merging properties...")
    optimized_gj = {"type": "FeatureCollection", "features": []}
    
    for feature in neighborhoods_gj['features']:
        insee = feature['properties']['code']
        if isinstance(insee, list): insee = insee[0]
        meta = prices_data.get(insee, {})
        geom = feature['geometry']
        def reduce_precision(coords):
            if isinstance(coords[0], (int, float)):
                return [round(c, 5) for c in coords]
            return [reduce_precision(c) for c in coords]
            
        counts = aggregated_counts.get(insee, {})
        c_infra = commune_infra.get(insee[:5], {})
        
        # Use idf_safety_avg calculated at the beginning
        idf_avg = idf_safety_avg
        safety_metrics = commune_safety.get(insee[:5], {'burglaries_rate': 0, 'assaults_rate': 0, 'thefts_rate': 0}).copy()
        
        # Add averages for comparison
        safety_metrics['idf_avg'] = idf_avg
        safety_metrics['dept_avg'] = dept_safety_avg.get(insee[:2], idf_avg)
        
        if idf_avg['burglaries_rate'] > 0:
            safety_metrics['burglaries_diff'] = round(((safety_metrics['burglaries_rate'] - idf_avg['burglaries_rate']) / idf_avg['burglaries_rate']) * 100)
        if idf_avg['assaults_rate'] > 0:
            safety_metrics['assaults_diff'] = round(((safety_metrics['assaults_rate'] - idf_avg['assaults_rate']) / idf_avg['assaults_rate']) * 100)
        if idf_avg['thefts_rate'] > 0:
            safety_metrics['thefts_diff'] = round(((safety_metrics['thefts_rate'] - idf_avg['thefts_rate']) / idf_avg['thefts_rate']) * 100)
        is_zsp = False
        poly_geom = shape(geom)
        for z_poly in zsp_polygons:
            if poly_geom.intersects(z_poly):
                is_zsp = True
                break
                
        tot_rate = safety_metrics.get('burglaries_rate', 0) + safety_metrics.get('assaults_rate', 0) + safety_metrics.get('thefts_rate', 0)
        safety_score = round(max(0, min(100, 100 - (tot_rate * 1.5))))

        # CAF Coverage
        caf_data = commune_caf.get(insee[:5], {'taux_couv_eaje': 0, 'taux_couv_global': 0})
        
        # Consolidation: max(800m, commune)
        infra_consolidated = {cat: max(counts.get(cat, 0), c_infra.get(cat, 0)) for cat in infra_cats}
        # Merge consolidated infra back into counts
        counts.update(infra_consolidated)

        # PRE-CALCULATE STATIC SCORES (Mirror main.js logic)
        # 1. ENV
        nature = feature['properties'].get('nature', 50)
        noise = feature['properties'].get('noise', 20)
        blue = feature['properties'].get('is_blue', False)
        park = feature['properties'].get('near_park', False)
        
        nom_lower = feature['properties']['nom'].lower()
        water_keywords = [
            'sur-marne', 'sur-seine', 'sur-oise', 'sur-morin', 'sur-loing',
            'bords de', 'quai ', 'ile ', 'île ', 'lac ', 'étang', 'étangs',
            'canal', 'darse', 'enghien', 'le pecq'
        ]
        if any(x in nom_lower for x in water_keywords):
            blue = True

        pav = meta.get('pav', 0)
        env_base = nature + (pav * 25) # Bonus for private green spaces
        
        riviera_bonus = (counts.get('marina', 0) * 10) + (counts.get('towpath', 0) * 5)
        env_score = round(max(0, min(100, env_base + (15 if blue else 0) + (10 if park else 0) + riviera_bonus - (noise * 0.4))))

        # 2. SERVICES (Weighted Diversity Scale)
        serv_score = 0
        # Pillar 1: Essentials (30 pts)
        if counts.get('boulangerie', 0) > 0: serv_score += 10
        if counts.get('pharmacie', 0) > 0: serv_score += 10
        if counts.get('supermarket', 0) > 0: serv_score += 10
        
        # Pillar 2: Gastronomy & Quality (40 pts)
        if counts.get('boucherie', 0) > 0: serv_score += 10
        if counts.get('fromagerie', 0) > 0: serv_score += 10
        if counts.get('bio', 0) > 0: serv_score += 10
        if counts.get('poissonnerie', 0) > 0: serv_score += 10
        if counts.get('caviste', 0) > 0: serv_score += 5
        if counts.get('chocolatier', 0) > 0: serv_score += 5
        if counts.get('epicerie_fine', 0) > 0: serv_score += 5
        if counts.get('marche', 0) > 0: serv_score += 5
        if counts.get('fleuriste', 0) > 0: serv_score += 5
        if counts.get('primeur', 0) > 0: serv_score += 10
        if counts.get('habillement', 0) > 0: serv_score += 5
        if counts.get('jouets', 0) > 0: serv_score += 5
        if counts.get('chaussures', 0) > 0: serv_score += 5
        
        # Pillar 3: Vie Sociale & Café (15 pts) - Moving cafes to commerces as requested
        if counts.get('cafes', 0) > 0: serv_score += 10
        if counts.get('bars', 0) > 0 or counts.get('pubs', 0) > 0: serv_score += 5
        
        # Pillar 4: Pratique (15 pts)
        if counts.get('picard', 0) > 0: serv_score += 5
        if counts.get('poste', 0) > 0: serv_score += 5
        if counts.get('pediatres', 0) > 0: serv_score += 5
        
        # Pillar 5: Density Bonus (10 pts)
        # Up to 10 pts based on total commerce count
        density_bonus = min(10, counts.get('commerces', 0) * 1)
        serv_score += density_bonus
        
        serv_score = round(min(100, serv_score))

        # 3. FAMILY
        ips = feature['properties'].get('ips', 100)
        ips_norm = min(100, max(0, (ips - 70) / (140 - 70) * 100))
        fam_score = round(min(100, (ips_norm * 0.6) + min(40, counts.get('schools', 0) * 12)))

        # 4. SOCIAL (Sorties & Gastronomie)
        # Weighting: Real Restaurants (10 pts), Fast Food (4 pts), Bars/Pubs (6 pts)
        soc_score = round(min(100, (counts.get('restaurants', 0) * 10) + (counts.get('fast_food', 0) * 4) + (counts.get('bars', 0) * 6) + (counts.get('pubs', 0) * 6) + (counts.get('guinguette', 0) * 15)))

        # 5. INFRA (Infrastructures Municipales)
        total_sport = counts.get('gym', 0) + counts.get('pool', 0) + counts.get('tennis', 0)
        total_cult = counts.get('cinemas', 0) + counts.get('theatres', 0) + counts.get('musees', 0) + counts.get('concerts', 0)
        # Add bonus from CAF coverage (up to 20 points)
        caf_bonus = min(20, caf_data['taux_couv_eaje'] * 0.4) 
        infra_score = round(min(100, (total_cult * 12) + (total_sport * 10) + ((counts.get('biblios', 0) + counts.get('conservatoires', 0) + counts.get('jeux', 0)) * 15) + caf_bonus))

        # 6. CONNECTIVITY (Now using 800m pre-calculated values)
        connectivity = counts.get("connectivity", 0)

        # Coolness
        calm_factor = max(0, (100 - noise) / 100)
        coolness_base = (nature * 0.6) + (35 if blue else 0)
        coolness = round(min(100, max(0, coolness_base * (0.5 + 0.5 * calm_factor))))

        static_scores = {
            "env": env_score,
            "services": serv_score,
            "family": fam_score,
            "social": soc_score,
            "infra": infra_score,
            "coolness": coolness,
            "connectivity": connectivity,
            "safety": safety_score
        }

        new_feature = {
            "type": "Feature",
            "id": insee,
            "properties": {
                "code": insee,
                "nom": feature['properties']['nom'],
                "commune": feature['properties'].get('nom_com') or (feature['properties']['nom'].split(' (')[0] if ' (' in feature['properties']['nom'] else feature['properties']['nom']),
                "house": meta.get('house'),
                "apt": meta.get('apt'),
                "all": meta.get('all'),
                "vibe": meta.get('vibe'),
                "counts": counts,
                "staticScores": static_scores,
                "gVol": meta.get('gVol'),
                "pav": meta.get('pav'),
                "noise": meta.get('noise', 0),
                "nature": meta.get('nature', 0),
                "ips": meta.get('ips'),
                "demo": meta.get('demo', {}),
                "vibes": meta.get('vibes', {}),
                "serenity": meta.get('serenity', 100),
                "is_blue": blue,
                "near_park": park,
                "is_zsp": is_zsp,
                "safety_metrics": safety_metrics,
                "has_metro": counts.get("has_metro", False),
                "has_rer": counts.get("has_rer", False),
                "has_train": counts.get("has_train", False),
                "has_tram": counts.get("has_tram", False),
                "lat": round(habitable_centroids[insee].y, 5),
                "lon": round(habitable_centroids[insee].x, 5),
                "path_len": int(path_lengths.get(insee, 0)),
                "cluster_path_len": int(path_lengths.get(insee, 0) + sum(path_lengths.get(nid, 0) for nid in baked_index["neighbors"].get(insee, []))),
                "caf_coverage": caf_data,
                "finances": commune_finances.get(insee[:5], {})
            },
            "geometry": {
                "type": geom['type'],
                "coordinates": reduce_precision(geom['coordinates'])
            }
        }
        optimized_gj['features'].append(new_feature)

    optimized_output = os.path.join(public_dir, "idf-quartiers-optimized.geojson")
    with open(optimized_output, 'w') as f:
        json.dump(optimized_gj, f)
    print(f"💾 Saved optimized geometry to {optimized_output}")
    print("✨ Pre-indexation complete!")

if __name__ == "__main__":
    run_preindex()
