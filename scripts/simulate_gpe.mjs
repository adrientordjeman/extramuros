import fs from 'fs';
import path from 'path';

const GPE_STATIONS = [
    { name: "Saint-Denis Pleyel", lon: 2.345, lat: 48.921, lines: ["14", "15", "16", "17"], year: 2024 },
    { name: "Noisy-Champs", lon: 2.583, lat: 48.842, lines: ["11", "15", "16"], year: 2025 },
    { name: "Champigny Centre", lon: 2.502, lat: 48.815, lines: ["15"], year: 2025 },
    { name: "Pont de Sèvres", lon: 2.231, lat: 48.829, lines: ["9", "15"], year: 2025 },
    { name: "Issy RER", lon: 2.259, lat: 48.823, lines: ["15"], year: 2025 },
    { name: "Fort d'Issy - Vanves - Clamart", lon: 2.274, lat: 48.818, lines: ["15"], year: 2025 },
    { name: "Châtillon - Montrouge", lon: 2.301, lat: 48.810, lines: ["15"], year: 2025 },
    { name: "Bagneux", lon: 2.316, lat: 48.803, lines: ["15"], year: 2025 },
    { name: "Arcueil - Cachan", lon: 2.330, lat: 48.794, lines: ["15"], year: 2025 },
    { name: "Villejuif IGR", lon: 2.348, lat: 48.785, lines: ["14", "15"], year: 2025 },
    { name: "Villejuif Louis Aragon", lon: 2.367, lat: 48.778, lines: ["7", "15"], year: 2025 },
    { name: "Vitry Centre", lon: 2.393, lat: 48.788, lines: ["15"], year: 2025 },
    { name: "Les Ardoines", lon: 2.404, lat: 48.783, lines: ["15"], year: 2025 },
    { name: "Le Vert de Maisons", lon: 2.424, lat: 48.787, lines: ["15"], year: 2025 },
    { name: "Créteil L'Échat", lon: 2.450, lat: 48.796, lines: ["8", "15"], year: 2025 },
    { name: "Saint-Maur - Créteil", lon: 2.464, lat: 48.806, lines: ["15"], year: 2025 },
    { name: "Bry - Villiers - Champigny", lon: 2.531, lat: 48.831, lines: ["15"], year: 2025 },
    { name: "Chelles", lon: 2.585, lat: 48.875, lines: ["16"], year: 2028 },
    { name: "Clichy - Montfermeil", lon: 2.545, lat: 48.905, lines: ["16"], year: 2026 },
    { name: "Sevran - Livry", lon: 2.535, lat: 48.932, lines: ["16"], year: 2026 },
    { name: "Le Bourget RER", lon: 2.424, lat: 48.934, lines: ["16", "17"], year: 2026 },
    { name: "Le Blanc-Mesnil", lon: 2.455, lat: 48.935, lines: ["16"], year: 2026 },
    { name: "Aulnay", lon: 2.495, lat: 48.938, lines: ["16"], year: 2026 },
    { name: "Gonesse", lon: 2.438, lat: 48.986, lines: ["17"], year: 2028 },
    { name: "Parc des Expositions", lon: 2.518, lat: 48.973, lines: ["17"], year: 2028 },
    { name: "Aéroport CDG T2", lon: 2.571, lat: 49.004, lines: ["17"], year: 2030 },
    { name: "Orly Airport", lon: 2.365, lat: 48.728, lines: ["14", "18"], year: 2024 },
    { name: "Massy-Palaiseau", lon: 2.258, lat: 48.724, lines: ["18"], year: 2026 },
    { name: "Saint-Quentin Est", lon: 2.045, lat: 48.785, lines: ["18"], year: 2030 },
    { name: "Versailles Chantiers", lon: 2.135, lat: 48.795, lines: ["18"], year: 2030 }
];

// Journey times from GPE Hubs to Center targets
// Saint-Denis Pleyel -> Saint-Lazare: 7 mins (Line 14)
// Saint-Denis Pleyel -> Bastille: 15 mins (Line 14 to Chatelet + L1)
// Villejuif IGR -> Saint-Lazare: 15 mins (Line 14)
// Villejuif IGR -> Bastille: 20 mins (Line 14 to Chatelet + L1)
// Orly -> Saint-Lazare: 25 mins (Line 14)
// Orly -> Bastille: 30 mins (Line 14 to Chatelet + L1)
// Noisy-Champs -> Bastille: 20 mins (RER A) - Already exists, but GPE connects Noisy-Champs to other places.

const TARGETS = {
    "bastille": { lon: 2.3688, lat: 48.8532 },
    "saint-lazare": { lon: 2.3255, lat: 48.8753 }
};

// GPE synthetic travel times from station to Target
const GPE_TO_TARGET = {
    "saint-lazare": {
        "14": 5, // Extra time on L14 from hub
        "15": 15, // Average time from L15 Sud to L14/RER to St-Lazare
        "16": 12, // Average from L16 to St-Lazare
        "17": 20,
        "18": 30
    },
    "bastille": {
        "14": 15, // Via Chatelet
        "15": 20,
        "16": 25,
        "17": 30,
        "18": 40
    }
};

function getDistKm(p1, p2) {
    const dLat = (p2.lat - p1.lat) * 111;
    const dLon = (p2.lon - p1.lon) * 73; // Approx at Paris latitude
    return Math.sqrt(dLat * dLat + dLon * dLon);
}

async function run() {
    const geojsonData = JSON.parse(fs.readFileSync('public/idf-quartiers-optimized.geojson', 'utf8'));
    const precomputed = JSON.parse(fs.readFileSync('public/precomputed_journeys.json', 'utf8'));

    let updatedCount = 0;

    for (const feature of geojsonData.features) {
        const insee = feature.properties.code;
        const centroid = { lon: feature.properties.lon, lat: feature.properties.lat };

        if (!precomputed[insee]) continue;

        feature.properties.gpe = {};

        for (const targetName of ["bastille", "saint-lazare"]) {
            const current = precomputed[insee][targetName];
            if (!current) continue;

            let bestFuture = { duration: current.duration, station: null, year: null, line: null };

            for (const station of GPE_STATIONS) {
                const distToStation = getDistKm(centroid, station);
                // Assume 5km/h walking + possible bus connection. 
                // Let's say 20 mins max for a strong impact, but up to 30 mins for "benefit"
                const accessTime = Math.round(distToStation / 5 * 60); 

                if (accessTime > 30) continue; 

                for (const line of station.lines) {
                    const timeToTarget = GPE_TO_TARGET[targetName][line] || 30;
                    const totalFuture = accessTime + timeToTarget;

                    if (totalFuture < bestFuture.duration - 3) { // At least 3 mins gain
                        bestFuture = {
                            duration: totalFuture,
                            gain: current.duration - totalFuture,
                            station: station.name,
                            year: station.year,
                            line: line
                        };
                    }
                }
            }

            if (bestFuture.station) {
                feature.properties.gpe[targetName] = bestFuture;
                updatedCount++;
            }
        }
    }

    fs.writeFileSync('public/idf-quartiers-optimized.geojson', JSON.stringify(geojsonData), 'utf8');
    console.log(`Finished! Simulated GPE impact for ${updatedCount} neighborhood-target pairs.`);
}

run().catch(console.error);
