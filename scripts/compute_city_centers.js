import fs from 'fs';
import * as turf from '@turf/turf';

async function run() {
    console.log("Reading public/baked_index.json...");
    const rawData = fs.readFileSync('public/baked_index.json', 'utf8');
    const data = JSON.parse(rawData);
    
    console.log("Extracting commerce and attractivity points...");
    const targetCategories = [
        'boulangerie', 'boucherie', 'butcher', 'fromagerie', 'cheese', 
        'supermarket', 'supermarche', 'supermarché', 'pharmacie', 
        'restaurant', 'fast_food', 'cafe', 'bar', 'pub', 'commerces', 'épicerie', 'epicerie',
        'marche', 'market', 'convenience', 'grocery', 'bio', 'magasin bio',
        'poissonnerie', 'fleuriste', 'chocolatier', 'epicerie_fine',
        'primeur', 'habillement', 'jouets', 'chaussures',
        'cinema', 'theatre', 'museum', 'library', 'librairie', 'park', 'playground',
        'fitness_centre', 'stadium', 'culture', 'picard', 'surgeles', 'traiteur'
    ];
    
    const allPoints = data.points;
    const allCommercePoints = [];

    for (const irisCode in allPoints) {
        if (irisCode.startsWith('75')) continue;
        
        const irisData = allPoints[irisCode];
        
        const sourceLists = [
            irisData.commerces || [],
            irisData.amenities || [],
            irisData.culture || [],
            irisData.sport || [],
            irisData.marche || []
        ];

        sourceLists.forEach(list => {
            list.forEach(f => {
                const cat = (f.properties.category || '').toLowerCase();
                const type = (f.properties.type || '').toLowerCase();
                const name = (f.properties.name || '').toLowerCase();
                const isBio = cat.includes('bio') || name.includes('biocoop') || name.includes('naturalia');
                const isPicard = name.includes('picard') || cat === 'picard' || cat === 'surgeles';
                
                if (targetCategories.includes(cat) || targetCategories.includes(type) || isBio || isPicard) {
                    allCommercePoints.push(turf.point(f.geometry.coordinates, f.properties));
                }
            });
        });
    }

    console.log("Loading reference data (mairies, stations)...");
    const mairies = JSON.parse(fs.readFileSync('public/mairies.geojson', 'utf8'));
    const stations = JSON.parse(fs.readFileSync('public/stations.geojson', 'utf8'));

    const hulls = [];
    
    console.log(`Clustering ${allCommercePoints.length} points globally...`);
    
    const maxDist = 0.18; 
    const minPts = 15;   

    const collection = turf.featureCollection(allCommercePoints);
    const clustered = turf.clustersDbscan(collection, maxDist, { minPoints: minPts, units: 'kilometers' });

    const clusters = {};
    turf.featureEach(clustered, (currentFeature) => {
        const clusterId = currentFeature.properties.cluster;
        if (clusterId !== undefined) {
            if (!clusters[clusterId]) clusters[clusterId] = [];
            clusters[clusterId].push(currentFeature);
        }
    });

    console.log(`Found ${Object.keys(clusters).length} attractivity clusters. Generating polygons...`);

    for (const id in clusters) {
        const clusterPoints = clusters[id];
        const clusterCollection = turf.featureCollection(clusterPoints);
        
        // 1. Analyze Composition
        const cats = clusterPoints.map(p => (p.properties.category || p.properties.type || '').toLowerCase());
        const names = clusterPoints.map(p => (p.properties.name || '').toLowerCase());
        const foodieCount = cats.filter(c => ['boulangerie', 'boucherie', 'fromagerie', 'poissonnerie', 'primeur', 'bio', 'epicerie_fine', 'marche'].includes(c)).length;
        const cultureCount = cats.filter(c => ['cinema', 'theatre', 'museum', 'library', 'librairie', 'culture'].includes(c)).length;
        const retailCount = cats.filter(c => ['habillement', 'jouets', 'chaussures', 'commerces'].includes(c)).length;
        const marketCount = cats.filter(c => c === 'marche').length;
        
        // 2. Analyze Location
        const clusterCenter = turf.center(clusterCollection);
        const nearestMairie = mairies.features.length > 0 ? turf.nearestPoint(clusterCenter, mairies) : null;
        const distToMairie = nearestMairie ? turf.distance(clusterCenter, nearestMairie) : 999;
        
        const nearestStation = stations.features.length > 0 ? turf.nearestPoint(clusterCenter, stations) : null;
        const distToStation = nearestStation ? turf.distance(clusterCenter, nearestStation) : 999;
        
        // 3. Analyze Morphology (linearity)
        const envelope = turf.envelope(clusterCollection);
        const bbox = turf.bbox(envelope);
        const width = turf.distance([bbox[0], bbox[1]], [bbox[2], bbox[1]]);
        const height = turf.distance([bbox[0], bbox[1]], [bbox[0], bbox[3]]);
        const linearity = Math.max(width/height, height/width);

        // 4. Persona Assignment
        const total = clusterPoints.length;
        const foodieRatio = foodieCount / total;
        const transitRatio = cats.filter(c => ['cafe', 'bar', 'pub', 'fast_food', 'restaurant'].includes(c)).length / total;
        const commerceNames = names;
        
        const hasHighEndMarker = commerceNames.some(n => n.includes('bio') || n.includes('naturalia') || n.includes('biocoop') || n.includes('fine') || n.includes('chocolatier'));
        const hasTransitMarker = commerceNames.some(n => n.includes('gare') || n.includes('sncf') || n.includes('rer') || n.includes('relay'));
        const hasHistoricMarker = commerceNames.some(n => n.includes('mairie') || n.includes('église') || n.includes('eglise') || n.includes('château') || n.includes('halle') || n.includes('marché')) || cats.includes('marche');
        const hasCoveredMarket = clusterPoints.some(p => p.properties.category === 'marche' && p.properties.is_covered);

        let persona = "Pôle de Vie";
        let tagline = "Le cœur battant du quartier, vivant et équilibré.";

        const isStationHub = distToStation < 0.35 || hasTransitMarker || (transitRatio > 0.4 && total > 20);
        const isHistoricBourg = distToMairie < 0.25 || hasHistoricMarker || hasCoveredMarket || (foodieRatio > 0.35 && hasHighEndMarker);
        const isLinearAvenue = linearity > 2.2 && (retailCount > 8 || total > 40);

        if (isStationHub && !isHistoricBourg) {
            persona = "Pôle de Mobilité";
            tagline = "L'énergie du transit, services et flux quotidiens.";
        } else if (isHistoricBourg) {
            persona = "Cœur Historique";
            tagline = "L'âme du quartier, entre tradition et qualité de vie.";
        } else if (isLinearAvenue) {
            persona = "Axe Commerçant";
            tagline = "Le grand axe de flânerie et de shopping du quartier.";
        } else if (cultureCount > 2) {
            persona = "Quartier Culturel";
            tagline = "Un pôle d'attractivité riche en sorties et découvertes.";
        }

        // --- 4. HUMAN-READABLE NAMING ---
        let finalName = "";
        const rawMairieName = nearestMairie?.properties.nom || nearestMairie?.properties.name || "";
        let cleanCityName = rawMairieName.replace(/^(Hôtel de ville de |Mairie de |Mairie d'|Mairie |Hôtel de Ville )/i, "").trim();
        if (cleanCityName.toLowerCase() === "mairie" || cleanCityName.toLowerCase() === "hôtel de ville") cleanCityName = "";
        
        const rawStationName = nearestStation?.properties.nom_iv || nearestStation?.properties.nom_gares || nearestStation?.properties.name || "";
        const cleanStationName = rawStationName.replace(/^(Gare de |Gare d')/i, "").trim();

        if (persona === "Pôle de Mobilité" && cleanStationName) {
            finalName = `Pôle ${cleanStationName}`;
        } else if (persona === "Cœur Historique" && cleanCityName) {
            finalName = `Cœur Historique - ${cleanCityName}`;
        } else if (cleanCityName) {
            finalName = `Cœur de ${cleanCityName}`;
        } else if (cleanStationName) {
            finalName = `Aura ${cleanStationName}`;
        } else {
            finalName = "Aire d'Attractivité";
        }

        let zone = turf.concave(clusterCollection, { maxEdge: maxDist * 1.5, units: 'kilometers' });
        if (!zone) zone = turf.convex(clusterCollection);

        if (zone) {
            zone = turf.buffer(zone, 0.025, { units: 'kilometers' }); 
            zone = turf.simplify(zone, { tolerance: 0.0001 });

            const boulangerieCount = cats.filter(c => c === 'boulangerie').length;
            const boucherieCount = cats.filter(c => ['boucherie', 'butcher'].includes(c)).length;
            const fromagerieCount = cats.filter(c => ['fromagerie', 'cheese'].includes(c)).length;
            const pharmacieCount = cats.filter(c => c === 'pharmacie').length;
            const restaurantCount = cats.filter(c => ['restaurant', 'cafe', 'bar', 'pub'].includes(c)).length;
            const supermarketCount = cats.filter(c => ['supermarket', 'supermarche', 'supermarché', 'convenience', 'grocery', 'épicerie', 'epicerie'].includes(c)).length;
            const bioCount = cats.filter(c => c.includes('bio')).length;
            const picardCount = names.filter((n, i) => n.includes('picard') || cats[i] === 'picard' || cats[i] === 'surgeles').length;
            const deliCount = names.filter((n, i) => n.includes('traiteur') || n.includes('épicerie fine') || cats[i] === 'traiteur' || cats[i] === 'epicerie_fine').length;

            zone.properties = {
                type: 'attractivity_area',
                name: finalName,
                persona: persona,
                tagline: tagline,
                point_count: clusterPoints.length,
                foodie_ratio: Math.round((foodieCount / clusterPoints.length) * 100),
                culture_count: cultureCount,
                has_market: marketCount > 0,
                has_covered_market: hasCoveredMarket,
                boulangerie_count: boulangerieCount,
                boucherie_count: boucherieCount,
                fromagerie_count: fromagerieCount,
                pharmacie_count: pharmacieCount,
                restaurant_count: restaurantCount,
                supermarket_count: supermarketCount,
                shopping_count: retailCount,
                bio_count: bioCount,
                picard_count: picardCount,
                deli_count: deliCount
            };
            hulls.push(zone);
        }
    }

    fs.writeFileSync('public/city_centers.geojson', JSON.stringify(turf.featureCollection(hulls), null, 2));
    console.log(`Saved ${hulls.length} attractivity areas.`);
}

run().catch(err => console.error(err));
