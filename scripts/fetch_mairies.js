import fs from 'fs';

async function fetchMairies() {
    console.log("Fetching mairies from Overpass API...");
    // Bounding box for IDF (approx)
    const bbox = "48.1,1.4,49.3,3.6";
    const query = `[out:json][timeout:60];(node["amenity"="townhall"](${bbox});way["amenity"="townhall"](${bbox});relation["amenity"="townhall"](${bbox}););out center;`;
    
    const url = "https://overpass-api.de/api/interpreter";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'ExtraMurosDashboard/1.0'
        },
        body: "data=" + encodeURIComponent(query)
    });
    
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Overpass API error: ${response.status} ${response.statusText}\n${text}`);
    }
    
    const data = await response.json();
    console.log(`Received ${data.elements.length} elements.`);
    
    const features = data.elements.map(el => {
        const lat = el.lat || (el.center ? el.center.lat : null);
        const lon = el.lon || (el.center ? el.center.lon : null);
        if (lat === null || lon === null) return null;
        return {
            type: "Feature",
            id: el.id,
            geometry: {
                type: "Point",
                coordinates: [lon, lat]
            },
            properties: {
                name: el.tags.name || "Mairie",
                category: "mairie",
                type: "townhall",
                osm_id: el.id
            }
        };
    }).filter(f => f !== null);
    
    const geojson = {
        type: "FeatureCollection",
        features: features
    };
    
    fs.writeFileSync('public/mairies.geojson', JSON.stringify(geojson, null, 2));
    console.log("Saved to public/mairies.geojson");
}

fetchMairies().catch(err => console.error(err));
