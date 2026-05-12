import fs from 'fs';

const data = JSON.parse(fs.readFileSync('public/baked_index.json', 'utf8'));
const inseePrefix = '93032';
const targetCategories = ['boulangerie', 'boucherie', 'butcher', 'fromagerie', 'cheese', 'supermarket', 'supermarche', 'supermarché', 'pharmacie', 'restaurant', 'cafe', 'bar', 'pub', 'commerces'];

const points = [];
for (const iris in data.points) {
    if (iris.startsWith(inseePrefix)) {
        const irisData = data.points[iris];
        if (irisData.commerces) {
            irisData.commerces.forEach(f => {
                const cat = (f.properties.category || '').toLowerCase();
                if (targetCategories.includes(cat)) {
                    points.push({
                        name: f.properties.name,
                        cat: cat,
                        coords: f.geometry.coordinates
                    });
                }
            });
        }
    }
}

console.log(`Found ${points.length} points in Gagny.`);
points.forEach(p => console.log(`- ${p.name} (${p.cat}) at ${p.coords}`));
