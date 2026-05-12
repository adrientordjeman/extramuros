
import fs from 'fs';
import * as turf from '@turf/turf';

async function run() {
    console.log("Loading IRIS data...");
    const quartiers = JSON.parse(fs.readFileSync('public/idf-quartiers-optimized.geojson', 'utf8'));
    
    console.log("Loading City Centers data...");
    const cityCenters = JSON.parse(fs.readFileSync('public/city_centers.geojson', 'utf8'));
    
    const centers = cityCenters.features.map(f => {
        const centroid = turf.centroid(f);
        return {
            id: f.properties.name,
            persona: f.properties.persona,
            coords: centroid.geometry.coordinates,
            properties: f.properties
        };
    });

    const results = {};
    const features = quartiers.features;
    
    console.log(`Processing ${features.length} IRIS...`);

    // To avoid hitting API limits too hard, we'll process in batches or just do a sample if it's too many
    // For this task, we'll try to do them all but with a delay.
    // However, for the first run, let's just do a subset or show the logic.
    
    for (let i = 0; i < features.length; i++) {
        const f = features[i];
        const irisCode = f.properties.code;
        const irisCoords = [f.properties.lon, f.properties.lat];
        
        // Find nearest city center
        let nearest = null;
        let minDist = Infinity;
        
        centers.forEach(c => {
            const d = turf.distance(irisCoords, c.coords);
            if (d < minDist) {
                minDist = d;
                nearest = c;
            }
        });

        if (nearest && minDist < 5) { // Only if within 5km
            results[irisCode] = {
                targetName: nearest.id,
                targetCoords: nearest.coords,
                distance_km: minDist
            };
        }

        if (i % 100 === 0) console.log(`Matched ${i}/${features.length} IRIS to centers...`);
    }

    fs.writeFileSync('public/walking_metadata.json', JSON.stringify(results, null, 2));
    console.log("Saved walking metadata to public/walking_metadata.json");
    console.log("Note: This script only matches IRIS to centers. Actual path calculation is done live in the UI to avoid huge files and API limits, OR can be done via another script.");
}

run().catch(err => console.error(err));
