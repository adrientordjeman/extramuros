const API_KEY = "41Yg0ZQ1MuGlIHfwEXrY0vGFhjQKngcv";
const url = `https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys?from=2.4842;48.8475&to=2.3688;48.8532&data_freshness=base_schedule`;

async function test() {
    const response = await fetch(url, { headers: { 'apikey': API_KEY } });
    const data = await response.json();
    if (data.journeys && data.journeys.length > 0) {
        const j = data.journeys[0];
        console.log("Sections count:", j.sections.length);
        j.sections.forEach((s, idx) => {
            console.log(`Section ${idx} (${s.type}): has path? ${!!s.path}, has geojson? ${!!s.geojson}`);
        });
    } else {
        console.log("No journeys found");
    }
}
test();
