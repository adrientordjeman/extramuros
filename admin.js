// List of available data sources with enhanced metadata
const dataSources = [
    {
        category: "Limites Administratives",
        files: [
            { 
                name: "Communes (Optimisé)", 
                path: "/idf-quartiers-optimized.geojson", 
                type: "geojson",
                publisher: "Etalab / IGN",
                frequency: "Annuel",
                description: "Limites administratives des communes d'Île-de-France, optimisées pour le web."
            },
            { 
                name: "Centres Villes", 
                path: "/city_centers.geojson", 
                type: "geojson",
                publisher: "Calculé (Scripts)",
                frequency: "À chaque mise à jour",
                description: "Polygones représentant les centres-villes calculés par clustering de commerces."
            },
            { 
                name: "Quartiers Prioritaires (QPV)", 
                path: "/qpv-idf.geojson", 
                type: "geojson",
                publisher: "ANCT",
                frequency: "Annuel (2024)",
                description: "Périmètres des quartiers prioritaires de la politique de la ville."
            },
            { 
                name: "Zones Sensibles (ZSP)", 
                path: "/zsp.geojson", 
                type: "geojson",
                publisher: "Ministère de l'Intérieur",
                frequency: "Ponctuel",
                description: "Zones de Sécurité Prioritaires."
            }
        ]
    },
    {
        category: "Mobilité & Transports",
        files: [
            { 
                name: "Gares & Stations", 
                path: "/stations.geojson", 
                type: "geojson",
                publisher: "IDFM (Île-de-France Mobilités)",
                frequency: "Mensuel",
                description: "Points d'arrêt et gares de tous les modes de transport en Île-de-France."
            },
            { 
                name: "Lignes de Transport", 
                path: "/transit_lines_simplified.geojson", 
                type: "geojson",
                publisher: "IDFM / OpenStreetMap",
                frequency: "Mensuel",
                description: "Tracés simplifiés des lignes de transport (RER, Métro, Train)."
            },
            { 
                name: "Réseau Métro (Détaillé)", 
                path: "/metro_lines.geojson", 
                type: "geojson",
                publisher: "IDFM",
                frequency: "Mensuel",
                description: "Tracés complets du réseau de métro parisien."
            },
            { 
                name: "Grand Paris Express (Lignes)", 
                path: "/gpe_lines.geojson", 
                type: "geojson",
                publisher: "Société des Grands Projets",
                frequency: "Annuel",
                description: "Futurs tracés des lignes 15, 16, 17 et 18 du Grand Paris Express."
            },
            { 
                name: "Pistes Cyclables (OSM)", 
                path: "/amenagements-velo-en-ile-de-france0.geojson", 
                type: "geojson",
                publisher: "OpenStreetMap",
                frequency: "Temps réel",
                description: "Réseau cyclable francilien extrait d'OSM."
            }
        ]
    },
    {
        category: "Commerces & Services",
        files: [
            { 
                name: "Commerces (Global)", 
                path: "/commerces.geojson", 
                type: "geojson",
                publisher: "OpenStreetMap",
                frequency: "Temps réel",
                description: "Points d'intérêt commerciaux (boulangeries, restaurants, etc.)."
            },
            { 
                name: "Équipements (Amenities)", 
                path: "/amenities.geojson", 
                type: "geojson",
                publisher: "OpenStreetMap",
                frequency: "Temps réel",
                description: "Services et équipements publics (postes, mairies, etc.)."
            },
            { 
                name: "Écoles", 
                path: "/schools.geojson", 
                type: "geojson",
                publisher: "Education Nationale",
                frequency: "Annuel",
                description: "Emplacement des écoles, collèges et lycées."
            }
        ]
    },
    {
        category: "Cadre de Vie & Environnement",
        files: [
            { 
                name: "Espaces Verts", 
                path: "/espaces-verts-et-boises-surfaciques-ouverts-ou-en-projets-douverture-au-public.geojson", 
                type: "geojson",
                publisher: "Région Île-de-France",
                frequency: "Annuel",
                description: "Inventaire des espaces verts ouverts ou en projet."
            },
            { 
                name: "Nature (Global)", 
                path: "/nature.json", 
                type: "json",
                publisher: "OpenStreetMap / Région",
                frequency: "Annuel",
                description: "Données agrégées sur les espaces naturels et la biodiversité."
            },
            { 
                name: "Ilots de Chaleur (ICU)", 
                path: "/ilots-de-chaleur-urbains-icu-classification-des-imu-en-zone-climatique-locale-lc.geojson", 
                type: "geojson",
                publisher: "Institut Paris Région",
                frequency: "Pluriannuel",
                description: "Classification des zones climatiques locales pour la résilience thermique."
            },
            { 
                name: "Infrastructures de Bruit", 
                path: "/noise_infra.geojson", 
                type: "geojson",
                publisher: "Bruitparif",
                frequency: "Pluriannuel",
                description: "Zones d'impact sonore lié aux infrastructures de transport terrestres."
            }
        ]
    },
    {
        category: "Santé",
        files: [
            { 
                name: "Pédiatres (Points)", 
                path: "/pediatres.geojson", 
                type: "geojson",
                publisher: "Ameli / BPE",
                frequency: "Annuel",
                description: "Emplacement des cabinets de pédiatrie."
            },
            { 
                name: "Pédiatres par IRIS", 
                path: "/pediatres_by_iris.json", 
                type: "json",
                publisher: "Calculé",
                frequency: "À chaque mise à jour",
                description: "Nombre de pédiatres agrégés par quartier IRIS."
            }
        ]
    },
    {
        category: "Index & Statistiques",
        files: [
            { 
                name: "Index Précalculé", 
                path: "/baked_index.json", 
                type: "json",
                publisher: "Calculé (preindex.py)",
                frequency: "À chaque mise à jour",
                description: "Index global regroupant points d'intérêt, voisins et transactions par IRIS."
            },
            { 
                name: "Prix de l'Immobilier (DVF)", 
                path: "/idf_prices.json", 
                type: "json",
                publisher: "Etalab (DVF)",
                frequency: "Semestriel",
                description: "Prix médians et volumes de ventes immobilières agrégés par commune."
            },
            { 
                name: "Trajets Précalculés", 
                path: "/precomputed_journeys.json", 
                type: "json",
                publisher: "Calculé (Valhalla)",
                frequency: "Statique",
                description: "Temps de trajet pré-calculés vers les hubs principaux."
            },
            { 
                name: "Sécurité (Communes)", 
                path: "/commune_safety.json", 
                type: "json",
                publisher: "SSMSI",
                frequency: "Annuel",
                description: "Statistiques de délinquance agrégées par commune."
            }
        ]
    },
    {
        category: "Données Brutes (CSV)",
        files: [
            { 
                name: "INSEE: Activité & Résidents", 
                path: "/data/base-ic-activite-residents-2022.CSV", 
                type: "csv",
                publisher: "INSEE",
                frequency: "Annuel",
                description: "Statistiques détaillées sur l'activité économique et les résidents par IRIS."
            },
            { 
                name: "INSEE: Familles & Ménages", 
                path: "/data/base-ic-couples-familles-menages-2022.CSV", 
                type: "csv",
                publisher: "INSEE",
                frequency: "Annuel",
                description: "Statistiques sur la structure des familles et des ménages par IRIS."
            },
            { 
                name: "INSEE: Revenus (Filosofi)", 
                path: "/data/filosofi_idf.csv", 
                type: "csv",
                publisher: "INSEE",
                frequency: "Annuel",
                description: "Données sur les revenus et la pauvreté agrégées par IRIS."
            },
            { 
                name: "INSEE: Logement", 
                path: "/data/logement_idf.csv", 
                type: "csv",
                publisher: "INSEE",
                frequency: "Annuel",
                description: "Statistiques sur le parc de logements et les modes d'occupation."
            },
            { 
                name: "INSEE: Logement (Complet 2022)", 
                path: "/data/base-ic-logement-2022_csv/base-ic-logement-2022.CSV", 
                type: "csv",
                publisher: "INSEE",
                frequency: "Annuel",
                description: "Données exhaustives sur le logement, incluant l'équipement automobile (VOIT1P, VOIT2P)."
            },
            { 
                name: "Usage des Sols (MOS)", 
                path: "/data/mos_iris.csv", 
                type: "csv",
                publisher: "Institut Paris Région",
                frequency: "Quadriennal",
                description: "Mode d'Occupation du Sol agrégé par quartier IRIS."
            }
        ]
    }
];

