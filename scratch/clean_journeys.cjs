const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'precomputed_journeys.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let count = 0;
for (const insee in data) {
    for (const hub in data[insee]) {
        const journey = data[insee][hub];
        if (journey.shape && Array.isArray(journey.shape)) {
            const originalLength = journey.shape.length;
            journey.shape = journey.shape.filter(p => p && p[0] !== null && p[1] !== null);
            if (journey.shape.length !== originalLength) {
                count++;
            }
        }
    }
}

fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
console.log(`Cleaned ${count} shapes.`);
