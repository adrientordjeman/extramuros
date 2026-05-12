import fs from 'fs';
import * as turf from '@turf/turf';

const rawData = fs.readFileSync('public/baked_index.json', 'utf8');
const data = JSON.parse(rawData);

const allPoints = data.points;
const fontenayCode = '94033';

const targetCategories = [
    'boulangerie', 'boucherie', 'butcher', 'fromagerie', 'cheese', 
    'supermarket', 'supermarche', 'supermarché', 'pharmacie', 
    'restaurant', 'cafe', 'bar', 'pub', 'commerces', 'épicerie', 'epicerie',
    'marche', 'market', 'convenience', 'grocery', 'bio', 'magasin bio'
];

for (const irisCode in allPoints) {
    if (irisCode.startsWith(fontenayCode)) {
        const irisData = allPoints[irisCode];
        if (irisData.commerces) {
            irisData.commerces.forEach(f => {
                const name = (f.properties.name || '').toLowerCase();
                const cat = (f.properties.category || '').toLowerCase();
                const isBio = cat.includes('bio') || name.includes('biocoop') || name.includes('naturalia');
                
                // Also check if it SHOULD have been included in the clustering
                const included = targetCategories.includes(cat) || isBio;
                
                if (included) {
                     console.log(`Included: ${f.properties.name} (${f.properties.category}) at ${f.geometry.coordinates}`);
                } else if (name.includes('bio') || cat.includes('bio')) {
                     console.log(`NOT INCLUDED BUT HAS BIO: ${f.properties.name} (${f.properties.category}) at ${f.geometry.coordinates}`);
                }
            });
        }
    }
}
