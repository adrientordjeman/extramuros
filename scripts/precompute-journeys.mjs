import fs from 'fs';
import path from 'path';

// Bastille and Saint-Lazare exact coordinates
const TARGETS = {
    "bastille": { lon: 2.3688, lat: 48.8532 }
};

const API_KEY = "41Yg0ZQ1MuGlIHfwEXrY0vGFhjQKngcv";
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'precomputed_journeys.json');
const GEOJSON_FILE = path.join(process.cwd(), 'public', 'idf-quartiers.geojson');
const CONCURRENCY = 5;

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const normalize = (str) => (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function processJourney(j, targetName, distKm) {
    const duration = Math.round(j.duration / 60);

    let firstMile = 0;
    for (const s of j.sections) {
        if (s.type === "public_transport") break;
        firstMile += s.duration || 0;
    }
    firstMile = Math.round(firstMile / 60);

    let lastMile = 0;
    for (let i = j.sections.length - 1; i >= 0; i--) {
        const s = j.sections[i];
        if (s.type === "public_transport") break;
        lastMile += s.duration || 0;
    }
    lastMile = Math.round(lastMile / 60);

    const itinerary = j.sections
        .filter(s => s.type === "public_transport" && s.display_informations)
        .map(s => {
            let code = s.display_informations.code;
            let color = s.display_informations.color || "EEEEEE";
            let textColor = s.display_informations.text_color || "000000";
            let netNorm = normalize(s.display_informations.network);
            let modeNorm = normalize(s.display_informations.commercial_mode || s.display_informations.physical_mode || "");

            let type = "other";
            if (netNorm.includes("rer") || modeNorm.includes("rer")) type = "rer";
            else if (netNorm.includes("metro") || modeNorm.includes("metro") || netNorm.includes("ratp")) type = "metro";
            else if (netNorm.includes("tram") || modeNorm.includes("tram")) type = "tram";
            else if (netNorm.includes("transilien") || modeNorm.includes("train") || netNorm.includes("sncf") || modeNorm.includes("rail")) type = "train";
            else if (modeNorm.includes("bus") || netNorm.includes("bus")) type = "bus";

            if (type === "other" && (netNorm.includes("ratp") || modeNorm.includes("ratp"))) type = "metro";

            if (type === "tram" && !code.toLowerCase().startsWith('t')) {
                code = 'T' + code;
            }

            let duration = s.duration || 0;
            return { code, color, textColor, type, duration };
        });

    let sections = [];
    j.sections.forEach((s, idx) => {
        let sectionShape = [];
        let source = "none";

        if (s.path && s.path.length > 0) {
            sectionShape.push(...s.path.filter(p => p.lat !== null && p.lng !== null).map(p => [p.lat, p.lng]));
            source = "path";
        } else if (s.geojson && s.geojson.coordinates) {
            source = "geojson-" + s.geojson.type;
            if (s.geojson.type === 'LineString') {
                sectionShape.push(...s.geojson.coordinates.filter(c => c[0] !== null && c[1] !== null).map(c => [c[1], c[0]]));
            } else if (s.geojson.type === 'MultiLineString') {
                s.geojson.coordinates.forEach(ls => {
                    sectionShape.push(...ls.filter(c => c[0] !== null && c[1] !== null).map(c => [c[1], c[0]]));
                });
            }
        }

        let type = s.type;
        let color = '#94a3b8';
        let code = '';
        
        if (s.display_informations) {
            color = s.display_informations.color ? `#${s.display_informations.color}` : '#2563eb';
            code = s.display_informations.code || '';
            let netNorm = normalize(s.display_informations.network);
            let modeNorm = normalize(s.display_informations.commercial_mode || s.display_informations.physical_mode || "");
            
            if (netNorm.includes("rer") || modeNorm.includes("rer")) type = "rer";
            else if (netNorm.includes("metro") || modeNorm.includes("metro") || netNorm.includes("ratp")) type = "metro";
            else if (netNorm.includes("tram") || modeNorm.includes("tram")) type = "tram";
            else if (netNorm.includes("transilien") || modeNorm.includes("train") || netNorm.includes("sncf") || modeNorm.includes("rail")) type = "train";
            else if (modeNorm.includes("bus") || netNorm.includes("bus")) type = "bus";
        }

        if (sectionShape.length > 0) {
            sections.push({
                type,
                color,
                code,
                duration: Math.round((s.duration || 0) / 60),
                shape: sectionShape
            });
        }
    });

    return { 
        duration, 
        firstMile, 
        lastMile, 
        itinerary: itinerary.length > 0 ? itinerary : null,
        sections: sections.length > 0 ? sections : null
    };
}

async function run() {
    console.log("Loading Local Grands Quartiers GeoJSON...");
    const geojsonData = fs.readFileSync(GEOJSON_FILE, 'utf8');
    const data = JSON.parse(geojsonData);

    let precomputed = {};
    if (fs.existsSync(OUTPUT_FILE)) {
        console.log("Found existing precomputed data. Resuming...");
        precomputed = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    }

    let totalCalls = 0;
    let skipped = 0;

    const queue = data.features.map(f => {
        let rawInsee = f.properties.code;
        const insee = Array.isArray(rawInsee) ? String(rawInsee[0]) : String(rawInsee);
        return { insee, feature: f };
    }).filter(item => {
        const { insee } = item;
        if (!insee || insee === "undefined") return false;

        // Skip if already has both main and alternate for Bastille
        if (precomputed[insee]?.bastille?.main && precomputed[insee]?.bastille?.alternate) {
            skipped++;
            return false;
        }
        return true;
    });

    console.log(`Processing ${queue.length} IRIS features (skipped ${skipped})...`);

    const processItem = async (item) => {
        const { insee, feature } = item;
        
        // Compute rough centroid
        let minx = 180, maxx = -180, miny = 90, maxy = -90;
        const coords = feature.geometry.coordinates.flat(Infinity);
        for (let i = 0; i < coords.length; i += 2) {
            if (coords[i] < minx) minx = coords[i];
            if (coords[i] > maxx) maxx = coords[i];
            if (coords[i + 1] < miny) miny = coords[i + 1];
            if (coords[i + 1] > maxy) maxy = coords[i + 1];
        }
        const centroid = { lon: (minx + maxx) / 2, lat: (miny + maxy) / 2 };

        if (!precomputed[insee]) precomputed[insee] = {};

        for (const [targetName, wp] of Object.entries(TARGETS)) {
            const distKm = Math.sqrt(Math.pow(centroid.lon - wp.lon, 2) + Math.pow(centroid.lat - wp.lat, 2)) * 111;
            if (distKm * 2.5 + 5 > 150) { // Increased threshold for safety
                const fallbackDuration = Math.round(distKm / 5 * 60);
                precomputed[insee][targetName] = { 
                    main: { duration: Math.min(fallbackDuration, 180), firstMile: fallbackDuration, lastMile: 0, itinerary: [], shape: null }
                };
                continue;
            }

            try {
                const url = `https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys?from=${centroid.lon};${centroid.lat}&to=${wp.lon};${wp.lat}&data_freshness=base_schedule`;
                const apiRes = await fetch(url, { headers: { 'apikey': API_KEY } });
                const json = await apiRes.json();

                if (json && json.journeys && json.journeys.length > 0) {
                    const main = processJourney(json.journeys[0], targetName, distKm);
                    const alternate = json.journeys.length > 1 ? processJourney(json.journeys[1], targetName, distKm) : null;
                    
                    precomputed[insee][targetName] = { main, alternate };
                    console.log(`[OK] ${insee} -> ${targetName}: ${main.duration}m / ${alternate ? alternate.duration + 'm' : 'N/A'}`);
                } else {
                    const fallbackDuration = Math.round(distKm / 5 * 60);
                    precomputed[insee][targetName] = { 
                        main: { duration: Math.min(fallbackDuration, 120), firstMile: fallbackDuration, lastMile: 0, itinerary: [], shape: null } 
                    };
                }
            } catch (e) {
                console.error(`[ERR] ${insee} -> ${targetName}: ${e.message}`);
            }

            totalCalls++;
            if (totalCalls % 20 === 0) {
                fs.writeFileSync(OUTPUT_FILE, JSON.stringify(precomputed), 'utf8');
            }
        }
        await wait(200); // Small pause between batches
    };

    // Parallel execution with limit
    for (let i = 0; i < queue.length; i += CONCURRENCY) {
        const batch = queue.slice(i, i + CONCURRENCY);
        await Promise.all(batch.map(item => processItem(item)));
        console.log(`Progress: ${i + batch.length}/${queue.length}`);
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(precomputed), 'utf8');
    console.log(`Finished! Saved perfectly computed routes to ${OUTPUT_FILE}.`);
}

run().catch(console.error);
