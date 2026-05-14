const TRANSPORT_QUALITY = {
    'RER': {
        'A': { score: 0.98, note: "" },
        'E': { score: 0.95, note: "" },
        'B': { score: 0.85, note: "Sensible aux retards / travaux" },
        'C': { score: 0.85, note: "Sensible aux retards" },
        'D': { score: 0.80, note: "Fiabilité dégradée / retards fréquents" }
    },
    'TRAIN': {
        'P': { score: 0.85, note: "Travaux fréquents en soirée / coupures" },
        'R': { score: 0.80, note: "Sensible aux retards" },
        'H': { score: 0.98, note: "" },
        'L': { score: 0.95, note: "" },
        'J': { score: 0.95, note: "" },
        'N': { score: 0.95, note: "" },
        'U': { score: 0.95, note: "" },
        'K': { score: 0.90, note: "" }
    },
    'METRO': { score: 1.0, note: "" },
    'BUS': { score: 0.75, note: "Sensible au trafic routier" },
    'TRAM': { score: 0.90, note: "" }
};
const idfmColors = {
    "A": { bg: "#E3051C", text: "#FFFFFF" }, "B": { bg: "#5291CE", text: "#FFFFFF" },
    "C": { bg: "#FFCE00", text: "#000000" }, "D": { bg: "#00814F", text: "#FFFFFF" },
    "E": { bg: "#C04191", text: "#FFFFFF" }, "H": { bg: "#8C5E24", text: "#FFFFFF" },
    "J": { bg: "#C0A611", text: "#000000" }, "K": { bg: "#AE9924", text: "#FFFFFF" },
    "L": { bg: "#C6ACC8", text: "#000000" }, "N": { bg: "#00A88F", text: "#FFFFFF" },
    "P": { bg: "#ECA31C", text: "#000000" }, "R": { bg: "#E2B2B8", text: "#000000" },
    "U": { bg: "#D50032", text: "#FFFFFF" }, "1": { bg: "#FFCE00", text: "#000000" },
    "2": { bg: "#0064B0", text: "#FFFFFF" }, "3": { bg: "#9F9825", text: "#FFFFFF" },
    "3b": { bg: "#98D4E2", text: "#000000" }, "4": { bg: "#C04191", text: "#FFFFFF" },
    "5": { bg: "#F28E42", text: "#000000" }, "6": { bg: "#83C491", text: "#000000" },
    "7": { bg: "#F3A4BA", text: "#000000" }, "7b": { bg: "#83C491", text: "#000000" },
    "8": { bg: "#CEADD2", text: "#000000" }, "9": { bg: "#D5C900", text: "#000000" },
    "10": { bg: "#E3B32A", text: "#000000" }, "11": { bg: "#8D5E2A", text: "#FFFFFF" },
    "12": { bg: "#00814F", text: "#FFFFFF" }, "13": { bg: "#98D4E2", text: "#000000" },
    "14": { bg: "#62259D", text: "#FFFFFF" },
    "15": { bg: "#B90845", text: "#FFFFFF" }, "16": { bg: "#E42346", text: "#FFFFFF" },
    "17": { bg: "#FFD100", text: "#000000" }, "18": { bg: "#00A651", text: "#FFFFFF" },
    "T1": { bg: "#0065AF", text: "#FFFFFF" }, "T2": { bg: "#95338D", text: "#FFFFFF" },
    "T3a": { bg: "#F05D23", text: "#FFFFFF" }, "T3b": { bg: "#008C5C", text: "#FFFFFF" },
    "T9": { bg: "#92B82F", text: "#FFFFFF" }
};

window.HUBS_COORDS = {
    'bastille': { name: 'Bastille, Paris', lat: 48.8532, lon: 2.3688, color: '#2563eb', icon: '' },
    'saint-lazare': { name: 'Saint-Lazare, Paris', lat: 48.8752, lon: 2.3267, color: '#2563eb', icon: '' },
    'montparnasse': { name: 'Montparnasse, Paris', lat: 48.8412, lon: 2.3200, color: '#2563eb', icon: '' },
    'la-defense': { name: 'La Défense, Puteaux', lat: 48.8919, lon: 2.2381, color: '#2563eb', icon: '' },
    'saclay': { name: 'Plateau de Saclay', lat: 48.7118, lon: 2.1623, color: '#2563eb', icon: '' },
    'saint-denis': { name: 'Saint-Denis Pleyel', lat: 48.9205, lon: 2.3444, color: '#2563eb', icon: '' },
    'bibliotheque': { name: 'Bibliothèque F. Mitterrand, Paris', lat: 48.8299, lon: 2.3768, color: '#2563eb', icon: '' },
    'la-plaine': { name: 'La Plaine Saint-Denis, St-Denis', lat: 48.9066, lon: 2.3556, color: '#2563eb', icon: '' }
};

const CATEGORY_SOURCES = {
    "immo": [
        { icon: "🌍", title: "DVF - Etalab", year: "2024", desc: "Données de Valeur Foncière (Ministère des Finances)" },
        { icon: "🏛️", title: "Base BIEN", year: "2023", desc: "Base d'informations économiques notariales" }
    ],
    "mobility": [
        { icon: "🚇", title: "IDFM", year: "2024", desc: "Données GTFS et réseaux (Île-de-France Mobilités)" },
        { icon: "✨", title: "Société des Grands Projets", year: "2024", desc: "Tracés officiels du Grand Paris Express" },
        { icon: "🗺️", title: "OpenStreetMap", year: "2024", desc: "Réseau cyclable et points d'intérêt" }
    ],
    "vieQuartier": [
        { icon: "🛍️", title: "OpenStreetMap", year: "2024", desc: "Commerces et points d'intérêt locaux" },
        { icon: "📍", title: "BPE - INSEE", year: "2023", desc: "Base Permanente des Équipements" },
        { icon: "✨", title: "Google Places API", year: "2024", desc: "Notes et avis (Calculé)" }
    ],
    "urbanisme": [
        { icon: "🗺️", title: "Institut Paris Région", year: "2021", desc: "Mode d'Occupation du Sol (MOS)" },
        { icon: "🔥", title: "Institut Paris Région", year: "2023", desc: "Classification des Îlots de Chaleur (ICU)" },
        { icon: "🔊", title: "Bruitparif", year: "2022", desc: "Cartographie du bruit routier et ferré" },
        { icon: "", title: "DGFIP", year: "2023", desc: "Fichiers Fonciers (Majic)" }
    ],
    "socio": [
        { icon: "👥", title: "Filosofi - INSEE", year: "2021", desc: "Dispositif sur les revenus fiscaux et sociaux" },
        { icon: "🎓", title: "Activité Résidents - INSEE", year: "2022", desc: "Diplômes et structure de la population active" }
    ],
    "demo": [
        { icon: "👶", title: "Recensement - INSEE", year: "2020", desc: "Structure de la population et des ménages" }
    ],
    "safety": [
        { icon: "🚨", title: "SSMSI", year: "2023", desc: "Service statistique du Ministère de l'Intérieur" }
    ],
    "infra": [
        { icon: "🏫", title: "Éducation Nationale", year: "2023", desc: "Effectifs et IPS des établissements" },
        { icon: "🏥", title: "Ameli / FINESS", year: "2023", desc: "Annuaire Santé et Fichier des établissements" }
    ],
    "education": [
        { icon: "🏫", title: "Éducation Nationale", year: "2023", desc: "Localisation, type et IPS des établissements" },
        { icon: "🎓", title: "DEPP", year: "2023", desc: "Indicateurs de Position Sociale (IPS)" }
    ],
    "finances": [
        { icon: "🏛️", title: "Balance Générale des Comptes", year: "2024", desc: "DGFiP — Comptes des communes (M57)" },
        { icon: "📊", title: "REI 2024", year: "2024", desc: "DGFiP — Recensement des éléments d'imposition à la fiscalité locale" }
    ]
};

window.toggleSources = function (id, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const dropdown = document.getElementById(`sources-dropdown-${id}`);
    if (dropdown) {
        const isVisible = !dropdown.classList.contains('hidden');
        // Hide all other dropdowns first
        document.querySelectorAll('.sources-dropdown').forEach(d => d.classList.add('hidden'));
        if (!isVisible) {
            dropdown.classList.remove('hidden');
        }
    }
};

// Close sources dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.sources-container')) {
        document.querySelectorAll('.sources-dropdown').forEach(d => d.classList.add('hidden'));
    }
});

window.TRANSIT_AXES_CONFIG = {
    "bastille": [
        {
            id: "l1_east",
            name: "Ligne 1 : Vincennes / Fontenay",
            line: "1",
            color: idfmColors["1"].bg,
            stations: ["Saint-Mandé", "Bérault", "Vincennes", "Château de Vincennes"]
        },
        {
            id: "rera_mlv",
            name: "RER A : Marne-la-Vallée",
            line: "A",
            color: idfmColors["A"].bg,
            stations: ["Vincennes", "Val de Fontenay", "Neuilly-Plaisance", "Bry-sur-Marne", "Noisy-le-Grand Mont d'Est", "Noisy - Champs", "Noisiel", "Lognes", "Torcy", "Bussy-Saint-Georges", "Val d'Europe", "Marne-la-Vallée Chessy"]
        },
        {
            id: "rera_boissy",
            name: "RER A : Boissy-St-Léger",
            line: "A",
            color: idfmColors["A"].bg,
            stations: ["Vincennes", "Fontenay-sous-Bois", "Nogent-sur-Marne", "Joinville-le-Pont", "Saint-Maur - Créteil", "Le Parc de Saint-Maur", "Champigny", "La Varenne-Chennevières", "Boissy-Saint-Léger"]
        },
        {
            id: "l8_east",
            name: "Ligne 8 : Charenton / Créteil",
            line: "8",
            color: idfmColors["8"].bg,
            stations: ["Porte de Charenton", "Liberté", "Charenton - Écoles", "École Vétérinaire de Maisons-Alfort", "Maisons-Alfort - Stade", "Maisons-Alfort - Les Juilliottes", "Créteil - L'Échat", "Créteil - Université", "Créteil - Préfecture", "Pointe du Lac"]
        },
        {
            id: "rerc_se",
            name: "RER C : Vitry / Choisy",
            line: "C",
            color: idfmColors["C"].bg,
            stations: ["Ivry-sur-Seine", "Vitry-sur-Seine", "Les Ardoines", "Choisy-le-Roi", "Villeneuve-le-Roi", "Ablon", "Athis-Mons", "Juvisy"]
        },
        {
            id: "l11_east",
            name: "Ligne 11 : Les Lilas / Rosny",
            line: "11",
            color: idfmColors["11"].bg,
            stations: ["Mairie des Lilas", "Serge Gainsbourg", "Romainville - Carnot", "Montreuil - Hôpital", "La Dhuys", "Coteaux Beauclair", "Rosny-Bois-Perrier"]
        },
        {
            id: "l5_north",
            name: "Ligne 5 : Pantin / Bobigny",
            line: "5",
            color: idfmColors["5"].bg,
            stations: ["Hoche", "Église de Pantin", "Raymond Queneau", "Bobigny - Pantin - Raymond Queneau", "Bobigny - Pablo Picasso"]
        },
        {
            id: "l14_nord",
            name: "Ligne 14 : Saint-Ouen / Pleyel",
            line: "14",
            color: idfmColors["14"].bg,
            stations: ["Pont Cardinet", "Porte de Clichy", "Saint-Ouen", "Mairie de Saint-Ouen", "Saint-Denis Pleyel"]
        },
        {
            id: "l14_sud",
            name: "Ligne 14 : Villejuif / Orly",
            line: "14",
            color: idfmColors["14"].bg,
            stations: ["Maison Blanche", "Hôpital Bicêtre", "Villejuif - Gustave Roussy", "Chevilly-Larue", "Thiais - Orly", "Aéroport d'Orly"]
        },
        {
            id: "rere_east",
            name: "RER E : Chelles / Villiers",
            line: "E",
            color: idfmColors["E"].bg,
            stations: ["Pantin", "Noisy-le-Sec", "Bondy", "Le Raincy - Villemomble - Montfermeil", "Gagny", "Le Chénay - Gagny", "Chelles - Gournay", "Val de Fontenay", "Nogent - Le Perreux", "Les Boullereaux - Champigny", "Villiers-sur-Marne - Le Plessis-Trévise"]
        }
    ]
};

const MAJOR_PARKS = [
    { name: "Bois de Vincennes", lat: 48.828, lon: 2.438 },
    { name: "Bois de Boulogne", lat: 48.862, lon: 2.251 },
    { name: "Parc de Saint-Cloud", lat: 48.835, lon: 2.215 },
    { name: "Parc de Sceaux", lat: 48.775, lon: 2.298 },
    { name: "Forêt de Meudon", lat: 48.795, lon: 2.222 },
    { name: "Forêt de Saint-Germain", lat: 48.910, lon: 2.100 },
    { name: "Forêt de Marly", lat: 48.860, lon: 2.020 },
    { name: "Forêt de Montmorency", lat: 49.030, lon: 2.290 },
    { name: "Parc de La Courneuve", lat: 48.935, lon: 2.415 }
];

const BLUE_KEYWORDS = ["MARNE", "SEINE", "OISE", "QUAI", "ILE", "PORT", "CANAL", "BORDS DE", "RIVE", "MAUR", "JOINVILLE", "NOGENT"];



// Pre-calculate a spatial grid for IRIS centroids to speed up spatial queries (O(1) instead of O(N))
window.gpeStations = [];
window.irisGrid = null;
function buildIrisGrid() {
    if (!window.irisCentroids) return;
    const grid = {};
    for (const code in window.irisCentroids) {
        const c = window.irisCentroids[code];
        const gx = Math.floor(c.lon * 50); // Grid cell ~2km
        const gy = Math.floor(c.lat * 50);
        const key = `${gx},${gy}`;
        if (!grid[key]) grid[key] = [];
        grid[key].push(code);
    }
    window.irisGrid = grid;
}

window.layersByCommune = {};
function getNearbyPoints(inseeOrCoords, maxDistance = 800) {
    const results = { commerces: [], amenities: [], schools: [], stations: [], sport: [], culture: [], marche: [], riviera: [] };
    if (!window.pointsByInsee) return results;
    if (!window.irisGrid) buildIrisGrid();

    let center;
    if (typeof inseeOrCoords === 'string') {
        center = window.irisCentroids?.[inseeOrCoords];
    } else {
        center = inseeOrCoords;
    }
    
    if (!center) return results;

    // Use the spatial grid to check only nearby IRIS cells
    const gx = Math.floor(center.lon * 50);
    const gy = Math.floor(center.lat * 50);
    const codesToCheck = [];
    
    // Increase grid search for larger radii (2km+)
    const gridOffset = Math.max(1, Math.ceil(maxDistance / 2000));
    for (let x = gx - gridOffset; x <= gx + gridOffset; x++) {
        for (let y = gy - gridOffset; y <= gy + gridOffset; y++) {
            const cell = window.irisGrid[`${x},${y}`];
            if (cell) codesToCheck.push(...cell);
        }
    }

    codesToCheck.forEach(code => {
        const node = window.pointsByInsee[code];
        if (!node) return;

        ['commerces', 'amenities', 'schools', 'stations', 'sport', 'culture', 'marche', 'riviera'].forEach(key => {
            if (node[key]) {
                node[key].forEach(f => {
                    if (!f?.geometry?.coordinates) return;
                    const [pLon, pLat] = f.geometry.coordinates;
                    const latDiff = maxDistance / 110000;
                    const lonDiff = maxDistance / 70000;
                    if (Math.abs(pLat - center.lat) < latDiff && Math.abs(pLon - center.lon) < lonDiff) {
                        if (getDistance(center.lat, center.lon, pLat, pLon) <= maxDistance) {
                            // Exclude OSM sport categories to avoid duplicates with official gouv database
                            const sportCats = ['tennis', 'gym', 'pool'];
                            if (key === 'amenities' && sportCats.includes(f.properties?.category)) return;
                            f.irisCode = code; // Attach IRIS code for commune-based filtering
                            results[key].push(f);
                        }
                    }
                });
            }
        });
    });

    // Deduplication step: prioritize named points and merge close ones
    ['commerces', 'amenities', 'schools', 'sport', 'culture', 'marche', 'riviera'].forEach(key => {
        if (results[key].length > 1) {
            const deduped = [];
            results[key].forEach(p => {
                const [pLon, pLat] = p.geometry.coordinates;
                const pName = p.properties.name || "";

                const existingIdx = deduped.findIndex(k => {
                    const [kLon, kLat] = k.geometry.coordinates;
                    // Cluster threshold: 50m for amenities/commerces, 100m for schools
                    const threshold = key === 'schools' ? 100 : 50;
                    return getDistance(pLat, pLon, kLat, kLon) < threshold;
                });

                if (existingIdx === -1) {
                    deduped.push(p);
                } else if (pName && !deduped[existingIdx].properties.name) {
                    // Swap unnamed for named
                    deduped[existingIdx] = p;
                }
            });
            results[key] = deduped;
        }
    });

    return results;
}

/**
 * Highlights all nearby commerces/amenities of a specific type on the map.
 * Used when hovering over category pills in the sidebar.
 */
window.highlightCommerceOnMap = function(type, emoji, label) {
    if (!window.map || !window.commerceHighlightLayer) return;
    
    // Clear previous highlights
    window.commerceHighlightLayer.clearLayers();
    if (!type) return;

    const props = window.selectedLayer?.feature?.properties;
    if (!props) return;

    // Use a larger radius (3km) to help users find the nearest alternative
    const points = getNearbyPoints(props.code, 3000);
    const allPoints = [
        ...(points.commerces || []),
        ...(points.amenities || []),
        ...(points.culture || []),
        ...(points.marche || []),
        ...(points.schools || []),
        ...(points.sport || [])
    ];

    const filtered = allPoints.filter(p => {
        const cat = (p.properties?.category || "").toLowerCase();
        const name = (p.properties?.name || "").toLowerCase();
        
        // Check if point is inside a "pole" (city center polygon)
        if (window.cityCentersData && typeof turf !== 'undefined') {
            const point = turf.point(p.geometry.coordinates);
            const inPole = window.cityCentersData.features.some(f => turf.booleanPointInPolygon(point, f));
            if (inPole) return false;
        }

        if (type === 'bio') return cat === 'bio' || cat.includes('biologique') || name.includes('naturalia') || name.includes('biocoop') || name.includes('la vie claire');
        if (type === 'boulangerie') return cat === 'boulangerie' || cat === 'bakery' || name.includes('boulangerie') || name.includes('fournil');
        if (type === 'boucherie') return cat === 'boucherie' || cat === 'butcher' || cat === 'charcuterie' || name.includes('boucherie');
        if (type === 'fromagerie') return cat === 'fromagerie' || cat === 'cheese' || name.includes('fromagerie') || name.includes('crèmerie');
        if (type === 'cinema') return cat === 'cinema' || cat === 'movie_theater';
        if (type === 'theatre') return cat === 'theatre' || cat === 'theater';
        if (type === 'concert') return cat === 'concert_hall' || cat === 'music_venue' || cat === 'performance_venue';
        if (type === 'restaurant') return cat === 'restaurant' || cat === 'cafe' || cat === 'fast_food';
        if (type === 'pediatre') return cat === 'pediatre' || name.includes('pédiatre');
        if (type === 'marche') return cat === 'marche' || cat === 'marketplace';
        if (type === 'school') return cat.includes('école') || cat.includes('maternelle') || cat.includes('élémentaire') || cat.includes('primaire') || cat.includes('school');
        if (type === 'maternelle') return cat.includes('maternelle');
        if (type === 'elementaire') return cat.includes('élémentaire') || cat.includes('primaire');
        if (type === 'college') return cat.includes('collège');
        if (type === 'lycee') return cat.includes('lycée');
        if (type === 'bibliotheque') return cat.includes('bibliothèque') || cat === 'library';
        if (type === 'museum') return cat.includes('musée') || cat === 'museum';

        return cat === type || name.includes(type);
    });

    if (filtered.length === 0) return;

    filtered.forEach(p => {
        const coords = p.geometry.coordinates;
        const latlng = [coords[1], coords[0]];
        
        const marker = L.marker(latlng, {
            icon: L.divIcon({
                className: 'commerce-highlight-icon',
                html: `
                    <div class="commerce-marker-wrapper">
                        <div class="commerce-marker-pulse"></div>
                        <div class="commerce-marker-pill">
                            <span class="commerce-marker-emoji">${emoji}</span>
                        </div>
                    </div>
                `,
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            }),
            zIndexOffset: 1000
        }).addTo(window.commerceHighlightLayer);

        if (p.properties.name) {
            marker.bindTooltip(`
                <div class="px-2 py-1 font-black text-[10px] uppercase tracking-tight">
                    ${p.properties.name}
                </div>
            `, { direction: 'top', offset: [0, -10], className: 'commerce-tooltip' });
        }
    });
    
    // Optional: Auto-zoom if points are far away? 
    // For now just show them.
};

/**
 * Robustly counts nearby amenities of all types for a given INSEE or coordinate.
 * Used to provide real-time accuracy over precomputed data.
 */
window.countNearbyAmenities = function(inseeOrCoords, maxDistance = 1000) {
    const node = getNearbyPoints(inseeOrCoords, maxDistance);
    const commerces = node.commerces || [];
    const amenities = node.amenities || [];
    const culture = node.culture || [];
    
    const counts = {
        boulangerie: 0, boucherie: 0, fromagerie: 0, bio: 0,
        supermarket: 0, pharmacie: 0, poste: 0, marche: 0,
        restaurants: 0, fast_food: 0, bars: 0,
        cinemas: 0, theatres: 0, concerts: 0,
        pediatres: 0, schools: node.schools?.length || 0,
        gym: 0, pool: 0, tennis: 0, shopping: 0,
        picard: 0, deli: 0
    };

    const filterByPole = (p) => {
        if (!window.cityCentersData || typeof turf === 'undefined') return true;
        const point = turf.point(p.geometry.coordinates);
        return !window.cityCentersData.features.some(f => turf.booleanPointInPolygon(point, f));
    };

    commerces.filter(filterByPole).forEach(c => {
        const cat = (c.properties?.category || "").toLowerCase();
        const name = (c.properties?.name || "").toLowerCase();
        
        if (cat === 'boulangerie' || cat === 'bakery' || name.includes('boulangerie')) counts.boulangerie++;
        if (cat === 'boucherie' || cat === 'butcher' || cat === 'charcuterie' || name.includes('boucherie')) counts.boucherie++;
        if (cat === 'fromagerie' || cat === 'cheese' || name.includes('fromagerie')) counts.fromagerie++;
        if (cat === 'bio' || cat.includes('biologique') || name.includes('naturalia') || name.includes('biocoop') || name.includes('la vie claire')) counts.bio++;
        if (cat === 'supermarket' || cat === 'supermarché' || cat === 'convenience' || name.includes('supermarché') || name.includes('monoprix') || name.includes('franprix')) counts.supermarket++;
        if (cat === 'restaurant') counts.restaurants++;
        if (cat === 'fast_food') counts.fast_food++;
        if (cat === 'bar' || cat === 'pub' || cat === 'cafe') counts.bars++;
        if (cat === 'clothes' || cat === 'shoes' || cat === 'department_store') counts.shopping++;
        if (name.includes('picard')) counts.picard++;
        if (cat === 'deli' || name.includes('traiteur')) counts.deli++;
    });
    
    amenities.filter(filterByPole).forEach(a => {
        const cat = (a.properties?.category || "").toLowerCase();
        if (cat === 'pharmacy' || cat === 'pharmacie') counts.pharmacie++;
        if (cat === 'post_office' || cat === 'poste') counts.poste++;
        if (cat === 'marketplace' || cat === 'marche') counts.marche++;
    });

    culture.filter(filterByPole).forEach(c => {
        const cat = (c.properties?.category || "").toLowerCase();
        if (cat === 'cinema' || cat === 'movie_theater') counts.cinemas++;
        if (cat === 'theatre' || cat === 'theater') counts.theatres++;
        if (cat === 'concert_hall' || cat === 'music_venue') counts.concerts++;
    });

    return counts;
};

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const f1 = lat1 * Math.PI / 180, f2 = lat2 * Math.PI / 180;
    const df = (lat2 - lat1) * Math.PI / 180, dl = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(df / 2) ** 2 + Math.cos(f1) * Math.cos(f2) * Math.sin(dl / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}


window.currentPropertyType = 'apt';
window.selectedLayer = null;
let lastView = null;
let centroidMarker = null;
window.pebLayer = null;
window.pebData = null;
window.pebByIris = {};
window.walkingMetadata = {};
window.walkingPathsGroup = null;
window.isFirstSearch = true; // Flag for initial landing

function decodePolyline(str, precision = 6) {
    let index = 0, lat = 0, lng = 0, coordinates = [], shift = 0, result = 0, byte = null, lat_change, lng_change;
    const factor = Math.pow(10, precision);
    while (index < str.length) {
        byte = null; shift = 0; result = 0;
        do { byte = str.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
        lat_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
        shift = 0; result = 0;
        do { byte = str.charCodeAt(index++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
        lng_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += lat_change; lng += lng_change;
        coordinates.push([lat / factor, lng / factor]);
    }
    return coordinates;
}

window.renderWalkingPaths = function () {
    const features = [];
    const badges = [];

    (window.activeWalkingPaths || []).forEach(path => {
        path.sections.forEach((sec, sIdx) => {
            const isTransit = ['rer', 'metro', 'bus', 'train', 'tram', 'transit', 'public_transport', 'on_demand_transport'].includes(sec.type);
            const pathVisible = path.visible !== false;

            // Base properties
            const props = {
                pathId: path.id,
                color: sec.color || '#94a3b8',
                weight: sec.weight || (isTransit ? 5 : 2),
                isTransit: isTransit,
                opacity: sec.opacity !== undefined ? sec.opacity : (pathVisible ? (isTransit ? 1 : 0.75) : 0),
                type: sec.type
            };

            // Convert [[lat, lon], ...] to [[lon, lat], ...] for GeoJSON
            const coordinates = (sec.shape || []).map(p => [p[1], p[0]]);
            if (coordinates.length < 2) return;

            features.push({
                type: 'Feature',
                geometry: { type: 'LineString', coordinates },
                properties: props
            });

            // Transit Badge
            if (isTransit && sec.code) {
                const midIdx = Math.floor(coordinates.length / 2);
                const idfm = idfmColors[sec.code] || { text: '#ffffff' };
                badges.push({
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: coordinates[midIdx] },
                    properties: {
                        label: (sec.type === 'metro' ? 'M·' : sec.type === 'rer' ? 'RER·' : sec.type === 'tram' ? 'T·' : '') + sec.code,
                        textColor: idfm.text,
                        opacity: props.opacity > 0 ? 1 : 0
                    }
                });
            }
        });
    });

    if (window.map) {
        const pathSource = window.map.getSource('walking-paths');
        if (pathSource) pathSource.setData({ type: 'FeatureCollection', features });
        
        const badgeSource = window.map.getSource('walking-paths-badges');
        if (badgeSource) badgeSource.setData({ type: 'FeatureCollection', features: badges });
    }
};

window.updateWalkingPath = async function (props) {
    const irisName = props.nom_iris || props.nom_com || props.name || "Quartier inconnu";
    window.currentUpdateIrisCode = props.code;
    const thisUpdateIrisCode = props.code;

    console.log(`[DEBUG] updateWalkingPath for ${irisName} (${props.code})`);
    
    // Clear existing paths
    (window.activeWalkingPaths || []).forEach(p => {
        if (p.markers) p.markers.forEach(m => m.remove());
    });
    window.activeWalkingPaths = [];
    window.renderWalkingPaths();

    window.lastWalkingDuration = null;
    window.lastWalkingTarget = null;

    let startLat = props.lat;
    let startLon = props.lon;

    if (!startLat || !startLon) {
        const cachedCentroid = window.irisCentroids?.[props.code];
        if (cachedCentroid) {
            startLat = cachedCentroid.lat;
            startLon = cachedCentroid.lon;
        } else {
            console.warn("[DEBUG] No start coordinates found!");
            return;
        }
    }

    const targets = [];
    const lineStations = {};
    const closestCenters = {};

    // 1. City Centers
    (window.cityCentersData?.features || []).forEach(f => {
        const centroid = turf.centroid(f).geometry.coordinates;
        const dist = getDistance(startLat, startLon, centroid[1], centroid[0]);
        if (dist <= 4000) {
            const p = f.properties || {};
            const name = p.name || p.NOM || "Centre";
            const id = p.id || p.code || `${name}-${centroid[1]}-${centroid[0]}`;
            if (!closestCenters[id] || dist < closestCenters[id].dist) {
                closestCenters[id] = {
                    id, name, lat: centroid[1], lon: centroid[0], dist, type: 'center',
                    color: name.includes('Historique') ? '#b45309' : '#2563eb', icon: '📍'
                };
            }
        }
    });
    targets.push(...Object.values(closestCenters));

    // 2. Stations
    (window.allStationsData || []).forEach(s => {
        const dist = getDistance(startLat, startLon, s.lat, s.lon);
        if (dist <= 2500) {
            const rawLines = String(s.lines).split(/[,\/;]/).map(l => l.trim()).filter(Boolean);
            rawLines.forEach(rawLine => {
                const lineId = window.getLineId(rawLine);
                if (!lineId) return;
                if (!lineStations[lineId] || dist < lineStations[lineId].dist) {
                    const idfm = idfmColors[lineId];
                    lineStations[lineId] = {
                        id: `station-${s.name.toLowerCase().replace(/\s+/g, '-')}`,
                        name: s.name, lat: s.lat, lon: s.lon, dist, type: 'station',
                        color: idfm ? idfm.bg : '#059669',
                        icon: (s.mode === 'METRO' || s.mode === 'METROPOLITAIN') ? '🚇' : (['RER', 'TRAIN', 'RER/TRAIN'].includes(s.mode) ? '🚆' : '🚋'),
                        line: lineId, stationId: `${s.name}-${s.lat}-${s.lon}`
                    };
                }
            });
        }
    });
    const uniqueStations = {};
    Object.values(lineStations).forEach(s => { if (!uniqueStations[s.stationId] || s.dist < uniqueStations[s.stationId].dist) uniqueStations[s.stationId] = s; });
    targets.push(...Object.values(uniqueStations));

    // 3. Workplaces
    (window.activeWorkplaces || []).forEach(wp => {
        const hub = (window.HUBS_COORDS || {})[wp.id];
        if (hub) {
            targets.push({ id: wp.id, name: hub.name, lat: hub.lat, lon: hub.lon, type: 'workplace', color: hub.color, icon: hub.icon });
        }
    });

    // 4. Schools
    const schoolPoints = getNearbyPoints(props.code, 10000).schools || [];
    schoolPoints.forEach(f => {
        const coords = f.geometry.coordinates;
        if (!coords) return;
        const [lon, lat] = coords;
        const dist = getDistance(startLat, startLon, lat, lon);
        const name = f.properties.name || "École";
        const cat = (f.properties?.category || "").toLowerCase();
        if (dist <= 3500) {
            targets.push({
                id: `school-${f.id || Math.random()}`, name, lat, lon, dist, type: 'school',
                color: cat.includes('lycée') ? '#10b981' : '#9333ea', icon: '🏫'
            });
        }
    });

    const finalTargets = targets.sort((a, b) => (a.dist || 0) - (b.dist || 0)).slice(0, 40);

    for (const target of finalTargets) {
        try {
            if (window.currentUpdateIrisCode !== thisUpdateIrisCode) return;

            let sections = [];
            let duration = 0;

            const rawCache = window.precomputedJourneysRaw?.[props.code]?.[target.id];
            const preferredKey = window.commuteItineraryType || 'main';
            const cached = (rawCache && rawCache[preferredKey]) ? rawCache[preferredKey] : ((rawCache && rawCache.main) ? rawCache.main : rawCache);

            if (cached && (cached.sections || cached.itinerary)) {
                sections = (cached.sections || cached.itinerary).map(sec => ({
                    ...sec,
                    shape: (sec.shape || []).filter(p => p && p[0] !== null && p[1] !== null)
                }));
                duration = cached.duration;
            } else if (target.type === 'workplace') {
                const url = `https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys?from=${startLon};${startLat}&to=${target.lon};${target.lat}&data_freshness=base_schedule`;
                const response = await fetch(url, { headers: { 'apikey': '41Yg0ZQ1MuGlIHfwEXrY0vGFhjQKngcv' } });
                const data = await response.json();
                if (data.journeys?.length > 0) {
                    const j = data.journeys[0];
                    duration = Math.round(j.duration / 60);
                    j.sections.forEach(s => {
                        if (s.geojson?.coordinates) {
                            sections.push({
                                type: s.type, color: s.display_informations ? `#${s.display_informations.color}` : '#94a3b8',
                                code: s.display_informations?.code,
                                shape: s.geojson.coordinates.map(c => [c[1], c[0]]),
                                duration: Math.round(s.duration / 60)
                            });
                        }
                    });
                }
            } else {
                const response = await fetch(`https://valhalla1.openstreetmap.de/route?json={"locations":[{"lat":${startLat},"lon":${startLon}},{"lat":${target.lat},"lon":${target.lon}}],"costing":"pedestrian"}`);
                const data = await response.json();
                if (data.trip?.legs) {
                    const coords = decodePolyline(data.trip.legs[0].shape);
                    sections = [{ type: 'walking', shape: coords, color: '#94a3b8', duration: Math.round(data.trip.summary.time / 60) }];
                    duration = Math.round(data.trip.summary.time / 60);
                }
            }

            if (sections.length > 0) {
                const pathId = `path-${target.id}`;
                const shouldBeVisible = (window.activeAccordion === 'commute' && target.type === 'workplace') ||
                    (window.activeAccordion === 'vieQuartier' && target.type === 'center');

                // Label Marker
                const el = document.createElement('div');
                el.className = `path-label ${pathId}-label`;
                el.style.cssText = `background:${target.color};color:white;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:800;white-space:nowrap;opacity:${shouldBeVisible ? 1 : 0};transition:all 0.2s;`;
                el.innerHTML = `<span>${target.icon}</span> ${duration} min`;
                
                const marker = new maplibregl.Marker({ element: el })
                    .setLngLat([target.lon, target.lat])
                    .addTo(window.map);

                window.activeWalkingPaths.push({
                    id: pathId, targetId: target.id, type: target.type, name: target.name, color: target.color,
                    sections, duration, visible: shouldBeVisible, markers: [marker]
                });

                if (target.type === 'center' && !window.lastWalkingDuration) {
                    window.lastWalkingDuration = duration;
                    window.lastWalkingTarget = target.name;
                }
            }
        } catch (e) { console.error("Path error:", e); }
    }

    window.renderWalkingPaths();
    if (window.selectedLayer && (window.selectedLayer.feature.properties.code === props.code)) {
        info.update(props, true);
    }
};

window.highlightPath = function (pathId, highlight) {
    const path = (window.activeWalkingPaths || []).find(p => p.id === pathId);
    if (!path) return;

    path.visible = highlight;
    if (path.markers) {
        path.markers.forEach(m => {
            const el = m.getElement();
            if (el) {
                el.style.opacity = highlight ? '1' : '0';
                el.style.transform = highlight ? 'scale(1.1)' : 'scale(1)';
            }
        });
    }
    window.renderWalkingPaths();
};


window.updateWalkingLabelsZoom = function () {
    if (!window.map) return;
    const zoom = window.map.getZoom();
    const isHighZoom = zoom >= 11.5;

    document.querySelectorAll('.path-label').forEach(el => {
        el.style.opacity = isHighZoom ? '1' : '0';
        el.style.pointerEvents = isHighZoom ? 'auto' : 'none';
    });
};


window.activeScoreFilters = {
    'excellent': true,
    'good': true,
    'decent': true,
    'average': true,
    'poor': true,
    'bad': true
};

window.toggleScoreFilter = function (filter) {
    window.activeScoreFilters[filter] = !window.activeScoreFilters[filter];
    const el = document.getElementById(`filter-${filter}`);
    if (el) el.style.opacity = window.activeScoreFilters[filter] ? '1' : '0.2';
    window.updateFilters();
};


window.selectedVibes = [];

document.addEventListener('DOMContentLoaded', () => {
    // Set initial view to search-perimeter
    window.setSidebarView('search-perimeter');

    document.querySelectorAll('.vibe-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const vibe = chip.dataset.vibe;
            if (chip.classList.contains('active')) {
                window.selectedVibes = window.selectedVibes.filter(v => v !== vibe);
                chip.classList.remove('active');
            } else {
                window.selectedVibes.push(vibe);
                chip.classList.add('active');
            }
            window.updateFilters();
        });
    });

    // Modal Navigation Logic
    const navItems = document.querySelectorAll('.modal-nav-item');
    const scrollContainer = document.getElementById('panel-content');
    const sections = [
        '.section-vibe',
        '.section-work',
        '.section-axis',
        '.section-budget',
        '.section-profil'
    ];

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const targetSection = document.querySelector(sections[index]);
            if (targetSection && scrollContainer) {
                scrollContainer.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Axis Explorer Initialization
    window.initAxisExplorer();

    // Initial contextual map update
    window.updateContextualMap(window.activeAccordion);
});

