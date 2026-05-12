import fs from 'fs';

const INPUT_FILE = './public/precomputed_journeys.json';
const targetInsee = '940520104'; // Nogent-sur-Marne (Centre Ville)

const navitiaKey = '41Yg0ZQ1MuGlIHfwEXrY0vGFhjQKngcv';

async function process() {
    const data = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
    const quartiers = JSON.parse(fs.readFileSync('./public/idf-quartiers-optimized.geojson', 'utf8'));
    
    const feature = quartiers.features.find(f => f.properties.code === targetInsee);
    if (!feature) {
        console.log("Feature not found");
        return;
    }

    const { code, lat, lon } = feature.properties;
    const targetName = 'bastille';
    const targetLat = 48.8532;
    const targetLon = 2.3688;

    console.log(`Processing ${code} to ${targetName}...`);

    const url = `https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys?from=${lon};${lat}&to=${targetLon};${targetLat}&data_freshness=base_schedule`;
    const response = await fetch(url, { headers: { 'apikey': navitiaKey } });
    const navData = await response.json();

    if (navData.journeys && navData.journeys.length > 0) {
        const j = navData.journeys[0];
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

            let type = s.type;
            let color = '#94a3b8';
            let code = '';
            
            if (s.display_informations) {
                color = s.display_informations.color ? `#${s.display_informations.color}` : '#2563eb';
                code = s.display_informations.code || '';
                const mode = (s.display_informations.commercial_mode || s.display_informations.physical_mode || "").toLowerCase();
                if (mode.includes("rer")) type = "rer";
                else if (mode.includes("metro")) type = "metro";
                else if (mode.includes("bus")) type = "bus";
                else if (mode.includes("tram")) type = "tram";
                else if (mode.includes("train") || mode.includes("rail")) type = "train";
            }

            if (sectionShape.length > 0) {
                sections.push({ type, color, code, duration: Math.round((s.duration || 0) / 60), shape: sectionShape });
            }
        });

        data[targetInsee][targetName] = {
            duration: Math.round(j.duration / 60),
            sections: sections
        };
        
        fs.writeFileSync(INPUT_FILE, JSON.stringify(data), 'utf8');
        console.log("Updated JSON for Nogent-sur-Marne");
    } else {
        console.log("No journeys found");
    }
}

process();
