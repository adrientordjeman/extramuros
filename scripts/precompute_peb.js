import fs from 'fs';
import * as turf from '@turf/turf';

async function run() {
    console.log("Reading files...");
    const quartiers = JSON.parse(fs.readFileSync('public/idf-quartiers-optimized.geojson', 'utf8'));
    const pebZones = ['za', 'zb', 'zc', 'zd'];
    const pebData = {};
    for (const zone of pebZones) {
        pebData[zone] = JSON.parse(fs.readFileSync(`public/peb_${zone}_4326.geojson`, 'utf8'));
    }

    const pebByIris = {};
    console.log(`Processing ${quartiers.features.length} neighborhoods...`);

    quartiers.features.forEach((f, index) => {
        if (index % 500 === 0) console.log(`Processed ${index}...`);
        const id = f.id || f.properties.code;
        const centroid = [f.properties.lon, f.properties.lat];
        if (!centroid[0] || !centroid[1]) return;

        const point = turf.point(centroid);
        
        // Check zones in order of severity
        for (const zone of pebZones) {
            const inZone = pebData[zone].features.some(pebFeat => {
                // Use pointInPolygon for speed, it's a good approximation
                return turf.booleanPointInPolygon(point, pebFeat);
            });
            if (inZone) {
                pebByIris[id] = zone;
                break;
            }
        }
    });

    fs.writeFileSync('public/peb_by_iris.json', JSON.stringify(pebByIris, null, 2));
    console.log(`Done! ${Object.keys(pebByIris).length} IRIS impacted.`);
}

run();