window.initAxisExplorer = function () {
    const hubSelector = document.getElementById('axis-hub-selector');
    const axisList = document.getElementById('axis-selector-list');
    const resetBtn = document.getElementById('reset-axis-btn');

    if (!hubSelector || !axisList) return;

    function renderAxes(hubId) {
        const axes = window.TRANSIT_AXES_CONFIG[hubId] || [];
        axisList.innerHTML = axes.map(axis => `
            <div onclick="window.selectTransitAxis('${axis.id}')" 
                 id="axis-card-${axis.id}"
                 class="axis-card group p-3 rounded-xl border border-gray-100 bg-white hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col gap-2 ${window.activeAxisId === axis.id ? 'active border-blue-500 ring-2 ring-blue-100' : ''}">
                <div class="flex items-center justify-between">
                    <span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-sm" style="background-color: ${axis.color}">
                        ${axis.line}
                    </span>
                    <span class="text-[8px] font-black text-gray-300 uppercase tracking-widest group-hover:text-blue-400">Explorer</span>
                </div>
                <div class="text-[10px] font-black text-slate-700 leading-tight">${axis.name}</div>
            </div>
        `).join('');
    }

    hubSelector.addEventListener('change', (e) => renderAxes(e.target.value));
    renderAxes(hubSelector.value);

    resetBtn?.addEventListener('click', () => {
        window.activeAxisId = null;
        window.axisMembership = null;
        document.querySelectorAll('.axis-card').forEach(c => c.classList.remove('active', 'border-blue-500', 'ring-2', 'ring-blue-100'));
        resetBtn.classList.add('hidden');
        window.updateFilters();
    });
};

window.precomputeAxisMembership = function () {
    if (!window.activeAxisId) {
        window.axisMembership = null;
        return;
    }
    const hubId = document.getElementById('axis-hub-selector')?.value || 'bastille';
    const axis = window.TRANSIT_AXES_CONFIG[hubId]?.find(a => a.id === window.activeAxisId);
    if (!axis || !window.pointsByInsee) return;

    console.log("⚡ Pre-calculating axis membership for", axis.name);
    const membership = {};
    for (const code in window.pointsByInsee) {
        const node = window.pointsByInsee[code];
        const stations = node.stations || [];
        const isOnAxis = stations.some(s => {
            const name = s.properties.nom_gares;
            const line = s.properties.indice_lig;
            return axis.stations.includes(name) || (axis.stations.length === 0 && line === axis.line);
        });
        if (isOnAxis) membership[code] = true;
    }
    window.axisMembership = membership;
};

window.selectTransitAxis = function (axisId) {
    // UI logic: highlight card
    document.querySelectorAll('.axis-card').forEach(c => c.classList.remove('active', 'border-blue-500', 'ring-2', 'ring-blue-100'));
    const card = document.getElementById(`axis-card-${axisId}`);
    if (card) card.classList.add('active', 'border-blue-500', 'ring-2', 'ring-blue-100');

    window.activeAxisId = axisId;
    window.precomputeAxisMembership(); // Critical: Pre-calculate to avoid UI freeze

    document.getElementById('reset-axis-btn')?.classList.remove('hidden');

    window.updateFilters();

    // Visual feedback: Zoom to axis extent
    window.zoomToActiveAxis();
};

window.zoomToActiveAxis = function () {
    if (!window.activeAxisId) return;
    const hubId = document.getElementById('axis-hub-selector')?.value || 'bastille';
    const axis = window.TRANSIT_AXES_CONFIG[hubId]?.find(a => a.id === window.activeAxisId);
    if (!axis || !window.allStationsData) return;

    const axisStations = window.allStationsData.features.filter(s =>
        axis.stations.includes(s.properties.nom_gares) && s.properties.indice_lig === axis.line
    );

    if (axisStations.length > 0) {
        const group = L.featureGroup(axisStations.map(s => L.marker([s.geometry.coordinates[1], s.geometry.coordinates[0]])));
        map.fitBounds(group.getBounds(), { padding: [100, 100], maxZoom: 13 });
    }
};

window.openPreferencesModal = function () {
    window.setSidebarView('search-perimeter');
};

window.closePreferencesModal = function () {
    window.setSidebarView('ranking');
};

window.setPropertyType = function (type, btn) {
    window.currentPropertyType = type;
    document.querySelectorAll('.type-btn').forEach(b => {
        b.classList.remove('bg-white', 'shadow-sm', 'text-gray-800');
        b.classList.add('text-gray-500');
    });
    btn.classList.add('bg-white', 'shadow-sm', 'text-gray-800');
    btn.classList.remove('text-gray-500');

    const gardenContainer = document.getElementById('garden-container');
    if (type === 'house') {
        gardenContainer.classList.remove('opacity-30', 'pointer-events-none');
    } else {
        gardenContainer.classList.add('opacity-30', 'pointer-events-none');
        document.getElementById('garden-filter').checked = false;
    }

    // Refresh map immediately
    if (window.updateTransactionsVisibility) window.updateTransactionsVisibility();
    if (window.renderActiveLayers) window.renderActiveLayers();
    updateFilters();
};

window.selectSurfaceBucket = function (bucket, btn) {
    document.querySelectorAll('.surface-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const input = document.getElementById('surface-input');
    if (input) input.value = bucket;
    updateFilters();
};

// --- WORKPLACE MANAGEMENT ---
window.activeWorkplaces = [];

window.toggleWorkplaceMode = function (hubId, mode) {
    const wp = window.activeWorkplaces.find(w => w.id === hubId);
    if (wp) {
        const idx = wp.modes.indexOf(mode);
        if (idx > -1) wp.modes.splice(idx, 1);
        else wp.modes.push(mode);
        window.renderWorkplaces();
        updateFilters();
    }
};

window.updateWorkplaceWalkLimit = function (hubId, value) {
    const wp = window.activeWorkplaces.find(w => w.id === hubId);
    if (wp) {
        wp.walkLimit = parseInt(value);
        document.getElementById(`walk-limit-display-${hubId}`).innerText = value + ' min';
        refreshMobilityCache(geojsonLayer.toGeoJSON());
        updateFilters();
    }
};

window.addWorkplace = function () {
    const selector = document.getElementById('hub-selector');
    const hubId = selector.value;
    if (!hubId) return;

    // Don't add duplicates
    if (window.activeWorkplaces.find(w => w.id === hubId)) {
        selector.value = "";
        return;
    }

    window.activeWorkplaces.push({
        id: hubId,
        limit: 45,
        walkLimit: 20,
        modes: ['metro', 'rer', 'train', 'bus', 'tram']
    });
    selector.value = "";
    window.renderWorkplaces();
    refreshMobilityCache(geojsonLayer.toGeoJSON());
    updateFilters();
};

window.removeWorkplace = function (hubId) {
    window.activeWorkplaces = window.activeWorkplaces.filter(w => w.id !== hubId);
    window.renderWorkplaces();
    refreshMobilityCache(geojsonLayer.toGeoJSON());
    updateFilters();
};

window.updateWorkplaceLimit = function (hubId, value) {
    const wp = window.activeWorkplaces.find(w => w.id === hubId);
    if (wp) {
        wp.limit = parseInt(value);
        document.getElementById(`limit-display-${hubId}`).innerText = value + ' min';
        refreshMobilityCache(geojsonLayer.toGeoJSON());
        updateFilters();
    }
};

window.renderWorkplaces = function () {
    const container = document.getElementById('active-workplaces');
    if (!container) return;

    const hubNames = {
        'bastille': 'Bastille, Paris',
        'saint-lazare': 'Saint-Lazare, Paris',
        'montparnasse': 'Montparnasse, Paris',
        'la-defense': 'La Défense, Puteaux',
        'saclay': 'Plateau de Saclay',
        'saint-denis': 'Saint-Denis Pleyel'
    };

    if (window.activeWorkplaces.length === 0) {
        container.innerHTML = `<div class="text-[10px] text-gray-400 italic p-3 border border-dashed border-gray-200 rounded-xl text-center">Aucun lieu ajouté. Le filtre de trajet est désactivé.</div>`;
        return;
    }

    container.innerHTML = window.activeWorkplaces.map(wp => {
        const modesHtml = ['metro', 'rer', 'train', 'bus', 'tram'].map(m => {
            const isActive = wp.modes.includes(m);
            const colors = {
                'metro': 'bg-yellow-100 text-yellow-800 border-yellow-200',
                'rer': 'bg-red-100 text-red-800 border-red-200',
                'train': 'bg-blue-100 text-blue-800 border-blue-200',
                'bus': 'bg-purple-100 text-purple-800 border-purple-200',
                'tram': 'bg-green-100 text-green-800 border-green-200'
            };
            return `
                <button onclick="toggleWorkplaceMode('${wp.id}', '${m}')" 
                        class="px-1.5 py-0.5 rounded text-[8px] font-bold border transition-all ${isActive ? colors[m] : 'bg-gray-50 text-gray-400 border-gray-100 opacity-50'}">
                    ${m.toUpperCase()}
                </button>
            `;
        }).join('');

        return `
        <div class="workplace-card">
            <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-bold text-gray-800">${hubNames[wp.id] || wp.id}</span>
                <button onclick="removeWorkplace('${wp.id}')" class="remove-btn">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <!-- Commute Slider -->
            <div class="flex justify-between text-[9px] text-gray-500 mb-0.5">
                <span>Trajet max</span>
                <span id="limit-display-${wp.id}" class="font-bold text-blue-600">${wp.limit} min</span>
            </div>
            <input type="range" min="15" max="90" step="5" value="${wp.limit}" 
                class="workplace-slider mb-3" oninput="updateWorkplaceLimit('${wp.id}', this.value)" />

            <!-- Walk Slider -->
            <div class="flex justify-between text-[9px] text-gray-500 mb-0.5">
                <span>Marche max</span>
                <span id="walk-limit-display-${wp.id}" class="font-bold text-orange-600">${wp.walkLimit} min</span>
            </div>
            <input type="range" min="5" max="40" step="5" value="${wp.walkLimit}" 
                class="workplace-slider accent-orange-500 mb-3" oninput="updateWorkplaceWalkLimit('${wp.id}', this.value)" />

            <!-- Mode Toggles -->
            <div class="flex flex-wrap gap-1 mt-1">
                ${modesHtml}
            </div>
        </div>
    `;
    }).join('');
};

// --- MAPLIBRE GL JS INITIALIZATION ---
const map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            'raster-tiles': {
                type: 'raster',
                tiles: ['https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png'],
                tileSize: 256,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            }
        },
        layers: [
            {
                id: 'simple-tiles',
                type: 'raster',
                source: 'raster-tiles',
                minzoom: 0,
                maxzoom: 20
            }
        ]
    },
    center: [2.443, 48.861],
    zoom: 11,
    antialias: true
});

window.map = map;

// Layer ID constants
const MAP_LAYERS = {
    NEIGHBORHOODS_FILL: 'neighborhoods-fill',
    NEIGHBORHOODS_LINE: 'neighborhoods-line',
    HIGHLIGHT_FILL: 'highlight-fill',
    HIGHLIGHT_LINE: 'highlight-line',
    PATHS: 'paths-layer',
    MARKERS: 'markers-layer'
};

    map.on('load', () => {
        console.log("🚀 MapLibre Ready");
        
        // Add Hover State variable
        window.hoveredFeatureId = null;

        // Setup Sources ...
    map.addSource('neighborhoods', { type: 'geojson', data: { type: 'FeatureCollection', features: [] }, generateId: true });
    map.addSource('commune-highlight', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    map.addSource('paths', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    map.addSource('centroid', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    map.addSource('proximity', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });

    // POI Sources
    ['stations', 'schools', 'commerces', 'amenities', 'culture', 'sport', 'transactions', 'city-centers'].forEach(cat => {
        map.addSource(cat, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    });

    // Aura Sources (Perimeters)
    ['city-centers-aura', 'walking-paths', 'walking-paths-badges'].forEach(cat => {
        map.addSource(cat, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    });




    // 1. Neighborhoods (Base)
    map.addLayer({
        id: MAP_LAYERS.NEIGHBORHOODS_FILL,
        type: 'fill',
        source: 'neighborhoods',
        paint: {
            'fill-color': ['coalesce', ['get', 'fillColor'], 'transparent'],
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.8,
                0.55
            ]
        }
    });

    // Interaction events for Hover
    map.on('mousemove', MAP_LAYERS.NEIGHBORHOODS_FILL, (e) => {
        if (e.features.length > 0) {
            if (window.hoveredFeatureId !== null) {
                map.setFeatureState({ source: 'neighborhoods', id: window.hoveredFeatureId }, { hover: false });
            }
            window.hoveredFeatureId = e.features[0].id;
            map.setFeatureState({ source: 'neighborhoods', id: window.hoveredFeatureId }, { hover: true });
        }
    });

    map.on('mouseleave', MAP_LAYERS.NEIGHBORHOODS_FILL, () => {
        if (window.hoveredFeatureId !== null) {
            map.setFeatureState({ source: 'neighborhoods', id: window.hoveredFeatureId }, { hover: false });
        }
        window.hoveredFeatureId = null;
    });

    map.addLayer({
        id: MAP_LAYERS.NEIGHBORHOODS_LINE,
        type: 'line',
        source: 'neighborhoods',
        paint: {
            'line-color': '#ffffff',
            'line-width': 0.5,
            'line-opacity': 0.3
        }
    });

    // 2. Commune Highlight
    map.addLayer({
        id: MAP_LAYERS.HIGHLIGHT_FILL,
        type: 'fill',
        source: 'commune-highlight',
        paint: {
            'fill-color': '#0d1c40',
            'fill-opacity': 0.05
        }
    });

    map.addLayer({
        id: MAP_LAYERS.HIGHLIGHT_LINE,
        type: 'line',
        source: 'commune-highlight',
        paint: {
            'line-color': '#0d1c40',
            'line-width': 2,
            'line-dasharray': [2, 2]
        }
    });

    // 3. POI Layers ...
    map.addLayer({
        id: 'proximity-layer',
        type: 'fill',
        source: 'proximity',
        paint: {
            'fill-color': '#3b82f6',
            'fill-opacity': 0.05
        }
    });

    map.addLayer({
        id: 'proximity-line',
        type: 'line',
        source: 'proximity',
        paint: {
            'line-color': '#3b82f6',
            'line-width': 1,
            'line-dasharray': [2, 2]
        }
    });

    // --- AURA / PERIMETER LAYERS ---
    map.addLayer({
        id: 'city-centers-aura',
        type: 'fill',
        source: 'city-centers-aura',
        paint: {
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.12
        },
        layout: { visibility: 'none' }
    });

    // --- WALKING PATHS ---
    // 0. White outline for transit
    map.addLayer({
        id: 'walking-paths-outline',
        type: 'line',
        source: 'walking-paths',
        filter: ['==', ['get', 'isTransit'], true],
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#ffffff',
            'line-width': ['+', ['get', 'weight'], 3],
            'line-opacity': ['*', ['get', 'opacity'], 0.85]
        }
    });

    // 1. Solid lines (Transit)
    map.addLayer({
        id: 'walking-paths-solid',
        type: 'line',
        source: 'walking-paths',
        filter: ['==', ['get', 'isTransit'], true],
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': ['get', 'color'],
            'line-width': ['get', 'weight'],
            'line-opacity': ['get', 'opacity']
        }
    });

    // 2. Dashed lines (Walking)
    map.addLayer({
        id: 'walking-paths-dashed',
        type: 'line',
        source: 'walking-paths',
        filter: ['==', ['get', 'isTransit'], false],
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': ['get', 'color'],
            'line-width': ['get', 'weight'],
            'line-dasharray': [2, 3],
            'line-opacity': ['get', 'opacity']
        }
    });

    map.addLayer({
        id: 'walking-paths-badges',
        type: 'symbol',
        source: 'walking-paths-badges',
        layout: {
            'text-field': ['get', 'label'],
            'text-size': 9,
            'text-allow-overlap': true,
            'text-ignore-placement': true
        },
        paint: {
            'text-color': ['get', 'textColor'],
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
            'text-opacity': [
                'step',
                ['zoom'],
                0,
                11.5,
                ['get', 'opacity']
            ]
        }
    });






    map.addLayer({
        id: 'centroid-layer',
        type: 'circle',
        source: 'centroid',
        paint: {
            'circle-radius': 6,
            'circle-color': '#ef4444',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
        }
    });
    // --- POI LAYERS (STATIONS, SCHOOLS, ETC) ---
    // Layered design: Circle (Background) + Symbol (Icon)
    
    // 1. STATIONS
    map.addLayer({
        id: 'stations-bg',
        type: 'circle',
        source: 'stations',
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 4, 14, 8],
            'circle-color': '#3b82f6',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
        },
        layout: { visibility: 'none' }
    });
    map.addLayer({
        id: 'stations-icon',
        type: 'symbol',
        source: 'stations',
        layout: {
            'text-field': '🚉',
            'text-size': ['interpolate', ['linear'], ['zoom'], 11, 6, 14, 10],
            'text-allow-overlap': true,
            'visibility': 'none'
        },
        paint: { 'text-color': '#fff' }
    });

    // 2. SCHOOLS
    map.addLayer({
        id: 'schools-bg',
        type: 'circle',
        source: 'schools',
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 4, 14, 8],
            'circle-color': '#f59e0b',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
        },
        layout: { visibility: 'none' }
    });
    map.addLayer({
        id: 'schools-icon',
        type: 'symbol',
        source: 'schools',
        layout: {
            'text-field': '🎓',
            'text-size': ['interpolate', ['linear'], ['zoom'], 11, 6, 14, 10],
            'text-allow-overlap': true,
            'visibility': 'none'
        }
    });

    // 3. TRANSACTIONS (Ventes passées)
    map.addLayer({
        id: 'transactions-bg',
        type: 'circle',
        source: 'transactions',
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 5, 14, 10],
            'circle-color': ['case', ['boolean', ['get', 'isMatch'], true], '#10b981', '#0f172a'],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
        },
        layout: { visibility: 'none' }
    });
    map.addLayer({
        id: 'transactions-icon',
        type: 'symbol',
        source: 'transactions',
        layout: {
            'text-field': ['case', ['==', ['get', 'type'], 'Maison'], '🏠', '🏢'],
            'text-size': ['interpolate', ['linear'], ['zoom'], 11, 6, 14, 10],
            'text-allow-overlap': true,
            'visibility': 'none'
        }
    });

    // 4. CITY CENTERS (Pôles d'attractivité)
    map.addLayer({
        id: 'city-centers-bg',
        type: 'circle',
        source: 'city-centers',
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 8, 14, 14],
            'circle-color': '#fff',
            'circle-stroke-width': 2,
            'circle-stroke-color': ['get', 'color']
        }
    });
    map.addLayer({
        id: 'city-centers-icon',
        type: 'symbol',
        source: 'city-centers',
        layout: {
            'text-field': ['get', 'icon'],
            'text-size': ['interpolate', ['linear'], ['zoom'], 11, 10, 14, 16],
            'text-allow-overlap': true
        }
    });

    // 4. Paths (Walking/Transit)
    map.addLayer({
        id: MAP_LAYERS.PATHS,
        type: 'line',
        source: 'paths',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
            'line-color': ['get', 'color'],
            'line-width': 4,
            'line-opacity': 0.8
        }
    });

    // Interaction events
    map.on('mouseenter', MAP_LAYERS.NEIGHBORHOODS_FILL, () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', MAP_LAYERS.NEIGHBORHOODS_FILL, () => {
        map.getCanvas().style.cursor = '';
    });
    map.on('click', MAP_LAYERS.NEIGHBORHOODS_FILL, (e) => {
        if (e.features.length > 0) {
            selectFeature(e);
        }
    });

    initApp();
});

// Compatibility Shims
window.communeHighlightLayer = { 
    clearLayers: () => {
        const source = map.getSource('commune-highlight');
        if (source) source.setData({ type: 'FeatureCollection', features: [] });
    }
};
window.walkingPathsGroup = { 
    clearLayers: () => {
        const source = map.getSource('walking-paths');
        if (source) source.setData({ type: 'FeatureCollection', features: [] });
        const bsource = map.getSource('walking-paths-badges');
        if (bsource) bsource.setData({ type: 'FeatureCollection', features: [] });
        
        if (window.activeWalkingPaths) {
            window.activeWalkingPaths.forEach(p => {
                if (p.markers) p.markers.forEach(m => m.remove());
            });
            window.activeWalkingPaths = [];
        }
    }
};

// window.renderActiveLayers = () => { console.log("renderActiveLayers - migration in progress"); };

window.visibleInseeCache = [];
function updateVisibleInseeCache() {
    if (!window.map || !window.irisGrid) return;
    const bounds = window.map.getBounds();
    const visible = new Set();

    // Use the spatial grid for ultra-fast visibility detection (O(1) vs O(N))
    const nw = bounds.getNorthWest();
    const se = bounds.getSouthEast();
    
    const minX = Math.floor(nw.lng * 50) - 1;
    const maxX = Math.floor(se.lng * 50) + 1;
    const minY = Math.floor(se.lat * 50) - 1;
    const maxY = Math.floor(nw.lat * 50) + 1;

    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            const cell = window.irisGrid[`${x},${y}`];
            if (cell) cell.forEach(code => visible.add(code));
        }
    }

    window.visibleInseeCache = Array.from(visible);
    console.log("📍 Updated visible IRIS cache:", window.visibleInseeCache.length);
}

const debouncedRender = (function(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
})(() => {
    updateVisibleInseeCache();
    if (window.renderActiveLayers) window.renderActiveLayers();
}, 60);

map.on('moveend', debouncedRender);
map.on('zoomend', debouncedRender);
// Initial update
setTimeout(updateVisibleInseeCache, 1000);

window.toggleSatelliteView = function (isSatellite) {
    console.log("Toggle satellite view (migration in progress)");
    // MapLibre logic for switching between raster and satellite sources would go here
};

// --- INFO BOX (Stand-alone div for robust event handling) ---
const info = {};
const infoDiv = document.getElementById('info-card');

// --- SIDEBAR VIEW MANAGEMENT ---
window.setSidebarView = function (view) {
    const rankingDiv = document.getElementById('sidebar-results-content');
    const infoDiv = document.getElementById('info-card');
    const perimeterDiv = document.getElementById('search-perimeter-content');

    // Helper to hide all views
    const hideAll = () => {
        if (rankingDiv) rankingDiv.classList.add('view-hidden');
        if (infoDiv) {
            infoDiv.classList.remove('visible');
            infoDiv.classList.add('view-hidden');
        }
        if (perimeterDiv) perimeterDiv.classList.add('view-hidden');
    };

    hideAll();

    const modeBadge = document.getElementById('sidebar-mode-badge');

    if (view === 'info') {
        if (infoDiv) {
            infoDiv.classList.remove('view-hidden');
            void infoDiv.offsetWidth;
            infoDiv.classList.add('visible');
        }
    } else {
        // "Nothing" state
        hideAll();
    }
};

// Block all map interaction when touching the info card
if (infoDiv) {
    L.DomEvent.disableClickPropagation(infoDiv);
    L.DomEvent.disableScrollPropagation(infoDiv);

    // Extra safety: manual stop
    infoDiv.addEventListener('click', e => e.stopPropagation());
    infoDiv.addEventListener('mousedown', e => e.stopPropagation());
}

