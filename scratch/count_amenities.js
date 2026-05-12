import fs from 'fs';

const data = JSON.parse(fs.readFileSync('public/amenities.geojson', 'utf8'));
const counts = {};

data.features.forEach(f => {
    const cat = f.properties.category || 'unknown';
    counts[cat] = (counts[cat] || 0) + 1;
});

console.log(JSON.stringify(counts, null, 2));
