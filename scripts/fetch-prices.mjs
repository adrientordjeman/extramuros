import fs from 'fs';
import path from 'path';

const CSV_URL = "https://static.data.gouv.fr/resources/indicateurs-immobiliers-par-commune-et-par-annee-prix-et-volumes-sur-la-periode-2014-2024/20250707-085855/communesdvf2024.csv";
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'idf_prices.json');

const IDF_DEPARTMENTS = ['75', '77', '78', '91', '92', '93', '94', '95'];

async function fetchAndProcess() {
    console.log(`Downloading CSV from ${CSV_URL}...`);
    const response = await fetch(CSV_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const text = await response.text();
    const lines = text.split('\n');
    console.log(`Downloaded ${lines.length} lines.`);

    // Expected headers: INSEE_COM,annee,nb_mutations,NbMaisons,NbApparts,PropMaison,PropAppart,PrixMoyen,Prixm2Moyen,SurfaceMoy
    const headers = lines[0].split(',');
    const inseeIdx = headers.indexOf('INSEE_COM');
    const priceIdx = headers.indexOf('Prixm2Moyen');

    if (inseeIdx === -1 || priceIdx === -1) {
        throw new Error("Could not find required columns in CSV");
    }

    const idfPrices = {};
    let matchedCount = 0;

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = line.split(',');
        const insee = parts[inseeIdx];
        const price = parseInt(parts[priceIdx], 10);

        if (insee && !isNaN(price)) {
            const dept = insee.substring(0, 2);
            if (IDF_DEPARTMENTS.includes(dept)) {
                idfPrices[insee] = price;
                matchedCount++;
            }
        }
    }

    // Ensure public directory exists
    const publicDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(idfPrices, null, 2), 'utf8');
    console.log(`Saved ${matchedCount} Ile-de-France commune prices to ${OUTPUT_FILE}`);
}

fetchAndProcess().catch(console.error);
