import fs from 'fs';
import * as turf from '@turf/turf';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const PILLS = [
    { key: 'boulangerie_count', excellence: 'boulangerie_excellence', query: 'boulangerie artisanale' },
    { key: 'boucherie_count', excellence: 'boucherie_excellence', query: 'boucherie charcuterie' },
    { key: 'fromagerie_count', excellence: 'fromagerie_excellence', query: 'fromagerie' },
    { key: 'picard_count', excellence: 'picard_excellence', query: 'Picard' },
    { key: 'deli_count', excellence: 'deli_excellence', query: 'épicerie fine traiteur' },
    { key: 'restaurant_count', excellence: 'restaurant_excellence', query: 'restaurant' },
    { key: 'culture_count', excellence: 'culture_excellence', query: 'cinéma théâtre musée' },
    { key: 'pharmacie_count', excellence: 'pharmacie_excellence', query: 'pharmacie' },
    { key: 'bio_count', excellence: 'bio_excellence', query: 'magasin bio' },
    { key: 'shopping_count', excellence: 'shopping_excellence', query: 'boutique' },
    { key: 'supermarket_count', excellence: 'supermarket_excellence', query: 'supermarché' },
    { key: 'has_market', excellence: 'excellence_market', query: 'marché' }
];

async function checkExcellence(lat, lon, query) {
    if (!GOOGLE_MAPS_API_KEY) {
        // Mock logic if no API key: 15% chance of excellence for demo
        return Math.random() > 0.85;
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=500&keyword=${encodeURIComponent(query)}&key=${GOOGLE_MAPS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            return data.results.some(place => place.rating >= 4.8);
        }
        return false;
    } catch (e) {
        console.error(`Error checking excellence for ${query}:`, e);
        return false;
    }
}

async function run() {
    console.log("💎 Starting Excellence Enrichment...");
    const filePath = 'public/city_centers.geojson';
    if (!fs.existsSync(filePath)) {
        console.error("File not found:", filePath);
        return;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const features = data.features;

    if (!GOOGLE_MAPS_API_KEY) {
        console.warn("⚠️ No GOOGLE_MAPS_API_KEY found in environment. Using MOCK data for demonstration.");
    }

    let enrichedCount = 0;
    for (let i = 0; i < features.length; i++) {
        const feature = features[i];
        const props = feature.properties;
        const centroid = turf.centroid(feature).geometry.coordinates;
        const lon = centroid[0];
        const lat = centroid[1];

        console.log(`Processing ${props.name} (${i + 1}/${features.length})...`);

        for (const pill of PILLS) {
            const isPresent = props[pill.key] > 0 || props[pill.key] === true;
            if (isPresent) {
                const isExcellent = await checkExcellence(lat, lon, pill.query);
                if (isExcellent) {
                    props[pill.excellence] = true;
                    enrichedCount++;
                }
            }
        }
        
        // Small delay to respect API rate limits if using real key
        if (GOOGLE_MAPS_API_KEY) await new Promise(r => setTimeout(r, 100));
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✨ Finished! Enriched ${enrichedCount} pills with excellence status.`);
}

run().catch(err => console.error(err));
