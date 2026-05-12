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
        { icon: "🏢", title: "DGFIP", year: "2023", desc: "Fichiers Fonciers (Majic)" }
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

window.toggleSources = function(id, event) {
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
function getNearbyPoints(insee, maxDistance = 800) {
    const results = { commerces: [], amenities: [], schools: [], stations: [], sport: [], culture: [], marche: [], riviera: [] };
    if (!window.pointsByInsee || !window.irisCentroids) return results;
    if (!window.irisGrid) buildIrisGrid();
    
    const center = window.irisCentroids[insee];
    if (!center) return results;

    // Use the spatial grid to check only nearby IRIS cells
    const gx = Math.floor(center.lon * 50);
    const gy = Math.floor(center.lat * 50);
    const codesToCheck = [];
    for (let x = gx - 1; x <= gx + 1; x++) {
        for (let y = gy - 1; y <= gy + 1; y++) {
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
                    if (Math.abs(pLat - center.lat) < 0.01 && Math.abs(pLon - center.lon) < 0.015) {
                        if (getDistance(center.lat, center.lon, pLat, pLon) <= maxDistance) {
                            // Exclude OSM sport categories to avoid duplicates with official gouv database
                            const sportCats = ['tennis', 'gym', 'pool'];
                            if (key === 'amenities' && sportCats.includes(f.properties?.category)) return;
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

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const f1 = lat1 * Math.PI/180, f2 = lat2 * Math.PI/180;
    const df = (lat2-lat1) * Math.PI/180, dl = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(df/2)**2 + Math.cos(f1)*Math.cos(f2)*Math.sin(dl/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}


window.currentPropertyType = 'house';
let selectedLayer = null;
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

window.updateWalkingPath = async function(props) {
    if (!window.walkingPathsGroup) {
        window.walkingPathsGroup = L.layerGroup().addTo(window.map);
    }
    window.walkingPathsGroup.clearLayers();
    window.activeWalkingPaths = []; // Store paths for sidebar
    
    window.lastWalkingDuration = null;
    window.lastWalkingTarget = null;
    
    const startLat = props.lat;
    const startLon = props.lon;
    const targets = [];
    
    const lineStations = {}; 
    const closestCenters = {};

    // 1. All City Centers within 2.5km (deduplicated by name)
    (window.cityCentersData?.features || []).forEach(f => {
        const centroid = turf.centroid(f).geometry.coordinates;
        const dist = getDistance(startLat, startLon, centroid[1], centroid[0]);
        if (dist <= 2500) {
            const name = f.properties.name;
            if (!closestCenters[name] || dist < closestCenters[name].dist) {
                closestCenters[name] = { 
                    name, 
                    lat: centroid[1], 
                    lon: centroid[0], 
                    dist, 
                    type: 'center',
                    color: name.includes('Historique') ? '#b45309' : '#2563eb',
                    icon: '📍'
                };
            }
        }
    });
    targets.push(...Object.values(closestCenters));

    // 2. Nearby Stations within 2.5km (unique per line)
    (window.allStationsData || []).forEach(s => {
        const dist = getDistance(startLat, startLon, s.lat, s.lon);
        if (dist <= 2500) {
            // Robustly split multiple lines (e.g., "1,14" or "L/J")
            const rawLines = String(s.lines).split(/[,\/;]/).map(l => l.trim()).filter(Boolean);
            
            rawLines.forEach(rawLine => {
                const lineId = window.getLineId(rawLine);
                if (!lineId) return;

                // Keep track of the closest station for this specific line
                if (!lineStations[lineId] || dist < lineStations[lineId].dist) {
                    let transitColor = '#059669';
                    const idfm = idfmColors[lineId];
                    if (idfm) transitColor = idfm.bg;

                    lineStations[lineId] = { 
                        name: s.name, 
                        lat: s.lat, 
                        lon: s.lon, 
                        dist, 
                        type: 'station',
                        color: transitColor,
                        icon: (s.mode === 'METRO' || s.mode === 'METROPOLITAIN') ? '🚇' : (['RER', 'TRAIN', 'RER/TRAIN'].includes(s.mode) ? '🚆' : '🚋'),
                        line: lineId,
                        stationId: `${s.name}-${s.lat}-${s.lon}` // Unique key for the station itself
                    };
                }
            });
        }
    });

    // Deduplicate targets: if the same station is closest for multiple lines, we only want one itinerary
    const uniqueStationWinners = {};
    Object.values(lineStations).forEach(winner => {
        if (!uniqueStationWinners[winner.stationId] || winner.dist < uniqueStationWinners[winner.stationId].dist) {
            uniqueStationWinners[winner.stationId] = winner;
        }
    });

    targets.push(...Object.values(uniqueStationWinners));

    const activeWorkplaces = window.activeWorkplaces || [];
    const hubs = {
        'bastille': { name: 'Bastille, Paris', lat: 48.8532, lon: 2.3688, color: '#2563eb', icon: '🏢' },
        'saint-lazare': { name: 'Saint-Lazare, Paris', lat: 48.8752, lon: 2.3267, color: '#2563eb', icon: '🏢' },
        'montparnasse': { name: 'Montparnasse, Paris', lat: 48.8412, lon: 2.3200, color: '#2563eb', icon: '🏢' },
        'la-defense': { name: 'La Défense, Puteaux', lat: 48.8919, lon: 2.2381, color: '#2563eb', icon: '🏢' },
        'saclay': { name: 'Plateau de Saclay', lat: 48.7118, lon: 2.1623, color: '#2563eb', icon: '🏢' },
        'saint-denis': { name: 'Saint-Denis Pleyel', lat: 48.9205, lon: 2.3444, color: '#2563eb', icon: '🏢' },
        'bibliotheque': { name: 'Bibliothèque F. Mitterrand, Paris', lat: 48.8299, lon: 2.3768, color: '#2563eb', icon: '🏢' },
        'la-plaine': { name: 'La Plaine Saint-Denis, St-Denis', lat: 48.9066, lon: 2.3556, color: '#2563eb', icon: '🏢' }
    };

    activeWorkplaces.forEach(wp => {
        const config = hubs[wp.id];
        if (config) {
            targets.push({
                id: wp.id,
                name: config.name,
                lat: config.lat,
                lon: config.lon,
                type: 'workplace',
                color: config.color,
                icon: config.icon
            });
        }
    });

    // Sort by distance and limit to top 8 total (expanded for variety)
    targets.sort((a, b) => (a.dist || 0) - (b.dist || 0));
    const topTargets = targets.slice(0, 10);

    const labelPositions = []; // To avoid overlap
    console.log(`[DEBUG] updateWalkingPath for ${props.name}, activeAccordion: ${window.activeAccordion}`);

    for (const [idx, target] of topTargets.entries()) {
        try {
            let sections = [];
            let duration = 0;
            let tripLength = 0;
            const startLat = props.lat;
            const startLon = props.lon;
            
            // Try cache first
            const cached = window.precomputedJourneysRaw?.[props.code]?.[target.id];
                
            if (cached && cached.sections) {
                sections = cached.sections;
                duration = cached.duration;
            } else if (cached && cached.shape && !cached.itinerary) {
                // Backwards compatibility for single-shape cache (only if no itinerary to guide us)
                const type = target.type === 'workplace' ? 'transit' : 'walking';
                sections = [{ type, shape: cached.shape.filter(p => p && p[0] !== null && p[1] !== null), color: target.color }];
                duration = cached.duration;
            } else {
                if (target.type === 'workplace') {
                    const url = `https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys?from=${startLon};${startLat}&to=${target.lon};${target.lat}&data_freshness=base_schedule`;
                    const response = await fetch(url, { headers: { 'apikey': '41Yg0ZQ1MuGlIHfwEXrY0vGFhjQKngcv' } });
                    const data = await response.json();
                    
                    if (data.journeys && data.journeys.length > 0) {
                        const j = data.journeys[0];
                        duration = Math.round(j.duration / 60);
                        j.sections.forEach(s => {
                            let sectionShape = [];
                            if (s.path) {
                                sectionShape = s.path.filter(p => p.lat !== null && p.lng !== null).map(p => [p.lat, p.lng]);
                            } else if (s.type === 'street_network' && s.geojson) {
                                sectionShape = s.geojson.coordinates.filter(c => c[0] !== null && c[1] !== null).map(c => [c[1], c[0]]);
                            }
                            
                            if (sectionShape.length > 0) {
                                let type = s.type;
                                let color = '#94a3b8';
                                let code = '';
                                if (s.display_informations) {
                                    color = `#${s.display_informations.color || '2563eb'}`;
                                    code = s.display_informations.code || '';
                                    const mode = (s.display_informations.commercial_mode || s.display_informations.physical_mode || '').toLowerCase();
                                    const net = (s.display_informations.network || '').toLowerCase();
                                    if (mode.includes('rer') || net.includes('rer')) type = 'rer';
                                    else if (mode.includes('metro') || net.includes('metro')) type = 'metro';
                                    else if (mode.includes('bus') || net.includes('bus')) type = 'bus';
                                    else if (mode.includes('tram') || net.includes('tram')) type = 'tram';
                                    else if (mode.includes('train') || mode.includes('rail') || net.includes('sncf')) type = 'train';
                                }
                                sections.push({ 
                                     type, 
                                     color, 
                                     code, 
                                     shape: sectionShape,
                                     duration: Math.round((s.duration || 0) / 60)
                                 });
                            }
                        });
                    }
                } else {
                    // Walking only for centers and stations
                    const response = await fetch(`https://valhalla1.openstreetmap.de/route?json={"locations":[{"lat":${startLat},"lon":${startLon}},{"lat":${target.lat},"lon":${target.lon}}],"costing":"pedestrian"}`);
                    const data = await response.json();
                    if (data.trip && data.trip.legs) {
                        const shape = data.trip.legs[0].shape;
                        const coords = decodePolyline(shape);
                        sections = [{ type: 'walking', shape: coords, color: '#94a3b8', duration: Math.round(data.trip.summary.time / 60) }];
                        duration = Math.round(data.trip.summary.time / 60);
                        tripLength = Math.round(data.trip.summary.length * 1000);
                    }
                }
            }
            
            if (sections.length > 0) {
                const pathId = `path-${idx}`;
                const pathPolylines = [];
                const pathMarkers = [];

                const shouldBeVisible = (window.activeAccordion === 'commute' && target.type === 'workplace') ||
                                       (window.activeAccordion === 'vieQuartier' && target.type === 'center') ||
                                       ((window.activeAccordion === 'mobility' || window.activeAccordion === 'infra') && target.type === 'station');

                sections.forEach((sec, sIdx) => {
                    const isTransit = ['rer', 'metro', 'bus', 'train', 'tram'].includes(sec.type);
                    const poly = L.polyline(sec.shape, {
                        color: sec.color || target.color,
                        weight: isTransit ? 6 : 5,
                        dashArray: isTransit ? 'none' : '3, 10',
                        opacity: shouldBeVisible ? (isTransit ? 1 : 0.8) : 0,
                        lineJoin: 'round',
                        pane: 'walkingPathsPane',
                        className: `walking-path ${pathId} sec-${sIdx}`,
                        interactive: false
                    }).addTo(window.walkingPathsGroup);
                    pathPolylines.push(poly);

                    // Add icon for transit sections
                    if (isTransit && sec.code) {
                        const midIdx = Math.floor(sec.shape.length / 2);
                        const midPoint = sec.shape[midIdx];
                        const iconHtml = `<div class="transit-path-icon" style="background: ${sec.color}; border: 1.5px solid white; border-radius: 4px; padding: 2px 4px; color: white; font-size: 8px; font-weight: 900; box-shadow: 0 2px 6px rgba(0,0,0,0.2); white-space: nowrap; transform: translate(-50%, -50%); opacity: ${shouldBeVisible ? 1 : 0};">${sec.code}</div>`;
                        const iconMarker = L.marker(midPoint, {
                            icon: L.divIcon({ className: '', html: iconHtml, iconSize: [0, 0] }),
                            interactive: false,
                            pane: 'walkingPathsPane'
                        }).addTo(window.walkingPathsGroup);
                        pathMarkers.push(iconMarker);
                    }
                });

                // Add walking icon at start if walking
                if (sections[0].type === 'walking' || sections[0].type === 'street_network') {
                     const startPoint = sections[0].shape[0];
                     const walkMarker = L.marker(startPoint, {
                         icon: L.divIcon({ className: '', html: `<div class="walk-icon" style="font-size: 14px; opacity: ${shouldBeVisible ? 0.8 : 0}; transform: translate(-50%, -50%);">🚶</div>`, iconSize: [0, 0] }),
                         interactive: false,
                         pane: 'walkingPathsPane'
                     }).addTo(window.walkingPathsGroup);
                     pathMarkers.push(walkMarker);
                }

                const lastSection = sections[sections.length - 1];
                const destPoint = lastSection.shape[lastSection.shape.length - 1];

                // Store type in the polylines for later filtering if needed
                pathPolylines.forEach(p => {
                    p.pathType = target.type;
                    p.pathName = target.name;
                });

                // Add Label at Destination
                
                // Avoid simple overlap by checking previous labels
                let yOffset = -5;
                let xOffset = 0;
                for (const pos of labelPositions) {
                    const d = getDistance(destPoint[0], destPoint[1], pos[0], pos[1]);
                    if (d < 50) { // If too close in meters (approx)
                        yOffset -= 25; // Stack vertically
                    }
                }
                labelPositions.push(destPoint);

                const distanceMeters = Math.round(tripLength || getDistance(startLat, startLon, target.lat, target.lon));

                const labelIcon = L.divIcon({
                    className: '', // Clear default Leaflet icon styles to prevent clipping
                    html: `<div style="position: relative; overflow: visible; width: 0; height: 0;">
                             <div class="path-label ${pathId}-label" style="background: ${target.color}; color: white; padding: 5px 14px; border-radius: 20px; font-size: 10px; font-weight: 800; white-space: nowrap; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; flex-direction: column; line-height: 1.1; position: absolute; transform: translate(12px, -50%); margin-top: ${yOffset}px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); opacity: ${(shouldBeVisible && map.getZoom() >= 14) ? 1 : 0}; width: fit-content; min-width: max-content; pointer-events: none; overflow: visible !important;">
                               <span style="font-size: 7px; opacity: 0.9; text-transform: uppercase; font-weight: 900; letter-spacing: 0.05em; margin-bottom: 2px; display: block;">${target.name}</span>
                               <span style="display: block;">${duration} min <span style="opacity: 0.7; font-weight: 400;">(${distanceMeters}m)</span></span>
                             </div>
                           </div>`,
                    iconSize: [0, 0],
                    iconAnchor: [0, 0]
                });
                
                const marker = L.marker(destPoint, { 
                    icon: labelIcon, 
                    interactive: false,
                    pane: 'walkingPathsPane'
                }).addTo(window.walkingPathsGroup);

                // Wait for marker to be added to DOM to find the label element
                // Actually, we can find it by class once it's rendered, but better to do it lazily in highlightPath or store it here.
                // Since markers are added to a layerGroup, they might not have an element yet.

                window.activeWalkingPaths.push({
                    id: pathId,
                    name: target.name,
                    type: target.type,
                    icon: target.icon,
                    duration,
                    distance: distanceMeters,
                    color: target.color,
                    polylines: pathPolylines,
                    markers: pathMarkers,
                    destMarker: marker
                });

                // If it's the primary center, update the info panel
                if (target.type === 'center' && !window.lastWalkingDuration) {
                     window.lastWalkingDuration = duration;
                     window.lastWalkingTarget = target.name;
                }

            }
        } catch (e) { console.error("Path error:", e); }
    }
    
    // Update the sidebar ONCE after all paths are loaded/processed
    if (selectedLayer && (selectedLayer.feature.id || selectedLayer.feature.properties.code) === props.code) {
        info.update(props, true);
    }

    // Ensure the paths match the current contextual category
    if (window.activeAccordion && window.highlightAllWalkingPaths) {
        if (window.activeAccordion === 'commute') window.highlightAllWalkingPaths(true, 'workplace');
        else if (window.activeAccordion === 'vieQuartier') window.highlightAllWalkingPaths(true, 'center');
        else if (window.activeAccordion === 'mobility' || window.activeAccordion === 'infra') window.highlightAllWalkingPaths(true, 'station');
        else window.highlightAllWalkingPaths(false);
    }
};

window.highlightPath = function(pathId, highlight, pathObj = null) {
    if (!pathObj) {
        pathObj = window.activeWalkingPaths?.find(p => p.id === pathId);
    }
    if (!pathObj) return;
    
    if (highlight) {
        if (pathObj.polylines) {
            pathObj.polylines.forEach(p => p.setStyle({ opacity: 1 }));
        }
        if (pathObj.markers) {
            pathObj.markers.forEach(m => {
                const el = m.getElement();
                if (el) {
                    const icon = el.querySelector('.transit-path-icon, .walk-icon');
                    if (icon) icon.style.opacity = '1';
                }
            });
        }
        if (pathObj.destMarker) {
            if (!pathObj.labelEl) {
                pathObj.labelEl = document.querySelector(`.${pathId}-label`);
            }
            const label = pathObj.labelEl;
            if (label) {
                label.style.opacity = '1';
                label.style.transform = 'translate(12px, -50%) scale(1.1)';
                label.style.zIndex = '1000';
                label.style.boxShadow = `0 8px 24px ${pathObj.color}44`;
            }
        }
    } else {
        if (pathObj.polylines) {
            pathObj.polylines.forEach(p => p.setStyle({ opacity: 0 }));
        }
        if (pathObj.markers) {
            pathObj.markers.forEach(m => {
                const el = m.getElement();
                if (el) {
                    const icon = el.querySelector('.transit-path-icon, .walk-icon');
                    if (icon) icon.style.opacity = '0';
                }
            });
        }
        if (pathObj.destMarker) {
            if (!pathObj.labelEl) {
                pathObj.labelEl = document.querySelector(`.${pathId}-label`);
            }
            const label = pathObj.labelEl;
            if (label) {
                label.style.opacity = '0';
                label.style.transform = 'translate(12px, -50%) scale(1)';
                label.style.zIndex = 'auto';
                label.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            }
        }
    }
};

window.updateWalkingLabelsZoom = function() {
    if (!window.walkingPathsGroup) return;
    const zoom = window.map.getZoom();
    const isHighZoom = zoom >= 14;
    
    document.querySelectorAll('.path-label > div').forEach(el => {
        el.style.opacity = isHighZoom ? '1' : '0';
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

window.toggleScoreFilter = function(filter) {
    window.activeScoreFilters[filter] = !window.activeScoreFilters[filter];
    const el = document.getElementById(`filter-${filter}`);
    if (el) el.style.opacity = window.activeScoreFilters[filter] ? '1' : '0.2';
    window.updateFilters();
};


window.selectedVibes = [];

document.addEventListener('DOMContentLoaded', () => {
    // Show modal on load
    const backdrop = document.getElementById('preferences-backdrop');
    const panel = document.getElementById('ui-panel');
    if (backdrop && panel) {
        setTimeout(() => {
            backdrop.classList.add('visible');
            panel.classList.add('visible');
        }, 500);
    }

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

window.initAxisExplorer = function() {
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

window.precomputeAxisMembership = function() {
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

window.selectTransitAxis = function(axisId) {
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

window.zoomToActiveAxis = function() {
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

window.openPreferencesModal = function() {
    const backdrop = document.getElementById('preferences-backdrop');
    const panel = document.getElementById('ui-panel');
    
    if (backdrop && panel) {
        panel.classList.add('modal-mode');
        // Small delay to ensure display: block is set before opacity transition
        setTimeout(() => {
            backdrop.classList.add('visible');
            panel.classList.add('visible');
        }, 10);
    }
};

window.closePreferencesModal = function() {
    const backdrop = document.getElementById('preferences-backdrop');
    const panel = document.getElementById('ui-panel');
    
    if (backdrop && panel) {
        backdrop.classList.remove('visible');
        panel.classList.remove('visible');
        
        // After animation, move panel back to sidebar mode
        setTimeout(() => {
            panel.classList.remove('modal-mode');
            window.updateFilters();
            
            if (window.isFirstSearch) {
                window.isFirstSearch = false;
            }
        }, 600);
    }
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
window.activeWorkplaces = [
    { 
        id: 'bastille', 
        limit: 45, 
        walkLimit: 15, 
        modes: ['metro', 'rer', 'train'] 
    }
];

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
    `;}).join('');
};

// --- MAP INIT ---
const map = L.map('map', {
    zoomControl: false,
    preferCanvas: true
}).setView([48.861, 2.443], 12);

map.createPane('naturePane');
map.getPane('naturePane').style.zIndex = 350;
map.getPane('naturePane').style.pointerEvents = 'none';

map.createPane('neighborhoods');
map.getPane('neighborhoods').style.zIndex = 400;

map.createPane('cityCentersPane');
map.getPane('cityCentersPane').style.zIndex = 402;
map.getPane('cityCentersPane').style.pointerEvents = 'none'; // Restore to allow clicking layers underneath

map.createPane('transitLinesPane');
map.getPane('transitLinesPane').style.zIndex = 405;
map.getPane('transitLinesPane').style.pointerEvents = 'none';

map.createPane('poiPane');
map.getPane('poiPane').style.zIndex = 650;

map.createPane('noisePane');
map.getPane('noisePane').style.zIndex = 460;
map.getPane('noisePane').style.pointerEvents = 'none';

map.createPane('topPane');
map.getPane('topPane').style.zIndex = 650;

map.on('click', () => {
    document.querySelectorAll('.city-center-marker-container.active').forEach(c => c.classList.remove('active'));
}); 
map.getPane('topPane').style.pointerEvents = 'none';
map.createPane('walkingPathsPane');
map.getPane('walkingPathsPane').style.zIndex = 800;
map.getPane('walkingPathsPane').style.pointerEvents = 'none';

window.map = map;
window.hoverCityLayer = L.layerGroup().addTo(map);

window.visibleInseeCache = [];
function updateVisibleInseeCache() {
    if (!window.map || !window.geojsonLayer) return;
    const bounds = window.map.getBounds();
    const visible = [];
    window.geojsonLayer.eachLayer(layer => {
        if (bounds.intersects(layer.getBounds())) {
            visible.push(layer.feature.properties.code || layer.feature.id);
        }
    });
    window.visibleInseeCache = visible;
    console.log("📍 Updated visible IRIS cache:", visible.length);
}

map.on('moveend', () => {
    updateVisibleInseeCache();
    if (window.renderActiveLayers) window.renderActiveLayers();
});
map.on('zoomend', () => {
    updateVisibleInseeCache();
    if (window.renderActiveLayers) window.renderActiveLayers();
});
// Initial update
setTimeout(updateVisibleInseeCache, 1000);

const lightLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community',
    maxZoom: 19
});

window.toggleSatelliteView = function (isSatellite) {
    if (isSatellite) {
        map.removeLayer(lightLayer);
        map.addLayer(satelliteLayer);
        satelliteLayer.bringToBack();
    } else {
        map.removeLayer(satelliteLayer);
        map.addLayer(lightLayer);
        lightLayer.bringToBack();
    }
};

// --- INFO BOX (Stand-alone div for robust event handling) ---
const info = {};
const infoDiv = document.getElementById('info-card');

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
        // If a selection is active, we only accept 'sticky' updates (like accordion clicks)
        if (selectedLayer && !isSticky) return;
        
        if (!props || !props.nom) {
            if (selectedLayer) return;
            infoDiv.classList.remove('visible');
            infoDiv.classList.remove('sticky-box');
            return;
        }

    infoDiv.classList.add('visible');
    
    if (isSticky) {
        infoDiv.classList.add('sticky-box');
    } else {
        infoDiv.classList.remove('sticky-box');
    }

    const matchData = calculateMatchRate(props);
    const matchRate = matchData?.total || 0;
    const matchColor = matchRate > 85 ? 'text-emerald-600' : (matchRate > 70 ? 'text-green-500' : (matchRate > 50 ? 'text-lime-500' : (matchRate > 30 ? 'text-yellow-500' : (matchRate > 15 ? 'text-orange-500' : 'text-red-500'))));
    
    let html = `
        <div class="flex flex-col h-full bg-white overflow-hidden rounded-t-2xl">
            ${isSticky ? `
            <div class="flex-shrink-0 flex items-center justify-between bg-slate-900 text-white px-5 py-3 gap-4">
                 <div class="flex flex-col">
                    <span class="text-[13px] font-bold text-white leading-tight">${cleanName(props.nom)}</span>
                    <span class="text-[9px] opacity-70 uppercase tracking-tighter">Code #${props.code}</span>
                 </div>
                 <button onclick="deselectFeature()" class="p-2 hover:bg-white/10 rounded-lg transition-all text-white">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                 </button>
            </div>` : `
            <div class="flex-shrink-0 p-3 bg-white border-b border-gray-100">
                <h4 class="text-[14px] font-bold text-gray-900 leading-tight">${cleanName(props.nom)}</h4>
                <div class="text-[9px] text-gray-400 mt-0.5 italic">Survoler pour voir les détails.</div>
            </div>`}
            
            <!-- Global Match Score - More Compact -->
            <div class="flex-shrink-0 px-5 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="text-3xl font-black ${matchData.excluded ? 'text-gray-300' : matchColor}">${matchRate}%</div>
                    <div class="text-[10px] font-black ${matchData.excluded ? 'bg-gray-100 text-gray-400' : matchColor.replace('text-', 'bg-').replace('600', '100').replace('500', '100') + ' ' + matchColor} px-2 py-0.5 rounded-md">
                        ${matchData.excluded ? 'Exclu' : (matchRate > 85 ? 'Idéal' : (matchRate > 65 ? 'Favorable' : (matchRate > 40 ? 'Passable' : 'Faible')))}
                    </div>
                </div>
                <div class="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em]">Bonheur</div>
            </div>

            <!-- Badges - More Compact -->
            <div id="quartier-badges" class="flex-shrink-0 px-5 py-2 flex flex-wrap gap-1.5 border-b border-gray-100 bg-white">
                ${getQuartierBadges(props).map(b => `
                    <span class="inline-flex items-center px-2 py-0.5 rounded-md ${b.color} text-[9px] font-bold border border-black/5 shadow-sm">
                        <span>${b.text}</span>
                    </span>
                `).join('')}
            </div>
            
            <!-- Dual Scroll Body -->
            <div class="flex-1 flex flex-col min-h-0">
                
                <!-- Sections: Reorganized Categories -->
                <div class="flex-1 overflow-y-auto">
                    <div class="flex flex-col pb-6">
                        ${(() => {
                            const sectionMapping = [
                                {
                                    title: "Périmètre de recherche",
                                    icon: "🎯",
                                    ids: ["immo", "commute"]
                                },
                                {
                                    title: "Comprendre le quartier",
                                    icon: "🧭",
                                    ids: ["mobility", "urbanisme", "vieQuartier", "socio", "demo"]
                                },
                                {
                                    title: `À propos de ${props.commune || 'la ville'}`,
                                    icon: "🏛️",
                                    ids: ["finances", "safety", "infra", "education"]
                                }
                            ];

                            return sectionMapping.map(section => `
                                <div class="flex-shrink-0 px-5 py-2 bg-slate-50/80 border-b border-gray-100 mt-2 first:mt-0">
                                    <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <span>${section.icon}</span> ${section.title}
                                    </div>
                                </div>
                                ${section.ids.map(id => {
                                    const cat = matchData.categories[id];
                                    if (!cat || !cat.label || cat.isHidden) return '';
                                    const isOpen = window.activeAccordion === id;
                                    const prefDropdown = document.getElementById('pref-' + id);
                                    const hasPref = !!prefDropdown;
                                    const prefValue = prefDropdown?.value;

                                    let prefColor = "text-slate-400";
                                    if (hasPref && prefValue) {
                                        const prefIdx = cat.scale.indexOf(prefValue);
                                        const diff = Math.abs(cat.scaleIndex - prefIdx);
                                        prefColor = diff === 0 ? "text-emerald-500" : (diff === 1 ? "text-yellow-500" : "text-red-500");
                                    } else if (id === 'immo') {
                                        prefColor = cat.score > 70 ? "text-emerald-500" : (cat.score > 40 ? "text-yellow-500" : "text-red-500");
                                    } else if (id === 'mobility') {
                                        const mobilityColors = {
                                            "Loin des gares": "text-red-500", "Connecté": "text-orange-400",
                                            "Sur le métro": "text-green-500", "Hub hyper-centre": "text-emerald-600"
                                        };
                                        prefColor = mobilityColors[cat.appreciation] || "text-slate-400";
                                    } else if (id === 'commute') {
                                        const commuteColors = {
                                            "Pénible": "text-red-500", "Moyen": "text-orange-400",
                                            "Confortable": "text-green-500", "Idéal": "text-emerald-600"
                                        };
                                        prefColor = commuteColors[cat.appreciation] || "text-slate-400";
                                    } else {
                                        prefColor = cat.score > 80 ? "text-emerald-400" : (cat.score > 50 ? "text-yellow-400" : "text-slate-300");
                                    }

                                    return `
                                    <div class="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors sources-container relative">
                                        <button onclick="window.toggleAccordion('${id}')" class="w-full flex items-center justify-between px-5 py-2.5 text-left">
                                            <div class="flex items-center gap-3">
                                                <div class="w-6 flex justify-center flex-shrink-0 text-base">${cat.icon}</div>
                                                <div class="flex flex-col">
                                                    <div class="text-[11px] font-bold text-gray-800 leading-tight">${cat.label}</div>
                                                    <div class="text-[9px] font-bold ${prefColor}">${cat.appreciation}</div>
                                                </div>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <div class="flex items-center gap-1 px-2 py-0.5 bg-gray-50 rounded-full border border-gray-100">
                                                    ${cat.isCustomScale ? `
                                                        <span class="text-[8px] font-black ${prefColor} tracking-tighter">${cat.score}% match</span>
                                                    ` : cat.scale.map((stepName, idx) => {
                                                        const isActive = idx === cat.scaleIndex;
                                                        const dotColor = isActive ? prefColor.replace('text-', 'bg-') : 'bg-gray-200';
                                                        return `<div class="w-1 h-1 rounded-full ${dotColor}"></div>`;
                                                    }).join('')}
                                                </div>
                                                <svg class="w-3 h-3 text-gray-300 transform transition-transform ${isOpen ? 'rotate-180 text-blue-500' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                            </div>
                                        </button>
                                        
                                        ${isOpen ? `
                                        <div class="absolute top-2.5 right-12 z-20">
                                            <button onclick="window.toggleSources('${id}', event)" class="sources-trigger flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-blue-200 bg-blue-50/50 text-[8px] font-bold text-blue-600 hover:bg-blue-100 transition-all shadow-sm">
                                                Sources <svg class="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                            </button>
                                            <div id="sources-dropdown-${id}" class="sources-dropdown hidden absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">Sources de données</div>
                                                <div class="space-y-4">
                                                    ${(CATEGORY_SOURCES[id] || []).map(s => `
                                                        <div class="flex gap-3">
                                                            <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm shrink-0 shadow-inner">${s.icon}</div>
                                                            <div class="flex flex-col">
                                                                <div class="flex items-center gap-1.5">
                                                                    <span class="text-[10px] font-black text-slate-800">${s.title}</span>
                                                                    <span class="text-[9px] text-slate-400 font-bold">(${s.year})</span>
                                                                </div>
                                                                <span class="text-[9px] text-slate-500 leading-tight mt-0.5">${s.desc}</span>
                                                            </div>
                                                        </div>
                                                    `).join('')}
                                                </div>
                                            </div>
                                        </div>` : ''}

                                        ${isOpen ? `<div class="px-5 pb-4 text-[10px] text-gray-600 animate-in fade-in slide-in-from-top-2 duration-200">${renderCategoryDetails(id, props, cat, matchData)}</div>` : ''}
                                    </div>`;
                                }).join('')}
                            `).join('');
                        })()}
                    </div>
                </div>

            </div>
        </div>
`;
    infoDiv.innerHTML = html;
    } catch (err) {
        console.error("Error updating info box:", err);
        infoDiv.innerHTML = `
            <div class="p-6 text-center">
                <div class="text-red-500 mb-2">⚠️ Erreur d'affichage</div>
                <div class="text-[10px] text-gray-500">Impossible de charger les détails de ce quartier.</div>
            </div>
        `;
        infoDiv.classList.add('visible');
    }
};

window.activeAccordion = 'urbanisme'; // Default open to Urbanisme

window.highlightAllWalkingPaths = function(visible, filterType = null) {
    if (!window.activeWalkingPaths) return;
    
    // Determine the relevant type for the current accordion if none provided
    let effectiveFilterType = filterType;
    if (!effectiveFilterType && visible) {
        if (window.activeAccordion === 'commute') effectiveFilterType = 'workplace';
        else if (window.activeAccordion === 'vieQuartier') effectiveFilterType = 'center';
        else if (window.activeAccordion === 'mobility' || window.activeAccordion === 'infra') effectiveFilterType = 'station';
    }

    window.activeWalkingPaths.forEach(path => {
        let show = visible;
        if (effectiveFilterType) {
            show = visible && (path.type === effectiveFilterType);
        }
        window.highlightPath(path.id, show, path);
    });
};

window.highlightPathByName = function(name) {
    if (!window.activeWalkingPaths) return;
    
    if (!name) {
        // Use the new smart filtering
        window.highlightAllWalkingPaths(true);
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

window.updateContextualMap = function(categoryId) {
    // 1. Define category to layer mappings
    const mappings = {
        'immo': { 
            checks: { 'show-transactions': true },
            pills: ['pill-group-immo', 'pill-group-maps'] 
        },
        'mobility': { 
            checks: { 'group-mobilite': true },
            pills: ['pill-group-mobility'] 
        },
        'commute': { 
            checks: {}, // Special handling for walk paths
            pills: ['pill-group-mobility'] 
        },
        'urbanisme': { 
            checks: { 'show-espaces-verts': true, 'show-osm-context': true },
            pills: ['pill-group-maps'] 
        },
        'vieQuartier': { 
            checks: { 'group-commerces': true, 'group-sorties': true, 'group-sante': true, 'show-centre-ville': true },
            pills: ['pill-group-commerces', 'pill-group-sorties', 'pill-group-sante', 'pill-group-maps'] 
        },
        'infra': { 
            checks: { 'group-infra': true },
            pills: ['pill-group-infra'] 
        },
        'education': { 
            checks: { 'show-schools': true },
            pills: ['pill-group-infra'] 
        },
        'safety': { 
            checks: { 'show-qpv': true, 'show-zsp': true },
            pills: ['pill-group-maps'] 
        }
    };

    if (categoryId && mappings[categoryId]) {
        // 1. Reset ALL contextual layers first (Batch mode - no events)
        Object.keys(mappings).forEach(catId => {
            const config = mappings[catId];
            if (config.checks) {
                Object.keys(config.checks).forEach(id => {
                    const el = document.getElementById(id);
                    if (el && el.checked) {
                        el.checked = false;
                        // Special: Uncheck sub-items if it's a group
                        if (id.startsWith('group-')) {
                            const gid = id.replace('group-', '');
                            document.querySelectorAll(`.sub-${gid}`).forEach(sub => sub.checked = false);
                        }
                    }
                });
            }
        });

        const allowedPills = mappings[categoryId].pills || [];
        allPillGroups.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (allowedPills.includes(id)) el.classList.remove('pill-group-hidden');
                else el.classList.add('pill-group-hidden');
            }
        });

        // 2. Apply new states for current category (Batch mode - no events)
        const config = mappings[categoryId];
        if (config.checks) {
            for (const [id, state] of Object.entries(config.checks)) {
                const el = document.getElementById(id);
                if (el) {
                    el.checked = state;
                    // Special: Check sub-items if it's a group
                    if (id.startsWith('group-') && state) {
                        const gid = id.replace('group-', '');
                        document.querySelectorAll(`.sub-${gid}`).forEach(sub => sub.checked = true);
                    }
                }
            }
        }

        // 3. Trigger Global Map Updates ONCE
        window.renderActiveLayers(); // Handles stations, schools, commerces, loisirs, etc.
        if (window.updateTransactionsVisibility) window.updateTransactionsVisibility();
        if (window.updateOSMContextVisibility) window.updateOSMContextVisibility();
        if (window.updateQPVVisibility) window.updateQPVVisibility();
        if (window.updateZSPVisibility) window.updateZSPVisibility();
        if (window.updateEspacesVertsVisibility) window.updateEspacesVertsVisibility();
        if (window.updateNoiseVisibility) window.updateNoiseVisibility();
        if (window.updatePathsVisibility) window.updatePathsVisibility();
        if (window.updatePediatresVisibility) window.updatePediatresVisibility();
        
        // 4. Special: Walking Paths filtering
        if (categoryId === 'commute') {
            window.highlightAllWalkingPaths(true, 'workplace');
        } else if (categoryId === 'vieQuartier') {
            window.highlightAllWalkingPaths(true, 'center');
        } else if (categoryId === 'mobility' || categoryId === 'infra') {
            window.highlightAllWalkingPaths(true, 'station');
        } else {
            window.highlightAllWalkingPaths(false);
        }
    } else {
        // Reset: show all pills
        allPillGroups.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('pill-group-hidden');
        });
        window.highlightAllWalkingPaths(false);
    }
    
    // Refresh IRIS style (for the zoom check)
    if (window.geojsonLayer) {
        window.geojsonLayer.setStyle(style);
    }
};

window.toggleAccordion = function(id) {
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
    if (selectedLayer) {
        info.update(selectedLayer.feature.properties, true);
        
        // Restore scroll position after a short delay to allow DOM update
        setTimeout(() => {
            const newBody = document.querySelector('.info-body');
            if (newBody) newBody.scrollTop = scrollPos;
        }, 0);
    }
};

function renderCategoryDetails(id, props, cat, matchData) {
    const budget = parseInt(document.getElementById('budget-input')?.value || 850000);
    const segment = props[window.currentPropertyType || 'all'] || props.all || { price: 5000, vol: 0 };

    switch(id) {
        case 'immo':
            const evolutionH = props.evolution || [];
            const vol = segment?.vol || 0;
            const liquidity = Math.min(100, vol * 15);
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
                            <span class="text-[14px] font-black text-gray-900">${new Intl.NumberFormat('fr-FR').format(segment?.price || 0)} €/m²</span>
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
                                    <span class="text-[8px] text-gray-400 font-medium">Taille idéale visée : ${Math.round(budget / (segment?.price || 1))} m²</span>
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
                                    <span class="text-[8px] text-gray-400 font-medium">${vol} transactions / an</span>
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
                                const bValues = { "<30m²": 20, "30-40m²": 35, "40-60m²": 50, "60-80m²": 70, "80-100m²": 90, "100-120m²": 110, "120m²+": 140 };
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

        case 'commute': {
            let html = `<div class="px-4 pb-4 space-y-2 mt-1">`;
            const activeHubs = window.activeWorkplaces || [];
            activeHubs.forEach(wp => {
                const cached = window.precomputedJourneysRaw?.[props.code]?.[wp.id];
                if (cached) {
                    const hubNames = { 
                        'bastille': 'Bastille, Paris', 
                        'saint-lazare': 'Saint-Lazare, Paris',
                        'montparnasse': 'Montparnasse, Paris',
                        'la-defense': 'La Défense, Puteaux',
                        'saclay': 'Plateau de Saclay',
                        'saint-denis': 'Saint-Denis Pleyel'
                    };
                    const hubName = hubNames[wp.id] || wp.id;
                    const isOverLimit = cached.duration > wp.limit;
                    
                    // Support both old 'itinerary' and new 'sections' format
                    let breakdown = [];
                    let firstMile = 0;
                    let lastMile = 0;

                    if (cached.sections) {
                        breakdown = cached.sections.filter(s => s.code || ['rer','metro','bus','tram','train'].includes(s.type));
                        // In sections, walking are also sections. Sum durations.
                        firstMile = (cached.sections[0].type === 'walking' || cached.sections[0].type === 'street_network') ? cached.sections[0].duration : 0;
                        lastMile = (cached.sections[cached.sections.length-1].type === 'walking' || cached.sections[cached.sections.length-1].type === 'street_network') ? cached.sections[cached.sections.length-1].duration : 0;
                    } else if (cached.itinerary) {
                        breakdown = cached.itinerary;
                        firstMile = cached.firstMile || 0;
                        lastMile = cached.lastMile || 0;
                    }

                    const stationName = breakdown.length > 0 ? breakdown[0].name || breakdown[0].code : '';

                    html += `
                    <div onmouseover="window.highlightPathByName('${hubName}')" 
                         onmouseout="window.highlightPathByName(null)"
                         class="bg-white p-2 rounded-lg border ${isOverLimit ? 'border-red-100 bg-red-50/20' : 'border-gray-100'} shadow-xs hover:border-blue-300 transition-all cursor-pointer">
                        <div class="flex items-center justify-between mb-1.5">
                            <span class="text-[9px] text-gray-700 font-bold uppercase truncate max-w-[120px]">${hubName}</span>
                            <span class="text-[9px] font-extrabold px-1.5 py-0.5 ${isOverLimit ? 'bg-red-500' : 'bg-blue-600'} text-white rounded-full shadow-sm">~${cached.duration} min</span>
                        </div>`;

                    if (breakdown.length > 0 || firstMile > 0 || lastMile > 0) {
                        html += `<div class="flex items-center flex-wrap gap-1 mt-1">`;
                        if (firstMile > 0) html += `<span class="text-[8px] bg-gray-100 px-1 rounded flex items-center gap-0.5">🏃 ${firstMile} min</span>`;
                        if (firstMile > 0 && breakdown.length > 0) html += `<span class="text-[7px] text-gray-300">→</span>`;

                        breakdown.forEach((step, idx) => {
                            const type = (step.type || "").toLowerCase();
                            const isCircle = type === "metro" || type === "rer" || type === "train";
                            const color = step.color.startsWith('#') ? step.color : `#${step.color}`;
                            const textColor = step.textColor ? (step.textColor.startsWith('#') ? step.textColor : `#${step.textColor}`) : '#ffffff';
                            
                            // Handle duration: if > 60, it's likely seconds, convert to minutes.
                            let stepDuration = step.duration || 0;
                            if (stepDuration > 60) stepDuration = Math.round(stepDuration / 60);
                            
                            html += `
                                <div class="flex items-center gap-1 group relative">
                                    <div class="flex items-center gap-0.5">
                                        <span class="flex items-center justify-center font-bold text-[7px] shadow-xs border border-black/10" 
                                              style="width:13px; height:13px; border-radius: ${isCircle ? '50%' : '2px'}; color: ${textColor}; background-color: ${color};">
                                            ${step.code}
                                        </span>
                                        <span class="text-[7px] text-gray-400 font-medium">${stepDuration ? stepDuration + ' min' : ''}</span>
                                    </div>
                                </div>`;
                            if (idx < breakdown.length - 1) html += `<span class="text-[7px] text-gray-300">→</span>`;
                        });

                        if (lastMile > 0 && breakdown.length > 0) html += `<span class="text-[7px] text-gray-300">→</span>`;
                        if (lastMile > 0) html += `<span class="text-[8px] bg-gray-100 px-1 rounded flex items-center gap-0.5">🏃 ${lastMile} min</span>`;

                        html += `</div>`;
                    }
                    html += `</div>`;
                }
            });
            html += `</div>`;
            return html;
        }
        case 'mobility': {
            let html = `<div class="px-4 pb-4 space-y-3 mt-1">`;
            const centroid = window.irisCentroids?.[props.code] || { lat: props.lat, lon: props.lon };
            
            // Nearby Stations (Metro, RER, Train)
            const nearby = (window.allStationsData || [])
                .map(s => ({ ...s, dist: getDistance(centroid.lat, centroid.lon, s.lat, s.lon) }))
                .filter(s => s.dist < 800)
                .sort((a, b) => a.dist - b.dist);

            if (nearby.length > 0) {
                html += `
                <div class="space-y-1.5">
                    <div class="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-2">Stations à proximité</div>
                    ${nearby.map(s => {
                        return `
                        <div class="bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-between shadow-xs">
                            <div class="flex flex-col">
                                <span class="text-[10px] font-black text-gray-800 leading-tight mb-1">${s.name}</span>
                                <div class="flex items-center gap-1">
                                    <span class="text-[7px] font-bold px-1 rounded bg-gray-100 text-gray-500 uppercase">${s.mode}</span>
                                    <span class="text-[8px] text-gray-400 font-medium">${s.lines}</span>
                                </div>
                            </div>
                            <span class="text-[9px] font-black ${s.dist < 400 ? 'text-emerald-600' : 'text-gray-400'}">${Math.round(s.dist)}m</span>
                        </div>`;
                    }).join('')}
                </div>`;
            } else {
                 html += `<div class="text-[9px] italic text-gray-400 text-center py-2 bg-gray-50 rounded-xl">Aucune station de métro/RER à moins de 800m</div>`;
            }

            // Grand Paris Express Section
            if (window.gpeStationsData) {
                const nearGPE = window.gpeStationsData
                    .map(s => ({ ...s, dist: getDistance(centroid.lat, centroid.lon, s.lat, s.lon) }))
                    .filter(s => s.dist < 1500)
                    .sort((a, b) => a.dist - b.dist);

                if (nearGPE.length > 0) {
                    html += `
                    <div class="pt-3 border-t border-gray-100">
                        <div class="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                            <span class="text-xs">✨</span> Grand Paris Express
                        </div>
                        <div class="space-y-2">
                            ${nearGPE.map(s => `
                                <div class="bg-emerald-50/20 p-2 rounded-xl border border-emerald-100/50 flex items-center justify-between">
                                    <div class="flex flex-col">
                                        <div class="flex items-center gap-1.5 mb-1">
                                            <span class="text-[10px] font-black text-emerald-900 leading-none">${s.name}</span>
                                            ${s.dist <= 800 ? '<span class="text-[7px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter shadow-sm">Proche</span>' : ''}
                                        </div>
                                        <div class="flex items-center gap-1">
                                            ${s.lines.map(l => {
                                                const c = idfmColors[l] || { bg: "#eee", text: "#000" };
                                                return `<span class="px-1.5 py-0.5 rounded text-[7px] font-black" style="background-color: ${c.bg}; color: ${c.text};">L.${l}</span>`;
                                            }).join('')}
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-[10px] font-black ${s.year <= 2024 ? 'text-blue-600' : 'text-emerald-700'}">${s.year <= 2024 ? 'Service 🟢' : s.year}</div>
                                        <div class="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">${Math.round(s.dist)}m</div>
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
                                <span class="text-[16px] font-black text-emerald-700 leading-none">${(wm.distance_km).toFixed(1)}</span>
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
                            <div class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-indigo-50">
                                <span class="text-xs">🍿</span>
                                <span class="text-[10px] font-black text-gray-800">${d.cinemas || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Cinémas</span>
                            </div>
                            <div class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-indigo-50">
                                <span class="text-xs">🎭</span>
                                <span class="text-[10px] font-black text-gray-800">${d.theatres || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Théâtres</span>
                            </div>
                            <div class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-indigo-50">
                                <span class="text-xs">🎟️</span>
                                <span class="text-[10px] font-black text-gray-800">${d.concerts || 0}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Concerts</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/50">
                        <div class="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-2">Commerces de bouche</div>
                        <div class="grid grid-cols-4 gap-2">
                            <div class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-blue-50">
                                <span class="text-xs">🥖</span>
                                <span class="text-[10px] font-black text-gray-800">${d.boulangerie}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Boulang.</span>
                            </div>
                            <div class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-blue-50">
                                <span class="text-xs">🥩</span>
                                <span class="text-[10px] font-black text-gray-800">${d.boucherie}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Boucher.</span>
                            </div>
                            <div class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-blue-50">
                                <span class="text-xs">🧀</span>
                                <span class="text-[10px] font-black text-gray-800">${d.fromagerie}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Fromag.</span>
                            </div>
                            <div class="flex flex-col items-center p-1.5 bg-white rounded-lg border border-blue-50">
                                <span class="text-xs">🥦</span>
                                <span class="text-[10px] font-black text-gray-800">${d.bio}</span>
                                <span class="text-[7px] text-gray-400 font-bold uppercase">Bio</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-pink-50/50 p-3 rounded-xl border border-pink-100/50">
                        <div class="text-[8px] font-black text-pink-400 uppercase tracking-widest mb-2">Gastronomie & Vie Nocturne</div>
                        <div class="flex justify-between items-center mb-1">
                            <div class="flex items-center gap-2">
                                <span class="text-sm">🍽️</span>
                                <span class="text-[11px] text-gray-600 font-bold">Vrais Restaurants</span>
                            </div>
                            <span class="text-xs font-black text-pink-800">${d.restaurants || 0}</span>
                        </div>
                        <div class="flex justify-between items-center mb-1">
                            <div class="flex items-center gap-2">
                                <span class="text-sm">🍔</span>
                                <span class="text-[11px] text-gray-600 font-bold">Fast Food / Street Food</span>
                            </div>
                            <span class="text-xs font-black text-pink-800">${d.fast_food || 0}</span>
                        </div>
                        <div class="flex justify-between items-center mb-1">
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
                            <div class="flex justify-between text-[10px] font-bold text-slate-700">
                                <span>🛒 Superm.</span>
                                <span>${d.supermarket}</span>
                            </div>
                            <div class="flex justify-between text-[10px] font-bold text-slate-700">
                                <span>💊 Pharm.</span>
                                <span>${d.pharmacie}</span>
                            </div>
                            <div class="flex justify-between text-[10px] font-bold text-slate-700">
                                <span>✉️ Poste</span>
                                <span>${d.poste}</span>
                            </div>
                            <div class="flex justify-between text-[10px] font-bold text-slate-700">
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
                            <div class="flex flex-col items-center">
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
                            <span class="text-[8px] text-gray-400 uppercase font-black block mb-1">🏢 Social</span>
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
                            <div class="relative flex items-center justify-between pl-14 group">
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
                const journey = window.precomputedJourneysRaw[insee]?.[wp.id];
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

window.getLineId = function(str) {
    if (!str) return "";
    // Clean up strings like "METRO 14" or "RER C" or "TRAIN J"
    let cleaned = String(str)
        .replace(/(METRO|METROPOLITAIN|RER|TRAM|TRAMWAY|TRAIN|BUS|LIGNE)\s+/gi, '')
        .trim()
        .toUpperCase();
    return cleaned;
};

function getColor(matchRate) {
    if (matchRate === 0) return '#ef4444';
    return matchRate > 80 ? '#059669' : (matchRate > 65 ? '#22c55e' : (matchRate > 45 ? '#84cc16' : (matchRate > 25 ? '#facc15' : (matchRate > 10 ? '#f97316' : '#ef4444'))));
}

function cleanName(name) {
    if (!name) return "";
    return name.replace(/\s*\(.*commune non irisée.*\)/gi, '').trim();
}

function calculateMatchRate(props) {
    // --- TRANSIT AXIS FILTER ---
    if (window.activeAxisId) {
        if (window.axisMembership && !window.axisMembership[props.code]) {
            return { total: -1, excluded: true, categories: {} };
        }
    }

    try {
        if (!props || !props.code) return { total: 0, categories: {}, details: { immo: {}, mobility: {}, env: {} } };
    
    const budgetRaw = document.getElementById('budget-input')?.value || "850000";
    const budget = parseInt(String(budgetRaw).replace(/\s/g, '').replace(/[^0-9]/g, '')) || 850000;
    
    const surfaceBucket = document.getElementById('surface-input')?.value || "60-80m²";
    const bucketValues = {
        "<30m²": 20, "30-40m²": 35, "40-60m²": 50, "60-80m²": 70, "80-100m²": 90, "100-120m²": 110, "120m²+": 140
    };
    const minSurface = bucketValues[surfaceBucket] || 70;
    
    const insee = props.code;
    const currentType = window.currentPropertyType || 'all';

    // 1. MARCHÉ IMMOBILIER & BUDGET FIT
    const segment = props[currentType] || props.all || { price: 5000, vol: 0, p25: 4250, p75: 5750 };
    const median = segment.price || 5000;
    const estimatedSurface = budget / median;
    const surfaceRatio = estimatedSurface / minSurface;

    // Budget Fit: We want a neighborhood that matches our lifestyle/budget.
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
    const surfaceBuckets = ["<30m²", "30-40m²", "40-60m²", "60-80m²", "80-100m²", "100-120m²", "120m²+"];
    
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
    const servicesScore = staticScores.services || 0;
    const socialScore = staticScores.social || 0;
    const vieQuartierScore = (servicesScore + socialScore) / 2;
    
    const pedCount = counts.pediatres || window.pediatresByIris?.[insee] || 0;
    const socialCounts = counts;

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
            label: "Temps de trajet", 
            icon: "🕒", 
            color: "text-indigo-600",
            isHidden: !cachedMobility.hasWorkplaces
        },
        urbanisme: { score: urbanismeScore, label: "Urbanisme", icon: "🏢", color: "text-emerald-600" },
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
            icon: "🏢",
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
        vieQuartier: ["Calme & Résid.", "Pratique & Paisible", "Commerçant & Animé", "Ultra-Animé & Festif"],
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

        switch(id) {
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
            case 'vieQuartier':
                if (s < 30) app = "Calme & Résid.";
                else if (s < 60) app = "Pratique & Paisible";
                else if (s < 85) app = "Commerçant & Animé";
                else app = "Ultra-Animé & Festif";
                break;

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
        // Find active chip value for this category
        const container = document.getElementById('pref-' + id);
        const activeChip = container?.querySelector('.pref-chip.active');
        const prefValue = activeChip?.getAttribute('data-value');

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
    const total = isExcluded ? 0 : Math.round(baseScore * vibeRatio * preferenceMultiplier);

    return {
        total: Math.min(100, total),
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
            details: { immo: {}, mobility: {}, env: {} } 
        };
    }
}

let isVibeActiveCached = false;
function style(feature) {
    if (!feature) return { stroke: false, fillOpacity: 0, interactive: false };
    const props = feature.properties || {};
    const insee = props.code || feature.id;
    let isVisible = true;
    let maxWait = 0;
    
    // HIDE SCORE COLORING WHEN ZOOMED IN ON A FOCUS
    // User request: "Once I've zoomed in on a neighborhood, I don't need the match score color coding anymore."
    const zoom = window.map.getZoom();
    const isZoomedIn = zoom >= 15;
    const isSelected = selectedLayer && (selectedLayer.feature.properties.code === insee || selectedLayer.feature.id === insee);

    if (isZoomedIn && selectedLayer) {
        if (isSelected) {
            return {
                color: '#0f172a',
                weight: 3,
                opacity: 1,
                fillColor: 'transparent',
                fillOpacity: 0,
                stroke: true,
                interactive: true
            };
        } else {
            return {
                fillColor: 'transparent',
                stroke: false,
                fillOpacity: 0,
                interactive: true
            };
        }
    }

    if (window.activeWorkplaces && window.activeWorkplaces.length > 0) {
        for (const wp of window.activeWorkplaces) {
            const cached = window.precomputedJourneysRaw?.[insee]?.[wp.id];
            const duration = cached ? cached.duration : 999;
            maxWait = Math.max(maxWait, duration);

            if (duration > wp.limit * 1.1) isVisible = false;
            if (cached && cached.itinerary) {
                const usedModes = (cached.itinerary || []).map(step => (step.type || "").toLowerCase());
                if (usedModes.some(m => !wp.modes.includes(m))) isVisible = false;
            }
            if (cached) {
                const totalWalkMeters = (cached.firstMile || 0) + (cached.lastMile || 0);
                if (totalWalkMeters / 83 > wp.walkLimit) isVisible = false;
            }
        }
    }

    if (feature.properties) feature.properties.maxCommuteTime = maxWait;
    const matchData = calculateMatchRate(feature.properties);
    const score = matchData.total;

    // Filter by score category
    let filterKey = 'bad';
    if (score > 80) filterKey = 'excellent';
    else if (score > 65) filterKey = 'good';
    else if (score > 45) filterKey = 'decent';
    else if (score > 25) filterKey = 'average';
    else if (score > 10) filterKey = 'poor';

    if (matchData.excluded) isVisible = false;
    if (window.activeScoreFilters && !window.activeScoreFilters[filterKey]) isVisible = false;

    const isActiveCity = window.activeCommuneCodes && window.activeCommuneCodes.length > 0;
    const isCityIris = isActiveCity && window.activeCommuneCodes.includes(String(insee));

    if (isSelected) {
        return {
            color: '#0f172a',
            weight: 3,
            opacity: 1,
            fillColor: getColor(score),
            fillOpacity: 0.7,
            stroke: true
        };
    }

    // Selective coloring: if a city is active, only color its IRIS.
    const isHoveredCity = window.hoveredCommuneName && getCommuneName(feature.properties, feature.id) === window.hoveredCommuneName;
    
    // Force visibility for hovered city to show its potential
    if (isHoveredCity) isVisible = true;

    const showColor = isHoveredCity || isCityIris || (isVisible && !isActiveCity);

    return { 
        fillColor: showColor ? getColor(score) : '#ffffff', 
        stroke: false, 
        color: 'transparent',
        weight: 0,
        fillOpacity: showColor ? 0.55 : 0.05, // Increased slightly for click robustness
        interactive: true
    };
}

function highlightFeature(e) {
    const layer = e.target;
    if (layer === selectedLayer) return;
    
    const props = layer.feature.properties;

    // Highlight current IRIS with a clean white border
    layer.setStyle({ 
        weight: 2, 
        color: '#ffffff', 
        opacity: 0.9, 
        stroke: true, 
        fillOpacity: 0.85 
    });
    layer.bringToFront();
    
    info.update(props, !!selectedLayer);
}







function updateProximityCircle(lat, lon) {
    if (window.proximityLayer) {
        window.proximityLayer.clearLayers();
    } else {
        window.proximityLayer = L.layerGroup().addTo(window.map);
    }
    
    if (!lat || !lon) {
        window.proximityCircle = null;
        return;
    }

    // window.proximityCircle = L.circle([lat, lon], {
    //     radius: 800,
    //     color: '#1e293b',
    //     weight: 1.5,
    //     fillColor: '#1e293b',
    //     fillOpacity: 0.04,
    //     dashArray: '5, 5',
    //     interactive: false
    // }).addTo(window.proximityLayer);
}

function updateCentroidMarker(lat, lon) {
    if (centroidMarker) {
        window.map.removeLayer(centroidMarker);
        centroidMarker = null;
    }
    if (lat && lon) {
        const icon = L.divIcon({
            className: 'centroid-container',
            html: '<div class="centroid-pulse"></div>',
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });
        centroidMarker = L.marker([lat, lon], { 
            icon: icon, 
            interactive: false, 
            zIndexOffset: 1000 
        }).addTo(window.map);
    }
}

function resetHighlight(e) {
    const layer = e.target;
    if (layer !== selectedLayer) {
        // Force a total style reset including stroke properties
        layer.setStyle({
            stroke: false,
            weight: 0,
            fillOpacity: 0.55,
            color: 'transparent'
        });
        // Then apply the dynamic style
        layer.setStyle(style(layer.feature));
        
        if (selectedLayer) {
            const p = selectedLayer.feature.properties;
            info.update(p, true);
            updateCentroidMarker(p.lat, p.lon);
            updateProximityCircle(p.lat, p.lon);
        } else {
            info.update();
            updateProximityCircle(null);
            if (centroidMarker) {
                window.map.removeLayer(centroidMarker);
                centroidMarker = null;
            }
        }
    }
}
async function selectFeature(e) {
    try {
        const layer = e.target || e;
        if (!layer || !layer.feature) return;
        const noZoom = e.noZoom || false;

        const communeName = getCommuneName(layer.feature.properties, layer.feature.id);

        // Prevent propagation to map.click
        if (e && e.originalEvent) {
            L.DomEvent.stopPropagation(e.originalEvent);
            e.originalEvent._handledByFeature = true;
        }

        if (selectedLayer === layer && !noZoom) {
            deselectFeature();
            return;
        }
        
        const props = layer.feature.properties;
        const prevLayer = selectedLayer;
        selectedLayer = layer;
        
        if (prevLayer) {
            prevLayer.setStyle(style(prevLayer.feature));
        }

        // Apply selection style
        layer.setStyle({ 
            weight: 4, 
            color: '#0f172a', 
            opacity: 1, 
            stroke: true, 
            fillOpacity: 0.65 
        });
        layer.bringToFront();

        // Save view ONLY if it's a real user click, not an auto-selection on landing
        if (!noZoom && !window.isFirstSearch && !e.isAuto) {
            lastView = { center: map.getCenter(), zoom: map.getZoom() };
            
            // Re-instantiate zoom logic: center on IRIS and zoom to level 14-15
            const bounds = layer.getBounds();
            map.flyToBounds(bounds, { 
                padding: [40, 40], 
                maxZoom: 15, 
                duration: 1.2,
                easeLinearity: 0.25
            });
        }
        
        await window.updateWalkingPath(props);
        if (props.lat && props.lon) {
            updateCentroidMarker(props.lat, props.lon);
            updateProximityCircle(props.lat, props.lon);
        }

        if (window.activeCommuneName !== communeName) {
            window.activeCommuneName = communeName;
            if (window.drawCityBoundaries) window.drawCityBoundaries(communeName);
        }

        info.update(props, true);
        if (window.renderActiveLayers) window.renderActiveLayers();
        if (window.updateTopMatches) window.updateTopMatches();

    } catch (err) {
        console.error("❌ [selectFeature] Error:", err);
    }
}

function deselectFeature() {
    if (selectedLayer) {
        const prev = selectedLayer;
        selectedLayer = null; // Clear state FIRST so style() returns 'not selected'
        
        prev.setStyle({
            stroke: false,
            weight: 0,
            fillOpacity: 0.55,
            color: 'transparent'
        });
        prev.setStyle(style(prev.feature));
        
        if (window.walkingPathsGroup) window.walkingPathsGroup.clearLayers();
        info.update();
        if (window.renderActiveLayers) window.renderActiveLayers();
        if (lastView) { 
            map.flyTo(lastView.center, lastView.zoom, { duration: 0.8 }); 
            lastView = null; 
        }
    }

    if (centroidMarker) {
        map.removeLayer(centroidMarker);
        centroidMarker = null;
    }
    if (window.communeHighlightLayer) window.communeHighlightLayer.clearLayers();
    if (window.proximityLayer) window.proximityLayer.clearLayers();
    window.proximityCircle = null;
    window.activeCommuneName = null;
    window.activeCommuneCodes = [];
    if (window.updateTopMatches) window.updateTopMatches();
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
    layer.on({ mouseover: highlightFeature, mouseout: resetHighlight, click: selectFeature });
}

function updateProgress(percent, status) {
    const bar = document.getElementById('loader-progress');
    const msg = document.getElementById('loader-status');
    if (bar) bar.style.width = percent + '%';
    if (msg) msg.innerText = status;
}

// --- DATA LOADING & INDEXING ---
// Preference Selection Logic
window.selectPref = function(category, value, element) {
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
                fetch('/idf_prices.json').then(r => { if(!r.ok) throw new Error("idf_prices.json not found"); return r.json(); }),
                fetch('/pediatres_by_iris.json').then(r => { if(!r.ok) throw new Error("pediatres_by_iris.json not found"); return r.json(); }),
                fetch('/pediatres.geojson').then(r => { if(!r.ok) throw new Error("pediatres.geojson not found"); return r.json(); }),
                fetch('/gpe_stations_new.geojson').then(r => { if(!r.ok) throw new Error("gpe_stations_new.geojson not found"); return r.json(); }),
                fetch('/transit_lines_simplified.geojson').then(r => { if(!r.ok) throw new Error("transit_lines_simplified.geojson not found"); return r.json(); }),
                fetch('/stations.geojson').then(r => { if(!r.ok) throw new Error("stations.geojson not found"); return r.json(); }),
                fetch('/city_centers.geojson').then(r => { if(!r.ok) throw new Error("city_centers.geojson not found"); return r.json(); }),
                fetch('/mairies.geojson').then(r => { if(!r.ok) throw new Error("mairies.geojson not found"); return r.json(); }),
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
            
            window.transitLinesLayer = L.geoJSON(transitData, {
                style: function(feature) {
                    const color = feature.properties.route_color ? `#${feature.properties.route_color}` : (idfmColors[feature.properties.route_short_name]?.bg || '#3388ff');
                    return {
                        color: color,
                        weight: 4,
                        opacity: 0.8
                    };
                },
                pane: 'transitLinesPane'
            });
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
            journeysData = await fetch('/precomputed_journeys.json').then(r => { if(!r.ok) throw new Error("precomputed_journeys.json not found"); return r.json(); });
        } catch (e) {
            console.error("❌ Data Fetch Error (Journeys):", e);
            throw e;
        }

        updateProgress(40, 'Frontières...');
        let geojsonData;
        try {
            geojsonData = await fetch('/idf-quartiers-optimized.geojson').then(r => { if(!r.ok) throw new Error("idf-quartiers-optimized.geojson not found"); return r.json(); });
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
        
        // Lazy load detailed baked index in background
        fetch('/baked_index.json').then(r => r.json()).then(data => {
            window.neighborhoodNeighbors = data.neighbors;
            window.pointsByInsee = data.points;
            window.bakedTransactions = data.transactions;
            console.log("✅ Detailed index loaded in background");
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

        window.toggleInfoModal = function(show) {
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

        // Clear existing GeoJSON layer correctly
        if (window.geojsonLayer) {
            map.removeLayer(window.geojsonLayer);
            window.geojsonLayer = null;
        }

        // Aggressively clear ALL other GeoJSON layers to avoid duplicates
        map.eachLayer(l => {
            if (l instanceof L.GeoJSON && l !== osmPathsLayer && l !== qpvLayer && l !== window.gpeLinesLayer && l !== window.espacesVertsLayer && l !== window.pebLayer) {
                map.removeLayer(l);
            }
        });

        window.allNeighborhoods = (geojsonData?.features || []).map(f => {
            const p = f.properties || {};
            // Ensure essential properties exist for UI
            p.nom = p.nom || p.NOM || "Quartier inconnu";
            p.code = String(p.code || p.CODE || f.id || "");
            p.commune = getCommuneName(p, p.code);
            return f;
        });

        // Precompute metro proximity for all neighborhoods
        window.allNeighborhoods.forEach(f => {
            const p = f.properties;
            if (p.lat && p.lon) {
                p.has_metro = (window.metroStationsData && window.metroStationsData.some(s => getDistance(p.lat, p.lon, s.lat, s.lon) <= 800));
            }
        });

        geojsonLayer = L.geoJSON(geojsonData, { 
            style: style, 
            onEachFeature: onEachFeature,
            pane: 'neighborhoods'
        }).addTo(map);
        window.geojsonLayer = geojsonLayer;
        buildSearchIndex(geojsonData);
        refreshMobilityCache(geojsonData);
        
        // Prevent map clicks when interacting with the left panel
        const uiPanel = document.getElementById('ui-panel');
        if (uiPanel) {
            L.DomEvent.disableClickPropagation(uiPanel);
            L.DomEvent.disableScrollPropagation(uiPanel);
        }

        // Stations & Schools

        // Setup
        window.stationsLayer = L.layerGroup();
        window.schoolsLayer = L.layerGroup();
        window.commercesLayer = L.layerGroup();
        window.amenitiesLayer = L.layerGroup();
        window.sportLayer = L.layerGroup();
        window.cultureLayer = L.layerGroup();
        window.pediatresLayer = L.layerGroup();
        window.marcheLayer = L.layerGroup();
        window.gpeLayer = L.layerGroup();
        window.mairiesLayer = L.layerGroup();
        window.rivieraLayer = L.layerGroup();
        window.centreVilleLayer = L.layerGroup().addTo(map);
        window.communeHighlightLayer = L.layerGroup().addTo(map);

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
            }).bindPopup(`
                <div class="p-3 min-w-[180px] font-sans">
                    <div class="text-blue-600 text-[9px] font-black uppercase tracking-widest mb-0.5">Équipement Public</div>
                    <div class="text-[14px] font-black text-gray-900 mb-1">${props.name}</div>
                    <div class="text-[10px] text-gray-500 font-medium">Hôtel de ville / Mairie</div>
                    <div class="mt-2 pt-2 border-t border-gray-100 flex items-center gap-2">
                        <span class="text-xs text-gray-400">📍</span>
                        <span class="text-[10px] text-gray-600">${props.name.includes('Mairie') ? props.name : 'Mairie de commune'}</span>
                    </div>
                </div>
            `, {
                className: 'premium-popup',
                maxWidth: 300
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

initApp();

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
        
        if (window.updateEspacesVertsVisibility) window.updateEspacesVertsVisibility();
        if (window.updateOSMContextVisibility) window.updateOSMContextVisibility();
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

window.updateNoiseVisibility = async () => {
    const show = document.getElementById('show-noise')?.checked;
    const zoom = map.getZoom();
    updateFilters(); 

    if (!show) {
        if (noiseInfraLayer) map.removeLayer(noiseInfraLayer);
        return;
    }

    try {
        if (!window._noiseData) {
            const response = await fetch('/noise_infra.geojson');
            window._noiseData = await response.json();
        }

        if (!noiseInfraLayer) {
            noiseInfraLayer = L.layerGroup();
        }

        // FULL RECREATION to force Canvas redraw with new zoom-scaled weights
        noiseInfraLayer.clearLayers();
        const noiseRenderer = L.canvas({ padding: 0.5, pane: 'noisePane' });

        // Calibrated Bruitparif-like thresholds
        const layersConfig = [
            { color: '#fde047', meters: 400, opacity: 0.012, minZoom: 14 }, // Distant Hum (400m)
            { color: '#fb923c', meters: 180, opacity: 0.025, minZoom: 13 }, // Outer Mist (180m)
            { color: '#ef4444', meters: 70,  opacity: 0.05,  minZoom: 11 }, // Mid Glow (70m)
            { color: '#7f1d1d', meters: 15,  opacity: 0.25,  minZoom: 9 }   // Core (15m)
        ];

        layersConfig.forEach(cfg => {
            if (zoom < cfg.minZoom) return;

            const layer = L.geoJSON(window._noiseData, {
                renderer: noiseRenderer,
                style: (f) => ({
                    color: cfg.color,
                    weight: getNoiseWeight(cfg.meters, f.properties.weight),
                    opacity: cfg.opacity,
                    lineCap: 'round',
                    lineJoin: 'round'
                }),
                interactive: false
            });
            noiseInfraLayer.addLayer(layer);
        });

        if (!map.hasLayer(noiseInfraLayer)) {
            noiseInfraLayer.addTo(map);
        }
    } catch (e) {
        console.error("Noise Visibility Error:", e);
    }
};

window.updatePEBVisibility = async () => {
    const show = document.getElementById('show-peb')?.checked;
    if (!show) {
        if (window.pebLayer) window.map.removeLayer(window.pebLayer);
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
                    interactive: false
                },
                pane: 'noisePane'
            }).addTo(window.pebLayer);
        });
    }

    if (window.pebLayer && !window.map.hasLayer(window.pebLayer)) {
        window.pebLayer.addTo(window.map);
    }
};

async function fetchPEBGeometries() {
    if (window.pebData) return;
    try {
        const pebZones = ['za', 'zb', 'zc', 'zd'];
        const data = {};
        for (const zone of pebZones) {
            const res = await fetch(`/peb_${zone}_4326.geojson`);
            if (res.ok) data[zone] = await res.json();
        }
        window.pebData = data;
        // If the toggle was already on, update visibility now that data is here
        if (document.getElementById('show-peb')?.checked) window.updatePEBVisibility();
    } catch (e) {
        console.error("Failed to load PEB geometries:", e);
    }
}

window.updateHeatResilienceVisibility = () => {
    updateFilters();
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

window.updateCentreVilleVisibility = () => {
    const show = document.getElementById('show-centre-ville')?.checked;
    const legend = document.getElementById('city-centers-legend');
    
    if (legend) {
        if (show) legend.classList.remove('hidden');
        else legend.classList.add('hidden');
    }

    if (!window.centreVilleLayer) return;
    window.centreVilleLayer.clearLayers();

    if (!window.activeCommuneName) return;

    const zoom = window.map.getZoom();
    if (zoom < 12) return; // Hide completely if too far

    const isSimplified = zoom < 14;

    console.log("✨ Rendering magnetic attractivity perimeters for", window.activeCommuneName, "Zoom:", zoom, "Simplified:", isSimplified);
    
    const personaStyles = {
        "Pôle de Mobilité": { color: '#8b5cf6', fill: '#a78bfa', icon: '🚉' },
        "Cœur Historique": { color: '#f59e0b', fill: '#fbbf24', icon: '🏺' },
        "Axe Commerçant": { color: '#ea580c', fill: '#fb923c', icon: '🛍️' },
        "Quartier Culturel": { color: '#ec4899', fill: '#f472b6', icon: '🎭' },
        "Pôle de Vie": { color: '#10b981', fill: '#34d399', icon: '🌱' }
    };
    
    (window.cityCentersData.features || []).forEach(feature => {
        const props = feature.properties;
        const name = props.name || "";
        if (window.activeCommuneName && !name.includes(window.activeCommuneName)) return;

        try {
            const s = personaStyles[props.persona] || personaStyles["Pôle de Vie"];
            
            // Render polygon only if zoomed in or if it's a very large area (optional)
            if (zoom >= 13) {
                const geoLayer = L.geoJSON(feature, {
                    pane: 'cityCentersPane',
                    interactive: false,
                    style: {
                        color: s.color,
                        weight: isSimplified ? 1 : 3,
                        opacity: isSimplified ? 0.4 : 0.8,
                        fillColor: s.fill,
                        fillOpacity: isSimplified ? 0.05 : 0.2
                    }
                }).addTo(window.centreVilleLayer);
            }

            const centroid = turf.centroid(feature).geometry.coordinates;
            
            const pills = [
                { key: 'boulangerie_count', icon: '🍞', label: 'Boulangerie' },
                { key: 'boucherie_count', icon: '🥩', label: 'Boucherie' },
                { key: 'fromagerie_count', icon: '🧀', label: 'Fromagerie' },
                { key: 'has_market', icon: '🥬', label: 'Marché' },
                { key: 'picard_count', icon: '❄️', label: 'Picard' },
                { key: 'deli_count', icon: '🥗', label: 'Traiteur/Fine' },
                { key: 'restaurant_count', icon: '🍴', label: 'Resto/Bar' },
                { key: 'culture_count', icon: '🎭', label: 'Culture' },
                { key: 'pharmacie_count', icon: '💊', label: 'Santé' },
                { key: 'bio_count', icon: 'AB', label: 'Bio' },
                { key: 'shopping_count', icon: '🛍️', label: 'Shopping' },
                { key: 'supermarket_count', icon: '🛒', label: 'Supermarché' }
            ];

            const radius = 68;
            const pillsHtml = pills.map((p, i) => {
                const angle = (i * 360 / pills.length) - 90;
                const radian = angle * Math.PI / 180;
                const tx = Math.cos(radian) * radius;
                const ty = Math.sin(radian) * radius;
                const isPresent = props[p.key] > 0 || props[p.key] === true;
                
                let iconHtml = p.icon;
                if (p.icon === 'AB') {
                    iconHtml = `
                        <svg viewBox="0 0 100 100" style="width: 22px; height: 22px; border-radius: 3px;" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100" height="100" fill="#2E9E47" rx="15"/>
                            <text x="50" y="70" font-family="Arial, sans-serif" font-size="60" fill="white" text-anchor="middle" font-weight="900">AB</text>
                        </svg>
                    `;
                }

                const excellenceKey = p.key.replace('_count', '_excellence').replace('has_', 'excellence_');
                const isExcellence = props[excellenceKey] === true;

                return `
                    <div class="city-center-pill ${isPresent ? 'present' : 'absent'} ${isExcellence ? 'excellence' : ''}" 
                         style="--tx: ${tx.toFixed(1)}px; --ty: ${ty.toFixed(1)}px;" 
                         data-label="${p.label}">
                        ${iconHtml}
                    </div>
                `;
            }).join('');

            const marker = L.marker([centroid[1], centroid[0]], {
                pane: 'cityCentersPane',
                icon: L.divIcon({
                    className: `city-center-marker ${isSimplified ? 'simplified' : ''}`,
                    html: `
                        <div class="city-center-marker-container ${isSimplified ? 'simplified' : ''}">
                            ${!isSimplified ? `
                            <div class="city-center-label-card">
                                <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">${props.persona}</div>
                                <div class="text-[14px] font-black text-gray-900 leading-tight">${props.name}</div>
                            </div>
                            ` : ''}
                            <div class="city-center-main-icon">
                                ${s.icon}
                            </div>
                            ${!isSimplified ? `
                            <div class="city-center-pills-wrapper">
                                ${pillsHtml}
                            </div>
                            ` : ''}
                        </div>
                    `,
                    iconSize: [0, 0]
                })
            }).addTo(window.centreVilleLayer);

            marker.on('mouseover', () => {
                const path = window.activeWalkingPaths?.find(p => p.name === props.name);
                if (path) window.highlightPath(path.id, true);
            });
            marker.on('mouseout', () => {
                const path = window.activeWalkingPaths?.find(p => p.name === props.name);
                if (path) window.highlightPath(path.id, false);
            });

            marker.on('click', (e) => {
                L.DomEvent.stopPropagation(e);
                const el = marker.getElement().querySelector('.city-center-marker-container');
                const isActive = el.classList.contains('active');
                
                // Close all other active markers
                document.querySelectorAll('.city-center-marker-container.active').forEach(c => {
                    if (c !== el) c.classList.remove('active');
                });
                
                el.classList.toggle('active');
                
                // If opening, maybe zoom a bit?
                if (el.classList.contains('active')) {
                    // window.map.setView([centroid[1], centroid[0]], Math.max(window.map.getZoom(), 15));
                }
            });

            // Marker is already added above at line 4318
        } catch (e) {
            console.warn("Could not draw marker for center", e);
        }
    });
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
    if (!window.map || !window.geojsonLayer) return [];
    const bounds = window.map.getBounds();
    const visible = new Set();
    
    // Use bounds intersection for robust visibility detection
    window.geojsonLayer.eachLayer(layer => {
        if (bounds.intersects(layer.getBounds())) {
            visible.add(layer.feature.properties.code || layer.feature.id);
        }
    });
    
    return Array.from(visible);
}

function renderActiveLayers() {
    if (window.updateOSMContextVisibility) window.updateOSMContextVisibility();
    if (!window.map) return;
    const zoom = window.map.getZoom();
    
    // Zoom thresholds (more permissive if a city is selected)
    const isActiveCity = window.activeCommuneCodes && window.activeCommuneCodes.length > 0;
    const showBasePoints = zoom >= 14 || (isActiveCity && zoom >= 12); 
    const showDetailedPoints = zoom >= 14.5 || (isActiveCity && zoom >= 12.5);
    
    const layers = {
        stations: window.stationsLayer,
        schools: window.schoolsLayer,
        commerces: window.commercesLayer,
        amenities: window.amenitiesLayer,
        sport: window.sportLayer,
        culture: window.cultureLayer,
        pediatres: window.pediatresLayer,
        marche: window.marcheLayer,
        mairies: window.mairiesLayer,
        riviera: window.rivieraLayer,
        gpe: window.gpeLayer,
        transitLines: window.transitLinesLayer
    };

    // Clear everything
    for (const key in layers) {
        if (layers[key] && key !== 'transitLines') layers[key].clearLayers();
    }

    // Read checkbox states first so we can handle global layers regardless of zoom
    const showStations = document.getElementById('show-stations')?.checked;
    
    // Handle global transit lines layer regardless of zoom
    if (showStations && window.transitLinesLayer) {
        if (!window.map.hasLayer(window.transitLinesLayer)) {
            window.transitLinesLayer.addTo(window.map);
        }
    } else if (window.transitLinesLayer) {
        window.map.removeLayer(window.transitLinesLayer);
    }

    // Handle Grand Paris Express lines & stations
    const showGPE = document.getElementById('show-gpe-lines')?.checked || false;
    if (showGPE) {
        if (window.gpeLinesLayer && !window.map.hasLayer(window.gpeLinesLayer)) window.gpeLinesLayer.addTo(window.map);
        if (window.gpeLayer && !window.map.hasLayer(window.gpeLayer)) window.gpeLayer.addTo(window.map);
    } else {
        if (window.gpeLinesLayer) window.map.removeLayer(window.gpeLinesLayer);
        if (window.gpeLayer) window.map.removeLayer(window.gpeLayer);
    }

    // Handle Espaces Verts
    const showEspacesVerts = document.getElementById('show-espaces-verts')?.checked || false;
    if (showEspacesVerts && window.espacesVertsLayer) {
        if (!window.map.hasLayer(window.espacesVertsLayer)) window.espacesVertsLayer.addTo(window.map);
    } else if (window.espacesVertsLayer) {
        window.map.removeLayer(window.espacesVertsLayer);
    }

    // Handle Airport Noise (PEB)
    const showPEB = document.getElementById('show-peb')?.checked || false;
    if (showPEB && window.updatePEBVisibility) {
        window.updatePEBVisibility();
    } else if (window.pebLayer) {
        window.map.removeLayer(window.pebLayer);
    }

    if (zoom < 14) {
        if (window.updateTransactionsVisibility) window.updateTransactionsVisibility();
        if (window.updateCentreVilleVisibility) window.updateCentreVilleVisibility();
        if (window.updateWalkingLabelsZoom) window.updateWalkingLabelsZoom();
        
        // Clear walking paths if zoomed out too far
        if (zoom < 13 && window.walkingPathsGroup) {
            window.walkingPathsGroup.clearLayers();
        }
        
        return;
    }

    const visibleIds = window.visibleInseeCache && window.visibleInseeCache.length > 0 ? window.visibleInseeCache : getVisibleInseeCodes();
    const allPoints = window.pointsByInsee || {};
    const showCycle = document.getElementById('show-cycle')?.checked; // Assuming showCycle handled elsewhere or here? Wait, showCycle actually toggles a different layer, let's keep it handled by updatePathsVisibility.

    const grpCommerces = document.getElementById('group-commerces')?.checked;
    const showBoulangerie = document.getElementById('show-boulangerie')?.checked;
    const showBoucherie = document.getElementById('show-boucherie')?.checked;
    const showFromagerie = document.getElementById('show-fromagerie')?.checked;
    const showSurgeles = document.getElementById('show-surgeles')?.checked;
    const showBio = document.getElementById('show-bio')?.checked;
    const showSupermarche = document.getElementById('show-supermarche')?.checked;
    const showCommercesAutres = document.getElementById('show-commerces-autres')?.checked;
    const showMarche = document.getElementById('show-marche')?.checked;
    const marketLegend = document.getElementById('market-legend');
    if (marketLegend) {
        if ((grpCommerces || showMarche) && showDetailedPoints) marketLegend.classList.remove('hidden');
        else marketLegend.classList.add('hidden');
    }
    
    const grpSante = document.getElementById('group-sante')?.checked;
    const showPharmacie = document.getElementById('show-pharmacie')?.checked;
    const showPediatres = document.getElementById('show-pediatres')?.checked;

    const grpSorties = document.getElementById('group-sorties')?.checked;
    const showRestaurant = document.getElementById('show-restaurant')?.checked;
    const showFastFood = document.getElementById('show-fast-food')?.checked;
    const showBar = document.getElementById('show-bar')?.checked;
    const showPub = document.getElementById('show-pub')?.checked;
    const showCafe = document.getElementById('show-cafe')?.checked;

    const grpInfra = document.getElementById('group-infra')?.checked;
    const showSchools = document.getElementById('show-schools')?.checked;
    const schoolLegend = document.getElementById('school-legend');
    if (schoolLegend) {
        if (showSchools) schoolLegend.classList.remove('hidden');
        else schoolLegend.classList.add('hidden');
    }
    const showCreches = document.getElementById('show-creches')?.checked;
    const showSport = document.getElementById('show-sport')?.checked;
    const showCulture = document.getElementById('show-culture')?.checked;
    const showBiblios = document.getElementById('show-biblios')?.checked;
    const showMairies = document.getElementById('show-mairies')?.checked;

    const activeCommerces = [];
    if (showBoulangerie) activeCommerces.push('boulangerie');
    if (showBoucherie) activeCommerces.push('boucherie', 'butcher');
    if (showFromagerie) activeCommerces.push('fromagerie', 'cheese');
    if (showSurgeles) activeCommerces.push('picard', 'surgeles');
    if (showBio) activeCommerces.push('bio', 'magasin bio');
    if (showSupermarche) activeCommerces.push('supermarket', 'supermarche', 'supermarché');
    if (showCommercesAutres) activeCommerces.push('commerces', 'autre', 'marche', 'caviste', 'poissonnerie', 'fleuriste', 'chocolatier', 'epicerie_fine', 'primeur', 'habillement', 'jouets', 'chaussures'); 
    if (showPharmacie) activeCommerces.push('pharmacie');
    if (showRestaurant) activeCommerces.push('restaurant');
    if (showFastFood) activeCommerces.push('fast_food');
    if (showCafe) activeCommerces.push('cafe');
    if (showBar) activeCommerces.push('bar');
    if (showPub) activeCommerces.push('pub');
    if (showMarche) activeCommerces.push('marche');

    const toggles = {
        stations: showStations && showBasePoints,
        schools: (grpInfra || showSchools) && showBasePoints,
        commerces: (grpCommerces || grpSante || grpSorties || activeCommerces.length > 0) && showDetailedPoints,
        amenities: (grpInfra || showCulture || showSport || showBiblios || showCreches) && showDetailedPoints,
        pediatres: showPediatres && showDetailedPoints,
        marche: (grpCommerces || showMarche || showCommercesAutres) && showDetailedPoints,
        mairies: showMairies && showDetailedPoints,
        riviera: document.getElementById('show-riviera')?.checked && showDetailedPoints,
        gpe: document.getElementById('show-gpe-lines')?.checked || false,
        transitLines: showStations
    };

    visibleIds.forEach(id => {
        const irisPoints = allPoints[id];
        if (!irisPoints) return;

        for (const key in layers) {
            if (toggles[key] && irisPoints[key]) {
                if (key === 'transitLines') continue;
                
                irisPoints[key].forEach(f => {
                    const cat = (f.properties.category || '').toLowerCase();
                    const type = (f.properties.type || '').toLowerCase();
                    const isBioProp = f.properties.is_biocoop || f.properties.is_naturalia || (f.properties.name || '').toLowerCase().includes('bio');
                    const isPicardProp = f.properties.is_picard || (f.properties.name || '').toLowerCase().includes('picard');

                    if (key === 'commerces' && !(grpCommerces && grpSante && grpSorties)) {
                        let allowed = false;
                        if (grpCommerces && ['boulangerie', 'boucherie', 'butcher', 'fromagerie', 'cheese', 'picard', 'surgeles', 'bio', 'magasin bio', 'supermarket', 'supermarche', 'supermarché', 'marche', 'caviste', 'commerces', 'cafe', 'poissonnerie', 'fleuriste', 'chocolatier', 'epicerie_fine'].includes(cat)) allowed = true;
                        if (grpCommerces && isBioProp) allowed = true;
                        if (grpCommerces && isPicardProp) allowed = true;
                        if (grpSante && cat === 'pharmacie') allowed = true;
                        if (grpSorties && ['restaurant', 'fast_food', 'bar', 'pub'].includes(cat)) allowed = true;
                        if (!allowed && activeCommerces.length > 0) {
                            if (activeCommerces.includes(cat)) allowed = true;
                            if (activeCommerces.includes('bio') && isBioProp) allowed = true;
                            if (activeCommerces.includes('picard') && isPicardProp) allowed = true;
                        }
                        if (!allowed) return;
                    }

                    if (key === 'amenities' || key === 'sport' || key === 'culture') {
                        let allowed = false;
                        if (grpInfra) allowed = true;
                        if (showCulture && ['cinema', 'theatre', 'institution_culturelle'].includes(cat)) allowed = true;
                        if (showSport && ['tennis', 'swimming_pool', 'sport', 'stadium', 'gym', 'piscine', 'musique'].includes(cat)) allowed = true;
                        if (showBiblios && ['bibliotheque', 'library', 'mediatheque'].includes(cat)) allowed = true;
                        if (showCreches && (cat === 'creche' || type === 'creche')) allowed = true;
                        if (!allowed) return;
                    }

                    const latlng = [f.geometry.coordinates[1], f.geometry.coordinates[0]];
                    let m;
                    if (key === 'stations') {
                        // Filter out GPE lines from standard stations layer
                        const line = (f.properties.indice_lig || "").toString();
                        if (['15', '16', '17', '18'].includes(line)) return;
                        m = window.stationPointToLayer(f, latlng);
                    }
                    else if (key === 'schools') m = window.schoolPointToLayer(f, latlng);
                    else if (key === 'commerces') m = window.commercePointToLayer(f, latlng);
                    else if (key === 'amenities' || key === 'sport' || key === 'culture') m = window.amenityPointToLayer(f, latlng);
                    else if (key === 'pediatres') m = window.pediatrePointToLayer(f, latlng);
                    else if (key === 'mairies') m = window.mairiePointToLayer(f, latlng);
                    else if (key === 'marche') m = window.marchePointToLayer(f, latlng);
                    else if (key === 'riviera') m = window.rivieraPointToLayer(f, latlng);
                    
                    if (m) m.addTo(layers[key]);
                });
            }
        }
        
        // Special case: Pediatres are also in window.pediatresIndex
        if (toggles.pediatres && window.pediatresIndex?.[id]) {
            window.pediatresIndex[id].forEach(f => {
                const latlng = [f.geometry.coordinates[1], f.geometry.coordinates[0]];
                const m = window.pediatrePointToLayer(f, latlng);
                if (m) m.addTo(layers.pediatres);
            });
        }
    });

    // Special case: Mairies are also a global layer but rendered only in viewport for performance if many, 
    // but here we have ~2000 so we can just render those in viewport.
    if (toggles.mairies && window.mairiesData) {
        window.mairiesData.features.forEach(f => {
            const latlng = [f.geometry.coordinates[1], f.geometry.coordinates[0]];
            if (window.map.getBounds().contains(latlng)) {
                const m = window.mairiePointToLayer(f, latlng);
                if (m) m.addTo(layers.mairies);
            }
        });
    }
    
    // transitLines handled at top


    // Populate GPE layer
    if (toggles.gpe && window.gpeStationsData) {
        window.gpeStationsData.forEach(s => {
            const latlng = [s.lat, s.lon];
            if (window.map.getBounds().contains(latlng)) {
                const m = window.gpePointToLayer(s, latlng);
                if (m) m.addTo(window.gpeLayer);
            }
        });
    }

    for (const key in layers) {
        const layer = layers[key];
        if (!layer || key === 'transitLines') continue;
        if (toggles[key]) {
            if (!window.map.hasLayer(layer)) window.map.addLayer(layer);
        } else {
            window.map.removeLayer(layer);
        }
    }

    if (window.updateTransactionsVisibility) window.updateTransactionsVisibility();
    if (window.updateCentreVilleVisibility) window.updateCentreVilleVisibility();
    if (window.updateWalkingLabelsZoom) window.updateWalkingLabelsZoom();

    // Refresh IRIS style (for the zoom check)
    if (window.geojsonLayer) {
        window.geojsonLayer.setStyle(style);
    }
}





window.transactionLayer = L.markerClusterGroup({
    maxClusterRadius: 40,
    clusterPane: 'poiPane',
    iconCreateFunction: function (cluster) {
        return L.divIcon({
            html: `<div class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-lg text-[10px] font-bold">${cluster.getChildCount()}</div>`,
            className: 'custom-cluster',
            iconSize: [32, 32]
        });
    }
}).addTo(window.map);

window.updateTransactionsVisibility = function() {
    if (!window.transactionLayer || !window.bakedTransactions || !window.map) return;
    
    const isChecked = document.getElementById('show-transactions')?.checked;
    if (!isChecked) {
        window.transactionLayer.clearLayers();
        return;
    }

    const zoom = window.map.getZoom();
    if (zoom < 12) {
        window.transactionLayer.clearLayers();
        return; // Only show transactions when zoomed in (12 is reasonable)
    }

    window.transactionLayer.clearLayers();

    const budget = parseInt(document.getElementById('budget-input')?.value || 2000000); 
    const currentType = window.currentPropertyType || 'all';

    const visibleIds = getVisibleInseeCodes();
    
    visibleIds.forEach(id => {
        const d = window.bakedTransactions[id];
        if (!d) return;

        let list = [];
        if (currentType === 'all') {
            list = [...(d.house || []), ...(d.apt || [])];
        } else if (currentType === 'house') {
            list = d.house || [];
        } else if (currentType === 'apt') {
            list = d.apt || [];
        }

        list.forEach(t => {
            if (t.price > budget * 1.1) return; // Allow 10% margin for budget
            
            const isMatch = t.price <= budget; 
            const marker = L.marker([t.lat, t.lng], {
                icon: L.divIcon({
                    html: `<div class="w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-xl border-2 transition-transform transform hover:scale-110
                           ${isMatch ? 'bg-green-500 border-white text-white' : 'bg-[#0f172a] border-white text-white'}">
                        ${t.type === 'Maison' ? '🏠' : '🏢'}
                    </div>`,
                    className: '',
                    iconSize: [28, 28],
                    iconAnchor: [14, 14]
                }),
                pane: 'poiPane'
            });

            marker.bindPopup(`<div class="p-4 font-sans">
                <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">${t.type} • ${t.date}</div>
                <div class="text-xl font-black text-[#0f172a]">${new Intl.NumberFormat('fr-FR').format(t.price)} €</div>
                <div class="text-sm font-bold text-blue-600 mb-2">${t.sqm} m² • ${Math.round(t.price / t.sqm)} €/m²</div>
                <div class="text-[11px] text-gray-500 border-t border-gray-100 pt-2 font-medium mb-3">${t.addr || 'Adresse non répertoriée'}</div>
                <a href="https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${t.lat},${t.lng}" target="_blank" 
                   class="flex items-center justify-center gap-1.5 w-full py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-lg text-[9px] font-bold transition-all uppercase tracking-tight">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    Street View
                </a>
            </div>`);

            window.transactionLayer.addLayer(marker);
        });
    });
};

window.renderActiveLayers = renderActiveLayers;
window.updateStationsVisibility = renderActiveLayers;
window.updateSchoolsVisibility = renderActiveLayers;
window.updateCommercesVisibility = renderActiveLayers;
window.updateLoisirsVisibility = renderActiveLayers;
window.updateMairiesVisibility = renderActiveLayers;

window.toggleGroup = function(groupId, isChecked) {
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
};

window.updateChildState = function(groupId) {
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
                        ${isMaison ? '🏠' : '🏢'}
                    </div>
                    <div>
                        <div class="text-[11px] font-bold text-gray-900">${t.type} • ${t.rooms}p • ${t.sqm} m²</div>
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((t.addr || '').replace('.0 ', ' '))}" target="_blank" class="text-[9px] text-blue-500 hover:underline font-medium mb-0.5 block">📍 ${(t.addr || '').replace('.0 ', ' ')}</a>
                        <div class="text-[9px] text-gray-400 font-semibold uppercase tracking-tight">${dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </div>
                </div>
                <div class="flex flex-col items-end gap-1.5">
                    <div class="text-right">
                        <div class="text-[12px] font-extrabold text-gray-900">${new Intl.NumberFormat('fr-FR').format(t.price)} €</div>
                        <div class="text-[9px] font-bold ${isMatch ? 'text-green-600' : 'text-blue-600'}">${new Intl.NumberFormat('fr-FR').format(priceSqm)} €/m²</div>
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
                        dashArray: '5 5'
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
        qpvLayer.addTo(map);
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
                        dashArray: '3 6'
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
        zspLayer.addTo(map);
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
        let centerIcon = '🏢';
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
                    opacity: 0.8
                },
                pane: 'naturePane',
                interactive: false
            });
        }
        
        if (window.espacesVertsLayer && !map.hasLayer(window.espacesVertsLayer)) {
            window.espacesVertsLayer.addTo(map);
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
                style: function(feature) {
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
                interactive: false
            });
        }
        
        if (window.osmContextLayer && !map.hasLayer(window.osmContextLayer)) {
            window.osmContextLayer.addTo(map);
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
        if (!map.hasLayer(osmPathsLayer)) map.addLayer(osmPathsLayer);
    } else {
        if (osmPathsLayer) map.removeLayer(osmPathsLayer);
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

        if (!map.hasLayer(vifLayer)) map.addLayer(vifLayer);
    } else {
        if (vifLayer) map.removeLayer(vifLayer);
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
            window.gpeLinesLayer.addTo(map);
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
        
        if (score >= 0 && !matchData.excluded) {
            let isVisible = true;
            let maxWait = 0;
            
            // Replicate commute and filter logic to only list visible matched IRIS
            if (window.activeWorkplaces && window.activeWorkplaces.length > 0) {
                for (const wp of window.activeWorkplaces) {
                    const cached = window.precomputedJourneysRaw?.[insee]?.[wp.id];
                    const duration = cached ? cached.duration : 999;
                    maxWait = Math.max(maxWait, duration);

                    if (duration > wp.limit * 1.1) {
                        isVisible = false;
                    }
                    if (cached && cached.itinerary) {
                        const usedModes = (cached.itinerary || []).map(step => (step.type || "").toLowerCase());
                        const hasForbiddenMode = usedModes.some(m => !wp.modes.includes(m));
                        if (hasForbiddenMode) isVisible = false;
                    }
                    if (cached) {
                        const totalWalkMeters = (cached.firstMile || 0) + (cached.lastMile || 0);
                        const walkTimeMin = totalWalkMeters / 83;
                        if (walkTimeMin > wp.walkLimit) isVisible = false;
                    }
                }
            }

            let filterKey = 'bad';
            if (score > 80) filterKey = 'excellent';
            else if (score > 65) filterKey = 'good';
            else if (score > 45) filterKey = 'decent';
            else if (score > 25) filterKey = 'average';
            else if (score > 10) filterKey = 'poor';

            if (window.activeScoreFilters && !window.activeScoreFilters[filterKey]) isVisible = false;

            if (isVisible) {
                validIris.push({
                    feature: f,
                    score: score,
                    matchData: matchData,
                    name: f.properties.nom || getCommuneName(f.properties),
                    communeName: getCommuneName(f.properties),
                    code: insee
                });
            }
        }
    });

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

    if (window.topNeighborhoods.length === 0) {
        if (container) container.innerHTML = '<div class="p-8 text-center text-gray-400 text-xs italic">Aucun quartier ne correspond à votre recherche ou à vos critères.</div>';
        if (content) content.classList.remove('hidden');
        return;
    }

    if (content) content.classList.remove('hidden');
    if (container) {
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

window.drawCityBoundaries = function(communeName) {
    if (!window.communeHighlightLayer) return;
    window.communeHighlightLayer.clearLayers();
    
    // Find codes from search index or directly from map features
    const communeInfo = window.searchIndex ? window.searchIndex.communes.find(c => c.name === communeName) : null;
    
    if (communeInfo) {
        window.activeCommuneCodes = communeInfo.codes.map(String);
    } else {
        // Fallback: collect codes from the map itself
        const codes = new Set();
        if (window.allNeighborhoods) {
            window.allNeighborhoods.forEach(f => {
                if (getCommuneName(f.properties, f.id || f.properties.code) === communeName) {
                    codes.add(String(f.properties.code || f.id));
                }
            });
        }
        window.activeCommuneCodes = Array.from(codes);
    }
    
    window.activeCommuneName = communeName;

    // Refresh coloring of all neighborhoods to reflect new active city
    if (window.geojsonLayer) window.geojsonLayer.setStyle(style);

    // Collect features from geojsonData using the same commune name extraction logic
    const cityFeatures = [];
    if (window.allNeighborhoods) {
        window.allNeighborhoods.forEach(f => {
            if (getCommuneName(f.properties, f.id || f.properties.code) === communeName) {
                cityFeatures.push(f);
            }
        });
    }

    if (cityFeatures && cityFeatures.length > 0) {
        try {
            // HYPER-RESILIENT UNION with Gap Bridging
            let merged = null;
            
            // Step 1: Incremental union with tiny buffer to bridge gaps
            cityFeatures.forEach((feature, i) => {
                try {
                    // Buffer(0.00001) to bridge microscopic topological gaps
                    const buffered = turf.buffer(feature, 0.0001, { units: 'kilometers' });
                    
                    if (!merged) {
                        merged = buffered;
                    } else {
                        const nextMerged = turf.union(merged, buffered);
                        if (nextMerged) {
                            merged = nextMerged;
                        }
                    }
                } catch (err) {
                    console.warn(`⚠️ Union failed for IRIS ${i}, skipping...`, err);
                }
            });

            // Step 2: Buffer back to original size (approx)
            if (merged) {
                try {
                    merged = turf.buffer(merged, -0.0001, { units: 'kilometers' }) || merged;
                } catch (e) {
                    console.warn("Buffer back failed", e);
                }
            }

            if (merged) {
                console.log(`✅ Drawing hyper-resilient boundary for ${communeName}`);
                L.geoJSON(merged, {
                    pane: 'topPane',
                    style: {
                        color: '#1e293b',
                        weight: 6,
                        opacity: 1,
                        fillOpacity: 0,
                        interactive: false,
                        className: 'commune-boundary-highlight'
                    }
                }).addTo(window.communeHighlightLayer);
            } else {
                console.error(`❌ Total failure to create boundary for ${communeName}`);
            }
        } catch (e) {
            console.error("Critical error in drawCityBoundaries", e);
        }
    }

    // Show City Badge
    const badge = document.getElementById('city-badge');
    const badgeName = document.getElementById('city-badge-name');
    if (badge && badgeName) {
        badgeName.innerText = communeName;
        badge.classList.remove('hidden');
    }

    // Refresh city centers for the new city
    if (window.updateCentreVilleVisibility) window.updateCentreVilleVisibility();
};

window.selectCity = function(communeName) {
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

window.selectNeighborhoodByCode = function(code) {
    if (!geojsonLayer) return;
    geojsonLayer.eachLayer(layer => {
        if (layer.feature.properties.code === code) {
            map.flyTo(layer.getBounds().getCenter(), 15);
            setTimeout(() => {
                layer.fire('click');
            }, 500);
        }
    });
};

window.openComparison = function() {
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
                        <div class="mt-2 text-[10px] text-gray-500 font-medium italic">${m.categories.immo?.details?.price || ''} €/m² est.</div>
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

window.closeComparison = function() {
    document.getElementById('comparison-modal').classList.add('hidden');
};

window.updateTopMatches = updateTopMatches;

// --- UTILS: SPARKLINE RENDERER ---
window.renderSparkline = function(data) {
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
                <span class="text-[9px] font-black text-blue-600">+${Math.round((data[data.length-1]/data[0] - 1)*100)}%</span>
            </div>
            <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="overflow-visible mt-1">
                <path d="M ${points}" fill="none" stroke="currentColor" class="text-blue-500" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="${width}" cy="${height - ((data[data.length-1] - min) / range) * height}" r="3" class="fill-blue-600" />
            </svg>
            <div class="flex justify-between text-[7px] text-gray-300 font-bold mt-1">
                <span>2020</span>
                <span>2024</span>
            </div>
        </div>
    `;
};

window.renderHistoricalTrend = function(houseData, aptData) {
    if ((!houseData || houseData.length < 2) && (!aptData || aptData.length < 2)) return '';
    
    const allData = [...(houseData || []), ...(aptData || [])].filter(v => v !== null && !isNaN(v));
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
    
    const housePoints = getPoints(houseData);
    const aptPoints = getPoints(aptData);
    
    const houseTrend = houseData ? Math.round((houseData[houseData.length-1]/houseData[0] - 1)*100) : 0;
    const aptTrend = aptData ? Math.round((aptData[aptData.length-1]/aptData[0] - 1)*100) : 0;

    return `
        <div class="flex flex-col gap-3 my-2 p-3 bg-white/40 backdrop-blur-md rounded-xl border border-white/50 shadow-xs">
            <div class="flex justify-between items-center">
                <span class="text-[8px] text-slate-500 font-black uppercase tracking-widest">Évolution 5 ans</span>
                <div class="flex gap-2">
                    ${houseData && houseData.some(v => v > 0) ? `
                    <div class="flex items-center gap-1">
                        <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span class="text-[7px] font-black text-emerald-700">Maisons (${houseTrend >= 0 ? '+' : ''}${houseTrend}%)</span>
                    </div>` : ''}
                    ${aptData && aptData.some(v => v > 0) ? `
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
                    <line x1="0" y1="${height/2}" x2="${width}" y2="${height/2}" stroke="#f1f5f9" stroke-width="1" />
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
