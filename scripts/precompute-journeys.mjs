import fs from 'fs';
import path from 'path';

// Bastille and Saint-Lazare exact coordinates
const TARGETS = {
    "bastille": { lon: 2.3688, lat: 48.8532 }
};

const API_KEY = "41Yg0ZQ1MuGlIHfwEXrY0vGFhjQKngcv";
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'precomputed_journeys.json');
const GEOJSON_FILE = path.join(process.cwd(), 'public', 'idf-quartiers.geojson');

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

    console.log("Filtering features for Nogent-sur-Marne (94052)...");
    const filteredFeatures = data.features.filter(feature => {
        let rawInsee = feature.properties.code;
        const insee = Array.isArray(rawInsee) ? String(rawInsee[0]) : String(rawInsee);
        return insee && insee.startsWith('94052');
    });

    for (const feature of filteredFeatures) {
        let rawInsee = feature.properties.code;
        const insee = Array.isArray(rawInsee) ? String(rawInsee[0]) : String(rawInsee);
        if (!insee || insee === "undefined") continue;

        console.log(`Processing IRIS ${insee}...`);
        
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
            // Force re-calculation to get shapes
            console.log(`  -> ${targetName}`);
            // Rough haversine optimization
            const distKm = Math.sqrt(Math.pow(centroid.lon - wp.lon, 2) + Math.pow(centroid.lat - wp.lat, 2)) * 111;
            if (distKm * 2.5 + 5 > 100) {
                precomputed[insee][targetName] = { duration: 999, itinerary: [] };
                continue;
            }

            try {
                // FIXED ENDPOINT (Home -> Work)
                const url = `https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys?from=${centroid.lon};${centroid.lat}&to=${wp.lon};${wp.lat}&data_freshness=base_schedule`;
                const apiRes = await fetch(url, { headers: { 'apikey': API_KEY } });
                const json = await apiRes.json();

                if (json && json.journeys && json.journeys.length > 0) {
                    const j = json.journeys[0];
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
                            const normalize = (str) => (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            let netNorm = normalize(s.display_informations.network);
                            let modeNorm = normalize(s.display_informations.commercial_mode || s.display_informations.physical_mode || "");

                            let type = "other"; // Default to other to avoid accidental Bus blocking
                            if (netNorm.includes("rer") || modeNorm.includes("rer")) type = "rer";
                            else if (netNorm.includes("metro") || modeNorm.includes("metro") || netNorm.includes("ratp")) type = "metro";
                            else if (netNorm.includes("tram") || modeNorm.includes("tram")) type = "tram";
                            else if (netNorm.includes("transilien") || modeNorm.includes("train") || netNorm.includes("sncf") || modeNorm.includes("train") || modeNorm.includes("rail")) type = "train";
                            else if (modeNorm.includes("bus") || netNorm.includes("bus")) type = "bus";

                            // Specific fix for Paris Metro which might just say 'RATP' or 'Parcours RATP'
                            if (type === "other" && (netNorm.includes("ratp") || modeNorm.includes("ratp"))) type = "metro";

                            // Fix: Ensure Tramway codes start with T
                            if (type === "tram" && !code.toLowerCase().startsWith('t')) {
                                code = 'T' + code;
                            }

                            let duration = s.duration || 0;
                            return { code, color, textColor, type, duration };
                        });

                    // Extract sections with their shapes
                    let sections = [];
                    j.sections.forEach(s => {
                        let sectionShape = [];
                        if (s.path && s.path.length > 0) {
                            sectionShape.push(...s.path.filter(p => p.lat !== null && p.lng !== null).map(p => [p.lat, p.lng]));
                        } else if (s.geojson && s.geojson.coordinates) {
                            if (s.geojson.type === 'LineString') {
                                sectionShape.push(...s.geojson.coordinates.filter(c => c[0] !== null && c[1] !== null).map(c => [c[1], c[0]]));
                            } else if (s.geojson.type === 'MultiLineString') {
                                s.geojson.coordinates.forEach(ls => {
                                    sectionShape.push(...ls.filter(c => c[0] !== null && c[1] !== null).map(c => [c[1], c[0]]));
                                });
                            }
                        }

                        let type = s.type; // 'walking', 'waiting', 'public_transport', etc.
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

                    console.log(`    -> Sections extracted: ${sections.length}`);

                    precomputed[insee][targetName] = { 
                        duration, 
                        firstMile, 
                        lastMile, 
                        itinerary: itinerary.length > 0 ? itinerary : null,
                        sections: sections.length > 0 ? sections : null
                    };
                } else {
                    const fallbackDuration = Math.round(distKm / 5 * 60); // Distance / Speed * 60
                    precomputed[insee][targetName] = { duration: Math.min(fallbackDuration, 120), firstMile: fallbackDuration, lastMile: 0, itinerary: [], shape: null }; // Set as walking only
                }
            } catch (e) {
                const fallbackDuration = Math.round(distKm / 5 * 60);
                precomputed[insee][targetName] = { duration: Math.min(fallbackDuration, 120), firstMile: fallbackDuration, lastMile: 0, itinerary: [], shape: null };
            }


            totalCalls++;
            // Save state progressively so the frontend can use it immediately!
            if (totalCalls % 10 === 0) {
                fs.writeFileSync(OUTPUT_FILE, JSON.stringify(precomputed), 'utf8');
            }
            if (totalCalls % 100 === 0) console.log(`Processed ${totalCalls} routes...`);

            // ONLY WAIT IF WE MADE AN API CALL
            await wait(150);
        }
    }



    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(precomputed), 'utf8');
    console.log(`Finished! Saved perfectly computed routes to ${OUTPUT_FILE}. Skipped ${skipped} existing routes.`);

}

run().catch(console.error);