info.update = function (props, isSticky = false) {
    if (!infoDiv) return;

    try {
        if (window.selectedLayer && !isSticky) return;
        if (!props || !props.nom) {
            if (window.selectedLayer) return;
            window.setSidebarView('none');
            if (infoDiv) {
                infoDiv.classList.remove('sticky-box');
                infoDiv.innerHTML = '';
            }
            return;
        }

        window.setSidebarView('info');
        if (isSticky) {
            infoDiv.classList.add('sticky-box');
        } else {
            infoDiv.classList.remove('sticky-box');
        }

        const matchData = calculateMatchRate(props, true);
        const matchRate = matchData?.total || 0;
        
        const SECTION_ICONS = {
            search: `<svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>`,
            compass: `<svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"></path></svg>`,
            about: `<svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>`
        };

        const CAT_ICONS = {
            immo: `<svg class="w-5 h-5 text-[#1e1b4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>`,
            commute: `<svg class="w-5 h-5 text-[#1e1b4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
            mobility: `<svg class="w-5 h-5 text-[#1e1b4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
            urbanisme: `<svg class="w-5 h-5 text-[#1e1b4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
            vieQuartier: `<svg class="w-5 h-5 text-[#1e1b4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9v12h14V9"></path><path d="M7 21v-7h4v7"></path><rect x="13" y="14" width="4" height="4"></rect><path d="M3 9l2-5h14l2 5Z" fill="currentColor"></path><path d="M8 2h8"></path></svg>`,
            socio: `<svg class="w-5 h-5 text-[#1e1b4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="8" cy="12" r="3"></circle><line x1="14" y1="10" x2="19" y2="10"></line><line x1="14" y1="14" x2="19" y2="14"></line></svg>`,
            demo: `<svg class="w-5 h-5 text-[#1e1b4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line><line x1="2" y1="20" x2="22" y2="20"></line></svg>`,
            safety: `<svg class="w-5 h-5 text-[#1e1b4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
            education: `<svg class="w-5 h-5 text-[#1e1b4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10l-10-5-10 5 10 5 10-5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path><line x1="22" y1="10" x2="22" y2="19"></line></svg>`,
            infra: `<svg class="w-5 h-5 text-[#1e1b4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 14V6h4v4h4V4h6v10"></path><path d="M6 9h.01M16 7h.01M16 10h.01" stroke-width="3"></path><path d="M1 16c6-3 14-3 22 2"></path></svg>`,
            finances: `<svg class="w-5 h-5 text-[#1e1b4b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="21" width="16" height="2"></rect><polygon points="12 2 20 7 4 7"></polygon><line x1="16" y1="21" x2="16" y2="9"></line><line x1="8" y1="21" x2="8" y2="9"></line><line x1="12" y1="21" x2="12" y2="9"></line></svg>`
        };

        const html = `
        <div class="absolute left-6 top-6 bottom-6 w-[440px] bg-slate-50/95 backdrop-blur-md rounded-3xl shadow-[0_20px_60px_-15px_rgba(30,27,75,0.3)] flex flex-col border-2 border-[#1e1b4b] overflow-hidden z-20">
            
            <!-- Header Section -->
            <div class="px-6 py-6 shrink-0 bg-white border-b-2 border-[#1e1b4b] z-10">
                <div class="flex items-start justify-between mb-4">
                    <div class="min-w-0 pr-4">
                        <h2 class="text-2xl font-black text-[#1e1b4b] tracking-tighter leading-tight mb-0.5 truncate">${cleanName(props.nom)}</h2>
                        <p class="text-sm font-bold text-slate-400">${props.commune || ''}</p>
                    </div>
                    <div class="flex items-center gap-3 shrink-0">
                        <span class="text-4xl font-black ${matchData.excluded ? 'text-slate-200' : 'text-emerald-500'} tracking-tighter">${matchRate}%</span>
                        <button onclick="deselectFeature()" class="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors border-2 border-[#1e1b4b] shadow-[2px_2px_0px_#1e1b4b]">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>
                
                <!-- Tags -->
                <div class="flex flex-wrap gap-2">
                    ${(() => {
                        try {
                            return getQuartierBadges(props);
                        } catch (e) { return []; }
                    })().map(b => `
                        <div class="relative shadow-offset-purple">
                            <div class="relative bg-white border-2 border-[#1e1b4b] text-[#1e1b4b] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider whitespace-nowrap">${b.text}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto no-scrollbar p-6 space-y-5">
                ${(() => {
                    const sectionMapping = [
                        { title: "Périmètre de recherche", icon: SECTION_ICONS.search, ids: ["immo", "commute"] },
                        { title: "Comprendre le quartier", icon: SECTION_ICONS.compass, ids: ["mobility", "urbanisme", "vieQuartier", "socio", "demo"] },
                        { title: `À propos de ${props.commune || 'la ville'}`, icon: SECTION_ICONS.about, ids: ["safety", "education", "infra", "finances"] }
                    ];

                    return sectionMapping.map(section => `
                        <div class="flex items-center gap-2 mb-2 mt-4 first:mt-0">
                            ${section.icon}
                            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">${section.title}</span>
                        </div>
                        
                        <div class="space-y-4">
                        ${section.ids.map(id => {
                            const cat = matchData.categories[id];
                            if (!cat || !cat.label || cat.isHidden) return '';
                            const isOpen = window.activeAccordion === id;
                            
                            // Appreciation color
                            const appreciationColors = {
                                "Idéal": "bg-emerald-100", "Confortable": "bg-[#dcfce7]",
                                "Moyen": "bg-[#fef08a]", "Pénible": "bg-[#fee2e2]",
                                "Sous-invest.": "bg-[#fce7f3]", "Excellent": "bg-[#dcfce7]",
                                "Bon": "bg-[#f0fdf4]", "Mixité sociale": "bg-[#dcfce7]",
                                "Loin des gares": "bg-[#fee2e2]", "Connecté": "bg-[#fef9c3]",
                                "Sur le métro": "bg-[#dcfce7]"
                            };
                            const badgeColor = appreciationColors[cat.appreciation] || "bg-slate-100";

                            return `
                                <div class="relative group cursor-pointer">
                                    <div class="absolute inset-0 bg-[#c4b5fd] rounded-xl translate-x-[4px] translate-y-[4px] transition-transform group-hover:translate-x-[6px] group-hover:translate-y-[6px]"></div>
                                    <div class="relative bg-white border-2 border-[#1e1b4b] rounded-xl flex flex-col overflow-hidden transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 ${isOpen ? 'ring-2 ring-indigo-200' : ''}">
                                        
                                        <!-- Header Accordion -->
                                        <div onclick="window.toggleAccordion('${id}')" class="p-4 flex items-center justify-between ${isOpen && id === 'commute' ? 'bg-[#1e1b4b]' : ''}">
                                            <div class="flex items-center gap-4">
                                                <div class="relative w-10 h-10 shrink-0">
                                                    <div class="absolute inset-0 ${isOpen && id === 'commute' ? 'bg-white' : 'bg-[#c4b5fd]'} rounded-[10px] translate-x-[2px] translate-y-[2px]"></div>
                                                    <div class="absolute inset-0 ${isOpen && id === 'commute' ? 'bg-[#c4b5fd]' : 'bg-white'} border-2 border-[#1e1b4b] rounded-[10px] flex items-center justify-center">
                                                        ${CAT_ICONS[id] || cat.icon}
                                                    </div>
                                                </div>
                                                <h3 class="font-black ${isOpen && id === 'commute' ? 'text-white' : 'text-[#1e1b4b]'} text-[15px]">${cat.label}</h3>
                                            </div>
                                            <div class="flex items-center gap-3">
                                                <div class="relative">
                                                    <div class="absolute inset-0 ${isOpen && id === 'commute' ? 'bg-white' : 'bg-[#c4b5fd]'} rounded-md translate-x-[2px] translate-y-[2px]"></div>
                                                    <div class="relative text-[10px] font-black text-[#1e1b4b] ${badgeColor} border-2 border-[#1e1b4b] px-2 py-1 rounded-md uppercase tracking-wider">${cat.appreciation}</div>
                                                </div>
                                                <svg class="w-5 h-5 ${isOpen && id === 'commute' ? 'text-white/50' : 'text-slate-300'} transform transition-transform ${isOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>

                                        <!-- Content Accordion -->
                                        ${isOpen ? `
                                        <div class="p-5 bg-dot-grid border-t-2 border-[#1e1b4b] animate-in fade-in slide-in-from-top-2 duration-300">
                                            <!-- Sources -->
                                            <div class="relative inline-block mb-5">
                                                <div class="absolute inset-0 bg-[#c4b5fd] rounded-lg translate-x-[3px] translate-y-[3px]"></div>
                                                <button onclick="window.toggleSources('${id}', event)" class="relative bg-white border-2 border-[#1e1b4b] text-[#1e1b4b] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:-translate-y-0.5 transition-transform">
                                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                                                    Sources de données
                                                </button>
                                                <div id="sources-dropdown-${id}" class="sources-dropdown hidden absolute top-12 left-0 right-[-100px] z-30 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-[#1e1b4b] p-5 animate-in fade-in zoom-in duration-200">
                                                    <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Sources détaillées</div>
                                                    <div class="space-y-4">
                                                        ${(CATEGORY_SOURCES[id] || []).map(s => `
                                                            <div class="flex gap-4">
                                                                <div class="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-inner">${s.icon}</div>
                                                                <div class="flex flex-col">
                                                                    <div class="flex items-center gap-2">
                                                                        <span class="text-[11px] font-black text-slate-800">${s.title}</span>
                                                                        <span class="text-[10px] text-slate-400 font-bold">(${s.year})</span>
                                                                    </div>
                                                                    <span class="text-[10px] text-slate-500 leading-tight mt-1">${s.desc}</span>
                                                                </div>
                                                            </div>
                                                        `).join('')}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="relative">
                                                ${renderCategoryDetails(id, props, cat, matchData)}
                                            </div>
                                        </div>` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                        </div>
                    `).join('');
                })()}
            </div>
        </div>
        `;
        infoDiv.innerHTML = html;
    } catch (err) {
        console.error("Error updating info box:", err);
        infoDiv.innerHTML = `
            <div class="p-8 text-center flex flex-col items-center justify-center h-full">
                <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 border-2 border-red-100 shadow-sm">
                    <span class="text-3xl">⚠️</span>
                </div>
                <h3 class="text-lg font-black text-red-800 mb-2">Erreur d'affichage</h3>
                <p class="text-xs text-red-600/70 max-w-[200px] leading-relaxed">
                    Impossible de charger les détails de ce quartier.
                </p>
            </div>
        `;
        infoDiv.classList.add('visible');
    }
};

window.activeAccordion = null;

// Returns the path type that should be visible for the current accordion,
// or null if no paths should be shown.
window.getVisiblePathType = function (accordion) {
    switch (accordion) {
        case 'commute': return 'workplace';
        case 'vieQuartier': return 'center';
        case 'mobility':
        case 'infra': return 'station';
        default: return null; // all other categories → hide all paths
    }
};

window.highlightAllWalkingPaths = function (visible, filterType = null) {
    if (!window.activeWalkingPaths) return;

    // Determine the relevant type for the current accordion if none provided
    let effectiveFilterType = filterType;
    if (visible && effectiveFilterType === null) {
        effectiveFilterType = window.getVisiblePathType(window.activeAccordion);
        // If accordion maps to no type (other categories), hide everything
        if (effectiveFilterType === null) {
            window.activeWalkingPaths.forEach(path => window.highlightPath(path.id, false, path));
            return;
        }
    }

    window.activeWalkingPaths.forEach(path => {
        let show = visible;
        if (effectiveFilterType) {
            if (Array.isArray(effectiveFilterType)) {
                show = visible && effectiveFilterType.includes(path.type);
            } else {
                show = visible && (path.type === effectiveFilterType);
            }
        }
        
        window.highlightPath(path.id, show, path);
    });
};

window.highlightPathByName = function (name) {
    if (!window.activeWalkingPaths) return;

    if (!name) {
        // Reset to category-appropriate visibility
        const visibleType = window.getVisiblePathType(window.activeAccordion);
        window.highlightAllWalkingPaths(visibleType !== null, visibleType || undefined);
        return;
    }

    // Determine the relevant type for the current accordion
    let effectiveType = null;
    if (window.activeAccordion === 'commute') effectiveType = 'workplace';
    else if (window.activeAccordion === 'vieQuartier') effectiveType = 'center';
    else if (window.activeAccordion === 'mobility' || window.activeAccordion === 'infra') effectiveType = 'station';

    window.activeWalkingPaths.forEach(path => {
        // Only match if the path is of the correct type for the current view
        const isCorrectType = !effectiveType || path.type === effectiveType;
        const isMatch = isCorrectType && path.name && path.name.toLowerCase().includes(name.toLowerCase());

        if (isMatch) {
            window.highlightPath(path.id, true);
            if (path.polylines) {
                path.polylines.forEach(p => p.setStyle({ weight: 12 }));
                path.polylines[0].bringToFront();
            }
        } else {
            window.highlightPath(path.id, false);
        }
    });
};

window.updateContextualMap = function (categoryId, noZoom = false) {
    // 1. Gérer la visibilité des groupes de pills à droite
    const allPillGroups = ['pill-group-mobility', 'pill-group-commerces', 'pill-group-sante', 'pill-group-sorties', 'pill-group-infra', 'pill-group-maps', 'pill-group-immo', 'pill-group-demo', 'pill-group-commute'];
    const pillMappings = {
        'immo': ['pill-group-immo'],
        'mobility': ['pill-group-mobility'],
        'commute': ['pill-group-commute'],
        'urbanisme': ['pill-group-maps'],
        'vieQuartier': ['pill-group-commerces', 'pill-group-sorties', 'pill-group-sante'],
        'infra': ['pill-group-infra'],
        'education': ['pill-group-infra'],
        'safety': ['pill-group-maps'],
        'socio': ['pill-group-maps'],
        'demo': ['pill-group-demo'],
        'finances': ['pill-group-immo']
    };


    if (categoryId) {
        const allowedPills = pillMappings[categoryId] || [];
        allPillGroups.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (allowedPills.includes(id)) {
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            }
        });
    } else {
        // Mode "tout afficher" quand l'accordéon est fermé
        allPillGroups.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('hidden');
        });
    }

    // 2. Cacher visuellement les pastilles contextuelles (points d'intérêt sur la carte)
    document.querySelectorAll('.context-pill').forEach(p => p.classList.add('hidden'));

    const mappings = {
        'immo': { 'show-transactions': true },
        'mobility': { 'show-stations': true },
        'commute': { 'group-commute': true },
        'urbanisme': {},
        'vieQuartier': { 'show-centre-ville': true },
        'infra': { 'group-infra': true },
        'education': { 'show-schools': true },
        'safety': { 'show-qpv': true, 'show-zsp': true },
        'demo': { 'group-demo': true }
    };


    const config = mappings[categoryId];
    if (config) {
        // A. Tout décocher d'abord (Reset propre)
        Object.values(mappings).forEach(mapGroup => {
            for (const id in mapGroup) {
                const el = document.getElementById(id);
                if (el) {
                    el.checked = false;
                    if (id.startsWith('group-')) {
                        const gid = id.replace('group-', '');
                        document.querySelectorAll(`.sub-${gid}`).forEach(s => s.checked = false);
                    }
                }
            }
        });

        // B. Cocher uniquement ce qui concerne la catégorie cliquée
        for (const [id, state] of Object.entries(config)) {
            const el = document.getElementById(id);
            if (el) {
                el.checked = state;
                if (id.startsWith('group-')) {
                    const gid = id.replace('group-', '');
                    document.querySelectorAll(`.sub-${gid}`).forEach(s => s.checked = state);
                } else {
                    const subClass = Array.from(el.classList).find(c => c.startsWith('sub-'));
                    if (subClass) {
                        const gid = subClass.replace('sub-', '');
                        if (window.updateChildState) window.updateChildState(gid);
                    }
                }
            }
        }

        // C. Lancer TOUTES les mises à jour cartographiques
        if (window.renderActiveLayers) window.renderActiveLayers();
        if (window.updateCentreVilleVisibility) window.updateCentreVilleVisibility();
        if (window.updateTransactionsVisibility) window.updateTransactionsVisibility();
        if (window.updateOSMContextVisibility) window.updateOSMContextVisibility();
        if (window.updateQPVVisibility) window.updateQPVVisibility();
        if (window.updateZSPVisibility) window.updateZSPVisibility();
        if (window.updateEspacesVertsVisibility) window.updateEspacesVertsVisibility();
        if (window.updateNoiseVisibility) window.updateNoiseVisibility();
        if (window.updatePathsVisibility) window.updatePathsVisibility();
    }

    // Map movement is handled at a higher level (selectFeature/selectCity)
    // Removed map.stop() to allow smooth transitions

    // D. Toujours mettre à jour les trajets selon la catégorie active
    const visibleType = window.getVisiblePathType(categoryId);
    if (window.highlightAllWalkingPaths) {
        window.highlightAllWalkingPaths(visibleType !== null, visibleType || undefined);
    }

    // Small delay to ensure layout has settled (sidebar width etc.)
    if (!noZoom) {
        setTimeout(() => {
            if (categoryId === 'commute' && window.selectedLayer) {
                const feat = window.selectedLayer.feature;
                const irisBounds = turf.bbox(feat);
                
                const commuteCriteria = (window.searchCriteria || []).find(c => c.property === 'commute');
                const hubId = commuteCriteria?.workplace || (window.activeWorkplaces?.[0]?.id) || 'bastille';
                const hub = (window.HUBS_COORDS || {})[hubId];
                
                if (hub) {
                    const bounds = [
                        [Math.min(irisBounds[0], hub.lon), Math.min(irisBounds[1], hub.lat)],
                        [Math.max(irisBounds[2], hub.lon), Math.max(irisBounds[3], hub.lat)]
                    ];
                    
                    window.map.fitBounds(bounds, {
                        padding: { top: 100, bottom: 100, left: 420, right: 100 },
                        maxZoom: 13,
                        duration: 800
                    });
                }
            } else if (window.selectedLayer) {
                const feat = window.selectedLayer.feature;
                const bbox = turf.bbox(feat);
                window.map.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]], {
                    padding: { top: 50, bottom: 50, left: 360, right: 50 },
                    maxZoom: 15,
                    duration: 800
                });
            } else if (window.activeCommuneName) {
                if (window.selectCity) window.selectCity(window.activeCommuneName);
            }
        }, 50);
    }

};

window.toggleAccordion = function (id) {
    // Preserve scroll position
    const body = document.querySelector('.info-body');
    const scrollPos = body ? body.scrollTop : 0;

    if (window.activeAccordion === id) {
        window.activeAccordion = null;
    } else {
        window.activeAccordion = id;
    }

    // Contextual update for map and pills
    window.updateContextualMap(window.activeAccordion);

    // Re-render the info box with the current feature
    if (window.selectedLayer) {
        info.update(window.selectedLayer.feature.properties, true);

        // Restore scroll position after a short delay to allow DOM update
        setTimeout(() => {
            const newBody = document.querySelector('.info-body');
            if (newBody) newBody.scrollTop = scrollPos;
        }, 0);
    }
};

function renderImmoHTML(props, segment, budget, matchData) {
    const liquidity = Math.min(100, (segment?.vol || 0) * 15);
    return `
        <div class="px-4 pb-4 space-y-4">
            <div class="pt-2 border-t border-gray-100">
            ${matchData.details.immo.availability === 0 ? `
            <div class="bg-red-50 p-2 rounded-lg border border-red-100 flex items-center gap-2 mb-3">
                <span class="text-sm">⚠️</span>
                <div class="flex flex-col">
                    <span class="text-[9px] font-black text-red-800 uppercase">Indisponible</span>
                    <span class="text-[8px] text-red-600">Aucun bien de type "${(window.currentPropertyType || 'all') === 'house' ? 'Maison' : 'Appartement'}" dans ce quartier.</span>
                </div>
            </div>
            ` : ''}

            <div class="bg-white/40 p-3 rounded-xl border border-gray-100 shadow-sm">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[10px] text-gray-500 uppercase font-black">Prix Marché</span>
                    <span class="text-[14px] font-black text-gray-900">${new Intl.NumberFormat('fr-FR').format(segment?.price || 0)} €/m2</span>
                </div>
                ${window.renderHistoricalTrend(props.evolution_house, props.evolution_apt)}
            </div>

            <!-- Core Metrics Unified -->
            <div class="mt-4 space-y-3">
                <!-- Match Budget -->
                <div class="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm transition-all duration-500">
                    <div class="flex justify-between items-end mb-2">
                        <div class="flex flex-col">
                            <span class="text-[9px] font-black uppercase text-gray-500 tracking-widest">Match Budget</span>
                            <span class="text-[8px] text-gray-400 font-medium">Taille idéale visée : ${Math.round(budget / (segment?.price || 1))} m2</span>
                        </div>
                        <span class="text-[14px] font-black text-gray-800">${matchData.details.immo.fitScore}%</span>
                    </div>
                    <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full transition-all duration-700" style="width: ${matchData.details.immo.fitScore}%; background: ${matchData.details.immo.fitScore >= 80 ? 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)' : (matchData.details.immo.fitScore >= 50 ? 'linear-gradient(90deg, #fcd34d 0%, #f59e0b 100%)' : 'linear-gradient(90deg, #fca5a5 0%, #ef4444 100%)')};"></div>
                    </div>
                </div>

                <!-- Type de bien recherché -->
                <div class="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm transition-all duration-500">
                    <div class="flex justify-between items-end mb-2">
                        <div class="flex flex-col">
                            <span class="text-[9px] font-black uppercase text-gray-500 tracking-widest">Bien Ciblé</span>
                            <span class="text-[8px] text-gray-400 font-medium">${window.currentPropertyType === 'house' ? 'Maisons' : (window.currentPropertyType === 'apt' ? 'Appartements' : 'Logements')} ≥ ${document.getElementById('surface-input')?.value || '?'}</span>
                        </div>
                        <span class="text-[14px] font-black text-gray-800">${matchData.details.immo.finalAvailabilityPct}%</span>
                    </div>
                    <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full transition-all duration-700" style="width: ${matchData.details.immo.finalAvailabilityPct}%; background: ${matchData.details.immo.finalAvailabilityPct >= 15 ? 'linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%)' : (matchData.details.immo.finalAvailabilityPct >= 7 ? 'linear-gradient(90deg, #fcd34d 0%, #f59e0b 100%)' : 'linear-gradient(90deg, #fca5a5 0%, #ef4444 100%)')};"></div>
                    </div>
                </div>

                <!-- Liquidité -->
                <div class="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm transition-all duration-500">
                    <div class="flex justify-between items-end mb-2">
                        <div class="flex flex-col">
                            <span class="text-[9px] font-black uppercase text-gray-500 tracking-widest">Liquidité Marché</span>
                            <span class="text-[8px] text-gray-400 font-medium">${segment?.vol || 0} transactions / an</span>
                        </div>
                        <span class="text-[14px] font-black text-gray-800">${liquidity}%</span>
                    </div>
                    <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full transition-all duration-700" style="width: ${liquidity}%; background: linear-gradient(90deg, #a78bfa 0%, #8b5cf6 100%);"></div>
                    </div>
                </div>
            </div>

            <!-- Surface Distribution -->
            ${props.demo?.surface_dist ? `
            <div class="mt-6 pt-4 border-t border-gray-100">
                <div class="flex justify-between items-end mb-3">
                    <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Répartition des surfaces (existantes)</div>
                </div>
                <div class="space-y-2.5">
                    ${Object.entries(props.demo.surface_dist).map(([label, pct]) => {
                        const bValues = { "<30m2": 20, "30-40m2": 35, "40-60m2": 50, "60-80m2": 70, "80-100m2": 90, "100-120m2": 110, "120m2+": 140 };
                        const avgSize = bValues[label] || 50;
                        const est = budget / (segment?.price || 1);
                        const ratio = est / avgSize;
                        let barGradient = 'linear-gradient(90deg, #fcd34d 0%, #f59e0b 100%)';
                        let statusText = 'Trop petit';
                        let statusColor = 'text-amber-500';
                        if (ratio >= 0.95 && ratio <= 1.25) {
                            barGradient = 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)';
                            statusText = 'Match Budget';
                            statusColor = 'text-emerald-500';
                        } else if (ratio < 0.95) {
                            barGradient = 'linear-gradient(90deg, #fca5a5 0%, #ef4444 100%)';
                            statusText = 'Hors Budget';
                            statusColor = 'text-rose-500';
                        }

                        return '<div>' +
                            '<div class="flex justify-between items-center text-[8px] mb-1 px-1">' +
                            '<div class="flex items-center gap-1.5">' +
                            '<span class="text-gray-600 font-bold">' + label + '</span>' +
                            '<span class="text-[7px] font-bold ' + statusColor + ' uppercase opacity-80">' + statusText + '</span>' +
                            '</div>' +
                            '<span class="font-bold text-gray-800">' + pct + '%</span>' +
                            '</div>' +
                            '<div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">' +
                            '<div class="h-full shadow-sm" style="width: ' + pct + '%; background: ' + barGradient + '"></div>' +
                            '</div>' +
                            '</div>';
                    }).join('')}
                </div>
            </div>
            ` : ''}
            </div>
        </div>
    `;
}

