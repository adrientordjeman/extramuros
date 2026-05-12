import fs from 'fs';
import * as turf from '@turf/turf';

async function list() {
    const cityCenters = JSON.parse(fs.readFileSync('public/city_centers.geojson', 'utf8'));
    const mairies = JSON.parse(fs.readFileSync('public/mairies.geojson', 'utf8'));
    const stations = JSON.parse(fs.readFileSync('public/stations.geojson', 'utf8'));

    const centersInfo = cityCenters.features.map((f, i) => {
        const center = turf.center(f);
        const nearestMairie = turf.nearestPoint(center, mairies);
        const nearestStation = turf.nearestPoint(center, stations);
        
        return {
            id: i,
            mairie: nearestMairie.properties.name || nearestMairie.properties.nom,
            station: nearestStation.properties.name || nearestStation.properties.nom,
            persona: f.properties.persona,
            point_count: f.properties.point_count,
            coords: center.geometry.coordinates
        };
    });

    console.log(JSON.stringify(centersInfo, null, 2));
}

list();