let previewMap = null;
let codeFilesCache = {};

// Utility: Format bytes
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Utility: Syntax Highlight JSON
function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

// Function to find code usage
async function findCodeUsage(path) {
    const usageContainer = document.getElementById('usage-list');
    usageContainer.innerHTML = '<div class="text-[10px] text-slate-400 animate-pulse">Recherche dans le code...</div>';
    
    const filesToScan = ['/main.js', '/index.html', '/scripts/compute-prices.py', '/scripts/preindex.py']; 
    const filename = path.split('/').pop();
    const results = [];

    for (const fileUrl of filesToScan) {
        try {
            if (!codeFilesCache[fileUrl]) {
                const res = await fetch(fileUrl);
                codeFilesCache[fileUrl] = await res.text();
            }
            const content = codeFilesCache[fileUrl];
            const lines = content.split('\n');
            lines.forEach((line, index) => {
                if (line.includes(filename)) {
                    results.push({
                        file: fileUrl.split('/').pop(),
                        line: index + 1,
                        text: line.trim()
                    });
                }
            });
        } catch (e) {
            console.error(`Could not scan ${fileUrl}:`, e);
        }
    }

    if (results.length === 0) {
        usageContainer.innerHTML = '<div class="text-[10px] text-slate-400 italic">Aucune référence directe trouvée dans le code client.</div>';
    } else {
        usageContainer.innerHTML = results.map(r => `
            <div class="group flex flex-col p-1.5 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[10px] font-bold text-blue-600 font-mono">${r.file}:L${r.line}</span>
                </div>
                <div class="text-[9px] text-slate-500 font-mono truncate" title="${r.text}">${r.text}</div>
            </div>
        `).join('');
    }
}

