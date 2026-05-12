import fs from 'fs';

const data = JSON.parse(fs.readFileSync('public/baked_index.json', 'utf8'));
const mairies = [];

for (const iris in data.points) {
    const irisData = data.points[iris];
    if (irisData.amenities) {
        irisData.amenities.forEach(f => {
            const cat = (f.properties.category || '').toLowerCase();
            const type = (f.properties.type || '').toLowerCase();
            const name = (f.properties.name || '').toLowerCase();
            
            if (cat === 'townhall' || type === 'townhall' || name.includes('mairie')) {
                mairies.push(f);
            }
        });
    }
}

console.log(`Found ${mairies.length} mairies in baked_index.json.`);
if (mairies.length > 0) {
    console.log("Sample:", JSON.stringify(mairies[0], null, 2));
}