function renderCategoryDetails(id, props, cat, matchData) {
    const budget = parseInt(document.getElementById('budget-input')?.value || 850000);
    const segment = props[window.currentPropertyType || 'all'] || props.all || { price: 5000, vol: 0 };

    switch (id) {
        case 'immo':
            return renderImmoHTML(props, segment, budget, matchData);

        case 'commute': {
            let html = `<div class="px-4 pb-4 space-y-2 mt-1">`;
            const activeHubs = window.activeWorkplaces || [];
            const hubNames = {
                'bastille': 'Bastille, Paris',
                'saint-lazare': 'Saint-Lazare, Paris',
                'montparnasse': 'Montparnasse, Paris',
                'la-defense': 'La Défense, Puteaux',
                'saclay': 'Plateau de Saclay',
                'saint-denis': 'Saint-Denis Pleyel'
            };

            activeHubs.forEach(wp => {
                const rawCache = window.precomputedJourneysRaw?.[props.code]?.[wp.id];
                const hubName = hubNames[wp.id] || wp.id;

                // We might have multiple itineraries for this workplace
                const itineraries = [];
                if (rawCache) {
                    if (rawCache.main) {
                        itineraries.push({ ...rawCache.main, label: 'Principal', key: 'main' });
                    }
                    if (rawCache.alternate) {
                        itineraries.push({ ...rawCache.alternate, label: 'Alternatif', key: 'alternate' });
                    }
                    if (itineraries.length === 0 && rawCache.duration) {
                        itineraries.push({ ...rawCache, label: 'Itinéraire', key: 'main' });
                    }
                }

                itineraries.forEach(cached => {
                    const isOverLimit = cached.duration > wp.limit;
                    const isSelected = window.commuteItineraryType === cached.key || (window.commuteItineraryType === 'main' && cached.key === 'main');

                    let breakdown = [];
                    if (cached.sections && cached.sections.length > 0) {
                        breakdown = cached.sections.filter(s => s.code || ['rer', 'metro', 'bus', 'tram', 'train'].includes(s.type));
                    } else if (cached.itinerary) {
                        breakdown = cached.itinerary;
                    }

                    html += `
                    <div onclick="window.commuteItineraryType = '${cached.key}'; window.updateWalkingPath(window.selectedLayer.feature.properties); info.update(window.selectedLayer.feature.properties, true);"
                         class="relative mb-5 last:mb-0 group cursor-pointer">
                        <div class="absolute inset-0 bg-[#c4b5fd] rounded-xl translate-x-[4px] translate-y-[4px]"></div>
                        <div class="relative bg-white border-2 border-[#1e1b4b] rounded-xl p-4 transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 ${isSelected ? 'ring-2 ring-blue-400' : ''}">
                            <div class="flex justify-between items-center mb-4">
                                <div class="flex items-center gap-2.5">
                                    <span class="font-black text-[#1e1b4b] text-[13px] tracking-tight uppercase">${hubName}</span>
                                    <span class="bg-white border-2 border-[#1e1b4b] text-[#1e1b4b] text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${cached.key === 'main' ? '' : 'bg-[#fef08a]'}">${cached.label}</span>
                                </div>
                                <div class="relative">
                                    <div class="absolute inset-0 bg-[#1e1b4b] rounded-lg translate-x-[3px] translate-y-[3px]"></div>
                                    <span class="relative block ${isOverLimit ? 'bg-red-500' : 'bg-[#2563eb]'} border-2 border-[#1e1b4b] text-white text-[12px] font-black px-3 py-1 rounded-lg">~${cached.duration} min</span>
                                </div>
                            </div>
                            
                            <div class="flex flex-wrap items-center gap-y-2.5">
                                ${(() => {
                                    let stepsHtml = '';
                                    const firstMile = cached.firstMile || (cached.sections && cached.sections[0]?.type === 'walking' ? cached.sections[0].duration : 0);
                                    if (firstMile > 0) {
                                        stepsHtml += `
                                            <div class="relative">
                                                <div class="absolute inset-0 bg-[#c4b5fd] rounded-md translate-x-[2px] translate-y-[2px]"></div>
                                                <div class="relative bg-white border-2 border-[#1e1b4b] px-2 py-0.5 rounded-md flex items-center gap-1.5">
                                                    <span class="text-xs leading-none">🚶</span>
                                                    <span class="text-[10px] font-black text-[#1e1b4b]">${firstMile} min</span>
                                                </div>
                                            </div>
                                        `;
                                    }

                                    breakdown.forEach((step, idx) => {
                                        if (stepsHtml && idx >= 0) {
                                            stepsHtml += `<svg class="w-4 h-4 mx-1.5 text-[#1e1b4b] stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>`;
                                        }
                                        const color = step.color.startsWith('#') ? step.color : `#${step.color}`;
                                        const textColor = step.textColor ? (step.textColor.startsWith('#') ? step.textColor : `#${step.textColor}`) : '#ffffff';
                                        let stepDur = step.duration || 0;
                                        if (stepDur > 60) stepDur = Math.round(stepDur / 60);

                                        stepsHtml += `
                                            <div class="relative">
                                                <div class="absolute inset-0 bg-[#c4b5fd] rounded-md translate-x-[2px] translate-y-[2px]"></div>
                                                <div class="relative bg-white border-2 border-[#1e1b4b] px-2 py-0.5 rounded-md flex items-center gap-1.5">
                                                    <div class="w-4 h-4 rounded-sm flex items-center justify-center text-[10px] font-black" style="background-color: ${color}; color: ${textColor}">${step.code}</div>
                                                    <span class="text-[10px] font-black text-[#1e1b4b]">${stepDur} min</span>
                                                </div>
                                            </div>
                                        `;
                                    });

                                    const lastMile = cached.lastMile || (cached.sections && cached.sections[cached.sections.length-1]?.type === 'walking' ? cached.sections[cached.sections.length-1].duration : 0);
                                    if (lastMile > 0) {
                                        stepsHtml += `<svg class="w-4 h-4 mx-1.5 text-[#1e1b4b] stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>`;
                                        stepsHtml += `
                                            <div class="relative">
                                                <div class="absolute inset-0 bg-[#c4b5fd] rounded-md translate-x-[2px] translate-y-[2px]"></div>
                                                <div class="relative bg-white border-2 border-[#1e1b4b] px-2 py-0.5 rounded-md flex items-center gap-1.5">
                                                    <span class="text-xs leading-none">🚶</span>
                                                    <span class="text-[10px] font-black text-[#1e1b4b]">${lastMile} min</span>
                                                </div>
                                            </div>
                                        `;
                                    }
                                    return stepsHtml;
                                })()}
                            </div>
                        </div>
                    </div>`;
                });
            });
            html += `</div>`;
            return html;
        }

        case 'mobility': {
            let html = `<div class="px-4 pb-4 space-y-3 mt-1">`;
            const centroid = window.irisCentroids?.[props.code] || { lat: props.lat, lon: props.lon };

            // Nearby Stations (Metro, RER, Train)
            const nearby = (window.allStationsData || [])
                .filter(s => s && s.lat != null && s.lon != null)
                .map(s => ({ ...s, dist: getDistance(centroid.lat || props.lat, centroid.lon || props.lon, s.lat, s.lon) }))
                .filter(s => s.dist < 800)
                .sort((a, b) => a.dist - b.dist);

            if (nearby.length > 0) {
                html += `
                <div class="space-y-3">
                    <div class="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1 mt-4">Stations à proximité</div>
                    ${nearby.map(s => {
                    return `
                        <div onmouseover="window.highlightPathByName('${s.name}')" 
                             onmouseout="window.highlightPathByName(null)"
                             class="relative group cursor-pointer mb-3">
                            <div class="absolute inset-0 bg-[#c4b5fd] rounded-xl translate-x-[2px] translate-y-[2px]"></div>
                            <div class="relative bg-white border-2 border-[#1e1b4b] p-2.5 rounded-xl flex items-center justify-between transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5">
                                <div class="flex flex-col">
                                    <span class="text-[11px] font-black text-[#1e1b4b] leading-tight mb-1.5">${s.name}</span>
                                    <div class="flex items-center gap-1.5">
                                        <span class="text-[7px] font-black px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 uppercase tracking-tighter">${s.mode}</span>
                                        <span class="text-[9px] text-slate-400 font-bold tracking-tight">${s.lines}</span>
                                    </div>
                                </div>
                                <span class="text-[10px] font-black ${s.dist < 400 ? 'text-emerald-600' : 'text-slate-400'} bg-slate-50 px-2 py-1 rounded-md border border-slate-100">${Math.round(s.dist)}m</span>
                            </div>
                        </div>`;
                }).join('')}
                </div>`;
            } else {
                html += `<div class="text-[9px] italic text-gray-400 text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">Aucune station à moins de 800m</div>`;
            }

            // Grand Paris Express Section
            if (window.gpeStationsData) {
                const nearGPE = window.gpeStationsData
                    .filter(s => s && s.lat != null && s.lon != null)
                    .map(s => ({ ...s, dist: getDistance(centroid.lat || props.lat, centroid.lon || props.lon, s.lat, s.lon) }))
                    .filter(s => s.dist < 1500)
                    .sort((a, b) => a.dist - b.dist);

                if (nearGPE.length > 0) {
                    html += `
                    <div class="pt-5 mt-5 border-t-2 border-slate-100">
                        <div class="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <span class="text-xs">✨</span> Grand Paris Express
                        </div>
                        <div class="space-y-4">
                            ${nearGPE.map(s => `
                                <div class="relative group cursor-pointer mb-3">
                                    <div class="absolute inset-0 bg-[#dcfce7] rounded-xl translate-x-[2px] translate-y-[2px]"></div>
                                    <div class="relative bg-white border-2 border-emerald-800 p-2.5 rounded-xl flex items-center justify-between transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5">
                                        <div class="flex flex-col">
                                            <div class="flex items-center gap-2 mb-1.5">
                                                <span class="text-[11px] font-black text-emerald-900 leading-none">${s.name}</span>
                                                ${s.dist <= 800 ? '<span class="text-[7px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter shadow-sm">Proche</span>' : ''}
                                            </div>
                                            <div class="flex items-center gap-1.5">
                                                ${s.lines.map(l => {
                                                    const c = idfmColors[l] || { bg: "#eee", text: "#000" };
                                                    return `<span class="px-1.5 py-0.5 rounded text-[8px] font-black border border-black/5" style="background-color: ${c.bg}; color: ${c.text};">L.${l}</span>`;
                                                }).join('')}
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <div class="text-[10px] font-black ${s.year <= 2024 ? 'text-blue-600' : 'text-emerald-700'}">${s.year <= 2024 ? 'Service 🟢' : s.year}</div>
                                            <div class="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">${Math.round(s.dist)}m</div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
                }
            }


            // Car Ownership Section
            if (props.demo && props.demo.car_pct !== undefined) {
                html += `
                <div class="pt-3 border-t border-gray-100">
                    <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Équipement Automobile</div>
                    <div class="grid grid-cols-2 gap-2">
                        <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <div class="text-[12px] font-black text-slate-700">${props.demo.car_pct}%</div>
                            <div class="text-[7px] text-slate-400 font-bold uppercase">Au moins 1 voiture</div>
                        </div>
                        <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <div class="text-[12px] font-black text-slate-700">${props.demo.multi_car_pct}%</div>
                            <div class="text-[7px] text-slate-400 font-bold uppercase">2 voitures ou +</div>
                        </div>
                    </div>
                </div>`;
            }

            html += `</div>`;
            return html;
        }
        case 'vieQuartier': {
            const d = matchData.categories?.vieQuartier?.details || {};
            const wm = window.walkingMetadata?.[props.code];
            const proximityHtml = wm ? `
                    <div class="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/50 mt-1 mb-3">
                        <div class="flex items-center gap-2">
                            <span class="text-lg">📍</span>
                            <div class="flex flex-col flex-1">
                                <span class="text-[8px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-0.5">Proximité Cœur de Ville</span>
                                <span class="text-[11px] font-black text-gray-800 leading-tight">${wm.targetName}</span>
                            </div>
                            <div class="text-right">
                                <span class="text-[16px] font-black text-emerald-700 leading-none">${Number(wm.distance_km || 0).toFixed(1)}</span>
                                <span class="text-[9px] text-emerald-600 font-bold uppercase">km</span>
                            </div>
                        </div>
                    </div>` : '';

            return `
                <div class="px-4 pb-4 space-y-3">
                    ${proximityHtml}
                    <div class="bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/50 mt-1">
                        <div class="text-[8px] font-black text-indigo-500 uppercase tracking-widest mb-2">Culture & Sorties</div>
                        <div class="grid grid-cols-3 gap-2">
                            <div onmouseenter="window.highlightCommerceOnMap('cinema', '🍿', 'Cinémas')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-indigo-50 cursor-help hover:border-indigo-300 transition-all shadow-xs">
                                <span class="text-xs">🍿</span>
                                <span class="text-[10px] font-black text-gray-800">${d.cinemas || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Cinémas</span>
                            </div>
                            <div onmouseenter="window.highlightCommerceOnMap('theatre', '🎭', 'Théâtres')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-indigo-50 cursor-help hover:border-indigo-300 transition-all shadow-xs">
                                <span class="text-xs">🎭</span>
                                <span class="text-[10px] font-black text-gray-800">${d.theatres || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Théâtres</span>
                            </div>
                            <div onmouseenter="window.highlightCommerceOnMap('concert', '🎟️', 'Concerts')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-indigo-50 cursor-help hover:border-indigo-300 transition-all shadow-xs">
                                <span class="text-xs">🎟️</span>
                                <span class="text-[10px] font-black text-gray-800">${d.concerts || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Concerts</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/50">
                        <div class="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-2">Commerces de bouche</div>
                        <div class="grid grid-cols-4 gap-2">
                            <div onmouseenter="window.highlightCommerceOnMap('boulangerie', '🥖', 'Boulangeries')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-blue-50 cursor-help hover:border-blue-300 transition-all shadow-xs">
                                <span class="text-xs">🥖</span>
                                <span class="text-[10px] font-black text-gray-800">${d.boulangerie}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Boulang.</span>
                            </div>
                            <div onmouseenter="window.highlightCommerceOnMap('boucherie', '🥩', 'Boucheries')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-blue-50 cursor-help hover:border-blue-300 transition-all shadow-xs">
                                <span class="text-xs">🥩</span>
                                <span class="text-[10px] font-black text-gray-800">${d.boucherie}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Boucher.</span>
                            </div>
                            <div onmouseenter="window.highlightCommerceOnMap('fromagerie', '🧀', 'Fromageries')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-blue-50 cursor-help hover:border-blue-300 transition-all shadow-xs">
                                <span class="text-xs">🧀</span>
                                <span class="text-[10px] font-black text-gray-800">${d.fromagerie}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Fromag.</span>
                            </div>
                            <div onmouseenter="window.highlightCommerceOnMap('bio', '🥦', 'Commerces Bio')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-blue-50 cursor-help hover:border-blue-300 transition-all shadow-xs">
                                <span class="text-xs">🥦</span>
                                <span class="text-[10px] font-black text-gray-800">${d.bio}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Bio</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-pink-50/50 p-3 rounded-xl border border-pink-100/50">
                        <div class="text-[8px] font-black text-pink-400 uppercase tracking-widest mb-2">Gastronomie & Vie Nocturne</div>
                        <div onmouseenter="window.highlightCommerceOnMap('restaurant', '🍽️', 'Restaurants')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex justify-between items-center mb-1 cursor-help p-1 hover:bg-white rounded-md transition-all">
                            <div class="flex items-center gap-2">
                                <span class="text-sm">🍽️</span>
                                <span class="text-[11px] text-gray-600 font-bold">Vrais Restaurants</span>
                            </div>
                            <span class="text-xs font-black text-pink-800">${d.restaurants || 0}</span>
                        </div>
                        <div onmouseenter="window.highlightCommerceOnMap('fast_food', '🍔', 'Fast Food')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex justify-between items-center mb-1 cursor-help p-1 hover:bg-white rounded-md transition-all">
                            <div class="flex items-center gap-2">
                                <span class="text-sm">🍔</span>
                                <span class="text-[11px] text-gray-600 font-bold">Fast Food / Street Food</span>
                            </div>
                            <span class="text-xs font-black text-pink-800">${d.fast_food || 0}</span>
                        </div>
                        <div onmouseenter="window.highlightCommerceOnMap('bar', '🍸', 'Bars & Pubs')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex justify-between items-center mb-1 cursor-help p-1 hover:bg-white rounded-md transition-all">
                            <div class="flex items-center gap-2">
                                <span class="text-sm">🍸</span>
                                <span class="text-[11px] text-gray-600 font-bold">Bars & Pubs</span>
                            </div>
                            <span class="text-xs font-black text-pink-800">${(d.bars || 0) + (d.pubs || 0)}</span>
                        </div>
                    </div>

                    <div class="bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50">
                        <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Pratique & Santé</div>
                        <div class="grid grid-cols-2 gap-2">
                            <div onmouseenter="window.highlightCommerceOnMap('supermarket', '🛒', 'Supermarchés')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex justify-between text-[10px] font-bold text-slate-700 cursor-help p-1 hover:bg-white rounded-md transition-all">
                                <span>🛒 Superm.</span>
                                <span>${d.supermarket}</span>
                            </div>
                            <div onmouseenter="window.highlightCommerceOnMap('pharmacie', '💊', 'Pharmacies')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex justify-between text-[10px] font-bold text-slate-700 cursor-help p-1 hover:bg-white rounded-md transition-all">
                                <span>💊 Pharm.</span>
                                <span>${d.pharmacie}</span>
                            </div>
                            <div onmouseenter="window.highlightCommerceOnMap('post_office', '✉️', 'Bureaux de Poste')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex justify-between text-[10px] font-bold text-slate-700 cursor-help p-1 hover:bg-white rounded-md transition-all">
                                <span>✉️ Poste</span>
                                <span>${d.poste}</span>
                            </div>
                            <div onmouseenter="window.highlightCommerceOnMap('marche', '🧺', 'Marchés')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex justify-between text-[10px] font-bold text-slate-700 cursor-help p-1 hover:bg-white rounded-md transition-all">
                                <span>🧺 Marchés</span>
                                <span>${d.marche || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        case 'urbanisme':
            const envData = matchData.details?.env || {};
            const calmScore = Math.max(0, 100 - (props.noise || 0));
            const landscapeLabel = envData.nature > 60 || envData.isBlue || envData.nearPark ? 'Qualité Supérieure' : 'Standard';

            const segmentName = props.segment_name || "Non segmenté";
            const segmentColor = props.segment_color || "#94a3b8";

            const pavPctRaw = (props.pav || 0) * 100;
            const pavPct = pavPctRaw > 0 && pavPctRaw < 1 ? pavPctRaw.toFixed(1) : Math.round(pavPctRaw);
            const aptPct = 100 - Math.round(pavPctRaw);
            const gardenStatus = (props.gVol > 1 && props.pav > 0.05) ? '✔️ Présents' : (props.pav > 0.3 ? '❓ Probables' : '❌ Rares');

            return `
                <div class="px-4 pb-4 space-y-4">
                    <!-- New Segmentation Header -->
                    <div class="pt-3 pb-1">
                        <div class="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-inner bg-white" style="border: 2px solid ${segmentColor}">
                                ${props.segment_id === 1 ? '🏘️' :
                    props.segment_id === 2 ? '🏛️' :
                        props.segment_id === 3 ? '🌊' :
                            props.segment_id === 4 ? '⛰️' :
                                props.segment_id === 5 ? '✨' :
                                    props.segment_id === 6 ? '🏠' :
                                        props.segment_id === 7 ? '🏡' : '📍'}
                            </div>
                            <div class="flex flex-col">
                                <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest">Type de quartier</span>
                                <span class="text-[13px] font-black text-gray-900 leading-tight">${segmentName}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Habitat Summary -->
                    <div class="pt-2 border-t border-gray-100">
                        <div class="grid grid-cols-2 gap-2 mt-1">
                            <div class="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/30">
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-[8px] font-bold text-blue-500 uppercase">Maisons</span>
                                    <span class="text-[9px] font-black text-blue-700">${pavPct}%</span>
                                </div>
                                <div class="w-full bg-blue-100 h-1.5 rounded-full overflow-hidden">
                                    <div class="bg-blue-500 h-full" style="width: ${pavPctRaw}%"></div>
                                </div>
                            </div>
                            <div class="bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/30">
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-[8px] font-bold text-indigo-500 uppercase">Apparts.</span>
                                    <span class="text-[9px] font-black text-indigo-700">${aptPct}%</span>
                                </div>
                                <div class="w-full bg-indigo-100 h-1.5 rounded-full overflow-hidden">
                                    <div class="bg-indigo-500 h-full" style="width: ${aptPct}%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between px-2 py-1.5 bg-emerald-50/30 rounded-lg border border-emerald-100/20 mt-2">
                            <span class="text-[9px] text-emerald-700 uppercase font-bold flex items-center gap-1">🌳 Jardins</span>
                            <span class="text-[10px] font-black ${gardenStatus.includes('✔️') ? 'text-emerald-600' : 'text-gray-500'}">${gardenStatus}</span>
                        </div>
                    </div>

                    <div class="pt-2 border-t border-gray-100">
                        <div class="flex justify-between text-[9px] mb-1.5">
                            <span class="text-gray-500 font-bold uppercase tracking-wider">Qualité Paysagère</span>
                            <span class="font-bold text-emerald-600">${landscapeLabel}</span>
                        </div>
                        <div class="flex gap-1.5 flex-wrap">
                            <span class="text-[8px] px-1.5 py-0.5 rounded-full ${props.nature > 50 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'} font-bold">Végétalisation</span>
                            ${envData.isBlue ? '<span class="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">Bords de l\'eau</span>' : ''}
                            ${envData.nearPark ? `<span class="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Proximité ${envData.nearParkName || 'Parc'}</span>` : ''}
                        </div>
                    </div>

                    <div id="age-dist-container" class="pt-1 border-t border-gray-100">
                        ${props.age_dist ? `
                        <div class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 mt-2">Âge des bâtiments</div>
                        <div class="flex h-3 w-full rounded-full overflow-hidden border border-gray-100 shadow-inner">
                            <div class="h-full bg-slate-800" style="width: ${props.age_dist.avant_1919}%" title="Avant 1919: ${props.age_dist.avant_1919}%"></div>
                            <div class="h-full bg-slate-600" style="width: ${props.age_dist['1919_1945']}%" title="1919-1945: ${props.age_dist['1919_1945']}%"></div>
                            <div class="h-full bg-slate-400" style="width: ${props.age_dist['1945_1970']}%" title="1945-1970: ${props.age_dist['1945_1970']}%"></div>
                            <div class="h-full bg-slate-300" style="width: ${props.age_dist['1970_1990']}%" title="1970-1990: ${props.age_dist['1970_1990']}%"></div>
                            <div class="h-full bg-slate-200" style="width: ${props.age_dist['1990_2005']}%" title="1990-2005: ${props.age_dist['1990_2005']}%"></div>
                            <div class="h-full bg-blue-100" style="width: ${props.age_dist.apres_2005}%" title="Après 2005: ${props.age_dist.apres_2005}%"></div>
                        </div>
                        <div class="flex justify-between mt-1 text-[7px] font-bold text-gray-400 uppercase tracking-tighter">
                            <span>Ancien</span>
                            <span>Années 70/90</span>
                            <span>Récent</span>
                        </div>
                        ` : ''}
                    </div>

                    <div class="pt-1 border-t border-gray-100">
                        <div class="flex justify-between text-[9px] mb-1.5 pt-2">
                            <span class="text-gray-500 font-bold uppercase tracking-wider">Calme Sonore</span>
                            <span class="font-black text-blue-600">${calmScore}%</span>
                        </div>
                        <div class="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                            <div class="bg-blue-500 h-full transition-all duration-700" style="width: ${calmScore}%"></div>
                        </div>
                    </div>
                </div>
            `;
        case 'infra': {
            const d = matchData.categories?.infra?.details || {};
            const caf = d.caf_coverage || { taux_couv_eaje: 0, taux_couv_global: 0 };
            return `
                <div class="px-4 pb-4 space-y-3">
                    <div class="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/50 mt-1">
                        <div class="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1">Culture & Savoir</div>
                        <div class="grid grid-cols-3 gap-2">
                            <div class="flex flex-col items-center">
                                <span class="text-[10px] font-black text-blue-800">${d.biblios || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Biblio.</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span class="text-[10px] font-black text-blue-800">${d.musees || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Musées</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span class="text-[10px] font-black text-blue-800">${d.conservatoires || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Conser.</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/50">
                        <div class="text-[8px] font-black text-indigo-500 uppercase tracking-widest mb-1">Sport & Éducation</div>
                        <div class="grid grid-cols-3 gap-2">
                            <div class="flex flex-col items-center">
                                <span class="text-[10px] font-black text-indigo-800">${d.tennis || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Tennis</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span class="text-[10px] font-black text-indigo-800">${d.pool || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Piscine</span>
                            </div>
                            <div onmouseenter="window.highlightCommerceOnMap('school', '🏫', 'Écoles')" onmouseleave="window.highlightCommerceOnMap(null)" class="flex flex-col items-center cursor-help p-1 hover:bg-white rounded-md transition-all">
                                <span class="text-[10px] font-black text-indigo-800">${d.schoolsCount || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Écoles</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-pink-50/50 p-2.5 rounded-xl border border-pink-100/50">
                        <div class="flex justify-between items-center mb-1">
                            <div class="text-[8px] font-black text-pink-500 uppercase tracking-widest">Petite Enfance (CAF)</div>
                            <span class="text-[7px] bg-pink-100 text-pink-700 px-1 rounded font-bold">Couv. EAJE</span>
                        </div>
                        <div class="flex items-end gap-2">
                            <span class="text-xl font-black text-pink-600 leading-none">${Math.round(caf.taux_couv_eaje || 0)}%</span>
                            <div class="flex-1 mb-1">
                                <div class="w-full bg-pink-100 h-1 rounded-full overflow-hidden">
                                    <div class="bg-pink-500 h-full" style="width: ${caf.taux_couv_eaje || 0}%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="text-[7px] text-gray-400 mt-1 font-medium">Taux de couverture global : <span class="font-bold text-gray-600">${caf.taux_couv_global || 0}%</span></div>
                    </div>
                </div>
            `;
        }

        case 'socio': {
            const d = cat.details;
            return `
                <div class="px-4 pb-4 space-y-4">
                    <div class="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                        <div class="bg-white p-2 rounded-lg border border-gray-100 shadow-xs">
                            <span class="text-[8px] text-gray-400 uppercase font-black block mb-1">💰 Revenu</span>
                            <span class="text-[11px] font-bold text-gray-800">${(d.income || 0).toLocaleString()}€</span>
                            <p class="text-[7px] text-gray-400 mt-0.5">Médian annuel</p>
                        </div>
                        <div class="bg-white p-2 rounded-lg border border-gray-100 shadow-xs">
                            <span class="text-[8px] text-gray-400 uppercase font-black block mb-1">📉 Pauvreté</span>
                            <span class="text-[11px] font-bold text-gray-800">${props.demo?.poverty || 0}%</span>
                            <p class="text-[7px] text-gray-400 mt-0.5">Taux de pauvreté</p>
                        </div>
                        <div class="bg-white p-2 rounded-lg border border-gray-100 shadow-xs">
                            <span class="text-[8px] text-gray-400 uppercase font-black block mb-1"> Social</span>
                            <span class="text-[11px] font-bold text-gray-800">${d.social_pct || 0}%</span>
                            <p class="text-[7px] text-gray-400 mt-0.5">Logements HLM</p>
                        </div>
                        <div class="bg-white p-2 rounded-lg border border-gray-100 shadow-xs">
                            <span class="text-[8px] text-gray-400 uppercase font-black block mb-1">🏫 IPS</span>
                            <span class="text-[11px] font-bold text-gray-800">${d.ips || 100}</span>
                            <p class="text-[7px] text-gray-400 mt-0.5">Indice Position Sociale</p>
                        </div>
                        <div class="bg-white p-2 rounded-lg border border-gray-100 shadow-xs col-span-2">
                            <span class="text-[8px] text-gray-400 uppercase font-black block mb-1">🎓 Diplômés</span>
                            <span class="text-[11px] font-bold text-gray-800">${d.diploma_pct || 0}%</span>
                            <p class="text-[7px] text-gray-400 mt-0.5">% de diplomés du supérieur (Actifs)</p>
                        </div>
                    </div>
                </div>
            `;
        }
        case 'demo': {
            const demo = cat.details;
            const ages = demo.ages || { "0-14": 20, "15-24": 12, "25-54": 40, "55-79": 20, "80+": 8 };

            return `
                <div class="px-4 pb-4 space-y-4">
                    <div class="grid grid-cols-2 gap-2 mt-2">
                        <div class="bg-white p-2.5 rounded-lg border border-gray-100 shadow-xs flex justify-between items-center">
                            <div class="flex flex-col">
                                <span class="text-[8px] text-gray-400 uppercase font-black block mb-0.5">👨‍👩‍👧‍👦 Familles</span>
                                <span class="text-[7px] text-gray-400 italic">Avec enfants</span>
                            </div>
                            <span class="text-sm font-black text-indigo-600">${demo.family_pct || 0}%</span>
                        </div>
                        <div class="bg-white p-2.5 rounded-lg border border-gray-100 shadow-xs flex justify-between items-center">
                            <div class="flex flex-col">
                                <span class="text-[8px] text-gray-400 uppercase font-black block mb-0.5">🎂 Âge Médian</span>
                                <span class="text-[7px] text-gray-400 italic">Estimation IRIS</span>
                            </div>
                            <span class="text-sm font-black text-indigo-600">${demo.median_age || 'N/D'} <span class="text-[8px]">ans</span></span>
                        </div>
                    </div>

                    <div class="bg-gray-50/50 p-2.5 rounded-xl border border-gray-200/50">
                        <div class="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-3">Répartition par âge</div>
                        <div class="space-y-2">
                            ${Object.entries(ages).map(([label, pct]) => `
                                <div>
                                    <div class="flex justify-between text-[8px] mb-0.5 px-1">
                                        <span class="text-gray-500 font-bold">${label} ans</span>
                                        <span class="font-bold text-gray-700">${pct}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                                        <div class="bg-slate-400 h-full" style="width: ${pct}%"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
        case 'finances': {
            const fin = props.finances || {};
            const taxRate = fin.taxe_fonciere || 0;
            const detteHab = fin.dette_hab || 0;
            const investHab = fin.invest_hab || 0;
            const epargnePct = fin.epargne_pct || 0;
            const desendettement = fin.capacite_desendettement || 0;
            const communeName = props.commune || 'la commune';

            // Qualitative labels
            const detteLabel = detteHab < 800 ? 'Faible' : detteHab < 1500 ? 'Modérée' : detteHab < 2500 ? 'Élevée' : 'Très élevée';
            const detteColor = detteHab < 800 ? '#10b981' : detteHab < 1500 ? '#f59e0b' : detteHab < 2500 ? '#f97316' : '#ef4444';
            const detteBg = detteHab < 800 ? '#ecfdf5' : detteHab < 1500 ? '#fffbeb' : detteHab < 2500 ? '#fff7ed' : '#fef2f2';
            const detteBorder = detteHab < 800 ? '#a7f3d0' : detteHab < 1500 ? '#fde68a' : detteHab < 2500 ? '#fed7aa' : '#fecaca';

            const investLabel = investHab < 200 ? 'Faible' : investHab < 600 ? 'Modéré' : investHab < 1200 ? 'Dynamique' : 'Très actif';
            const investColor = investHab < 200 ? '#94a3b8' : investHab < 600 ? '#60a5fa' : investHab < 1200 ? '#3b82f6' : '#1d4ed8';
            const investBg = investHab < 200 ? '#f8fafc' : investHab < 600 ? '#eff6ff' : '#dbeafe';
            const investBorder = investHab < 200 ? '#e2e8f0' : investHab < 600 ? '#bfdbfe' : '#93c5fd';

            const epargneColor = epargnePct >= 15 ? '#10b981' : epargnePct >= 8 ? '#f59e0b' : '#ef4444';
            const epargneLabel = epargnePct >= 15 ? 'Bonne santé' : epargnePct >= 8 ? 'Correcte' : 'Fragile';

            const desLabel = desendettement <= 5 ? 'Excellent' : desendettement <= 10 ? 'Sain' : desendettement <= 15 ? 'Vigilance' : 'Critique';
            const desColor = desendettement <= 5 ? '#10b981' : desendettement <= 10 ? '#f59e0b' : desendettement <= 15 ? '#f97316' : '#ef4444';

            const taxColor = taxRate === 0 ? '#94a3b8' : (taxRate < 25 ? '#10b981' : taxRate < 35 ? '#f59e0b' : taxRate < 45 ? '#f97316' : '#ef4444');
            const taxLabel = taxRate === 0 ? 'N/D' : (taxRate < 25 ? 'Avantageuse' : taxRate < 35 ? 'Dans la moyenne' : taxRate < 45 ? 'Élevée' : 'Très élevée');

            // Regional comparison data (hardcoded IDF reference)
            const idfComparisons = [
                { name: 'Neuilly-s-S.', rate: 24.5 },
                { name: 'Versailles', rate: 21.8 },
                { name: 'Paris', rate: 13.5 },
                { name: communeName, rate: taxRate, isCurrent: true },
                { name: 'IDF Moy.', rate: 35.2 },
                { name: 'St-Denis', rate: 58.4 },
            ].filter(c => c.rate > 0).sort((a, b) => a.rate - b.rate);

            const maxRate = Math.max(...idfComparisons.map(c => c.rate), 60);

            return `
                <div class="px-4 pb-4 space-y-4">
                    <!-- Taxe Foncière Hero -->
                    <div class="pt-3 pb-1">
                        <div class="relative overflow-hidden rounded-2xl p-4" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
                            <div class="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style="background: ${taxColor}; transform: translate(30%, -30%);"></div>
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Taxe Foncière (bâti)</div>
                                    <div class="text-3xl font-black text-white leading-none">${taxRate > 0 ? taxRate.toFixed(2) + '<span class="text-lg">%</span>' : 'N/D'}</div>
                                    <div class="text-[9px] text-slate-400 mt-1">Part communale + intercommunale</div>
                                </div>
                                <div class="flex flex-col items-end gap-1">
                                    <span class="finance-badge text-white" style="background: ${taxColor}">${taxLabel}</span>
                                    ${taxRate > 0 ? `
                                    <div class="text-[8px] text-slate-400 mt-1 text-right">Pour 100€ de valeur<br>locative cadastrale</div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dette & Investissement -->
                    <div class="grid grid-cols-2 gap-2">
                        <div class="finance-card" style="background: ${detteBg}; border-color: ${detteBorder}">
                            <div class="text-[8px] font-black uppercase tracking-widest mb-1" style="color: ${detteColor}">🏦 Dette</div>
                            <div class="text-xl font-black" style="color: ${detteColor}">${detteHab > 0 ? detteHab.toLocaleString('fr-FR') + '<span class="text-xs">€/hab</span>' : 'N/D'}</div>
                            <span class="finance-badge mt-1 inline-block" style="background: ${detteColor}22; color: ${detteColor}">${detteLabel}</span>
                        </div>
                        <div class="finance-card" style="background: ${investBg}; border-color: ${investBorder}">
                            <div class="text-[8px] font-black uppercase tracking-widest mb-1" style="color: ${investColor}">🏗️ Invest.</div>
                            <div class="text-xl font-black" style="color: ${investColor}">${investHab > 0 ? investHab.toLocaleString('fr-FR') + '<span class="text-xs">€/hab</span>' : 'N/D'}</div>
                            <span class="finance-badge mt-1 inline-block" style="background: ${investColor}22; color: ${investColor}">${investLabel}</span>
                        </div>
                    </div>

                    <!-- Épargne & Désendettement -->
                    ${(epargnePct !== 0 || desendettement !== 0 && desendettement !== 99) ? `
                    <div class="grid grid-cols-2 gap-2">
                        <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">💰 Épargne brute</div>
                            <div class="text-lg font-black" style="color: ${epargneColor}">${epargnePct > 0 ? epargnePct.toFixed(1) + '%' : 'N/D'}</div>
                            <div class="text-[8px] font-bold mt-0.5" style="color: ${epargneColor}">${epargneLabel}</div>
                        </div>
                        <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">⏱️ Désendett.</div>
                            <div class="text-lg font-black" style="color: ${desColor}">${desendettement > 0 && desendettement < 99 ? desendettement.toFixed(1) + '<span class="text-xs"> ans</span>' : 'N/D'}</div>
                            <div class="text-[8px] font-bold mt-0.5" style="color: ${desColor}">${desLabel}</div>
                        </div>
                    </div>
                    ` : ''}

                    <!-- Regional Tax Comparison -->
                    ${idfComparisons.length > 1 ? `
                    <div class="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                        <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">📍 Dans la région — Taxe Foncière</div>
                        <div class="finance-bar-container">
                            ${idfComparisons.map(c => `
                                <div class="finance-bar-row">
                                    <div class="finance-bar-label ${c.isCurrent ? 'text-slate-900 font-black' : ''}">${c.isCurrent ? '▶ ' : ''}${c.name}</div>
                                    <div class="finance-bar-track">
                                        <div class="finance-bar-fill" style="width: ${Math.min((c.rate / maxRate) * 100, 100)}%; background: ${c.isCurrent ? taxColor : '#94a3b8'}; ${c.isCurrent ? 'opacity: 1' : 'opacity: 0.5'}"></div>
                                    </div>
                                    <div class="finance-bar-value ${c.isCurrent ? 'text-slate-900' : ''}">${c.rate.toFixed(1)}%</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <!-- Footer note -->
                    <div class="text-[8px] text-slate-400 text-center italic pt-1">
                        Données 2024 • DGFiP Balance générale des comptes • REI 2024
                    </div>
                </div>
            `;
        }
        case 'safety': {
            const sm = props.safety_metrics || { burglaries_rate: 0, assaults_rate: 0, thefts_rate: 0 };
            const idfAvg = sm.idf_avg || { burglaries_rate: 2.74, assaults_rate: 5.57, thefts_rate: 29.79 };
            const deptAvg = sm.dept_avg || idfAvg;
            const deptCode = props.code ? props.code.substring(0, 2) : (props.insee ? props.insee.substring(0, 2) : '75');

            // Comparison based on total delinquency rate (burglaries + assaults + thefts)
            const currentTotal = (sm.burglaries_rate + sm.assaults_rate + sm.thefts_rate);
            const idfTotal = (idfAvg.burglaries_rate + idfAvg.assaults_rate + idfAvg.thefts_rate);
            const deptTotal = (deptAvg.burglaries_rate + deptAvg.assaults_rate + deptAvg.thefts_rate);

            const safetyComparisons = [
                { name: 'Paris (75)', rate: 65.0 },
                { name: props.commune || 'Ce quartier', rate: currentTotal, isCurrent: true },
                { name: `Dép. ${deptCode}`, rate: deptTotal },
                { name: 'IDF Moy.', rate: idfTotal },
                { name: 'Vincennes', rate: 22.4 },
                { name: 'St-Maur', rate: 19.8 }
            ].sort((a, b) => a.rate - b.rate);

            const maxRate = Math.max(...safetyComparisons.map(c => c.rate), 100);

            return `
                <div class="px-4 pb-4 space-y-4">
                    <div class="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                        <div class="bg-orange-50 p-2 rounded-lg border border-orange-100 shadow-xs flex flex-col items-center">
                            <span class="text-[8px] text-orange-600 uppercase font-black block mb-1">Cambriolages</span>
                            <span class="text-[11px] font-bold text-orange-800">${sm.burglaries_rate}‰</span>
                            <span class="text-[7px] font-bold mt-0.5 ${sm.burglaries_diff <= 0 ? 'text-green-600' : 'text-red-500'}">
                                ${sm.burglaries_diff > 0 ? '+' : ''}${sm.burglaries_diff}%
                            </span>
                        </div>
                        <div class="bg-red-50 p-2 rounded-lg border border-red-100 shadow-xs flex flex-col items-center">
                            <span class="text-[8px] text-red-600 uppercase font-black block mb-1">Agressions</span>
                            <span class="text-[11px] font-bold text-red-800">${sm.assaults_rate}‰</span>
                            <span class="text-[7px] font-bold mt-0.5 ${sm.assaults_diff <= 0 ? 'text-green-600' : 'text-red-500'}">
                                ${sm.assaults_diff > 0 ? '+' : ''}${sm.assaults_diff}%
                            </span>
                        </div>
                        <div class="bg-yellow-50 p-2 rounded-lg border border-yellow-100 shadow-xs flex flex-col items-center">
                            <span class="text-[8px] text-yellow-600 uppercase font-black block mb-1">Vols</span>
                            <span class="text-[11px] font-bold text-yellow-800">${sm.thefts_rate}‰</span>
                            <span class="text-[7px] font-bold mt-0.5 ${sm.thefts_diff <= 0 ? 'text-green-600' : 'text-red-500'}">
                                ${sm.thefts_diff > 0 ? '+' : ''}${sm.thefts_diff}%
                            </span>
                        </div>
                    </div>

                    <!-- Regional Safety Comparison -->
                    <div class="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                        <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">📍 Comparatif — Taux de délinquance (‰)</div>
                        <div class="finance-bar-container">
                            ${safetyComparisons.map(c => `
                                <div class="finance-bar-row">
                                    <div class="finance-bar-label ${c.isCurrent ? 'text-slate-900 font-black' : ''}">${c.isCurrent ? '▶ ' : ''}${c.name}</div>
                                    <div class="finance-bar-track">
                                        <div class="finance-bar-fill" style="width: ${Math.min((c.rate / maxRate) * 100, 100)}%; background: ${c.isCurrent ? '#ef4444' : '#94a3b8'}; ${c.isCurrent ? 'opacity: 1' : 'opacity: 0.5'}"></div>
                                    </div>
                                    <div class="finance-bar-value ${c.isCurrent ? 'text-slate-900' : ''}">${c.rate.toFixed(1)}</div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="text-[7px] text-slate-400 mt-2 italic text-center">Taux cumulé pour 1000 habitants</div>
                    </div>

                    ${props.is_zsp ? `
                    <div class="bg-red-50/50 p-2.5 rounded-xl border border-red-200/50 flex items-center gap-2 mt-3">
                        <span class="text-lg">⚠️</span>
                        <div class="flex flex-col">
                            <span class="text-[10px] font-black text-red-800">Zone de Sécurité Prioritaire (ZSP)</span>
                            <span class="text-[8px] text-red-600">Ce quartier intersecte une zone classée ZSP.</span>
                        </div>
                    </div>
                    ` : ''}
                </div>
            `;
        }
        case 'education': {
            const d = matchData.categories?.education?.details || {};
            const types = [
                { id: 'maternelle', label: 'Maternelle', icon: '👶', color: 'bg-blue-400' },
                { id: 'elementaire', label: 'Primaire', icon: '✏️', color: 'bg-blue-500' },
                { id: 'college', label: 'Collège', icon: '📖', color: 'bg-blue-600' },
                { id: 'lycee', label: 'Lycée', icon: '🏛️', color: 'bg-slate-400' }
            ];

            return `
                <div class="px-5 pb-6 space-y-4">
                    <div class="flex items-center gap-3 mb-6 pt-5 border-t border-gray-100">
                        <span class="text-base grayscale opacity-60">🎓</span>
                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parcours Scolaire</span>
                    </div>
                    
                    <div class="relative space-y-9 py-2">
                        <!-- Vertical Line (Subtle & Thin) -->
                        <div class="absolute left-[16px] top-4 bottom-4 w-px bg-slate-200/60"></div>
                        
                        ${types.map(t => {
                const info = d[t.id] || { count: 0, ips: null, is_in_commune: false };
                const hasEst = info.count > 0;
                return `
                            <div onmouseenter="window.highlightCommerceOnMap('${t.id}', '${t.icon}', '${t.label}')" onmouseleave="window.highlightCommerceOnMap(null)" class="relative flex items-center justify-between pl-14 group cursor-help">
                                <!-- Dot/Icon centered on the line -->
                                <div class="absolute left-0 w-8 h-8 rounded-full ${hasEst ? t.color : 'bg-slate-50 border border-dashed border-slate-200'} flex items-center justify-center text-sm text-white shadow-xs z-10 transition-all group-hover:scale-105">
                                    ${hasEst ? t.icon : '<span class="grayscale opacity-20 text-[10px]">🏛️</span>'}
                                </div>
                                
                                <div class="flex flex-col">
                                    <span class="text-[13px] font-black ${hasEst ? 'text-slate-800' : 'text-slate-300'}">${t.label}</span>
                                    ${hasEst ? `
                                        <div class="flex items-center gap-1.5 mt-0.5">
                                            <span class="text-[8px] text-slate-400 font-bold uppercase tracking-tight">IPS MOYEN</span>
                                            <span class="text-[10px] font-black text-blue-600">${info.ips || 'N/A'}</span>
                                        </div>
                                    ` : `
                                        <div class="flex items-center gap-1.5 mt-0.5">
                                            ${info.nearest_name ? `
                                                <span class="text-[9px] text-amber-500">📍</span>
                                                <span class="text-[9px] text-slate-300 font-bold leading-tight">
                                                    ${info.nearest_name} (${info.nearest_dist} km)
                                                </span>
                                            ` : `<span class="text-[8px] text-slate-300 italic">Hors commune</span>`}
                                        </div>
                                    `}
                                </div>
                                
                                <div class="text-right">
                                    ${hasEst ? `
                                        <div class="flex items-baseline justify-end gap-1">
                                            <span class="text-[16px] font-black text-slate-900">${info.count}</span>
                                            <span class="text-[9px] text-slate-400 font-black uppercase tracking-tighter">étab.</span>
                                        </div>
                                    ` : `
                                        <span class="text-[9px] text-slate-300 font-black uppercase tracking-tighter">N/A</span>
                                    `}
                                </div>
                            </div>
                            `;
            }).join('')}
                    </div>
                </div>
            `;
        }
        default: return '';
    }
}
info.update();

// --- SPATIAL LOGIC & CACHING ---
let geojsonLayer;
let idfPrices = {};
window.mobilityCache = null;

function getResolvedJourney(rawCache) {
    if (!rawCache) return null;
    const key = window.commuteItineraryType || 'main';
    // If it's the new structure { main, alternate }, return the preferred one (fallback to main)
    if (rawCache.main || rawCache.alternate) {
        return rawCache[key] || rawCache.main;
    }
    // Legacy structure: return as-is
    return rawCache;
}

function refreshMobilityCache(geojsonData) {
    if (!geojsonData || !window.precomputedJourneysRaw) return;
    const start = performance.now();
    window.mobilityCache = {};

    geojsonData.features.forEach(f => {
        const insee = f.properties.code;
        const staticScores = f.properties.staticScores || {};
        const connectivityScore = staticScores.connectivity || 0;

        let commuteScore = 100;
        let activeCount = 0;

        if (window.activeWorkplaces?.length > 0) {
            let sumS = 0;
            window.activeWorkplaces.forEach(wp => {
                const rawCache = window.precomputedJourneysRaw[insee]?.[wp.id];
                const journey = getResolvedJourney(rawCache);
                if (journey) {
                    const ratio = journey.duration / wp.limit;
                    let s = ratio <= 0.7 ? 100 : (ratio <= 1.0 ? 100 - ((ratio - 0.7) / 0.3) * 30 : Math.max(0, 70 - (ratio - 1) * 150));
                    sumS += s;
                    activeCount++;
                }
            });
            if (activeCount > 0) commuteScore = sumS / activeCount;
        }

        window.mobilityCache[insee] = {
            mobility: Math.round(connectivityScore),
            commute: Math.round(commuteScore),
            hasWorkplaces: activeCount > 0
        };
    });
    console.log(`⚡ Mobility Cache Refreshed in ${Math.round(performance.now() - start)}ms`);
}

function getCommuneName(props, codeFallback = "") {
    if (!props) return 'Inconnue';

    // Priority 1: Explicit commune property
    let name = props.commune || props.COMMUNE || props.nom_com || props.NOM_COM;

    // Priority 2: Extract from iris name "Commune (Iris)" or "Commune - Iris"
    if (!name && (props.nom || props.NOM)) {
        const fullNom = props.nom || props.NOM;
        if (fullNom.includes(' (')) {
            name = fullNom.split(' (')[0];
        } else if (fullNom.includes(' - ')) {
            name = fullNom.split(' - ')[0];
        } else {
            name = fullNom;
        }
    }

    name = name || 'Inconnue';

    // Special handling for Paris Arrondissements
    const code = String(props.code || props.CODE || props.INSEE_COM || codeFallback || "");
    if (name.includes('Paris') && code.startsWith('751')) {
        const arrNum = parseInt(code.substring(3, 5));
        if (!isNaN(arrNum)) {
            const suffix = (arrNum === 1) ? '1er' : `${arrNum}ème`;
            return `Paris ${suffix}`;
        }
    }

    return name.trim();
}

window.getLineId = function (str) {
    if (!str) return "";
    // Clean up strings like "METRO 14" or "RER C" or "TRAIN J"
    let cleaned = String(str)
        .replace(/(METRO|METROPOLITAIN|RER|TRAM|TRAMWAY|TRAIN|BUS|LIGNE)\s+/gi, '')
        .trim()
        .toUpperCase();
    return cleaned;
};

function getColor(matchRate) {
    if (matchRate <= 0) return 'transparent';
    return '#a855f7'; // Brand Purple only
}

function cleanName(name) {
    if (!name) return "";
    // If format is "Commune (Iris Name)", extract "Iris Name"
    const match = name.match(/.*\((.*)\)/);
    if (match && match[1]) {
        let n = match[1].trim();
        // Skip cleaning if it's the "non irisée" notice
        if (!n.toLowerCase().includes('non irisée')) return n;
    }
    return name.replace(/\s*\(.*commune non irisée.*\)/gi, '').trim();
}

// --- PERFORMANCE CACHE & CONTEXT ---
window.globalCacheKey = "";
window.appContext = {
    budget: 850000,
    minSurface: 70,
    surfaceBucket: "60-80m2",
    propertyType: 'all',
    searchCriteria: [],
    activeAxisId: null
};

function calculateMatchRate(props, forceRefresh = false) {
    if (!props) return { total: 0, categories: {} };

    // MEMOIZATION CHECK (Safety for serialized props)
    if (typeof props.memo === 'string') {
        try {
            props.memo = JSON.parse(props.memo);
        } catch (e) {
            props.memo = { cacheKey: null, matchData: null };
        }
    }

    if (!forceRefresh && props.memo && props.memo.cacheKey === window.globalCacheKey) {
        return props.memo.matchData;
    }

    const matchData = _calculateMatchRate(props);
    
    // CACHE RESULT
    if (props.memo && typeof props.memo === 'object') {
        props.memo.cacheKey = window.globalCacheKey;
        props.memo.matchData = matchData;
    }
    
    return matchData;
}

function _calculateMatchRate(props) {
    if (!props) return { total: 0, categories: {} };

    // --- PARIS EXCLUSION ---
    const insee = props.code || "";
    if (insee.startsWith('75')) {
        return { total: -2, isParis: true, categories: {}, details: { immo: {}, mobility: {}, env: {} }, exclusionReason: 'paris' };
    }

    let criteriaMultiplier = 1.0;
    if (window.searchCriteria && window.searchCriteria.length > 0) {
        for (const crit of window.searchCriteria) {
            if (!evaluateCriterion(props, crit)) {
                return { total: -1, excluded: true, categories: {}, details: { immo: {}, mobility: {}, env: {} }, exclusionReason: crit.property };
            }
            // Add a small boost for "extra" margin on some criteria
            if (crit.property === 'budget') {
                const typeKey = window.currentPropertyType || 'all';
                const sector = props[typeKey] || props.all || props.prices || {};
                const price = sector.price || sector.median || 5000;
                const affSurface = crit.value / price;
                if (affSurface > 100) criteriaMultiplier *= 1.1;
                else if (affSurface < 40) criteriaMultiplier *= 0.8;
            }
        }
    }

    // --- TRANSIT AXIS FILTER ---
    if (window.activeAxisId) {
        if (window.axisMembership && !window.axisMembership[props.code]) {
            return { total: -1, excluded: true, categories: {}, details: { immo: {}, mobility: {}, env: {} } };
        }
    }

    try {
        if (!props || !props.code) return { total: 0, categories: {}, details: { immo: {}, mobility: {}, env: {} } };

        const budget = window.appContext.budget;
        const surfaceBucket = window.appContext.surfaceBucket;
        const minSurface = window.appContext.minSurface;

        const insee = props.code;
        const currentType = window.currentPropertyType || 'all';

        // 1. MARCHÉ IMMOBILIER & BUDGET FIT
        const segment = props[currentType] || props.all || { price: 5000, vol: 0, p25: 4250, p75: 5750 };
        const median = segment.price || 5000;
        const estimatedSurface = budget / median;
        const surfaceRatio = estimatedSurface / minSurface;

        // Perfect match if estimated surface is within requested range (-20% price to +5% price)
        // -20% price => 1.25x surface ratio
        // +5% price => 0.95x surface ratio
        let fitScore = 0;
        if (surfaceRatio >= 0.95 && surfaceRatio <= 1.25) {
            fitScore = 100;
        } else if (surfaceRatio < 0.95) {
            // Too expensive: Drop fast. 0% if surface is 60% of what's requested
            fitScore = Math.round(Math.max(0, 100 - (0.95 - surfaceRatio) * 250));
        } else {
            // Under-investing: Drop as we are "too rich" for the area.
            fitScore = Math.round(Math.max(0, 100 - (surfaceRatio - 1.25) * 110));
        }

        // Liquidity: Transactions volume (relative to local average)
        // High volume = good liquidity
        const liquidityScore = Math.min(100, (segment.vol || 0) * 15);

        // 1b. LOCAL SURFACE AVAILABILITY
        // Calculate % of housing park matching or exceeding the requested size bucket
        const surfaceBuckets = ["<30m2", "30-40m2", "40-60m2", "60-80m2", "80-100m2", "100-120m2", "120m2+"];

        // Robust matching: normalize strings to avoid character/space mismatches
        const normalize = (s) => String(s || '').replace(/\s/g, '').replace('²', '2').replace('–', '-').replace('+', '');
        const normBucket = normalize(surfaceBucket);
        const selectedIdx = surfaceBuckets.findIndex(b => normalize(b) === normBucket);

        let availabilityPct = 0;
        if (props.demo?.surface_dist && selectedIdx !== -1) {
            const dist = props.demo.surface_dist;
            const distKeys = Object.keys(dist);

            surfaceBuckets.slice(selectedIdx).forEach(b => {
                const normB = normalize(b);
                const actualKey = distKeys.find(k => normalize(k) === normB);
                const val = actualKey ? parseFloat(dist[actualKey]) : 0;
                availabilityPct += isNaN(val) ? 0 : val;
            });
        } else if (!props.demo?.surface_dist) {
            availabilityPct = 100; // Fallback if data missing
        } else {
            availabilityPct = 0; // Not found
        }
        const pav = props.pav || 0;
        const finalAvailabilityPct = Math.round(availabilityPct * (currentType === 'house' ? pav : (currentType === 'apt' ? (1 - pav) : 1)));
        const availabilityScore = Math.min(100, availabilityPct * 1.5); // Boost to make it a fair score

        let immoScore = Math.round((fitScore * 0.5) + (liquidityScore * 0.2) + (availabilityScore * 0.3));

        // Availability check (to keep exclusion logic)
        const surfaceScore = (estimatedSurface >= minSurface * 0.5 && availabilityPct > 2) ? 1.0 : 0;

        let availability = 1.0;
        if (currentType === 'house') {
            if (pav < 0.03) {
                availability = 0;
            } else {
                availability = pav < 0.12 ? 0.3 : (pav < 0.30 ? 0.6 : 1.0);
            }
            if (document.getElementById('garden-filter')?.checked) {
                availability *= (props.gVol > 0 ? 1.0 : (pav > 0.4 ? 0.8 : 0.5));
            }
        } else if (currentType === 'apt') {
            if ((1 - pav) < 0.05) {
                availability = 0;
            } else {
                availability = (1 - pav) < 0.15 ? 0.5 : 1.0;
            }
        }

        if (availability === 0) immoScore = 0;

        let isExcluded = (immoScore === 0);
        let exclusionReason = "";
        if (isExcluded) {
            if (availability === 0) exclusionReason = "Type Introuvable";
            else if (fitScore === 0) exclusionReason = "Hors Budget / Décalé";
            else if (surfaceScore === 0) exclusionReason = "Surface Insuffisante";
        }

        // 2. MOBILITÉ & TRAJET
        const cachedMobility = window.mobilityCache?.[insee] || { mobility: 50, commute: 100, hasWorkplaces: false };
        const mobilityScore = cachedMobility.mobility;
        const commuteScore = cachedMobility.commute;

        // 3. URBANISME (Ex-Environnement)
        const staticScores = props.staticScores || {};
        let urbanismeScore = staticScores.env || 0;
        const coolness = staticScores.coolness || 50;

        // Apply Airport Noise (PEB) Penalty
        const pebZone = window.pebByIris?.[insee];
        if (pebZone) {
            const penalties = { za: 45, zb: 35, zc: 25, zd: 15 };
            urbanismeScore = Math.max(0, urbanismeScore - (penalties[pebZone] || 0));
        }

        // 4. PREPARE AMENITY DATA
        const counts = props.counts || {
            boulangerie: 0, boucherie: 0, fromagerie: 0, pharmacie: 0, supermarket: 0, bio: 0,
            restaurants: 0, fast_food: 0, bars: 0, cafes: 0, pubs: 0,
            theatres: 0, cinemas: 0, musees: 0, gym: 0, pool: 0, commerces: 0, pediatres: 0,
            caviste: 0, marche: 0, picard: 0, poste: 0, church: 0, stations: 0,
            poissonnerie: 0, fleuriste: 0, chocolatier: 0, epicerie_fine: 0
        };

        // 5. VIE DE QUARTIER (Merge of Services & Sorties)
        if (!props.dynamicCounts && props.lat && props.lon && window.countNearbyAmenities) {
            props.dynamicCounts = window.countNearbyAmenities(props.code, 2500);
        }
        const dynamicCounts = props.dynamicCounts || { boulangerie: 0, bio: 0 }; 
        const mergedCounts = { ...(props.counts || {}), ...dynamicCounts };
        
        const walkMeta = window.walkingMetadata?.[insee];
        const dist = walkMeta?.distance_km || 2.0;
        let proximityScore = 40;
        if (dist < 0.2) proximityScore = 100;
        else if (dist < 0.4) proximityScore = 85;
        else if (dist < 1.2) proximityScore = 65;
        const vieQuartierScore = proximityScore;

        const pedCount = mergedCounts.pediatres || window.pediatresByIris?.[insee] || 0;
        const socialCounts = mergedCounts;

        // 6. ÉDUCATION
        const familyScore = staticScores.family || 0;
        const schoolsCount = counts.schools || 0;

        let noise = props.noise || 0;
        if (pebZone) {
            const noisePenalties = { za: 50, zb: 40, zc: 30, zd: 20 };
            noise += (noisePenalties[pebZone] || 0);
        }

        // 8. VIBE MATCHING (Hard Filter)
        const selectedVibes = window.selectedVibes || [];
        let matchedVibesCount = 0;

        if (selectedVibes.length > 0) {
            selectedVibes.forEach(v => {
                // New segmentation matching: just check if segment_name matches selected vibe
                if (props.segment_name === v) {
                    matchedVibesCount++;
                }
            });

            if (matchedVibesCount < selectedVibes.length) {
                isExcluded = true;
                exclusionReason = "Type de quartier";
            }
        }

        const vibeRatio = 1.0; // Hard filter means match is 100% if not excluded

        const categories = {
            immo: {
                score: immoScore,
                label: "Marché immobilier",
                icon: "🏠",
                color: "text-emerald-600",
                isCustomScale: true,
                details: {
                    fitScore,
                    surfaceRatio,
                    estimatedSurface,
                    minSurface,
                    availabilityScore,
                    availabilityPct,
                    finalAvailabilityPct
                }
            },
            mobility: { score: mobilityScore, label: "Mobilité", icon: "⚡", color: "text-blue-600" },
            commute: {
                score: commuteScore,
                label: "Trajets Quotidiens",

                icon: "🕒",
                color: "text-indigo-600",
                isHidden: !window.activeWorkplaces || window.activeWorkplaces.length === 0
            },
            urbanisme: { score: urbanismeScore, label: "Urbanisme", icon: "", color: "text-emerald-600" },
            vieQuartier: {
                score: vieQuartierScore,
                label: "Vie de quartier",
                icon: "🏘️",
                color: "text-pink-600",
                details: { ...counts, pediatres: pedCount, marche: (counts.marche || 0), ...socialCounts }
            },
            infra: {
                score: staticScores.infra || 0,
                label: "Infrastructures Municipales",
                icon: "",
                color: "text-blue-700",
                details: {
                    biblios: counts.biblios,
                    conservatoires: counts.conservatoires,
                    tennis: counts.tennis,
                    pool: counts.pool,
                    cinemas: counts.cinemas,
                    theatres: counts.theatres,
                    concerts: counts.concerts,
                    musees: counts.musees,
                    schoolsCount: props.schoolsCount || counts.schools || 0,
                    caf_coverage: props.caf_coverage
                }
            },

            safety: {
                score: staticScores.safety || 0,
                label: "Sécurité",
                icon: "🛡️",
                color: "text-orange-600",
                details: props.safety_metrics || {}
            },
            socio: {
                score: 100,
                label: "Profil Social",
                icon: "🤝",
                color: "text-slate-600",
                details: {
                    income: props.demo?.income,
                    social_pct: props.demo?.social_pct,
                    ips: Math.round(props.ips || 100),
                    diploma_pct: props.demo?.diploma_pct
                }
            },
            demo: {
                score: 100,
                label: "Démographie",
                icon: "📊",
                color: "text-indigo-600",
                details: {
                    family_pct: props.demo?.family_pct,
                    young_pct: props.demo?.young_pct,
                    senior_pct: props.demo?.ages?.["80+"] || props.demo?.senior_pct,
                    median_age: props.demo?.median_age,
                    ages: props.demo?.ages
                }
            },
            education: {
                score: Math.min(100, (props.ips || 100) * 0.8),
                label: "Éducation",
                icon: "🎓",
                color: "text-blue-600",
                details: props.school_details || {}
            },
            finances: (() => {
                const fin = props.finances || {};
                const taxRate = fin.taxe_fonciere || 0;
                const epargnePct = fin.epargne_pct || 0;
                const detteHab = fin.dette_hab || 0;
                const desend = fin.capacite_desendettement || 0;

                // Composite score (0-100)
                // Tax: lower = better (Paris 13% = 100, 60% = 0)
                const taxScore = taxRate > 0 ? Math.max(0, 100 - ((taxRate - 10) / 55) * 100) : 50;
                // Epargne: 20%+ = 100, 0% = 0
                const epScore = Math.max(0, Math.min(100, epargnePct * 5));
                // Debt: 500/hab = 100, 3000/hab = 0
                const debtScore = detteHab > 0 ? Math.max(0, 100 - ((detteHab - 500) / 2500) * 100) : 50;
                // Désendettement: 0 ans = 100, 15 ans = 0
                const desScore = desend > 0 && desend < 99 ? Math.max(0, 100 - (desend / 15) * 100) : (desend === 0 ? 100 : 30);

                const finScore = taxRate > 0 ? Math.round(taxScore * 0.35 + epScore * 0.30 + debtScore * 0.20 + desScore * 0.15) : 50;

                const label = finScore >= 75 ? 'Saine' : finScore >= 50 ? 'Correcte' : finScore >= 30 ? 'Sous pression' : 'Fragile';
                const color = finScore >= 75 ? 'text-emerald-600' : finScore >= 50 ? 'text-amber-500' : finScore >= 30 ? 'text-orange-500' : 'text-red-500';

                return {
                    score: finScore,
                    label: "Finances locales",
                    appreciation: label,
                    icon: "🏛️",
                    color,
                    details: fin
                };
            })()
        };

        const categoryScales = {
            immo: ["Inaccessible", "Serré / Rare", "Accessible", "Opportunité"],
            mobility: ["Loin des gares", "Connecté", "Sur le métro", "Hub hyper-centre"],
            commute: ["Pénible", "Moyen", "Confortable", "Idéal"],
            urbanisme: ["Le Village Urbain", "Le Standing Patrimonial", "La Riviera (Bords de l'Eau)", "Le Coteau résidentiel", "Le Néo-Résidentiel", "Le Faubourg / Maison de Ville", "Le Pavillonnaire Familial"],
            vieQuartier: ["Résidentiel excentré", "Résidentiel périphérique", "Résidentiel proximité directe", "Centre ville"],
            socio: ["Populaire", "Mixité sociale", "Aisé", "Très aisé"],
            demo: ["Jeune & Dynamique", "Familles & Actifs", "Résidentiel Mature", "Calme & Séniors"],
            safety: ["Vigilance", "Standard", "Serein", "Très sûr"],
            infra: ["Essentiels", "Bien équipé", "Riche", "Pôle d'attractivité"],
            education: ["Moyen", "Bon", "Excellence", "Élite"],
            finances: ["Fragile", "Sous pression", "Correcte", "Saine"]
        };

        Object.entries(categories).forEach(([id, cat]) => {
            cat.scale = categoryScales[id] || [];
            cat.appreciation = "N/A";

            if (cat.isHidden) return;
            const s = cat.score;
            let app = "";

            switch (id) {
                case 'immo':
                    const sRatio = cat.details.surfaceRatio || 1;
                    if (isExcluded) app = "Exclu";
                    else if (immoScore >= 96) app = "Match Parfait";
                    else if (sRatio > 1.15) app = "Sous-investissement";
                    else if (sRatio < 0.85) app = "Budget Insuffisant";
                    else if (immoScore >= 80) app = "Bon Match";
                    else app = "Décalé";
                    break;
                case 'mobility':
                    const stationsNear = counts.stations || 0;
                    const hasMetro = props.has_metro || false;

                    if (hasMetro) {
                        if (s >= 85) app = "Hub hyper-centre";
                        else app = "Sur le métro";
                    } else if (stationsNear > 0) {
                        if (s >= 85) app = "Hub hyper-centre";
                        else app = "Connecté";
                    } else {
                        app = "Loin des gares";
                    }
                    break;
                case 'commute':
                    if (s < 40) app = "Pénible";
                    else if (s < 70) app = "Moyen";
                    else if (s < 90) app = "Confortable";
                    else app = "Idéal";
                    break;
                case 'urbanisme':
                    app = props.segment_name || "Non segmenté";
                    break;
                case 'vieQuartier': {
                    const walkMeta = window.walkingMetadata?.[insee];
                    const dist = walkMeta?.distance_km || 2.0;
                    if (dist < 0.2) app = "Centre ville";
                    else if (dist < 0.4) app = "Résidentiel proximité directe";
                    else if (dist < 1.2) app = "Résidentiel périphérique";
                    else app = "Résidentiel excentré";
                    break;
                }

                case 'socio':
                    const income = props.demo?.income || 25000;
                    const socialPct = props.demo?.social_pct || 0;
                    const ipsVal = props.ips || 100;
                    if (income < 22000 || socialPct > 35 || ipsVal < 95) app = "Populaire";
                    else if (income < 35000 || socialPct > 15 || ipsVal < 110) app = "Mixité sociale";
                    else if (income < 55000 || ipsVal < 125) app = "Aisé";
                    else app = "Très aisé";
                    cat.isInformative = true;
                    break;
                case 'demo':
                    const young = props.demo?.young_pct || 0;
                    const families = props.demo?.family_pct || 0;
                    const seniors = props.demo?.senior_pct || 0;
                    if (young > 25) app = "Jeune & Dynamique";
                    else if (families > 35) app = "Familles & Actifs";
                    else if (seniors > 25) app = "Calme & Séniors";
                    else app = "Résidentiel Mature";
                    cat.isInformative = true;
                    break;
                case 'safety':
                    if (s < 40) app = "Vigilance";
                    else if (s < 65) app = "Standard";
                    else if (s < 85) app = "Serein";
                    else app = "Très sûr";
                    break;
                case 'infra':
                    if (s < 35) app = "Essentiels";
                    else if (s < 60) app = "Bien équipé";
                    else if (s < 85) app = "Riche";
                    else app = "Pôle d'attractivité";
                    break;
                case 'education':
                    if (s < 40) app = "Moyen";
                    else if (s < 65) app = "Bon";
                    else if (s < 85) app = "Excellence";
                    else app = "Élite";
                    break;
                case 'finances': {
                    const fin = props.finances || {};
                    const taxRate = fin.taxe_fonciere || 0;
                    if (taxRate === 0) { app = "N/D"; break; }
                    if (s >= 75) app = "Saine";
                    else if (s >= 50) app = "Correcte";
                    else if (s >= 30) app = "Sous pression";
                    else app = "Fragile";
                    cat.isInformative = true;
                    break;
                }
            }

            cat.appreciation = app;
            cat.scale = categoryScales[id] || [];
            cat.scaleIndex = cat.scale.indexOf(app);
        });

        // 9. PREFERENCE WEIGHTING (Soft Influence)
        let preferenceMultiplier = 1.0;
        Object.entries(categories).forEach(([id, cat]) => {
            const prefValue = window.appContext.preferences?.[id];

            if (prefValue) {
                const prefIdx = cat.scale.indexOf(prefValue);
                if (prefIdx !== -1) {
                    const diff = Math.abs(cat.scaleIndex - prefIdx);
                    // Multipliers: 1.0 (exact), 0.6 (1 step), 0.25 (2 steps), 0.1 (3+ steps)
                    const penalties = [1.0, 0.6, 0.25, 0.1];
                    preferenceMultiplier *= (penalties[diff] || 0.1);
                }
            }
        });

        // SCORING LOGIC
        const mobilityWeight = cachedMobility.hasWorkplaces ? 0.08 : 0.25;
        const commuteWeight = cachedMobility.hasWorkplaces ? 0.17 : 0.00;

        const neighborhoodScore = (
            mobilityScore * mobilityWeight +
            commuteScore * commuteWeight +
            urbanismeScore * 0.25 +
            vieQuartierScore * 0.50
        );

        const baseScore = immoScore * 0.4 + neighborhoodScore * 0.6;
        const total = Math.round(baseScore * vibeRatio * preferenceMultiplier * criteriaMultiplier);

        const finalScore = Math.min(100, total);
        const matchData = {
            total: finalScore,
            vibeMatch: Math.round(vibeRatio * 100),
            excluded: isExcluded,
            reason: exclusionReason,
            categories,
            details: {
                immo: { fitScore, availability, surfaceScore, availabilityPct, availabilityScore, finalAvailabilityPct },
                mobility: { scores: [] },
                env: {
                    nature: props.nature || 0,
                    isBlue: !!props.is_blue,
                    nearPark: !!props.near_park,
                    nearParkName: props.near_park_name || "",
                    heatResilience: props.heat_resilience || 50,
                    airQuality: props.air_quality || 50,
                    coolness: staticScores.coolness
                },
                family: { pediatresCount: pedCount }
            }
        };

        // INTEGRATE VISIBILITY LOGIC HERE TO MEMOIZE IT
        matchData.isVisible = isIrisVisible(props.code, finalScore, matchData, props);

        return matchData;
    } catch (e) {
        console.error("MatchRate Error:", e, props);
        const emptyCat = { score: 0, appreciation: "N/A", ratingColor: "text-gray-300", scale: [], scaleIndex: -1, details: {} };
        return {
            total: 0,
            vibeMatch: 0,
            categories: {
                immo: emptyCat, mobility: emptyCat, commute: emptyCat, urbanisme: emptyCat, vieQuartier: emptyCat,
                family: emptyCat, infra: emptyCat, safety: emptyCat, socio: emptyCat, demo: emptyCat
            },
            details: { immo: {}, mobility: {}, env: {} },
            isVisible: true
        };
    }
}

function isIrisVisible(insee, score, matchData, props) {
    let isVisible = true;
    let maxWait = 0;

    if (window.activeWorkplaces && window.activeWorkplaces.length > 0) {
        for (const wp of window.activeWorkplaces) {
            const rawCache = window.precomputedJourneysRaw?.[insee]?.[wp.id];
            const cached = getResolvedJourney(rawCache);
            if (cached) {
                const duration = cached.duration || 999;
                maxWait = Math.max(maxWait, duration);
                if (duration > wp.limit * 1.1) isVisible = false;

                const breakdown = cached.sections || cached.itinerary || [];
                if (breakdown.length > 0) {
                    const usedModes = breakdown.map(step => (step.type || "").toLowerCase());
                    const criticalModes = usedModes.filter(m => !['walking', 'street_network', 'waiting', 'transfer'].includes(m));
                    if (criticalModes.some(m => !wp.modes.includes(m))) isVisible = false;
                }

                let walkDuration = 0;
                if (cached.sections) {
                    const first = cached.sections[0];
                    const last = cached.sections[cached.sections.length - 1];
                    if (first.type === 'walking' || first.type === 'street_network') walkDuration += first.duration;
                    if (last.type === 'walking' || last.type === 'street_network') walkDuration += last.duration;
                } else {
                    walkDuration = (cached.firstMile || 0) + (cached.lastMile || 0);
                }
                if (walkDuration > wp.walkLimit) isVisible = false;
            }
        }
    }

    if (props) props.maxCommuteTime = maxWait;

    let filterKey = 'bad';
    if (score > 80) filterKey = 'excellent';
    else if (score > 65) filterKey = 'good';
    else if (score > 45) filterKey = 'decent';
    else if (score > 25) filterKey = 'average';
    else if (score > 10) filterKey = 'poor';

    if (matchData.isParis) return true;
    if (matchData.excluded) isVisible = false;
    if (window.activeScoreFilters && !window.activeScoreFilters[filterKey]) isVisible = false;

    return isVisible;
}

let isVibeActiveCached = false;
function style(feature) {
    if (!feature) return { stroke: false, fillOpacity: 0, interactive: false };
    const props = feature.properties || {};
    const insee = props.code || feature.id;

    // --- SELECTION STYLE (TOP PRIORITY) ---
    const isSelected = window.selectedLayer && 
        (window.selectedLayer.feature === feature || 
         (window.selectedLayer.feature.properties && window.selectedLayer.feature.properties.code === insee));

    if (isSelected) {
        const score = calculateMatchRate(props).total;
        return {
            color: '#ffffff',
            weight: 3, // Increased for stability
            opacity: 1,
            dashArray: '',
            fillColor: getColor(score),
            fillOpacity: 0.8,
            stroke: true,
            interactive: true
        };
    }

    // 1. Calculate Score & Visibility (Memoized)
    const matchData = calculateMatchRate(props);
    const score = matchData.total;
    const isVisible = matchData.isVisible;

    // 2. Zoom State
    const zoom = window.map.getZoom();
    const isZoomedIn = zoom >= 14;

    // 4. EXCLUSION & SPECIAL STATES
    if (matchData.isParis) {
        return {
            fillColor: '#cbd5e1', // Light slate gray
            fillOpacity: 0.1,    // Subtle presence
            weight: 0,
            stroke: false,
            interactive: false
        };
    }

    if (!isVisible && !isSelected) {
        return { fillColor: 'transparent', stroke: false, fillOpacity: 0, interactive: false };
    }

    // Default opacity if visible: extreme nuance via non-linear scaling
    let fillOpacity = Math.pow(score / 100, 2) * 0.8 + 0.02; // Nuanced curve: 0.02 to 0.82
    if (score < 0) fillOpacity = 0.01;

    // 5. Normal mode: Show colors based on match rate

    return {
        fillColor: getColor(score),
        stroke: false,
        fillOpacity: fillOpacity,
        interactive: true
    };
}

function highlightFeature(e) {
    const layer = e.target;
    if (layer === selectedLayer) return;

    const props = layer.feature.properties;

    // Highlight current IRIS with a clean white border
    layer.setStyle({
        weight: 1.5,
        color: '#ffffff',
        dashArray: '3, 5',
        opacity: 0.9,
        stroke: true,
        fillOpacity: 0.85
    });
    layer.bringToFront();

    info.update(props, !!selectedLayer);
}







function updateProximityCircle(lat, lon) {
    const source = map.getSource('proximity');
    if (!source) return;

    if (!lat || !lon) {
        source.setData({ type: 'FeatureCollection', features: [] });
        return;
    }

    if (typeof turf !== 'undefined') {
        const circle = turf.circle([lon, lat], 0.8, { units: 'kilometers' });
        source.setData(circle);
    }
}

function updateCentroidMarker(lat, lon) {
    const source = map.getSource('centroid');
    if (source) {
        if (lat && lon) {
            source.setData({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [lon, lat] }
            });
        } else {
            source.setData({ type: 'FeatureCollection', features: [] });
        }
    }
}

async function selectFeature(e) {
    try {
        const feature = e.target?.feature || e.feature || (e.features && e.features[0]) || e;
        if (!feature) return;
        const props = feature.properties;
        const noZoom = e.noZoom || false;
        const communeName = getCommuneName(props, props.code || feature.id);

        if (window.selectedFeatureId === (props.code || feature.id) && !noZoom) {
            deselectFeature();
            return;
        }

        window.selectedFeatureId = props.code || feature.id;
        window.selectedProps = props;
        window.selectedLayer = { feature: feature }; // Legacy shim

        // MapLibre Selection Highlight
        const highlightSource = map.getSource('commune-highlight');
        if (highlightSource) {
            highlightSource.setData({ type: 'FeatureCollection', features: [feature] });
        }

        // ZOOM LOGIC
        if (!noZoom && !e.isAuto) {
            map.flyTo({
                center: [props.lon, props.lat],
                zoom: 14.5,
                padding: { left: 400, top: 80, right: 80, bottom: 80 },
                duration: 1500,
                essential: true
            });
        }

        // Run heavy updates in parallel and non-blocking
        setTimeout(() => {
// Removed setMinZoom restriction to allow free exploration
            
            window.updateWalkingPath(props).then(() => {
                if (props.lat && props.lon) {
                    updateCentroidMarker(props.lat, props.lon);
                    updateProximityCircle(props.lat, props.lon);
                }
                
                if (window.activeCommuneName !== communeName) {
                    if (window.drawCityBoundaries) window.drawCityBoundaries(communeName);
                }

                if (!window.activeAccordion) {
                    window.activeAccordion = 'vieQuartier';
                }
                
                // Update markers and paths according to active category (NO ZOOM as we are already zooming)
                if (window.updateContextualMap) window.updateContextualMap(window.activeAccordion, true);

                info.update(props, true);
                
                setTimeout(() => {
                    if (window.renderActiveLayers) window.renderActiveLayers(true);
                }, 150);
            });
        }, 400);

    } catch (err) {
        console.error("❌ [selectFeature] Error:", err);
    }
};

window.cityBoundariesCache = {};
window.drawCityBoundaries = function(communeName) {
    if (!window.map || !communeName) return;
    window.activeCommuneName = communeName;
    
    const source = map.getSource('commune-highlight');
    if (!source) return;

    if (window.cityBoundariesCache[communeName]) {
        source.setData(window.cityBoundariesCache[communeName]);
        return;
    }

    const cityFeatures = (window.allNeighborhoods || []).filter(f => 
        getCommuneName(f.properties, f.properties.code || f.id) === communeName
    );
    if (cityFeatures.length === 0) return;

    try {
        if (typeof turf !== 'undefined' && cityFeatures.length > 1) {
            let unioned = cityFeatures[0];
            for (let i = 1; i < cityFeatures.length; i++) {
                unioned = turf.union(unioned, cityFeatures[i]);
            }
            window.cityBoundariesCache[communeName] = unioned;
            source.setData(unioned);
        } else if (cityFeatures.length > 0) {
            source.setData(cityFeatures[0]);
        }
    } catch (e) {
        console.warn("Union failed", e);
    }
};

function deselectFeature() {
    if (window.selectedFeatureId) {
        window.selectedFeatureId = null;
        
        if (window.walkingPathsGroup) window.walkingPathsGroup.clearLayers();
        if (window.communeHighlightLayer) window.communeHighlightLayer.clearLayers();
        
        info.update();
        if (window.renderActiveLayers) window.renderActiveLayers();

        // Unlock de-zoom
// map.setMinZoom(0);
        
        if (map.getZoom() > 14) {
            map.easeTo({ zoom: 13.5, duration: 800 });
        }
    }
}
window.deselectFeature = deselectFeature;

map.on('click', (e) => {
    // Only deselect if the click wasn't already handled by a feature
    if (e.originalEvent && e.originalEvent._handledByFeature) return;
    deselectFeature();
});
window.addEventListener('keydown', e => { if (e.key === 'Escape') deselectFeature(); });

function onEachFeature(feature, layer) {
    // Populate layersByCommune index
    const cName = getCommuneName(feature.properties, feature.id);
    if (!window.layersByCommune) window.layersByCommune = {};
    if (!window.layersByCommune[cName]) window.layersByCommune[cName] = [];
    window.layersByCommune[cName].push(layer);

    const id = feature.id || feature.properties.code;
    const data = idfPrices[id] || { all: { price: 5000, vol: 0 }, pav: 0, ips: 0 };
    Object.assign(feature.properties, {
        all: data.all,
        house: data.house,
        apt: data.apt,
        evolution_house: data.evolution_house,
        evolution_apt: data.evolution_apt,
        school_details: data.school_details,
        gVol: data.gVol,
        pavScore: data.pav,
        ipsScore: data.ips,
        vibe: data.vibe,
        vibes: data.vibes,
        demo: data.demo,
        nature: data.nature,
        noise: data.noise,
        heat_resilience: data.heat_resilience,
        heat_label: data.heat_label,
        air_quality: data.air_quality,
        air_label: data.air_label
    });
    const isParis = String(id).startsWith('75');
    if (!isParis) {
        layer.on({ mouseover: highlightFeature, mouseout: resetHighlight, click: selectFeature });
    }
}

function updateProgress(percent, status) {
    const bar = document.getElementById('loader-progress');
    const msg = document.getElementById('loader-status');
    if (bar) bar.style.width = percent + '%';
    if (msg) msg.innerText = status;
}

// --- DATA LOADING & INDEXING ---
// Preference Selection Logic
window.selectPref = function (category, value, element) {
    const container = document.getElementById('pref-' + category);
    if (!container) return;

    // Update UI
    container.querySelectorAll('.pref-chip').forEach(chip => chip.classList.remove('active'));
    element.classList.add('active');

    // Trigger update
    updateFilters();
    renderActiveLayers();
};

async function initApp() {
    try {
        console.log("🚀 Starting initApp...");
        updateProgress(10, 'Prix IMMO...');
        let pricesData, pediatreIrisData, pediatrePointsData, gpeData;
        try {
            const res = await Promise.all([
                fetch('/idf_prices.json').then(r => { if (!r.ok) throw new Error("idf_prices.json not found"); return r.json(); }),
                fetch('/pediatres_by_iris.json').then(r => { if (!r.ok) throw new Error("pediatres_by_iris.json not found"); return r.json(); }),
                fetch('/pediatres.geojson').then(r => { if (!r.ok) throw new Error("pediatres.geojson not found"); return r.json(); }),
                fetch('/gpe_stations_new.geojson').then(r => { if (!r.ok) throw new Error("gpe_stations_new.geojson not found"); return r.json(); }),
                fetch('/transit_lines_simplified.geojson').then(r => { if (!r.ok) throw new Error("transit_lines_simplified.geojson not found"); return r.json(); }),
                fetch('/stations.geojson').then(r => { if (!r.ok) throw new Error("stations.geojson not found"); return r.json(); }),
                fetch('/city_centers.geojson').then(r => { if (!r.ok) throw new Error("city_centers.geojson not found"); return r.json(); }),
                fetch('/mairies.geojson').then(r => { if (!r.ok) throw new Error("mairies.geojson not found"); return r.json(); }),
                fetch('/walking_metadata.json').then(r => r.json()).catch(() => ({}))
            ]);
            pricesData = res[0];
            pediatreIrisData = res[1];
            pediatrePointsData = res[2];
            const gpeGeojson = res[3];
            const transitData = res[4];
            const stationsGeojson = res[5];
            const cityCentersData = res[6];
            const mairiesData = res[7];
            window.walkingMetadata = res[8];
            window.cityCentersData = cityCentersData;
            window.mairiesData = mairiesData;
            window.allStationsData = stationsGeojson;

            // Normalize new GPE data
            window.gpeStationsData = gpeGeojson.features.map(f => {
                const p = f.properties;
                const coords = f.geometry.coordinates;
                const linesStr = p.LIGNE || "";
                const lines = linesStr.replace(/L/g, "").split("/").map(l => l.trim());
                return {
                    name: p.LIBELLE,
                    lines: lines,
                    lat: coords[1],
                    lon: coords[0],
                    code: p.CODE,
                    year: p.date_diffu ? new Date(p.date_diffu).getFullYear() : null
                };
            });

            // Extract All Stations for Proximity Check
            window.allStationsData = (stationsGeojson?.features || [])
                .filter(f => f.geometry && f.geometry.coordinates)
                .map(f => {
                    const p = f.properties || {};
                    return {
                        lat: f.geometry.coordinates[1],
                        lon: f.geometry.coordinates[0],
                        name: p.nom_gares || p.nom_zdc || p.nom_iv || p.stop_name || p.label || 'Station',
                        mode: (p.mode || p.transport_mode || p.reseau || "").toUpperCase(),
                        lines: p.indice_lig || p.res_com || p.line || p.route_short_name || ""
                    };
                });

            // Legacy support for has_metro calculation below
            window.metroStationsData = (window.allStationsData || []).filter(s => s.mode === "METRO");

            // Transit lines are now handled via the 'paths' source in MapLibre
            if (map.getSource('paths')) {
                // Initial data if needed, but usually handled by updateContextualMap
            }
        } catch (e) {
            console.error("❌ Data Fetch Error (Phase 1):", e);
            throw e;
        }


        window.pediatresByIris = pediatreIrisData;
        window.pediatresIndex = {};
        if (pediatrePointsData && pediatrePointsData.features) {
            pediatrePointsData.features.forEach(f => {
                if (!f.properties) return;
                const iris = f.properties.iris;
                if (!iris) return;
                if (!window.pediatresIndex[iris]) window.pediatresIndex[iris] = [];
                window.pediatresIndex[iris].push(f);
            });
        }

        updateProgress(25, 'Commutes...');
        let journeysData;
        try {
            journeysData = await fetch('/precomputed_journeys.json').then(r => { if (!r.ok) throw new Error("precomputed_journeys.json not found"); return r.json(); });
        } catch (e) {
            console.error("❌ Data Fetch Error (Journeys):", e);
            throw e;
        }

        updateProgress(40, 'Frontières...');
        let geojsonData;
        try {
            geojsonData = await fetch('/idf-quartiers-optimized.geojson').then(r => { if (!r.ok) throw new Error("idf-quartiers-optimized.geojson not found"); return r.json(); });
        } catch (e) {
            console.error("❌ Data Fetch Error (GeoJSON):", e);
            throw e;
        }

        updateProgress(50, 'Bruit Aéroport...');
        try {
            // Load precomputed intersections
            const pebRes = await fetch('/peb_by_iris.json');
            if (pebRes.ok) {
                window.pebByIris = await pebRes.json();
                console.log("✅ PEB Precomputed data loaded:", Object.keys(window.pebByIris).length, "IRIS impacted");
            }

            // Lazy load PEB geometries for mapping
            fetchPEBGeometries();
        } catch (e) {
            console.error("⚠️ PEB Data load failed:", e);
        }

        updateProgress(95, 'Finalisation...');
        idfPrices = pricesData;
        window.precomputedJourneysRaw = journeysData;
        window.commuteItineraryType = 'main';

        // Lazy load detailed baked index in background
        fetch('/baked_index.json').then(r => r.json()).then(data => {
            window.neighborhoodNeighbors = data.neighbors;
            window.pointsByInsee = data.points;
            window.bakedTransactions = data.transactions;
            console.log("✅ Detailed index loaded in background");

            // NOUVEAU : On pré-construit les marqueurs ici !
            window.buildAllMarkersOnce();

            if (window.updateTransactionsVisibility) window.updateTransactionsVisibility();
            if (window.updateCentreVilleVisibility) window.updateCentreVilleVisibility();
            renderActiveLayers();
            updateTopMatches();
        }).catch(err => {
            console.warn("⚠️ Background baked index load failed:", err);
        });

        renderWorkplaces();

        window.irisCentroids = {};
        if (geojsonData && geojsonData.features) {
            geojsonData.features.forEach(f => {
                if (!f.properties) return;
                const id = f.id || f.properties.code;
                if (!id) return;
                if (f.properties.lat && f.properties.lon) {
                    window.irisCentroids[id] = { lat: f.properties.lat, lon: f.properties.lon };
                }
            });
        }

        window.toggleInfoModal = function (show) {
            const modal = document.getElementById('info-modal');
            if (!modal) return;
            if (show) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            } else {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        };


        window.allNeighborhoods = (geojsonData?.features || []).map(f => {
            const p = f.properties || {};
            // Ensure essential properties exist for UI
            p.nom = p.nom || p.NOM || "Quartier inconnu";
            p.code = String(p.code || p.CODE || f.id || "");
            p.commune = getCommuneName(p, p.code);
            // Initialize memoization object
            p.memo = { cacheKey: null, matchData: null };
            return f;
        });

        // Precompute all heavy data once
        console.log("🧬 Pre-calculating neighborhood data...");
        
        // PRE-CALCULATE CITY CENTERS (Expensive spatial logic moved here)
        if (window.cityCentersData) {
            window.cityCentersData.features.forEach(f => {
                if (typeof turf === 'undefined') return;
                const centroid = turf.centroid(f).geometry.coordinates;
                const localPoints = getNearbyPoints({ lat: centroid[1], lon: centroid[0] }, 500);
                f.properties.precomputedAmenities = {
                    bio: localPoints.commerces.some(c => c.properties.category === 'bio'),
                    bakery: localPoints.commerces.some(c => (c.properties.category || '').match(/bakery|boulangerie/i)),
                    supermarket: localPoints.commerces.some(c => (c.properties.category || '').match(/supermarket|supermarché|alimentation|epicerie/i)),
                    pharmacy: localPoints.amenities.some(c => c.properties.category === 'pharmacy'),
                    bank: localPoints.amenities.some(c => c.properties.category === 'bank'),
                    culture: localPoints.culture.length > 0 || localPoints.amenities.some(c => (c.properties.category || '').match(/cinema|theater|museum|theatre/i)),
                    restaurant: localPoints.amenities.some(c => (c.properties.category || '').match(/restaurant|cafe|bar/i)) || localPoints.commerces.some(c => (c.properties.category || '').match(/restau/i))
                };
            });
        }

        window.allNeighborhoods.forEach(f => {
            const p = f.properties;
            if (p.lat && p.lon) {
                p.has_metro = (window.metroStationsData && window.metroStationsData.some(s => getDistance(p.lat, p.lon, s.lat, s.lon) <= 800));
                
                // PRE-CALCULATE IS_IN_POLE (Turf check done ONCE)
                if (window.cityCentersData && typeof turf !== 'undefined') {
                    const point = turf.point([p.lon, p.lat]);
                    p.is_in_pole = window.cityCentersData.features.some(cf => turf.booleanPointInPolygon(point, cf));
                } else {
                    p.is_in_pole = false;
                }
            }
        });

        // Enrich GeoJSON properties with Price and Demo data before MapLibre Upload
        if (geojsonData && geojsonData.features) {
            geojsonData.features.forEach(f => {
                const props = f.properties;
                const id = f.id || props.code;
                if (!id) return;

                const data = idfPrices[id] || { all: { price: 5000, vol: 0 }, pav: 0, ips: 0 };
                Object.assign(props, {
                    all: data.all,
                    apt: data.apt,
                    house: data.house,
                    pav: data.pav,
                    evolution_apt: data.evolution_apt,
                    evolution_house: data.evolution_house,
                    ips: data.ips,
                    demo: data.demo || props.demo // Keep existing if present
                });
            });
        }

        console.log("✅ Pre-calculation & Data enrichment complete.");

        // Pushing data to MapLibre
        if (map.getSource('neighborhoods')) {
            // Pre-calculate colors for the initial view
            geojsonData.features.forEach(f => {
                try {
                    const score = calculateMatchRate(f.properties).total;
                    f.properties.fillColor = getColor(score);
                } catch (e) {
                    f.properties.fillColor = '#ccc';
                }
            });
            map.getSource('neighborhoods').setData(geojsonData);
        }
        window.geojsonLayer = { 
            eachLayer: (cb) => {
                // Compatibility shim: loop over allNeighborhoods instead of Leaflet layers
                window.allNeighborhoods.forEach(f => cb({ feature: f, setStyle: () => {} }));
            }
        };
        buildSearchIndex(geojsonData);
        refreshMobilityCache(geojsonData);

        const uiPanel = document.getElementById('ui-panel');
        if (uiPanel) {
            uiPanel.addEventListener('mousedown', e => e.stopPropagation());
            uiPanel.addEventListener('wheel', e => e.stopPropagation());
        }

        // Stations & Schools

        // Setup
        window.stationsLayer = { clearLayers: () => {}, addLayer: () => {} };
        window.schoolsLayer = { clearLayers: () => {}, addLayer: () => {} };
        window.commercesLayer = { clearLayers: () => {}, addLayer: () => {} };
        window.amenitiesLayer = { clearLayers: () => {}, addLayer: () => {} };
        window.sportLayer = { clearLayers: () => {}, addLayer: () => {} };
        window.cultureLayer = { clearLayers: () => {}, addLayer: () => {} };
        window.pediatresLayer = { clearLayers: () => {}, addLayer: () => {} };
        window.marcheLayer = { clearLayers: () => {}, addLayer: () => {} };
        window.gpeLayer = { clearLayers: () => {}, addLayer: () => {} };
        window.mairiesLayer = { clearLayers: () => {}, addLayer: () => {} };
        window.rivieraLayer = { clearLayers: () => {}, addLayer: () => {} };
        window.centreVilleLayer = { clearLayers: () => {}, addLayer: () => {}, addTo: () => {} };
        window.communeHighlightLayer = { clearLayers: () => {}, addLayer: () => {}, addTo: () => {} };
        window.commerceHighlightLayer = { clearLayers: () => {}, addLayer: () => {}, addTo: () => {} };

        window.gpePointToLayer = (s, latlng) => {
            const primaryLine = s.lines[0];
            const conf = idfmColors[primaryLine] || { bg: "#059669", text: "#FFFFFF" };
            return L.marker(latlng, {
                icon: L.divIcon({
                    className: 'bg-transparent',
                    html: `<div class="shadow-md flex items-center justify-center font-bold text-[9px] border-2 border-white text-white rounded-full" style="width: 20px; height: 20px; background-color: ${conf.bg};">${primaryLine}</div>`,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                }),
                interactive: true,
                pane: 'poiPane'
            }).bindPopup(`
                <div class="p-2">
                    <div class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">Grand Paris Express</div>
                    <div class="text-[14px] font-black text-gray-900 mb-1">${s.name}</div>
                    <div class="text-[11px] font-bold ${s.year && s.year <= 2024 ? 'text-blue-700 bg-blue-50 border-blue-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'} px-2 py-0.5 rounded-lg border inline-block mb-2">
                        ${s.year ? (s.year <= 2024 ? 'Déjà en service' : `Ouverture ${s.year}`) : 'Ouverture prochaine'}
                    </div>
                    <div class="text-[10px] text-gray-500 font-medium border-t border-gray-100 pt-1.5 flex flex-wrap gap-1">
                        ${s.lines.map(l => {
                const c = idfmColors[l] || { bg: "#eee", text: "#000" };
                return `<span class="px-1.5 py-0.5 rounded-md text-[8px] font-bold" style="background-color: ${c.bg}; color: ${c.text};">L.${l}</span>`;
            }).join('')}
                    </div>
                </div>
            `).on('click', (e) => L.DomEvent.stopPropagation(e));
        };

        window.stationPointToLayer = (f, latlng) => {
            let m = (f.properties.mode || "").toUpperCase();
            let line = f.properties.indice_lig || "";
            if (!line) return null;
            if (m.includes("TRAM") && !line.toLowerCase().startsWith('t')) line = 'T' + line;
            let conf = idfmColors[line] || { bg: "#cbd5e1", text: "#000" };
            const isCircle = m === "METRO" || m === "RER" || m === "TRAIN";
            const marker = L.marker(latlng, {
                icon: L.divIcon({
                    className: 'bg-transparent',
                    html: `<div class="shadow-sm flex items-center justify-center font-bold text-[8px] border border-gray-400 opacity-90 transition-transform hover:scale-110" style="width: 16px; height: 16px; border-radius: ${isCircle ? '50%' : '2px'}; color: ${conf.text}; background-color: ${conf.bg};">${line}</div>`,
                    iconSize: [16, 16],
                    iconAnchor: [8, 8]
                }),
                interactive: true,
                pane: 'poiPane'
            });

            marker.on('mouseover', () => {
                const path = window.activeWalkingPaths?.find(p => p.name === f.properties.nom_gares || p.name === f.properties.nom_zdc);
                if (path) window.highlightPath(path.id, true);
            });
            marker.on('mouseout', () => {
                const path = window.activeWalkingPaths?.find(p => p.name === f.properties.nom_gares || p.name === f.properties.nom_zdc);
                if (path) window.highlightPath(path.id, false);
            });

            return marker.bindPopup(`<b>${f.properties.nom_gares || f.properties.nom_zdc || 'Transport'}</b><br />Ligne ${line} (${m})`)
                .on('click', (e) => L.DomEvent.stopPropagation(e));
        };

        window.schoolPointToLayer = (f, latlng, irisIps) => {
            const isPrivate = (f.properties.sector || '').toLowerCase().includes('privé');
            const name = f.properties.name || f.properties.nom_etablissement || 'École';
            const type = (f.properties.type || 'autre').toLowerCase();
            const colors = {
                'maternelle': '#EC4899',
                'elementaire': '#10B981',
                'college': '#3B82F6',
                'lycee': '#F59E0B',
                'autre': '#8B5CF6'
            };
            const isRealIps = !!f.properties.ips;
            const ips = f.properties.ips || irisIps || 0;
            const label = isRealIps ? "IPS" : "IPS Est.";
            const ipsHtml = ips > 0 ? `<div class="mt-1.5 pt-1.5 border-t border-gray-100 flex items-center justify-between"><span class="text-[9px] text-gray-400 uppercase font-bold">${label}</span><span class="text-[11px] font-extrabold text-purple-600">${ips}</span></div>` : '';

            return L.circleMarker(latlng, {
                radius: isPrivate ? 5 : 4,
                fillColor: colors[type] || colors['autre'],
                color: isPrivate ? "#000" : "#fff",
                weight: isPrivate ? 2 : 1,
                opacity: 1,
                fillOpacity: 0.8,
                interactive: true,
                pane: 'poiPane'
            }).bindPopup(`
                <div class="p-3">
                    <div class="text-[12px] font-bold text-gray-900 leading-tight">${name}</div>
                    <div class="text-[10px] text-gray-500 mt-1">${f.properties.type_etablissement || ''} (${f.properties.sector || ''})</div>
                    ${ipsHtml}
                </div>
            `, { maxWidth: 300 })
                .on('click', (e) => L.DomEvent.stopPropagation(e));
        };

        window.marchePointToLayer = (f, latlng) => {
            const props = f.properties;
            const innerHtml = props.is_covered ? '🏪' : '🧺';
            const borderColor = props.is_covered ? 'border-amber-600' : 'border-green-500';
            const bgColor = props.is_covered ? 'bg-amber-50' : 'bg-green-50';

            return L.marker(latlng, {
                icon: L.divIcon({
                    html: `<div class="${bgColor} rounded-full w-6 h-6 flex items-center justify-center border ${borderColor} shadow-md text-sm overflow-hidden">${innerHtml}</div>`,
                    className: 'marche-marker',
                    iconSize: [24, 24]
                }),
                interactive: true,
                pane: 'poiPane'
            }).bindPopup(`
                <div class="p-3">
                    <div class="text-[10px] font-black text-green-600 uppercase tracking-widest mb-0.5">Marché d'IDF</div>
                    <div class="text-[14px] font-black text-gray-900 mb-1">${props.name}</div>
                    <div class="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                        ${props.is_covered ? '🏛️ Halle / Marché Couvert' : '🧺 Marché de plein air'}
                    </div>
                </div>
            `, { maxWidth: 250 })
                .on('click', (e) => L.DomEvent.stopPropagation(e));
        };
        window.rivieraPointToLayer = (f, latlng) => {
            const emo = f.properties.emoji || "🌊";
            const cat = f.properties.category || "riviera";
            let color = "#0ea5e9";
            if (cat === "guinguette") color = "#ec4899";
            if (cat === "marina") color = "#2563eb";
            return L.marker(latlng, {
                icon: L.divIcon({
                    className: "bg-transparent",
                    html: `<div class="shadow-lg flex items-center justify-center bg-white border-2 border-blue-500 rounded-full text-[12px]" style="width: 24px; height: 24px;">${emo}</div>`,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                }),
                pane: 'poiPane'
            }).bindPopup(`<div class="p-2"><div class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5">${cat}</div><div class="text-[14px] font-black text-gray-900 mb-1">${f.properties.name}</div></div>`);
        };

        window.commercePointToLayer = (f, latlng) => {
            const props = f.properties;
            let innerHtml = props.emoji || '🛒';
            let borderColor = 'border-gray-200';
            let bgColor = 'bg-white';
            const name = (props.name || "").toLowerCase();
            const isBio = props.category === 'bio' || props.is_biocoop || props.is_naturalia || (props.name && props.name.toLowerCase().includes('bio'));

            if (isBio) {
                innerHtml = `
                    <svg viewBox="0 0 100 100" style="width: 14px; height: 14px; border-radius: 2px;" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" fill="#2E9E47" rx="15"/>
                        <text x="50" y="70" font-family="Arial, sans-serif" font-size="60" fill="white" text-anchor="middle" font-weight="900">AB</text>
                    </svg>
                `;
                borderColor = 'border-green-600';
                bgColor = 'bg-white';
            } else if (props.is_picard) {
                innerHtml = '❄️';
                borderColor = 'border-blue-400';
            } else if (props.category === 'pharmacie') {
                innerHtml = '<svg viewBox="0 0 100 100" style="width: 14px; height: 14px;"><path d="M38 0h24v38h38v24h-38v38h-24v-38h-38v-24h38z" fill="#059669"/></svg>';
                borderColor = 'border-emerald-600';
                bgColor = 'bg-white';
            } else if (props.category === 'supermarché') {
                if (name.includes('carrefour')) innerHtml = '<div class="w-full h-full flex items-center justify-center font-black text-[10px] text-blue-800">C</div>';
                else if (name.includes('monoprix')) innerHtml = '<div class="w-full h-full flex items-center justify-center font-black text-[10px] text-red-600">M</div>';
                else if (name.includes('franprix')) innerHtml = '<div class="w-full h-full flex items-center justify-center font-black text-[10px] text-orange-600">F</div>';
                else if (name.includes('lidl')) innerHtml = '<div class="w-full h-full flex items-center justify-center font-black text-[10px] text-blue-600">L</div>';
                else if (name.includes('aldi')) innerHtml = '<div class="w-full h-full flex items-center justify-center font-black text-[10px] text-blue-900">A</div>';
                else if (name.includes('auchan')) innerHtml = '<div class="w-full h-full flex items-center justify-center font-black text-[10px] text-red-600">A</div>';
                else if (name.includes('casino')) innerHtml = '<div class="w-full h-full flex items-center justify-center font-black text-[10px] text-green-700">C</div>';
                else innerHtml = '🛒';
                borderColor = 'border-blue-500';
            } else if (props.category === 'restaurant') {
                borderColor = 'border-rose-400';
            } else if (props.category === 'fast_food') {
                innerHtml = '🍔';
                borderColor = 'border-orange-400';
                bgColor = 'bg-orange-50';
            } else if (props.category === 'cafe') {
                borderColor = 'border-amber-500';
            } else if (props.category === 'bar') {
                borderColor = 'border-fuchsia-500';
            } else if (props.category === 'pub') {
                borderColor = 'border-yellow-600';
            }

            return L.marker(latlng, {
                icon: L.divIcon({
                    html: `<div class="${bgColor} rounded-full w-6 h-6 flex items-center justify-center border ${borderColor} shadow-md text-sm overflow-hidden">${innerHtml}</div>`,
                    className: 'commerce-marker',
                    iconSize: [24, 24]
                }),
                interactive: true,
                pane: 'poiPane'
            }).bindPopup(`<div class="p-3"><b>${props.name}</b><br /><span class="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">${isBio ? `
                <svg viewBox="0 0 100 100" class="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="#2E9E47" rx="15"/>
                    <text x="50" y="70" font-family="Arial, sans-serif" font-size="60" fill="white" text-anchor="middle" font-weight="900">AB</text>
                </svg> Magasin Bio` : props.category.replace('_', ' ')}</span></div>`, { maxWidth: 250 })
                .on('click', (e) => L.DomEvent.stopPropagation(e));
        };


        window.mairiePointToLayer = (f, latlng) => {
            const props = f.properties;
            return L.marker(latlng, {
                icon: L.divIcon({
                    className: 'custom-div-icon',
                    html: `
                        <div class="flex flex-col items-center group">
                            <div class="w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-blue-600 transform transition-transform group-hover:scale-110">
                                <span class="text-sm">🏛️</span>
                            </div>
                        </div>
                    `,
                    iconSize: [28, 28],
                    iconAnchor: [14, 14]
                }),
                pane: 'poiPane'
            });
        };

        window.pediatrePointToLayer = (f, latlng) => {
            const props = f.properties;
            return L.marker(latlng, {
                icon: L.divIcon({
                    className: 'custom-div-icon',
                    html: `
                        <div class="flex flex-col items-center group">
                            <div class="w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-indigo-500 transform transition-transform group-hover:scale-110">
                                <span class="text-sm">👶</span>
                            </div>
                        </div>
                    `,
                    iconSize: [28, 28],
                    iconAnchor: [14, 14]
                }),
                pane: 'poiPane'
            }).bindPopup(`
                <div class="p-3 min-w-[200px] font-sans">
                    <div class="text-indigo-600 text-[10px] font-bold uppercase tracking-wider mb-1">Pédiatre (BPE)</div>
                    <div class="text-sm font-bold text-gray-900 mb-1">${props.name}</div>
                    <div class="text-xs text-gray-500 mb-2">${props.structure || ''}</div>
                    <div class="flex items-start gap-2 pt-2 border-t border-gray-100">
                        <span class="text-xs text-gray-400">📍</span>
                        <div class="text-[11px] leading-relaxed text-gray-600">${props.address}</div>
                    </div>
                </div>
            `, {
                className: 'premium-popup',
                maxWidth: 300
            });
        };

        window.amenityPointToLayer = (f, latlng) => {
            const props = f.properties;
            const emojiMap = {
                'pool': '🏊',
                'gym': '🏋️',
                'tennis': '🎾',
                'culture': '🎭',
                'cinema': '🎬',
                'theatre': '🎭',
                'cinema': '🎬',
                'musique': '🎸',
                'conservatoire': '🎼',
                'bibliotheque': '📚',
                'library': '📚',
                'institution_culturelle': '🏛️',
                'playground': '🎠',
                'creche': '👶',
                'church': '⛪'
            };
            const labelMap = {
                'pool': 'Piscine',
                'gym': 'Salle de Sport',
                'tennis': 'Tennis',
                'culture': 'Culture & Loisirs',
                'cinema': 'Cinéma',
                'theatre': 'Théâtre',
                'musique': 'Scène Musicale',
                'conservatoire': 'Conservatoire',
                'bibliotheque': 'Bibliothèque',
                'library': 'Bibliothèque',
                'institution_culturelle': 'Institution Culturelle',
                'playground': 'Aire de jeux',
                'creche': 'Crèche / Garderie',
                'church': 'Édifice Religieux'
            };
            const emoji = emojiMap[props.category] || '📍';
            const label = labelMap[props.category] || props.type || 'Service';

            return L.marker(latlng, {
                icon: L.divIcon({
                    html: `<div class="bg-white rounded-full w-6 h-6 flex items-center justify-center border border-blue-100 shadow-md text-sm">${emoji}</div>`,
                    className: 'amenity-marker',
                    iconSize: [24, 24]
                }),
                interactive: true,
                pane: 'poiPane'
            }).bindPopup(`<div class="p-3"><b>${props.name}</b><br /><span class="text-[10px] text-blue-600 font-bold uppercase tracking-tight">${label}</span></div>`, { maxWidth: 250 })
                .on('click', (e) => L.DomEvent.stopPropagation(e));
        };

        // updateTransactionsVisibility moved outside for better scoping

        // Stations & Schools layers are managed in renderActiveLayers

        updateFilters();

        // Enable default groups & layers on startup
        if (window.updateChildState) {
            window.updateChildState('maps');
        }
        if (window.updateStationsVisibility) window.updateStationsVisibility();
        if (window.updateCentreVilleVisibility) window.updateCentreVilleVisibility();

        // Finalize
        updateProgress(100, 'Prêt !');
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => { loader.style.display = 'none'; }, 700);
            }

            // Sélection initiale gérée par updateFilters + isFirstSearch
        }, 300);

    } catch (e) {
        console.error("🔥 Critical Initialization Error:", e);
        updateProgress(100, 'Erreur lors du chargement');
        const statusMsg = document.getElementById('loader-status');
        if (statusMsg) {
            statusMsg.innerHTML = `<span class="text-red-500 font-bold">Erreur: ${e.message || 'Inconnue'}</span><br/><span class="text-[8px] normal-case text-gray-400">${e.stack ? e.stack.split('\n')[0] : ''}</span>`;
        }
    }
}


let zoomTimeout;
let filterTimeout;
window.updateFilters = updateFilters;
let updateFiltersTimeout = null;
function updateFilters() {
    if (updateFiltersTimeout) clearTimeout(updateFiltersTimeout);
    updateFiltersTimeout = setTimeout(() => {
        _updateFilters();
    }, 100);
}

function _updateFilters() {
    if (!window.geojsonLayer) return;
    console.log("⚡ Refreshing map filters...");

    // UPDATE GLOBAL CONTEXT (Once per filter change, not once per IRIS!)
    const budgetRaw = document.getElementById('budget-input')?.value || "850000";
    window.appContext.budget = parseInt(String(budgetRaw).replace(/\s/g, '').replace(/[^0-9]/g, '')) || 850000;
    
    window.appContext.surfaceBucket = document.getElementById('surface-input')?.value || "60-80m2";
    const bucketValues = {
        "<30m2": 20, "30-40m2": 35, "40-60m2": 50, "60-80m2": 70, "80-100m2": 90, "100-120m2": 110, "120m2+": 140
    };
    window.appContext.minSurface = bucketValues[window.appContext.surfaceBucket] || 70;
    window.appContext.propertyType = window.currentPropertyType || 'all';
    window.appContext.searchCriteria = window.searchCriteria || [];
    window.appContext.activeAxisId = window.activeAxisId;

    // PRE-FETCH ACTIVE PREFERENCES (Avoid DOM reads in loop)
    window.appContext.preferences = {};
    ['immo', 'mobility', 'commute', 'urbanisme', 'vieQuartier', 'family', 'infra', 'safety', 'socio', 'demo'].forEach(id => {
        const activeChip = document.getElementById('pref-' + id)?.querySelector('.pref-chip.active');
        if (activeChip) window.appContext.preferences[id] = activeChip.getAttribute('data-value');
    });

    // GENERATE UNIQUE CACHE KEY
    window.globalCacheKey = [
        window.appContext.budget,
        window.appContext.surfaceBucket,
        window.appContext.propertyType,
        JSON.stringify(window.appContext.searchCriteria),
        window.appContext.activeAxisId
    ].join('|');

    // Sync activeWorkplaces with Criteria Builder 'commute' criteria
    if (window.searchCriteria) {
        const commuteCriteria = window.searchCriteria.filter(c => c.property === 'commute');
        if (commuteCriteria.length > 0) {
            window.activeWorkplaces = commuteCriteria.map(c => ({
                id: c.workplace || 'bastille',
                limit: c.value || 45,
                walkLimit: 20, // Default walk limit
                modes: ['metro', 'rer', 'train', 'bus', 'tram'] // Default modes
            }));
        } else {
            // If no commute criteria, we don't clear it yet to avoid breaking 
            // the separate "Lieux de travail" modal if it's being used, 
            // but for the dashboard it's better to stay in sync.
            // window.activeWorkplaces = []; 
        }
    }

    // Always refresh mobility cache if we have geojson layer
    if (window.refreshMobilityCache && window.geojsonLayer) {
        window.refreshMobilityCache(window.geojsonLayer.toGeoJSON());
    }

    isVibeActiveCached = !!document.querySelector('.vibe-chip.active');
    if (window.updateTransactionsVisibility) window.updateTransactionsVisibility();

    // Batch processing to avoid long tasks
    requestAnimationFrame(() => {
        geojsonLayer.setStyle(style);

        // Debounce top matches update
        clearTimeout(window.topMatchTimeout);
        window.topMatchTimeout = setTimeout(() => {
            updateTopMatches();
        }, 300);

        if (window.updateTransactionsVisibility) window.updateTransactionsVisibility();
        if (window.updateGPELinesVisibility) window.updateGPELinesVisibility();
    });
}


// --- NOISE VISUALIZATION: GRANULAR NOISE MIST ---
let noiseInfraLayer = null;

const getNoiseWeight = (meters, featureWeight) => {
    const zoom = map.getZoom();
    const center = map.getCenter();
    // Precise meters per pixel calculation
    const metersPerPixel = 40075016 * Math.cos(center.lat * Math.PI / 180) / Math.pow(2, zoom + 8);
    return (meters * (featureWeight || 0.1)) / metersPerPixel;
};

let noiseInfraLayerBase = null; // Stockage en mémoire

window.updateNoiseVisibility = async () => {
    const show = document.getElementById('show-noise')?.checked;

    // 1. Initialisation (Une seule fois !)
    if (show && !window._noiseData) {
        window._noiseData = await fetch('/noise_infra.geojson').then(r => r.json());
    }

    if (show && !noiseInfraLayerBase) {
        noiseInfraLayerBase = L.layerGroup();
        const noiseRenderer = L.canvas({ padding: 0.5, pane: 'noisePane' });

        // On dessine le bruit une fois pour toutes
        const layer = L.geoJSON(window._noiseData, {
            renderer: noiseRenderer,
            style: (f) => ({
                color: f.properties.weight > 5 ? '#ef4444' : '#fb923c', // Rouge si fort, Orange si faible
                weight: f.properties.weight * 1.5,
                opacity: 0.4,
                renderer: noiseRenderer
            }),
            interactive: false
        });
        noiseInfraLayerBase.addLayer(layer);
    }

    // MapLibre noise infra visibility handled elsewhere or disabled for now
};

window.updateAirQualityVisibility = () => {
    updateFilters();
};

window.updatePediatresVisibility = () => {
    renderActiveLayers();
};

window.updateMairiesVisibility = () => {
    renderActiveLayers();
};

window.updatePEBVisibility = async () => {
    const show = document.getElementById('show-peb')?.checked;
    if (!show) {
        // PEB layer visibility removal
        return;
    }

    if (!window.pebLayer && window.pebData) {
        window.pebLayer = L.layerGroup();
        const colors = { za: '#7e22ce', zb: '#ef4444', zc: '#f97316', zd: '#eab308' };
        Object.entries(window.pebData).forEach(([zone, geojson]) => {
            L.geoJSON(geojson, {
                style: {
                    fillColor: colors[zone],
                    fillOpacity: 0.35,
                    weight: 1.5,
                    color: colors[zone],
                    opacity: 0.7,
                    interactive: false,
                    renderer: window.pebRenderer
                },
                pane: 'noisePane'
            });
        });
    }

    if (window.pebLayer && !window.map.hasLayer(window.pebLayer)) {
        // window.pebLayer.addTo(window.map);
    }
};

window.updateCentreVilleVisibility = async () => {
    const show = document.getElementById('show-centre-ville')?.checked;
    const legend = document.getElementById('city-centers-legend');

    if (legend) {
        if (show) legend.classList.remove('hidden');
        else legend.classList.add('hidden');
    }
    
    if (!show || !window.map.getSource('city-centers')) return;

    const zoom = window.map.getZoom();
    const personaStyles = {
        "Pôle de Mobilité": { color: '#8b5cf6', icon: '🚉' },
        "Cœur Historique": { color: '#f59e0b', icon: '🏺' },
        "Axe Commerçant": { color: '#ea580c', icon: '🛍️' },
        "Quartier Culturel": { color: '#ec4899', icon: '🎭' },
        "Pôle de Vie": { color: '#10b981', icon: '🌱' }
    };

    const features = [];
    const auraFeatures = [];

    (window.cityCentersData?.features || []).forEach(feature => {
        const props = feature.properties;
        const centroid = turf.centroid(feature).geometry.coordinates;
        const s = personaStyles[props.persona] || personaStyles["Pôle de Vie"];
        
        features.push({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: centroid },
            properties: {
                ...props,
                icon: s.icon,
                color: s.color
            }
        });

        // Use actual Polygon for Aura
        auraFeatures.push({
            type: 'Feature',
            geometry: feature.geometry,
            properties: { color: s.color }
        });

    });

    window.map.getSource('city-centers').setData({ type: 'FeatureCollection', features });
    if (window.map.getSource('city-centers-aura')) {
        window.map.getSource('city-centers-aura').setData({ type: 'FeatureCollection', features: auraFeatures });
    }
};


window.updateBudgetDisplay = () => {
    const budget = parseInt(document.getElementById('budget-input').value);
    const apport = parseInt(document.getElementById('apport-input').value);
    const notary = Math.round(budget * 0.08);
    const loan = Math.max(0, budget + notary - apport);

    // Monthly payment approx at 3.9% over 25 years (factor approx 0.0052)
    const monthly = Math.round(loan * 0.00522);

    document.getElementById('budget-display').innerText = new Intl.NumberFormat('fr-FR').format(budget) + ' €';
    document.getElementById('notary-display').innerText = '+ ' + new Intl.NumberFormat('fr-FR').format(notary) + ' €';
    document.getElementById('apport-display').innerText = new Intl.NumberFormat('fr-FR').format(apport) + ' €';
    document.getElementById('reimbursement-display').innerHTML = `Emprunt: ${new Intl.NumberFormat('fr-FR').format(loan)} € (~${new Intl.NumberFormat('fr-FR').format(monthly)} € / mois sur 25 ans)`;

    updateFilters();
};

window.renderActiveLayers = renderActiveLayers;
function getVisibleInseeCodes() {
    if (!window.map || !window.irisGrid) return [];
    const bounds = window.map.getBounds();
    const visible = new Set();

    // Use the spatial grid for ultra-fast visibility detection (O(1) vs O(N))
    const nw = bounds.getNorthWest();
    const se = bounds.getSouthEast();
    
    const minX = Math.floor(nw.lng * 50) - 1;
    const maxX = Math.floor(se.lng * 50) + 1;
    const minY = Math.floor(se.lat * 50) - 1;
    const maxY = Math.floor(nw.lat * 50) + 1;

    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            const cell = window.irisGrid[`${x},${y}`];
            if (cell) cell.forEach(code => visible.add(code));
        }
    }

    return Array.from(visible);
}

window.updateTransactionsVisibility = function () {
    if (!window.bakedTransactions || !window.map || !window.map.getSource('transactions')) return;

    const isChecked = document.getElementById('show-transactions')?.checked;
    if (!isChecked) {
        window.map.getSource('transactions').setData({ type: 'FeatureCollection', features: [] });
        window.map.setLayoutProperty('transactions-layer', 'visibility', 'none');
        return;
    }

    const budget = parseInt(document.getElementById('budget-input')?.value || 2000000);
    const currentType = window.currentPropertyType || 'all';

    const features = [];
    Object.entries(window.bakedTransactions).forEach(([id, d]) => {
        let list = [];
        if (currentType === 'all') {
            list = [...(d.house || []), ...(d.apt || [])];
        } else if (currentType === 'house') {
            list = d.house || [];
        } else if (currentType === 'apt') {
            list = d.apt || [];
        }

        list.forEach(t => {
            if (t.price > budget * 1.1) return;
            features.push({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [t.lng, t.lat] },
                properties: {
                    ...t,
                    isMatch: t.price <= budget
                }
            });
        });
    });

    window.map.getSource('transactions').setData({ type: 'FeatureCollection', features });
    const transVis = isChecked ? 'visible' : 'none';
    window.map.setLayoutProperty('transactions-bg', 'visibility', transVis);
    window.map.setLayoutProperty('transactions-icon', 'visibility', transVis);
};

function renderActiveLayers() {
    if (!window.map) return;
    const zoom = map.getZoom();
    const getChecked = (id) => document.getElementById(id)?.checked || false;

    // Toggle Station Layer
    const showStations = getChecked('show-stations');
    const stationVis = (showStations && zoom >= 11) ? 'visible' : 'none';
    
    // Toggle native layers
    map.setLayoutProperty('stations-bg', 'visibility', stationVis);
    map.setLayoutProperty('stations-icon', 'visibility', stationVis);
    window.renderPremiumMarkers('stations');

    // Toggle School Layer
    const schoolChecked = getChecked('show-schools');
    const schoolVis = (schoolChecked && zoom >= 11) ? 'visible' : 'none';
    map.setLayoutProperty('schools-bg', 'visibility', schoolVis);
    map.setLayoutProperty('schools-icon', 'visibility', schoolVis);
    window.renderPremiumMarkers('schools');

    // Toggle City Center Auras
    const showCentreVille = getChecked('show-centre-ville');
    if (map.getLayer('city-centers-aura')) {
        map.setLayoutProperty('city-centers-aura', 'visibility', showCentreVille ? 'visible' : 'none');
    }
    window.renderPremiumMarkers('cityCenters');


    // Toggle Commerce Layer
    const showCommerces = getChecked('group-commerces');
    if (map.getSource('commerces')) {
        map.setLayoutProperty('commerces-layer', 'visibility', (showCommerces && zoom >= 13) ? 'visible' : 'none');
    }

    // Toggle Walking Paths
    const showCommute = getChecked('group-commute');
    const pathVis = showCommute ? 'visible' : 'none';
    ['walking-paths-outline', 'walking-paths-solid', 'walking-paths-dashed', 'walking-paths-badges'].forEach(lyr => {
        if (map.getLayer(lyr)) map.setLayoutProperty(lyr, 'visibility', pathVis);
    });
}


// Add map events for premium markers
if (window.map) {
    window.map.on('zoomend', () => renderActiveLayers());
    window.map.on('moveend', () => renderActiveLayers());
}


window.renderActiveLayers = renderActiveLayers;
window.updateStationsVisibility = renderActiveLayers;
window.updateSchoolsVisibility = renderActiveLayers;
window.updateCommercesVisibility = renderActiveLayers;
window.updateLoisirsVisibility = renderActiveLayers;
window.updateMairiesVisibility = renderActiveLayers;

window.toggleGroup = function (groupId, isChecked) {
    const parent = document.getElementById(`group-${groupId}`);
    if (parent) parent.classList.remove('partial');

    const subs = document.querySelectorAll(`.sub-${groupId}`);
    subs.forEach(sub => {
        sub.checked = isChecked;
    });
    // Trigger map update
    if (groupId === 'mobilite') {
        window.updateStationsVisibility();
        window.updatePathsVisibility();
        if (window.updateVIFVisibility) window.updateVIFVisibility();
    }
    else if (groupId === 'commerces' || groupId === 'sorties') window.updateCommercesVisibility();
    else if (groupId === 'sante') { window.updateCommercesVisibility(); window.updatePediatresVisibility(); }
    else if (groupId === 'ecoles') window.updateSchoolsVisibility();
    else if (groupId === 'culture' || groupId === 'sport') window.updateLoisirsVisibility();
    else if (groupId === 'infra') {
        window.updateSchoolsVisibility();
        window.updateLoisirsVisibility();
        window.renderActiveLayers();
    }
    else if (groupId === 'maps') {
        window.updateNoiseVisibility();
        window.updateQPVVisibility();
        window.updateZSPVisibility();
        if (window.updatePEBVisibility) window.updatePEBVisibility();
        if (window.updateEspacesVertsVisibility) window.updateEspacesVertsVisibility();
        if (window.updateOSMContextVisibility) window.updateOSMContextVisibility();
        if (window.updateCentreVilleVisibility) window.updateCentreVilleVisibility();
        if (window.toggleSatelliteView) window.toggleSatelliteView(isChecked);
    }
    else if (groupId === 'commute') {
        window.renderWalkingPaths();
        window.renderActiveLayers();
    }
    else if (groupId === 'demo') {
        window.renderActiveLayers();
    }
};


window.updateChildState = function (groupId) {
    const parent = document.getElementById(`group-${groupId}`);
    const subs = document.querySelectorAll(`.sub-${groupId}`);
    if (!parent || subs.length === 0) return;

    let allChecked = true;
    let someChecked = false;
    subs.forEach(sub => {
        if (sub.checked) someChecked = true;
        else allChecked = false;
    });

    parent.checked = allChecked; // The parent is only checked if ALL children are checked

    if (someChecked && !allChecked) {
        parent.classList.add('partial');
    } else {
        parent.classList.remove('partial');
    }
};

window.closeTransactions = () => {
    document.getElementById('transactions-modal').style.display = 'none';
};

window.showTransactions = (insee) => {
    const data = window.bakedTransactions[insee] || { house: [], apt: [] };

    const budget = parseInt(document.getElementById('budget-input')?.value || 2000000);
    const minSurface = parseInt(document.getElementById('surface-input')?.value || 10);

    let transactions = [];
    if (window.currentPropertyType === 'all') {
        transactions = [...(data.house || []), ...(data.apt || [])];
    } else if (window.currentPropertyType === 'house') {
        transactions = data.house || [];
    } else if (window.currentPropertyType === 'apt') {
        transactions = data.apt || [];
    }

    // Show only sales in budget (surface doesn't filter out, only budget)
    transactions = transactions.filter(t => t.price <= budget);

    const modal = document.getElementById('transactions-modal');
    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    const list = document.getElementById('transactions-list');

    title.innerText = `Transactions: ${insee}`;
    const typeLabel = (window.currentPropertyType || 'all') === 'all' ? 'biens' : ((window.currentPropertyType || 'all') === 'house' ? 'maisons' : 'appartements');
    subtitle.innerText = `${transactions.length} ${typeLabel} officielles • DVF 2025`;

    modal.style.display = 'flex';

    if (transactions.length === 0) {
        list.innerHTML = `<div class="p-8 text-center text-gray-400">Aucune transaction de type "${typeLabel}" trouvée récemment dans ce quartier.</div>`;
        return;
    }

    // Sort by date desc
    const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    list.innerHTML = sorted.map(t => {
        const priceSqm = Math.round(t.price / t.sqm);
        const dateObj = new Date(t.date);
        const isMaison = t.type === 'Maison';
        const isMatch = t.price <= budget && t.sqm >= minSurface;
        const svUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${t.lat},${t.lng}`;

        return `
            <div class="bg-white p-3 rounded-xl mb-3 shadow-sm border ${isMatch ? 'border-green-400 ring-1 ring-green-400/20' : 'border-gray-100'} flex items-center justify-between hover:border-blue-200 transition-all cursor-default relative overflow-hidden">
                ${isMatch ? '<div class="absolute top-0 right-0 bg-green-500 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-bl-lg uppercase tracking-tighter shadow-sm">Match</div>' : ''}
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full ${isMaison ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'} flex items-center justify-center text-lg">
                        ${isMaison ? '🏠' : ''}
                    </div>
                    <div>
                        <div class="text-[11px] font-bold text-gray-900">${t.type} • ${t.rooms}p • ${t.sqm} m2</div>
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((t.addr || '').replace('.0 ', ' '))}" target="_blank" class="text-[9px] text-blue-500 hover:underline font-medium mb-0.5 block">📍 ${(t.addr || '').replace('.0 ', ' ')}</a>
                        <div class="text-[9px] text-gray-400 font-semibold uppercase tracking-tight">${dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </div>
                </div>
                <div class="flex flex-col items-end gap-1.5">
                    <div class="text-right">
                        <div class="text-[12px] font-extrabold text-gray-900">${new Intl.NumberFormat('fr-FR').format(t.price)} €</div>
                        <div class="text-[9px] font-bold ${isMatch ? 'text-green-600' : 'text-blue-600'}">${new Intl.NumberFormat('fr-FR').format(priceSqm)} €/m2</div>
                    </div>
                    <a href="${svUrl}" target="_blank" class="flex items-center gap-1 px-1.5 py-0.5 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-blue-600 border border-gray-200 rounded text-[8px] font-bold transition-all uppercase tracking-tighter">
                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        Street View
                    </a>
                </div>
            </div>
        `;
    }).join('');
};



window.updateFilters = updateFilters;

// --- QPV LAYER ---
let qpvLayer = null;

window.updateQPVVisibility = async () => {
    const show = document.getElementById('show-qpv').checked;

    if (show) {
        if (!qpvLayer) {
            try {
                const data = await fetch('/qpv-idf.geojson').then(r => r.json());
                qpvLayer = L.geoJSON(data, {
                    style: {
                        color: '#f97316', // Orange
                        weight: 2,
                        fillColor: '#f97316',
                        fillOpacity: 0.25,
                        dashArray: '5 5',
                        renderer: window.topRenderer
                    },
                    interactive: false,
                    pane: 'topPane'
                }).bindPopup(l => {
                    const props = l.feature.properties;
                    return `
                        <div class="p-2 min-w-[150px]">
                            <div class="text-[9px] font-black text-orange-600 uppercase tracking-tighter mb-0.5">Quartier Prioritaire (QPV)</div>
                            <div class="text-[12px] font-bold text-gray-900 mb-1">${props.nom_qp}</div>
                            <div class="text-[10px] text-gray-500">${props.commune_qp} (${props.code_insee})</div>
                        </div>
                    `;
                });
            } catch (err) {
                console.error("Failed to load QPV layer", err);
                return;
            }
        }
        // qpvLayer removal logic
    } else if (qpvLayer) {
        map.removeLayer(qpvLayer);
    }
};

// --- ZSP LAYER ---
let zspLayer = null;

window.updateZSPVisibility = async () => {
    const show = document.getElementById('show-zsp')?.checked;

    if (show) {
        if (!zspLayer) {
            try {
                const data = await fetch('/zsp.geojson').then(r => r.json());
                zspLayer = L.geoJSON(data, {
                    style: {
                        color: '#991b1b', // Dark Red
                        weight: 2,
                        fillColor: '#991b1b',
                        fillOpacity: 0.2,
                        dashArray: '3 6',
                        renderer: window.topRenderer
                    },
                    interactive: false,
                    pane: 'topPane'
                }).bindPopup(l => {
                    const props = l.feature.properties;
                    return `
                        <div class="p-2 min-w-[150px]">
                            <div class="text-[9px] font-black text-red-800 uppercase tracking-tighter mb-0.5">Zone de Sécurité Prioritaire (ZSP)</div>
                            <div class="text-[12px] font-bold text-gray-900 mb-1">${props.nom_zsp || props.nom}</div>
                            <div class="text-[10px] text-gray-500">Département: ${props.departemen || ''}</div>
                        </div>
                    `;
                });
            } catch (err) {
                console.error("Failed to load ZSP layer", err);
                return;
            }
        }
        // zspLayer removal logic
    } else if (zspLayer) {
        map.removeLayer(zspLayer);
    }
};

// --- SEARCH & AUTOCOMPLETE ---
window.searchIndex = { communes: {}, iris: [] };
window.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

function saveHistory() {
    localStorage.setItem('searchHistory', JSON.stringify(window.searchHistory.slice(0, 10)));
}

function buildSearchIndex(geojsonData) {
    const communeMap = {};
    const irisList = [];

    geojsonData.features.forEach(f => {
        const props = f.properties || {};
        const code = String(props.code || props.CODE || f.id || "");
        if (!code) return;
        const commune = getCommuneName(props, code);

        const addToCommune = (cName) => {
            if (!communeMap[cName]) {
                communeMap[cName] = {
                    name: cName,
                    codes: [],
                    bounds: L.latLngBounds([])
                };
            }
            communeMap[cName].codes.push(code);

            // Robustly extract all coordinates to compute bounds
            const getPoints = (coords) => {
                let pts = [];
                const recurse = (c) => {
                    if (Array.isArray(c[0]) && typeof c[0][0] === 'number') {
                        pts.push(...c);
                    } else {
                        c.forEach(recurse);
                    }
                };
                recurse(coords);
                return pts;
            };

            const allPoints = getPoints(f.geometry.coordinates);
            allPoints.forEach(p => {
                communeMap[cName].bounds.extend([p[1], p[0]]);
            });
        };

        addToCommune(commune);

        // Special handling for Paris Arrondissements
        if (commune === 'Paris' && code.startsWith('751')) {
            const arrNum = parseInt(code.substring(3, 5));
            if (!isNaN(arrNum)) {
                const suffix = (arrNum === 1) ? '1er' : `${arrNum}ème`;
                addToCommune(`Paris ${suffix}`);
            }
        }

        irisList.push({
            name: name,
            code: code,
            commune: commune,
            lat: f.properties.lat,
            lon: f.properties.lon
        });
    });

    window.searchIndex = {
        communes: Object.values(communeMap).sort((a, b) => a.name.localeCompare(b.name)),
        iris: irisList.sort((a, b) => a.name.localeCompare(b.name))
    };

    // Pre-index features by commune for fast hover/select
    window.featuresByCommune = {};
    geojsonData.features.forEach(f => {
        const cName = getCommuneName(f.properties, f.id);
        if (!window.featuresByCommune[cName]) window.featuresByCommune[cName] = [];
        window.featuresByCommune[cName].push(f);
    });
}

window.searchQuery = "";
window.activeCommuneName = null;
window.handleSearch = (val) => {
    window.searchQuery = val ? val.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
    const clearBtn = document.getElementById('clear-search');
    if (val) clearBtn.classList.remove('hidden');
    else clearBtn.classList.add('hidden');

    updateTopMatches();
};

window.clearSearch = () => {
    const input = document.getElementById('main-search');
    if (input) {
        input.value = '';
        window.handleSearch('');
    }
};

window.deselectCommune = () => {
    window.activeCommuneCodes = [];
    window.activeCommuneName = null;
    if (window.communeHighlightLayer) window.communeHighlightLayer.clearLayers();
    updateTopMatches();
    renderActiveLayers();
};

function getQuartierBadges(props) {
    const badges = [];
    const code = props.code;
    const node = getNearbyPoints(code, 800);
    const amenities = node.amenities || [];
    const commerces = node.commerces || [];
    const schools = node.schools || [];
    const stations = node.stations || [];
    const ips = props.ips || 0;
    const noise = props.noise || 0;
    const nature = props.nature || 0;
    const pav = props.pav || 0;

    // 1. Bobo 🎨
    const bioCount = (commerces || []).filter(c => {
        const cat = c?.properties?.category || "";
        const name = (c?.properties?.name || "").toLowerCase();
        return cat === 'bio' || cat === 'magasin bio' || name.includes('biocoop') || name.includes('naturalia') || name.includes('bio');
    }).length;
    const cultureCount = ((amenities || []).filter(a => ['cinema', 'theatre', 'library', 'culture', 'bibliothèque', 'librairie'].includes(a?.properties?.category)).length);
    const bohemianMarkers = bioCount + cultureCount;
    if (props.vibes?.bobo >= 65 && props.demo?.social_pct >= 12 && pav < 0.40 && bohemianMarkers >= 1) {
        badges.push({ icon: '🎨', text: 'Bobo', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' });
    }

    // 2. Esprit Village 🏘️
    const hasBakery = (commerces || []).some(c => c?.properties?.category === 'boulangerie' || (c?.properties?.name || "").toLowerCase().includes('boulangerie'));
    const hasMarket = (props.counts?.marche || 0) > 0;
    if (props.vibes?.village >= 60 && (hasBakery || hasMarket) && noise < 35) {
        badges.push({ icon: '🏘️', text: 'Esprit Village', color: 'bg-amber-100 text-amber-800' });
    }

    // 3. Bulle Éducative 🏫
    if (ips > 125 && schools.length >= 2) {
        badges.push({ icon: '🏫', text: 'Bulle Éducative', color: 'bg-purple-100 text-purple-800' });
    }

    // 4. Paradis des coureurs 🏃
    if (nature > 60 || !!props.near_park || !!props.is_blue) {
        badges.push({ icon: '🏃', text: 'Paradis des coureurs', color: 'bg-emerald-100 text-emerald-800' });
    }

    // 5. Patrimoine 🏛️
    if (props.vibes?.haussmann >= 65) {
        badges.push({ icon: '🏛️', text: 'Patrimoine', color: 'bg-stone-100 text-stone-700' });
    }

    // 6. Grand Paris Express ✨
    if (window.gpeStationsData) {
        const centroid = window.irisCentroids?.[props.code] || { lat: props.lat, lon: props.lon };
        const isNearGPE = window.gpeStationsData.some(s => getDistance(centroid.lat, centroid.lon, s.lat, s.lon) <= 800);
        if (isNearGPE) {
            badges.push({ icon: '✨', text: 'Grand Paris Express', color: 'bg-amber-50 text-amber-600 border-amber-100' });
        }
    }

    // 7. Cœur Culturel 🎭
    if (cultureCount >= 2 || props.vibes?.culture >= 70) {
        badges.push({ icon: '🎭', text: 'Cœur Culturel', color: 'bg-blue-50 text-blue-700 border-blue-100' });
    }

    // 8. Bords de l\'eau 🌊
    if (props.is_blue || (props.nom || "").toLowerCase().includes('marne') || (props.nom || "").toLowerCase().includes('seine')) {
        badges.push({ icon: '🌊', text: 'Bords de l\'eau', color: 'bg-cyan-50 text-cyan-700 border-cyan-100' });
    }

    // 9. City Center Persona (Local Guide Context) 🏙️
    if (window.cityCentersData && typeof turf !== 'undefined') {
        const centroid = window.irisCentroids?.[props.code] || { lat: props.lat, lon: props.lon };
        const point = turf.point([centroid.lon, centroid.lat]);
        const center = window.cityCentersData.features.find(f => turf.booleanPointInPolygon(point, f));
        if (center) {
            const p = center.properties;
            const personaColors = {
                "Hub de gare": "bg-purple-50 text-purple-700 border-purple-100",
                "Vieux Bourg": "bg-amber-50 text-amber-700 border-amber-100",
                "Grande Avenue": "bg-orange-50 text-orange-700 border-orange-100",
                "Cœur de Ville": "bg-slate-50 text-slate-700 border-slate-100"
            };
            const personaIcons = {
                "Hub de gare": "🚉",
                "Vieux Bourg": "🏛️",
                "Grande Avenue": "🛍️",
                "Cœur de Ville": "🏙️"
            };
            badges.push({
                icon: personaIcons[p.persona] || '🏙️',
                text: p.persona,
                color: personaColors[p.persona] || personaColors["Cœur de Ville"]
            });
        }
    }

    // Walking / Center Badges
    const walkMeta = window.walkingMetadata?.[props.code];
    if (walkMeta && window.lastWalkingDuration) {
        const targetName = walkMeta.targetName || "";
        let centerIcon = '';
        let centerColor = 'bg-slate-50 text-slate-700';

        if (targetName.includes('Cœur Historique')) {
            centerIcon = '🏰';
            centerColor = 'bg-amber-50 text-amber-700';
        } else if (targetName.includes('Aura')) {
            centerIcon = '✨';
            centerColor = 'bg-purple-50 text-purple-700';
        } else if (targetName.includes('Pôle')) {
            centerIcon = '🚀';
            centerColor = 'bg-blue-50 text-blue-700';
        }

        badges.push({
            icon: '🚶',
            text: `${window.lastWalkingDuration} min centre`,
            color: window.lastWalkingDuration < 10 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
        });

        badges.push({
            icon: centerIcon,
            text: targetName.split('-')[0].trim(),
            color: centerColor
        });
    }

    return badges;
}

// Global Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // CMD+K or CTRL+K to focus search
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.getElementById('main-search').focus();
    }
    // ESC to clear/blur search
    if (e.key === 'Escape') {
        const input = document.getElementById('main-search');
        if (document.activeElement === input) {
            input.blur();
            const results = document.getElementById('search-results');
            if (results) results.classList.add('hidden');
        }
    }
});
// --- SOFT MOBILITY: CYCLE & PEDESTRIAN PATHS ---
let osmPathsData = null;
let espacesVertsLayer = null;
let espacesVertsData = null;
let osmPathsLayer = null;

window.updateEspacesVertsVisibility = async () => {
    const show = document.getElementById('show-espaces-verts')?.checked || false;

    if (show) {
        if (!espacesVertsData) {
            try {
                const response = await fetch('/espaces-verts-et-boises-surfaciques-ouverts-ou-en-projets-douverture-au-public.geojson');
                if (response.ok) {
                    espacesVertsData = await response.json();
                } else {
                    espacesVertsData = await fetch('espaces-verts-et-boises-surfaciques-ouverts-ou-en-projets-douverture-au-public.geojson').then(r => r.json());
                }
            } catch (e) {
                console.error("Failed to load green spaces data", e);
                return;
            }
        }

        // Re-check after await
        if (!document.getElementById('show-espaces-verts')?.checked) return;

        if (!window.espacesVertsLayer && espacesVertsData) {
            window.espacesVertsLayer = L.geoJSON(espacesVertsData, {
                style: {
                    fillColor: '#059669',
                    fillOpacity: 0.4,
                    color: '#064e3b',
                    weight: 0.5,
                    opacity: 0.8,
                    renderer: window.natureRenderer
                },
                pane: 'naturePane',
                interactive: false
            });
        }

        if (window.espacesVertsLayer && !map.hasLayer(window.espacesVertsLayer)) {
            // espacesVertsLayer addition removed
        }
    } else {
        if (window.espacesVertsLayer && map.hasLayer(window.espacesVertsLayer)) {
            map.removeLayer(window.espacesVertsLayer);
        }
    }
};

window.updateOSMContextVisibility = async () => {
    const show = document.getElementById('show-osm-context')?.checked || false;
    const zoom = map.getZoom();

    if (show) {
        // Performance guard: only load/show at zoom >= 13
        if (zoom < 13) {
            if (window.osmContextLayer && map.hasLayer(window.osmContextLayer)) {
                map.removeLayer(window.osmContextLayer);
            }
            return;
        }

        if (!window.osmContextData) {
            try {
                const response = await fetch('osm_context.geojson');
                if (response.ok) {
                    window.osmContextData = await response.json();
                }
            } catch (e) {
                console.error("Failed to load OSM context data", e);
                return;
            }
        }

        if (!window.osmContextLayer && window.osmContextData) {
            window.osmContextLayer = L.geoJSON(window.osmContextData, {
                style: function (feature) {
                    if (feature.properties.natural === 'tree_row') {
                        return {
                            color: '#166534',
                            weight: 2,
                            opacity: 0.6,
                            dashArray: '4, 4'
                        };
                    } else if (feature.properties.natural === 'water') {
                        return {
                            fillColor: '#0ea5e9',
                            fillOpacity: 0.4,
                            color: '#0284c7',
                            weight: 0.5,
                            opacity: 0.8
                        };
                    }
                    return { color: '#ccc', weight: 1 };
                },
                pane: 'naturePane',
                renderer: window.natureRenderer,
                interactive: false
            });
        }

        if (window.osmContextLayer && !map.hasLayer(window.osmContextLayer)) {
            // osmContextLayer addition removed
        }
    } else {
        if (window.osmContextLayer && map.hasLayer(window.osmContextLayer)) {
            map.removeLayer(window.osmContextLayer);
        }
    }
};

window.updatePathsVisibility = async () => {
    const showCycle = document.getElementById('show-cycle')?.checked || false;
    const showPedestrian = document.getElementById('show-pedestrian')?.checked || false;
    const showHiking = document.getElementById('show-hiking')?.checked || false;
    const show = showCycle || showPedestrian || showHiking;

    if (show) {
        if (!osmPathsData) {
            // Using the new more complete cycling data
            osmPathsData = await fetch('/amenagements-velo-en-ile-de-france0.geojson').then(r => r.json());
        }

        if (!osmPathsLayer) {
            osmPathsLayer = L.geoJson(null, {
                style: (f) => {
                    const p = f.properties;
                    // Cycling style (main focus of the new dataset)
                    if (p.ad || p.ag || p.highway === 'cycleway') {
                        const isProtected = (p.ad && p.ad.includes('piste')) || (p.ag && p.ag.includes('piste'));
                        return {
                            color: isProtected ? '#059669' : '#10b981',
                            weight: isProtected ? 3 : 2,
                            opacity: 0.8,
                            lineCap: 'round',
                            lineJoin: 'round'
                        };
                    }

                    // Fallback for pedestrian/hiking if present in the data
                    const isHiking = p.network === 'GR' || p.category === 'hiking';
                    if (isHiking) {
                        return {
                            color: p.network === 'GR' ? '#ef4444' : '#f59e0b',
                            weight: 3,
                            opacity: 0.9,
                            lineCap: 'round',
                            lineJoin: 'round'
                        };
                    }

                    // Pedestrian
                    return { color: '#8b5cf6', weight: 1.5, opacity: 0.8, dashArray: '6, 6', lineCap: 'round', lineJoin: 'round' };
                },
                onEachFeature: (f, layer) => {
                    const p = f.properties;
                    let typeLabel = '🚲 Aménagement Vélo';
                    if (p.ad && p.ad.includes('piste')) typeLabel = '🚲 Piste Cyclable';
                    else if (p.ad && p.ad.includes('bande')) typeLabel = '🚲 Bande Cyclable';
                    else if (p.ad && p.ad.includes('voie verte')) typeLabel = '🌳 Voie Verte';
                    else if (p.highway === 'footway' || p.highway === 'pedestrian') typeLabel = '🚶 Chemin Piéton';

                    let info = `<div class="p-2">
                        <span class="text-[9px] text-gray-400 font-black uppercase tracking-tighter">${typeLabel}</span>
                        <br/><b>${p.nom_voie || p.name || 'Chemin'}</b>`;
                    if (p.ad) info += `<br/><span class="text-[9px] text-emerald-600 font-black uppercase tracking-widest">Aménagement: ${p.ad}</span>`;
                    if (p.revetement) info += `<br/><span class="text-[9px] text-purple-600 font-black uppercase tracking-widest">Revêtement: ${p.revetement}</span>`;
                    if (p.nom_com) info += `<br/><span class="text-[9px] text-gray-400 font-black uppercase tracking-widest">${p.nom_com}</span>`;
                    info += `</div>`;
                    layer.bindPopup(info);
                },
                interactive: false,
                pane: 'topPane'
            });
        }

        osmPathsLayer.clearLayers();
        const filteredFeatures = osmPathsData.features.filter(f => {
            const p = f.properties;
            const isCycle = p.ad || p.ag || p.highway === 'cycleway';
            const isPedestrian = p.highway === 'footway' || p.highway === 'pedestrian';
            const isHiking = p.network === 'GR' || p.category === 'hiking';

            if (isCycle && showCycle) return true;
            if (isPedestrian && showPedestrian) return true;
            if (isHiking && showHiking) return true;
            return false;
        });

        osmPathsLayer.addData(filteredFeatures);
        // osmPathsLayer addition removal
    }
};

// --- RESEAU VIF: VELO ILE-DE-FRANCE ---
let vifData = null;
let vifLayer = null;

window.updateVIFVisibility = async () => {
    const showVIF = document.getElementById('show-vif')?.checked || false;

    if (showVIF) {
        if (!vifData) {
            vifData = await fetch('/reseau-vif-velo-ile-de-france.geojson').then(r => r.json());
        }

        if (!vifLayer) {
            vifLayer = L.geoJson(vifData, {
                style: (f) => {
                    const status = f.properties.niveau_valid_amenag;
                    let color = '#94a3b8'; // Grey (default / Pas d'information)
                    let weight = 4;
                    let dashArray = null;

                    if (status === 'Mis en service') {
                        color = '#059669'; // Emerald 600
                        weight = 5;
                    } else if (status === 'En travaux') {
                        color = '#f59e0b'; // Amber 500
                        weight = 5;
                    } else if (status === 'À l\'étude') {
                        color = '#3b82f6'; // Blue 500
                        weight = 4;
                        dashArray = '6, 10';
                    }

                    return {
                        color,
                        weight,
                        opacity: 0.9,
                        dashArray,
                        lineCap: 'round',
                        lineJoin: 'round'
                    };
                },
                onEachFeature: (f, layer) => {
                    const p = f.properties;
                    let statusLabel = p.niveau_valid_amenag || 'Pas d\'information';
                    let typeLabel = p.type_amenag || 'Aménagement VIF';

                    let info = `<div class="p-2">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="w-2 h-2 rounded-full" style="background-color: ${layer.options.color}"></span>
                            <span class="text-[9px] text-gray-500 font-black uppercase tracking-tighter">Réseau VIF (Vélo IDF)</span>
                        </div>
                        <b class="text-sm">${typeLabel}</b>
                        <br/><span class="text-[10px] text-gray-600">Statut: <b>${statusLabel}</b></span>`;

                    if (p.numero_ligne && !p.numero_ligne.startsWith('<ul')) {
                        info += `<br/><span class="text-[10px] text-blue-600">Ligne: ${p.numero_ligne}</span>`;
                    }

                    info += `</div>`;
                    layer.bindPopup(info);
                },
                pane: 'topPane'
            });
        }

        // vifLayer addition removal
    }
};

let gpeLinesData = null;
let gpeLinesLayer = null;

window.updateGPELinesVisibility = async () => {
    const showGPE = document.getElementById('show-gpe-lines')?.checked || false;

    if (showGPE) {
        if (!gpeLinesData) {
            gpeLinesData = await fetch('/gpe_lines.geojson').then(r => r.json());
        }

        // Re-check after await
        if (!document.getElementById('show-gpe-lines')?.checked) return;

        if (!window.gpeLinesLayer) {
            window.gpeLinesLayer = L.geoJson(gpeLinesData, {
                style: (f) => {
                    const line = f.properties.line;
                    const officialColor = idfmColors[line]?.bg || f.properties.color || '#000000';
                    return {
                        color: officialColor,
                        weight: 4,
                        opacity: 0.9,
                        lineCap: 'round',
                        lineJoin: 'round'
                    };
                },
                pane: 'transitLinesPane'
            });
        }

        if (!map.hasLayer(window.gpeLinesLayer)) {
            // gpeLinesLayer addition removed
        }
    } else {
        if (window.gpeLinesLayer && map.hasLayer(window.gpeLinesLayer)) {
            map.removeLayer(window.gpeLinesLayer);
        }
    }
};

// --- TOP MATCHES & COMPARISON ---
window.topNeighborhoods = [];

function updateTopMatches() {
    if (!window.allNeighborhoods) return;

    const validIris = [];
    window.allNeighborhoods.forEach(f => {
        const insee = f.properties.code || f.id;
        const matchData = calculateMatchRate(f.properties);
        const score = matchData.total;
        const isVisible = matchData.isVisible;

        if (score >= 0 && isVisible) {
            f.properties.fillColor = getColor(score);
            validIris.push({
                feature: f,
                score: score,
                matchData: matchData,
                name: f.properties.nom || getCommuneName(f.properties),
                communeName: getCommuneName(f.properties),
                code: insee
            });
        } else {
            f.properties.fillColor = 'transparent';
        }
    });

    // Refresh MapLibre colors
    if (window.map && window.map.getSource('neighborhoods')) {
        window.map.getSource('neighborhoods').setData({ type: 'FeatureCollection', features: window.allNeighborhoods });
    }

    const sortedIris = validIris.sort((a, b) => b.score - a.score);

    // Filter by search query if present
    const filteredIris = window.searchQuery
        ? sortedIris.filter(i => (i.name + " " + i.communeName).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(window.searchQuery))
        : sortedIris;

    window.topNeighborhoods = filteredIris.slice(0, 150);

    const container = document.getElementById('sidebar-results-list');
    const content = document.getElementById('sidebar-results-content');

    const irisSignature = window.topNeighborhoods.map(i => `${i.code}-${i.score}`).join('|');
    if (window._lastIrisSignature === irisSignature) return;
    window._lastIrisSignature = irisSignature;
    // Only show ranking if no IRIS is selected
    const isIrisSelected = !!window.selectedFeatureId;
    if (content) {
        if (isIrisSelected) {
            content.classList.add('view-hidden');
        } else {
            // Only remove if not in modal mode (where prefs are shown)
            const isModal = document.getElementById('ui-panel')?.classList.contains('modal-mode');
            if (!isModal) content.classList.remove('view-hidden');
        }
    }

    if (container) {
        if (window.topNeighborhoods.length === 0) {
            container.innerHTML = '<div class="p-8 text-center text-gray-400 text-xs italic">Aucun quartier ne correspond à votre recherche ou à vos critères.</div>';
            return;
        }
        let axisHeader = '';
        if (window.activeAxisId) {
            const hubId = document.getElementById('axis-hub-selector')?.value || 'bastille';
            const axis = window.TRANSIT_AXES_CONFIG[hubId]?.find(a => a.id === window.activeAxisId);
            if (axis) {
                axisHeader = `
                    <div class="px-4 py-3 mb-4 bg-slate-900 rounded-xl text-white shadow-xl flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
                        <div class="flex items-center gap-3">
                            <div class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shadow-inner" style="background-color: ${axis.color}; color: ${axis.color === '#FFCE00' ? 'black' : 'white'}">
                                ${axis.line}
                            </div>
                            <div>
                                <div class="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Axe de transport actif</div>
                                <div class="text-[11px] font-bold leading-tight">${axis.name}</div>
                            </div>
                        </div>
                        <button onclick="document.getElementById('reset-axis-btn')?.click();" class="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                `;
            }
        }

        container.innerHTML = axisHeader + window.topNeighborhoods.map((iris, index) => {
            const color = getColor(iris.score);
            const isActive = window.selectedLayer && (window.selectedLayer.feature.properties.code === iris.code || window.selectedLayer.feature.id === iris.code);
            const activeStyles = isActive ? 'border-blue-500 ring-4 ring-blue-500/10 bg-blue-50/50 shadow-md scale-[1.02]' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-lg';

            return `
                <div id="iris-card-${iris.code}" 
                     onclick="window.selectNeighborhoodByCode('${iris.code}')" 
                     class="group p-4 mb-2 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${activeStyles}">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm" style="background-color: ${isActive ? '#3b82f6' : color}">
                            ${isActive ? '📍' : `#${index + 1}`}
                        </div>
                        <div class="min-w-0 flex-1">
                            <div class="text-[14px] font-black ${isActive ? 'text-blue-700' : 'text-slate-800'} truncate leading-tight">${cleanName(iris.name)}</div>
                            <div class="text-[10px] font-bold text-gray-400 truncate mt-0.5">${iris.communeName}</div>
                        </div>
                    </div>
                    <div class="flex flex-col items-end shrink-0 text-right">
                        <div class="text-2xl font-black leading-none" style="color: ${isActive ? '#2563eb' : color}">
                            ${iris.score}<span class="text-[10px] ml-0.5 opacity-80">%</span>
                        </div>
                        <div class="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Match</div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Removed redundant drawCityBoundaries

window.selectCity = function (communeName) {
    if (!window.geojsonLayer) return;

    // Clear previous selection immediately to avoid "two neighborhoods selected"
    if (window.deselectFeature) window.deselectFeature();

    const communeInfo = window.searchIndex ? window.searchIndex.communes.find(c => c.name === communeName) : null;

    const cityFeatures = [];
    let bestFeature = null;
    let maxScore = -1;

    // We can use either the codes from communeInfo OR just the name to find features
    const codes = communeInfo ? communeInfo.codes.map(String) : [];

    window.geojsonLayer.eachLayer(layer => {
        const props = layer.feature.properties;
        const code = String(props.code || layer.feature.id);
        const name = getCommuneName(props, layer.feature.id);

        if ((codes.length > 0 && codes.includes(code)) || (name === communeName)) {
            cityFeatures.push(layer);
            const score = calculateMatchRate(props).total;
            if (score > maxScore) {
                maxScore = score;
                bestFeature = layer;
            }
        }
    });

    window.activeCommuneCodes = cityFeatures.map(l => String(l.feature.properties.code || l.feature.id));
    window.activeCommuneName = communeName;

    // Refresh whole layer style to apply coloring focus
    if (window.geojsonLayer) window.geojsonLayer.setStyle(style);

    if (cityFeatures.length > 0) {
        // 1. Zoom to city bounds with padding for side panels
        const group = L.featureGroup(cityFeatures);
        map.fitBounds(group.getBounds(), {
            paddingTopLeft: [360, 60],
            paddingBottomRight: [360, 60],
            maxZoom: 15
        });

        // 2. Clear old boundaries & update list
        if (window.cityBoundaryLayer) window.cityBoundaryLayer.clearLayers();
        updateTopMatches(); // Force re-render of list for highlight

        // 3. Highlight selection in sidebar and scroll to it
        setTimeout(() => {
            const cardId = `city-card-${communeName.replace(/\s+/g, '-')}`;
            const card = document.getElementById(cardId);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);

        // 4. Select best neighborhood
        if (bestFeature) {
            setTimeout(() => {
                bestFeature.fire('click', { isAuto: true });
            }, 600);
        }
    }
};

window.selectNeighborhoodByCode = function (code) {
    if (!geojsonLayer) return;
    geojsonLayer.eachLayer(layer => {
        if (layer.feature.properties.code === code) {
            // Directly trigger click/selection which handles its own flyToBounds
            // This avoids the "double zoom" conflict
            layer.fire('click');
        }
    });
};

window.openComparison = function () {
    const modal = document.getElementById('comparison-modal');
    const content = document.getElementById('comparison-content');

    if (window.topNeighborhoods.length === 0) return;

    modal.classList.remove('hidden');

    content.innerHTML = window.topNeighborhoods.map(item => {
        const p = item.feature.properties;
        const fin = item.financials || {};
        const m = item.matchData;
        const color = getColor(item.score);

        const taxRate = fin.taxe_fonciere || 0;
        const taxLabel = taxRate === 0 ? 'N/D' : (taxRate < 25 ? 'Avantageuse' : taxRate < 35 ? 'Dans la moyenne' : taxRate < 45 ? 'Élevée' : 'Très élevée');
        const taxColor = taxRate === 0 ? 'bg-gray-500' : (taxRate < 25 ? 'bg-emerald-500' : taxRate < 35 ? 'bg-amber-500' : 'bg-red-500');

        return `
            <div class="flex-1 min-w-[300px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
                <div class="p-6 border-b border-gray-50 bg-gray-50/50">
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 bg-white rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest shadow-sm">IRIS ${p.code}</span>
                        <div class="text-2xl font-black" style="color: ${color}">${item.score}%</div>
                    </div>
                    <h3 class="text-lg font-black text-gray-900 leading-tight mb-1">${cleanName(p.nom)}</h3>
                    <p class="text-sm text-gray-500 font-medium">${p.commune || ''}</p>
                    
                    <div class="mt-4 flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100">
                        <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Taxe Foncière</div>
                        <div class="flex items-center gap-2">
                             ${taxRate > 0 ? `<span class="px-2 py-0.5 rounded text-[9px] font-black text-white ${taxColor}">${taxLabel}</span>` : ''}
                            <span class="text-sm font-black text-gray-900">${taxRate > 0 ? taxRate.toFixed(2) + '%' : 'N/D'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="p-6 space-y-6 flex-1">
                    <!-- Immobilier -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Immobilier</span>
                            <span class="text-xs font-bold text-gray-900">${m.categories.immo?.score || 0}%</span>
                        </div>
                        <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-emerald-500" style="width: ${m.categories.immo?.score || 0}%"></div>
                        </div>
                        <div class="mt-2 text-[10px] text-gray-500 font-medium italic">${m.categories.immo?.details?.price || ''} €/m2 est.</div>
                        <div class="mt-4">
                            ${window.renderSparkline(p.evolution)}
                        </div>
                    </div>

                    <!-- Urbanisme -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Urbanisme</span>
                            <span class="text-xs font-bold text-gray-900">${m.categories.urbanisme?.score || 0}%</span>
                        </div>
                        <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-green-500" style="width: ${m.categories.urbanisme?.score || 0}%"></div>
                        </div>
                        <div class="mt-2 flex gap-1 flex-wrap">
                            ${(p.nature > 40) ? '<span class="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[8px] font-bold uppercase tracking-tighter">Végétalisé</span>' : ''}
                            ${(p.noise < 20) ? '<span class="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[8px] font-bold uppercase tracking-tighter">Calme</span>' : ''}
                        </div>
                    </div>

                    <!-- Vie de quartier -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vie de quartier</span>
                            <span class="text-xs font-bold text-gray-900">${m.categories.vieQuartier?.score || 0}%</span>
                        </div>
                        <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-pink-500" style="width: ${m.categories.vieQuartier?.score || 0}%"></div>
                        </div>
                    </div>

                    <!-- Transports -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Transports</span>
                            <span class="text-xs font-bold text-gray-900">${m.categories.mobility?.score || 0}%</span>
                        </div>
                        <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-indigo-500" style="width: ${m.categories.mobility?.score || 0}%"></div>
                        </div>
                    </div>
                </div>

                <div class="p-4 bg-gray-50 border-t border-gray-100">
                    <button onclick="selectNeighborhoodByCode('${p.code}'); closeComparison();" class="w-full py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-lg">Voir sur la carte</button>
                </div>
            </div>
        `;
    }).join('');
};

window.closeComparison = function () {
    document.getElementById('comparison-modal').classList.add('hidden');
};

window.updateTopMatches = updateTopMatches;

// --- UTILS: SPARKLINE RENDERER ---
window.renderSparkline = function (data) {
    if (!data || data.length < 2) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = (max - min) || 1;
    const width = 160;
    const height = 20;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
    return `
        <div class="flex flex-col gap-1 my-2">
            <div class="flex justify-between items-end">
                <span class="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Évolution 5 ans</span>
                <span class="text-[9px] font-black text-blue-600">+${Math.round((data[data.length - 1] / data[0] - 1) * 100)}%</span>
            </div>
            <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="overflow-visible mt-1">
                <path d="M ${points}" fill="none" stroke="currentColor" class="text-blue-500" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="${width}" cy="${height - ((data[data.length - 1] - min) / range) * height}" r="3" class="fill-blue-600" />
            </svg>
            <div class="flex justify-between text-[7px] text-gray-300 font-bold mt-1">
                <span>2020</span>
                <span>2024</span>
            </div>
        </div>
    `;
};

window.renderHistoricalTrend = function (houseData, aptData) {
    const hData = Array.isArray(houseData) ? houseData : [];
    const aData = Array.isArray(aptData) ? aptData : [];

    if (hData.length < 2 && aData.length < 2) return '';

    const allData = [...hData, ...aData].filter(v => v !== null && !isNaN(v));
    if (allData.length === 0) return '';

    const min = Math.min(...allData);
    const max = Math.max(...allData);
    const range = (max - min) || 1;
    const width = 280;
    const height = 80;

    const getPoints = (data) => {
        if (!data || data.length < 2) return '';
        return data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
    };

    const housePoints = getPoints(hData);
    const aptPoints = getPoints(aData);

    const houseTrend = (hData.length > 0 && hData[0] !== 0) ? Math.round((hData[hData.length - 1] / hData[0] - 1) * 100) : 0;
    const aptTrend = (aData.length > 0 && aData[0] !== 0) ? Math.round((aData[aData.length - 1] / aData[0] - 1) * 100) : 0;

    return `
        <div class="flex flex-col gap-3 my-2 p-3 bg-white/40 backdrop-blur-md rounded-xl border border-white/50 shadow-xs">
            <div class="flex justify-between items-center">
                <span class="text-[8px] text-slate-500 font-black uppercase tracking-widest">Évolution 5 ans</span>
                <div class="flex gap-2">
                    ${hData.some(v => v > 0) ? `
                    <div class="flex items-center gap-1">
                        <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span class="text-[7px] font-black text-emerald-700">Maisons (${houseTrend >= 0 ? '+' : ''}${houseTrend}%)</span>
                    </div>` : ''}
                    ${aData.some(v => v > 0) ? `
                    <div class="flex items-center gap-1">
                        <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        <span class="text-[7px] font-black text-indigo-700">Apparts (${aptTrend >= 0 ? '+' : ''}${aptTrend}%)</span>
                    </div>` : ''}
                </div>
            </div>
            
            <div class="relative h-[60px] mt-1">
                <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="overflow-visible">
                    <defs>
                        <linearGradient id="grad-house" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.4" />
                            <stop offset="100%" style="stop-color:#10b981;stop-opacity:0" />
                        </linearGradient>
                        <linearGradient id="grad-apt" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.4" />
                            <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0" />
                        </linearGradient>
                    </defs>

                    <!-- Grid Lines -->
                    <line x1="0" y1="0" x2="${width}" y2="0" stroke="#f1f5f9" stroke-width="1" />
                    <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="#f1f5f9" stroke-width="1" />
                    <line x1="0" y1="${height}" x2="${width}" y2="${height}" stroke="#f1f5f9" stroke-width="1" />
                    
                    ${housePoints ? `
                        <path d="M ${housePoints}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M ${housePoints} L ${width} ${height} L 0 ${height} Z" fill="url(#grad-house)" />
                    ` : ''}
                    
                    ${aptPoints ? `
                        <path d="M ${aptPoints}" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M ${aptPoints} L ${width} ${height} L 0 ${height} Z" fill="url(#grad-apt)" />
                    ` : ''}
                </svg>
            </div>
            
            <div class="flex justify-between text-[7px] text-slate-400 font-bold uppercase tracking-tight">
                <span>2020</span>
                <span>2024</span>
            </div>
        </div>
    `;
};

window.prebuiltMarkers = {};

window.buildAllMarkersOnce = function () {
    console.log("🏗️ Building MapLibre POI Sources...");
    if (!window.pointsByInsee) return;

    const collections = {
        stations: { type: 'FeatureCollection', features: [] },
        schools: { type: 'FeatureCollection', features: [] },
        commerces: { type: 'FeatureCollection', features: [] },
        amenities: { type: 'FeatureCollection', features: [] }
    };

    const auraCollections = {
    };


    Object.entries(window.pointsByInsee).forEach(([insee, points]) => {
        ['commerces', 'amenities', 'schools', 'stations'].forEach(cat => {
            if (points[cat]) {
                points[cat].forEach(p => {
                    const lon = p.lon || p.longitude || p.geometry?.coordinates[0];
                    const lat = p.lat || p.latitude || p.geometry?.coordinates[1];
                    
                    if (lon && lat && !isNaN(lon) && !isNaN(lat)) {
                        const feature = {
                            type: 'Feature',
                            geometry: { type: 'Point', coordinates: [Number(lon), Number(lat)] },
                            properties: { ...(p.properties || p), insee }
                        };
                        collections[cat].features.push(feature);

                        // Premium markers are rendered via renderPremiumMarkers

                    }
                });
            }
        });
    });

    // Update MapLibre Sources
    Object.keys(collections).forEach(cat => {
        const source = map.getSource(cat);
        if (source) source.setData(collections[cat]);
    });

    Object.keys(auraCollections).forEach(cat => {
        const source = map.getSource(cat);
        if (source) source.setData(auraCollections[cat]);
    });

    console.log("✅ MapLibre POI Sources Ready");
};

window.premiumMarkers = { stations: [], schools: [], cityCenters: [] };

window.renderPremiumMarkers = function (type) {
    if (!window.map) return;
    
    // Clear existing premium markers for this type
    if (window.premiumMarkers[type]) {
        window.premiumMarkers[type].forEach(m => m.remove());
        window.premiumMarkers[type] = [];
    }

    const show = (type === 'cityCenters') ? document.getElementById('show-centre-ville')?.checked :
                 (type === 'stations') ? document.getElementById('show-stations')?.checked :
                 (type === 'schools') ? document.getElementById('show-schools')?.checked : false;

    if (!show) return;

    const zoom = window.map.getZoom();
    if (zoom < 11.5 && type !== 'cityCenters') return; // Don't show many markers if zoomed out

    let data = [];
    if (type === 'cityCenters') {
        data = (window.cityCentersData?.features || []).map(f => {
            const centroid = turf.centroid(f).geometry.coordinates;
            return {
                ...f.properties,
                lat: centroid[1],
                lon: centroid[0],
                icon: (f.properties.persona === 'Cœur Historique') ? '🏺' : (f.properties.persona === 'Pôle de Mobilité') ? '🚉' : '📍'
            };
        });
    } else if (type === 'stations') {
        // Get stations from window.allStationsData or buildAllMarkersOnce collections
        // For simplicity, we can use the source data
        const source = window.map.getSource('stations');
        if (source) data = source._data.features.map(f => ({ ...f.properties, lat: f.geometry.coordinates[1], lon: f.geometry.coordinates[0] }));
    } else if (type === 'schools') {
        const source = window.map.getSource('schools');
        if (source) data = source._data.features.map(f => ({ ...f.properties, lat: f.geometry.coordinates[1], lon: f.geometry.coordinates[0] }));
    }

    data.forEach(p => {
        // Only show markers in viewport for performance if it's not city centers
        if (type !== 'cityCenters') {
            const bounds = window.map.getBounds();
            if (!bounds.contains([p.lon, p.lat])) return;
        }

        const el = document.createElement('div');
        let color = '#3b82f6';
        let label = '';
        let icon = p.icon || '📍';

        if (type === 'schools') {
            color = '#f59e0b';
            const cat = (p.category || "").toLowerCase();
            if (cat.includes('maternelle')) { color = '#ec4899'; label = 'M'; }
            else if (cat.includes('élémentaire')) { color = '#10b981'; label = 'E'; }
            else if (cat.includes('collège')) { color = '#3b82f6'; label = 'C'; }
            else if (cat.includes('lycée')) { color = '#f59e0b'; label = 'L'; }
            else label = 'A';
            icon = '🏫';
        } else if (type === 'stations') {
            const lines = String(p.lines || "").split(/[,\/;]/).map(l => l.trim());
            if (lines.length > 0 && idfmColors[lines[0]]) {
                color = idfmColors[lines[0]].bg;
            }
            icon = (p.mode === 'METRO') ? '🚇' : '🚆';
            label = lines[0] || '';
        } else if (type === 'cityCenters') {
            const personaStyles = {
                "Pôle de Mobilité": '#8b5cf6',
                "Cœur Historique": '#f59e0b',
                "Axe Commerçant": '#ea580c',
                "Quartier Culturel": '#ec4899',
                "Pôle de Vie": '#10b981'
            };
            color = personaStyles[p.persona] || '#10b981';
            label = p.name || p.NOM || 'Centre';
        }

        el.className = `premium-marker pastille-${type}`;
        el.innerHTML = `
            <div class="marker-pill" style="background: ${color}; color: white; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 99px; padding: 4px 10px; display: flex; items-center gap: 6px; font-size: 11px; font-weight: 800; white-space: nowrap;">
                <span class="marker-icon">${icon}</span>
                <span class="marker-label">${label}</span>
            </div>
        `;

        const marker = new maplibregl.Marker({ element: el })
            .setLngLat([p.lon, p.lat])
            .addTo(window.map);
        
        window.premiumMarkers[type].push(marker);
    });
};


class CriteriaBuilder {
    constructor() {


        this.criteria = [];
        this._container = null;
        this.properties = {
            'type': { label: 'Type de Bien', icon: '🏠', operators: ['est'], options: ['Maison', 'Appartement'] },
            'jardin': { label: 'Jardin', icon: '🌳', operators: ['est'], options: ['Oui', 'Non'] },
            'surface': { label: 'Surface min', icon: '📏', operators: ['>'], options: ['<30m2', '30-40m2', '40-60m2', '60-80m2', '80-100m2', '100-120m2', '120m2+'] },
            'budget': { label: 'Budget max', icon: '💰', operators: ['<'], unit: '€' },
            'commute': { label: 'Trajet', icon: '🕒', operators: ['<'], unit: 'min' },
            'demo': {
                label: 'Démographie', icon: '👨‍👩‍👧‍👦', operators: ['est'], options: [
                    'Jeune & Dynamique', 'Familles & Actifs', 'Résidentiel Mature', 'Calme & Séniors'
                ]
            },
            'vibe': {

                label: 'Ambiance', icon: '✨', operators: ['est'], options: [
                    'Le Village Urbain', 'Le Standing Patrimonial', 'La Riviera (Bords de l\'Eau)',
                    'Le Coteau résidentiel', 'Le Néo-Résidentiel', 'Le Faubourg / Maison de Ville', 'Le Pavillonnaire Familial'
                ]
            }
        };

        // Add default criteria based on user preference
        setTimeout(() => {
            if (this.criteria.length === 0) {
                // 1. Maison
                this.addCriterion('type');
                this.updateCriterion(this.criteria[this.criteria.length - 1].id, 'value', 'Maison');
                
                // 2. 120m2+
                this.addCriterion('surface');
                this.updateCriterion(this.criteria[this.criteria.length - 1].id, 'value', '120m2+');

                // 3. Jardin: Oui
                this.addCriterion('jardin');
                this.updateCriterion(this.criteria[this.criteria.length - 1].id, 'value', 'Oui');

                // 4. Budget: 850,000€
                this.addCriterion('budget');
                this.updateCriterion(this.criteria[this.criteria.length - 1].id, 'value', 850000);

                // 5. Trajet: Bastille < 40 min
                this.addCriterion('commute');
                const commuteId = this.criteria[this.criteria.length - 1].id;
                this.updateCriterion(commuteId, 'workplace', 'bastille');
                this.updateCriterion(commuteId, 'value', 40);
            }
        }, 500);
    }

    addCriterion(property = 'budget') {
        const id = Date.now() + Math.random().toString(36).substr(2, 9);
        const config = this.properties[property];
        const criterion = {
            id,
            property,
            operator: config.operators[0],
            value: config.options ? config.options[0] : (property === 'budget' ? 850000 : 100)
        };

        if (property === 'commute') {
            criterion.workplace = 'bastille';
            criterion.value = 45;
        }

        this.criteria.push(criterion);
        this.render();
        window.searchCriteria = this.criteria;
        window.updateFilters();
    }

    removeCriterion(id) {
        this.criteria = this.criteria.filter(c => c.id !== id);
        this.render();
        window.searchCriteria = this.criteria;
        window.updateFilters();
    }

    updateCriterion(id, field, value) {
        const crit = this.criteria.find(c => c.id === id);
        if (crit) {
            crit[field] = value;
            if (field === 'property') {
                const config = this.properties[value];
                crit.operator = config.operators[0];
                crit.value = config.options ? config.options[0] : (value === 'budget' ? 850000 : (value === 'surface' ? 100 : 45));
                if (value === 'commute') {
                    crit.workplace = 'bastille';
                    crit.value = 45;
                }
            }

            if (crit.property === 'type' && (field === 'value' || field === 'property')) {
                window.currentPropertyType = (crit.value === 'Maison') ? 'house' : 'apt';
            }

            // Sync Garden filter with Criteria Builder
            if (crit.property === 'jardin' && (field === 'value' || field === 'property')) {
                const gardenCheckbox = document.getElementById('garden-filter');
                if (gardenCheckbox) gardenCheckbox.checked = (crit.value === 'Oui');
            }

            window.searchCriteria = this.criteria;
            window.updateFilters();
            this.render();
        }
    }

    get container() {
        if (!this._container) this._container = document.getElementById('criteria-container');
        return this._container;
    }

    render() {
        const container = this.container;
        console.log("CriteriaBuilder.render() - container:", !!container, "criteria count:", this.criteria.length);
        if (!container) return;

        const icons = {
            budget: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none"><circle cx="13" cy="13" r="7" fill="#fef08a"/><circle cx="11" cy="11" r="7" stroke="#0d1c40" stroke-width="2" fill="white"/><path d="M13 9C12 8.5 10.5 8.5 9.5 9.5C8.5 10.5 8.5 12 9.5 13" stroke="#0d1c40" stroke-width="2" stroke-linecap="round"/><path d="M8 10H11M8 12H11" stroke="#0d1c40" stroke-width="2" stroke-linecap="round"/></svg>`,
            commute: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none"><circle cx="13" cy="13" r="7" fill="#fef08a"/><circle cx="11" cy="11" r="7" stroke="#0d1c40" stroke-width="2" fill="white"/><path d="M11 7V11L13 13" stroke="#0d1c40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 2V4" stroke="#0d1c40" stroke-width="2" stroke-linecap="round"/></svg>`,
            type: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M5 11L12 4L19 11V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V11Z" fill="#fef08a" transform="translate(2, 2)"/><path d="M3 9L11 2L19 9V17C19 18.1046 18.1046 19 17 19H5C3.89543 19 3 18.1046 3 17V9Z" stroke="#0d1c40" stroke-width="2" fill="white" stroke-linejoin="round"/><path d="M8 19V13H14V19" stroke="#0d1c40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
            jardin: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M16 8C16 5.23858 13.7614 3 11 3C8.23858 3 6 5.23858 6 8C3.79086 8 2 9.79086 2 12C2 14.2091 3.79086 16 6 16H16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8Z" fill="#fef08a" transform="translate(2, 2)"/><path d="M11 21V14" stroke="#0d1c40" stroke-width="2" stroke-linecap="round"/><path d="M16 8C16 5.23858 13.7614 3 11 3C8.23858 3 6 5.23858 6 8C3.79086 8 2 9.79086 2 12C2 14.2091 3.79086 16 6 16H16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8Z" stroke="#0d1c40" stroke-width="2" fill="white" stroke-linejoin="round"/></svg>`,
            surface: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
            vibe: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
        };

        container.innerHTML = this.criteria.map((crit, idx) => {
            const config = this.properties[crit.property];
            const iconSvg = icons[crit.property] || config.icon;

            let valueDisplayHtml = '';
            if (crit.property === 'commute') {
                const availableWorkplaces = (window.activeWorkplaces && window.activeWorkplaces.length > 0)
                    ? window.activeWorkplaces
                    : [{ id: 'bastille', name: 'Bastille' }, { id: 'chatelet', name: 'Châtelet' }, { id: 'defense', name: 'La Défense' }];
                
                valueDisplayHtml = `
                    <div class="flex items-center gap-1.5 px-2.5 h-full">
                        <span class="bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-bold border border-slate-100">&lt;</span>
                        <select class="font-bold text-[#0d1c40] text-[13px] bg-transparent outline-none cursor-pointer" onchange="window.criteriaBuilder.updateCriterion('${crit.id}', 'workplace', this.value)">
                            ${availableWorkplaces.map(wp => `<option value="${wp.id}" ${crit.workplace === wp.id ? 'selected' : ''}>${wp.name || wp.id.charAt(0).toUpperCase() + wp.id.slice(1)}</option>`).join('')}
                        </select>
                        <div class="flex items-center bg-slate-50 rounded px-1.5 py-0.5 border border-slate-100 ml-0.5">
                             <input type="number" class="font-bold text-[#0d1c40] text-[13px] bg-transparent w-7 text-center outline-none" value="${crit.value}" onchange="window.criteriaBuilder.updateCriterion('${crit.id}', 'value', parseInt(this.value))">
                             <span class="text-slate-400 text-[9px] font-bold ml-1 uppercase">min</span>
                        </div>
                    </div>
                `;
            } else if (config.options) {
                valueDisplayHtml = `
                    <div class="flex items-center gap-1.5 px-2.5 h-full">
                        <span class="bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border border-slate-100">${crit.operator}</span>
                        <select class="font-bold text-[#0d1c40] text-[13px] bg-transparent outline-none cursor-pointer" onchange="window.criteriaBuilder.updateCriterion('${crit.id}', 'value', this.value)">
                            ${config.options.map(o => `<option value="${o}" ${crit.value === o ? 'selected' : ''}>${o}</option>`).join('')}
                        </select>
                    </div>
                `;
            } else {
                valueDisplayHtml = `
                    <div class="flex items-center gap-1.5 px-2.5 h-full">
                        <span class="bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-bold border border-slate-100">${crit.operator}</span>
                        <input type="number" class="font-bold text-[#0d1c40] text-[13px] bg-transparent w-16 outline-none" value="${crit.value}" onchange="window.criteriaBuilder.updateCriterion('${crit.id}', 'value', parseInt(this.value))">
                        <span class="text-slate-400 font-semibold ml-0.5 text-[11px]">${config.unit || ''}</span>
                    </div>
                `;
            }

            return `
                <div class="shrink-0 flex items-center bg-white rounded-full border border-slate-200 p-0.5 pr-2 shadow-sm h-9 animate-in fade-in zoom-in duration-300">
                    <div class="flex items-center gap-1.5 px-2.5 h-full font-semibold text-[#0d1c40] border-r border-slate-100 text-[13px]">
                        <div class="relative w-4 h-4 flex items-center justify-center">
                            ${iconSvg.replace('w-5 h-5', 'w-4 h-4')}
                        </div>
                        <select class="bg-transparent outline-none cursor-pointer font-bold" onchange="window.criteriaBuilder.updateCriterion('${crit.id}', 'property', this.value)">
                            ${Object.entries(this.properties).map(([key, p]) => `
                                <option value="${key}" ${crit.property === key ? 'selected' : ''}>${p.label}</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    ${valueDisplayHtml}

                    <button onclick="window.criteriaBuilder.removeCriterion('${crit.id}')" class="w-5 h-5 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors ml-1 border border-slate-100">
                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            `;
        }).join('');
    }
}

function evaluateCriterion(props, crit) {
    const val = crit.value;
    const insee = props.code;

    switch (crit.property) {
        case 'type':
            const pav = props.pav || 0;
            if (val === 'Maison') return pav > 0.05;
            if (val === 'Appartement') return (1 - pav) > 0.05;
            return true;
        case 'jardin':
            return val === 'Non' || (props.pav > 0.3 || (props.counts?.garden || 0) > 0);
        case 'surface':
            // Bucket-based matching
            if (!props.demo?.surface_dist) return true;
            // Does this IRIS have at least 5% of housing in the target bucket or larger?
            const buckets = ['<30m2', '30-40m2', '40-60m2', '60-80m2', '80-100m2', '100-120m2', '120m2+'];
            
            // Robust normalization for key matching
            const normalize = (s) => String(s || '').replace(/\s/g, '').replace('²', '2').replace('–', '-').replace('+', '');
            const targetLabel = normalize(val);
            const targetIdx = buckets.findIndex(b => normalize(b) === targetLabel);

            if (targetIdx === -1) return true; // Safety

            // Check all buckets from targetIdx and above
            let totalPct = 0;
            const dist = props.demo.surface_dist;
            const distKeys = Object.keys(dist);

            for (let i = targetIdx; i < buckets.length; i++) {
                const normB = normalize(buckets[i]);
                const actualKey = distKeys.find(k => normalize(k) === normB);
                const valPct = actualKey ? parseFloat(dist[actualKey]) : 0;
                totalPct += isNaN(valPct) ? 0 : valPct;
            }
            return totalPct >= 5; // Minimum 5% presence

        case 'budget':
            const typeKey = window.currentPropertyType || 'all';
            const sector = props[typeKey] || props.all || props.prices || {};
            const price = sector.price || sector.median || 5000;
            const budget = parseFloat(val) || 850000;
            // Be very permissive: if we can't find a price, don't exclude
            if (!price || price === 0) return true;
            return (budget / price) >= 15; // Lowered from 30 to 15m2 for extreme permissiveness during debug
        case 'vibe':
            return props.segment_name === val;
        case 'commute':
            const workplaceId = crit.workplace || 'bastille';
            const journey = window.precomputedJourneysRaw?.[insee]?.[workplaceId]?.main;
            if (!journey) return true;
            return journey.duration <= val;
        default:
            return true;
    }
}


// Initialize
window.criteriaBuilder = new CriteriaBuilder();