// Initialize Map
function initMap() {
    if (previewMap) return;
    previewMap = L.map('map-preview', {
        zoomControl: false
    }).setView([48.8566, 2.3522], 10);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(previewMap);
    L.control.zoom({ position: 'bottomright' }).addTo(previewMap);
}

// Update Map Preview
function updateMapPreview(geojsonData) {
    const mapSection = document.getElementById('map-section');
    mapSection.classList.remove('hidden');
    
    initMap();
    
    // Clear existing layers
    previewMap.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON) {
            previewMap.removeLayer(layer);
        }
    });

    try {
        const geoLayer = L.geoJSON(geojsonData, {
            style: {
                color: "#2563eb",
                weight: 2,
                opacity: 0.6,
                fillColor: "#3b82f6",
                fillOpacity: 0.2
            },
            pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillColor: "#2563eb",
                    color: "#fff",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        }).addTo(previewMap);

        const bounds = geoLayer.getBounds();
        if (bounds.isValid()) {
            previewMap.fitBounds(bounds, { padding: [20, 20] });
        }
    } catch (e) {
        console.error("Map preview error:", e);
        mapSection.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sourcesListContainer = document.getElementById('sources-list');
    const searchInput = document.getElementById('source-search');
    
    // Render the sidebar
    function renderSidebar(filter = "") {
        sourcesListContainer.innerHTML = '';
        const lowerFilter = filter.toLowerCase();

        dataSources.forEach(category => {
            const matchedFiles = category.files.filter(f => 
                f.name.toLowerCase().includes(lowerFilter) || 
                f.path.toLowerCase().includes(lowerFilter)
            );

            if (matchedFiles.length === 0) return;

            const group = document.createElement('div');
            group.innerHTML = `
                <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">${category.category}</h3>
                <div class="flex flex-col gap-1 mb-4">
                    ${matchedFiles.map(file => `
                        <button onclick="previewSource('${file.path}', '${file.name}', '${file.type}')" 
                                class="source-btn text-left px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm border border-transparent hover:border-blue-100 transition-all group flex items-center gap-2">
                            <span class="text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                                ${file.type === 'geojson' ? '🌍' : file.type === 'json' ? '📦' : '📊'}
                            </span>
                            <div class="flex flex-col overflow-hidden">
                                <span class="font-bold truncate text-xs">${file.name}</span>
                                <span class="text-[8px] text-slate-400 font-mono truncate">${file.path}</span>
                            </div>
                        </button>
                    `).join('')}
                </div>
            `;
            sourcesListContainer.appendChild(group);
        });
    }

    renderSidebar();

    searchInput.addEventListener('input', (e) => {
        renderSidebar(e.target.value);
    });
});

