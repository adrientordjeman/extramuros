EXPERT_RULES = [
    # Le Raincy
    {"commune": "le raincy", "nom_contains": ["plateau", "haut"], "segment": "Le Standing Patrimonial"},
    {"commune": "le raincy", "nom_contains": ["centre", "mairie", "résistance"], "segment": "Le Village Urbain"},
    {"commune": "le raincy", "nom_contains": [], "segment": "Le Standing Patrimonial"}, # Default

    # Villemomble
    {"commune": "villemomble", "nom_contains": ["église", "mairie", "centre"], "segment": "Le Standing Patrimonial"},
    {"commune": "villemomble", "nom_contains": ["époque", "gare"], "segment": "Le Faubourg / Maison de Ville"},
    {"commune": "villemomble", "nom_contains": ["fosse", "bergers"], "segment": "Le Néo-Résidentiel"},

    # Saint-Maur-des-Fossés
    {"commune": "saint-maur-des-fossés", "nom_contains": ["varenne", "marne", "pie"], "segment": "La Riviera (Bords de l'Eau)"},
    {"commune": "saint-maur-des-fossés", "nom_contains": ["vieux", "adamville", "centre", "mairie"], "segment": "Le Village Urbain"},
    {"commune": "saint-maur-des-fossés", "nom_contains": ["champignol", "créteil"], "segment": "Le Pavillonnaire Familial"},

    # Nogent-sur-Marne
    {"commune": "nogent-sur-marne", "nom_contains": ["plateau", "bois", "vincennes"], "segment": "Le Standing Patrimonial"},
    {"commune": "nogent-sur-marne", "nom_contains": ["centre", "grande rue", "mairie", "gaulle"], "segment": "Le Village Urbain"},
    {"commune": "nogent-sur-marne", "nom_contains": ["port", "marne", "baltard"], "segment": "La Riviera (Bords de l'Eau)"},

    # Pantin
    {"commune": "pantin", "nom_contains": ["ourcq", "mairie", "hoche"], "segment": "Le Faubourg / Maison de Ville"},
    {"commune": "pantin", "nom_contains": ["église", "centre"], "segment": "Le Néo-Résidentiel"},
    {"commune": "pantin", "nom_contains": ["quatre", "chemins", "haut"], "segment": "Le Faubourg / Maison de Ville"},
    {"commune": "pantin", "nom_contains": ["courtillières", "gervais"], "segment": "Le Coteau résidentiel"},

    # Montreuil
    {"commune": "montreuil", "nom_contains": ["bas", "république", "étienne", "marcel", "robespierre", "croix de chavaux"], "segment": "Le Faubourg / Maison de Ville"},
    {"commune": "montreuil", "nom_contains": ["mairie", "centre"], "segment": "Le Village Urbain"},
    {"commune": "montreuil", "nom_contains": ["beaumonts", "signac", "parc"], "segment": "Le Standing Patrimonial"},
    {"commune": "montreuil", "nom_contains": ["murs", "pêches", "haut", "ruffins", "branly"], "segment": "Le Faubourg / Maison de Ville"},

    # Issy-les-Moulineaux
    {"commune": "issy-les-moulineaux", "nom_contains": ["cœur", "coeur", "seine", "val de seine"], "segment": "Le Néo-Résidentiel"},
    {"commune": "issy-les-moulineaux", "nom_contains": ["mairie", "centre", "corentin", "celton"], "segment": "Le Village Urbain"},
    {"commune": "issy-les-moulineaux", "nom_contains": ["hauts", "fort", "épinettes", "rodin"], "segment": "Le Coteau résidentiel"},
    {"commune": "issy-les-moulineaux", "nom_contains": ["île", "saint-germain", "ile"], "segment": "La Riviera (Bords de l'Eau)"},

    # Bry-sur-Marne
    {"commune": "bry-sur-marne", "nom_contains": ["marne", "joliot", "curie", "bords"], "segment": "Le Standing Patrimonial"},
    {"commune": "bry-sur-marne", "nom_contains": ["centre", "mairie"], "segment": "Le Village Urbain"},
    {"commune": "bry-sur-marne", "nom_contains": ["pépinière", "europe"], "segment": "Le Néo-Résidentiel"},
    {"commune": "bry-sur-marne", "nom_contains": ["plateau", "louvières"], "segment": "Le Pavillonnaire Familial"},

    # Joinville-le-Pont
    {"commune": "joinville-le-pont", "nom_contains": ["fanac", "marne", "quai", "polangis"], "segment": "La Riviera (Bords de l'Eau)"},
    {"commune": "joinville-le-pont", "nom_contains": ["église", "mairie", "centre"], "segment": "Le Village Urbain"},
    {"commune": "joinville-le-pont", "nom_contains": ["haut", "gallieni", "égalité"], "segment": "Le Néo-Résidentiel"},
    {"commune": "joinville-le-pont", "nom_contains": ["palissy", "bois"], "segment": "Le Standing Patrimonial"},

    # Rueil-Malmaison
    {"commune": "rueil-malmaison", "nom_contains": ["centre", "mairie", "village"], "segment": "Le Village Urbain"},
    {"commune": "rueil-malmaison", "nom_contains": ["plaine", "gare"], "segment": "Le Standing Patrimonial"},
    {"commune": "rueil-malmaison", "nom_contains": ["buzenval", "malmaison", "fouilleuse", "cucufa"], "segment": "Le Coteau résidentiel"},
    {"commune": "rueil-malmaison", "nom_contains": ["seine", "2000", "national"], "segment": "Le Néo-Résidentiel"},

    # Le Perreux-sur-Marne
    {"commune": "le perreux-sur-marne", "nom_contains": ["marne", "artois", "pont"], "segment": "La Riviera (Bords de l'Eau)"},
    {"commune": "le perreux-sur-marne", "nom_contains": ["centre", "mairie", "ledru", "rollin"], "segment": "Le Village Urbain"},
    {"commune": "le perreux-sur-marne", "nom_contains": ["gare", "jonction", "thillards"], "segment": "Le Néo-Résidentiel"},
    {"commune": "le perreux-sur-marne", "nom_contains": ["prairie", "renardières", "clémenceau"], "segment": "Le Pavillonnaire Familial"},

    # Noisy-le-Grand
    {"commune": "noisy-le-grand", "nom_contains": ["abraxas", "théâtre", "pavé", "mont d'est", "horizon", "maille"], "segment": "Le Néo-Résidentiel"},
    {"commune": "noisy-le-grand", "nom_contains": ["centre", "mairie", "bourg"], "segment": "Le Village Urbain"},
    {"commune": "noisy-le-grand", "nom_contains": ["marne", "charmante", "richardets", "bords"], "segment": "Le Coteau résidentiel"},

    # Malakoff
    {"commune": "malakoff", "nom_contains": ["nord", "paris", "plateau", "vanves", "perry", "barbusse"], "segment": "Le Faubourg / Maison de Ville"},
    {"commune": "malakoff", "nom_contains": ["centre", "mairie", "11 novembre"], "segment": "Le Village Urbain"},
    {"commune": "malakoff", "nom_contains": ["sud", "montholon", "châtillon", "stalingrad"], "segment": "Le Pavillonnaire Familial"},

    # Montrouge
    {"commune": "montrouge", "nom_contains": ["mairie", "centre", "hôtel", "jaurès", "république"], "segment": "Le Village Urbain"},
    {"commune": "montrouge", "nom_contains": ["ferry", "sud", "barbara", "brossolette"], "segment": "Le Néo-Résidentiel"},
    {"commune": "montrouge", "nom_contains": ["écrivains", "est", "boileau"], "segment": "Le Faubourg / Maison de Ville"},

    # Sceaux
    {"commune": "sceaux", "nom_contains": ["parc", "lakanal", "château"], "segment": "Le Standing Patrimonial"},
    {"commune": "sceaux", "nom_contains": ["houdan", "centre", "mairie"], "segment": "Le Village Urbain"},
    {"commune": "sceaux", "nom_contains": ["robinson", "coudrais", "blagis"], "segment": "Le Coteau résidentiel"},

    # Antony
    {"commune": "antony", "nom_contains": ["centre", "mairie", "mounié", "église"], "segment": "Le Village Urbain"},
    {"commune": "antony", "nom_contains": ["coulée", "verte", "croix", "berny", "fleurs", "parc"], "segment": "Le Standing Patrimonial"},
    {"commune": "antony", "nom_contains": ["zay", "sud", "vaste"], "segment": "Le Néo-Résidentiel"},
    {"commune": "antony", "nom_contains": ["plateau", "fontaine", "michalon", "rabats"], "segment": "Le Pavillonnaire Familial"},

    # Les Lilas
    {"commune": "les lilas", "nom_contains": ["mairie", "faidherbe", "centre"], "segment": "Le Village Urbain"},
    {"commune": "les lilas", "nom_contains": ["avenir", "paris", "bruyères"], "segment": "Le Faubourg / Maison de Ville"},
    {"commune": "les lilas", "nom_contains": ["sentes", "gainsbourg", "est"], "segment": "Le Néo-Résidentiel"},

    # Villennes-sur-Seine
    {"commune": "villennes-sur-seine", "nom_contains": ["île", "ile", "seine"], "segment": "La Riviera (Bords de l'Eau)"},
    {"commune": "villennes-sur-seine", "nom_contains": ["bourg", "centre", "mairie"], "segment": "Le Village Urbain"},
    {"commune": "villennes-sur-seine", "nom_contains": ["fauveau", "marolles", "coteaux", "haut"], "segment": "Le Coteau résidentiel"},

    # Saint-Cloud
    {"commune": "saint-cloud", "nom_contains": ["village", "centre", "mairie"], "segment": "Le Village Urbain"},
    {"commune": "saint-cloud", "nom_contains": ["montretout", "val d'or", "coteaux"], "segment": "Le Coteau résidentiel"},
    {"commune": "saint-cloud", "nom_contains": ["bureaux", "fouilleuse", "danton"], "segment": "Le Néo-Résidentiel"},
    {"commune": "saint-cloud", "nom_contains": ["parc", "domaine", "pasteur"], "segment": "Le Standing Patrimonial"},
    
    # Enghien-les-Bains
    {"commune": "enghien-les-bains", "nom_contains": ["lac", "casino", "rives"], "segment": "La Riviera (Bords de l'Eau)"},
    
    # Le Vésinet / Chatou / Croissy
    {"commune": "le vésinet", "nom_contains": [], "segment": "Le Standing Patrimonial"},
    {"commune": "chatou", "nom_contains": ["île", "impressionnistes", "fournaise", "seine"], "segment": "La Riviera (Bords de l'Eau)"},
    {"commune": "croissy-sur-seine", "nom_contains": ["seine", "quai"], "segment": "La Riviera (Bords de l'Eau)"},
    {"commune": "samois-sur-seine", "nom_contains": ["seine"], "segment": "La Riviera (Bords de l'Eau)"},
    {"commune": "l'isle-adam", "nom_contains": ["oise", "plage", "île"], "segment": "La Riviera (Bords de l'Eau)"}
]

def apply_expert_rule(commune, nom):
    c = commune.lower()
    n = nom.lower()
    
    # Find matching rules for this commune
    matching_rules = [r for r in EXPERT_RULES if r['commune'] == c]
    if not matching_rules:
        return None
        
    for rule in matching_rules:
        keywords = rule['nom_contains']
        if not keywords: # Default for this commune
            return rule['segment']
        if any(k in n for k in keywords):
            return rule['segment']
            
    # If a commune has rules but no keywords matched, see if there's a default
    defaults = [r for r in matching_rules if not r['nom_contains']]
    if defaults:
        return defaults[0]['segment']
        
    return None