window.previewSource = async function(path, name, type) {
    // Update UI states
    document.getElementById('empty-state').classList.add('hidden');
    document.getElementById('content-state').classList.add('hidden');
    document.getElementById('loading-state').classList.remove('hidden');
    document.getElementById('map-section').classList.add('hidden');

    // Highlight selected button
    document.querySelectorAll('.source-btn').forEach(btn => btn.classList.remove('bg-white', 'text-blue-600', 'shadow-sm', 'border-blue-100'));
    const clickedBtn = Array.from(document.querySelectorAll('.source-btn')).find(b => b.innerText.includes(name));
    if (clickedBtn) clickedBtn.classList.add('bg-white', 'text-blue-600', 'shadow-sm', 'border-blue-100');

    // Find file info
    const sourceInfo = dataSources.flatMap(c => c.files).find(f => f.path === path);
    
    // Update Header & Metadata
    document.getElementById('preview-title').innerText = name;
    document.getElementById('preview-path').innerText = path;
    document.getElementById('meta-publisher').innerText = sourceInfo?.publisher || 'Inconnu';
    document.getElementById('meta-frequency').innerText = sourceInfo?.frequency || 'Statique';
    document.getElementById('meta-description').innerText = sourceInfo?.description || 'Aucune description disponible.';
    
    // Start code usage search
    findCodeUsage(path);

    let typeLabel = type.toUpperCase();
    let typeColor = type === 'geojson' ? 'bg-green-100 text-green-700' : (type === 'json' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700');
    
    const typeBadge = document.getElementById('preview-type');
    typeBadge.className = `text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${typeColor}`;
    typeBadge.innerText = typeLabel;

    try {
        const response = await fetch(path);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const sizeBytes = new Blob([text]).size;
        
        document.getElementById('preview-size').innerText = formatBytes(sizeBytes);

        const container = document.getElementById('preview-container');
        container.innerHTML = ''; // Clear
        container.classList.add('whitespace-pre');

        if (type === 'json' || type === 'geojson') {
            try {
                const data = JSON.parse(text);
                
                // If GeoJSON, update map
                if (type === 'geojson') {
                    updateMapPreview(data);
                }

                // Truncate logic
                let previewData = data;
                let truncated = false;

                if (Array.isArray(data)) {
                    if (data.length > 50) {
                        previewData = data.slice(0, 50);
                        truncated = true;
                    }
                } else if (data.type === "FeatureCollection" && data.features) {
                    if (data.features.length > 30) {
                        previewData = { ...data, features: data.features.slice(0, 30) };
                        truncated = true;
                    }
                }

                let html = syntaxHighlight(previewData);
                if (truncated) {
                    html += '\n<span class="text-slate-400 italic">... (Données tronquées pour l\'aperçu) ...</span>';
                }

                container.innerHTML = html;
            } catch (e) {
                container.innerHTML = `<span class="text-red-500 font-bold">Erreur de parsing JSON:</span>\n${e.message}`;
            }

        } else if (type === 'csv') {
            Papa.parse(text, {
                header: true,
                preview: 50,
                skipEmptyLines: true,
                complete: function(results) {
                    const headers = results.meta.fields;
                    if (!headers) {
                        container.innerHTML = `<span class="text-slate-400 italic">Format CSV non reconnu.</span>\n\n${text.substring(0, 500)}`;
                        return;
                    }

                    let tableHtml = `
                        <div class="w-full overflow-x-auto">
                            <table class="w-full text-left text-[9px] border-collapse">
                                <thead>
                                    <tr class="bg-slate-100 border-b border-slate-200">
                                        ${headers.map(h => `<th class="px-2 py-1.5 font-bold text-slate-700 whitespace-nowrap">${h}</th>`).join('')}
                                    </tr>
                                </thead>
                                <tbody>
                                    ${results.data.map(row => `
                                        <tr class="border-b border-slate-100 hover:bg-white">
                                            ${headers.map(h => `<td class="px-2 py-1 whitespace-nowrap text-slate-600 truncate max-w-[150px]">${row[h] || ''}</td>`).join('')}
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `;
                    container.classList.remove('whitespace-pre');
                    container.innerHTML = tableHtml;
                }
            });
        }

    } catch (e) {
        document.getElementById('preview-container').innerHTML = `<div class="text-red-500 font-bold">Erreur: ${e.message}</div>`;
    } finally {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('content-state').classList.remove('hidden');
        document.getElementById('content-state').classList.add('flex');
        
        if (type === 'geojson' && previewMap) {
            setTimeout(() => previewMap.invalidateSize(), 100);
        }
    }
}
