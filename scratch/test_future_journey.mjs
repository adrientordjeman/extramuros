const API_KEY = "41Yg0ZQ1MuGlIHfwEXrY0vGFhjQKngcv";

async function testFutureJourney() {
    // From a place likely to benefit from GPE, e.g., Champigny-sur-Marne (Line 15)
    // To Bastille
    const from = "2.5117;48.8166"; 
    const to = "2.3688;48.8532";
    
    // Test for a date in 2030
    const futureDate = "20300101T080000";
    const url = `https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys?from=${from}&to=${to}&datetime=${futureDate}&data_freshness=base_schedule`;

    console.log(`Querying: ${url}`);
    
    const res = await fetch(url, { headers: { 'apikey': API_KEY } });
    const json = await res.json();
    
    if (json.journeys && json.journeys.length > 0) {
        console.log("Found journey!");
        const j = json.journeys[0];
        console.log(`Duration: ${Math.round(j.duration / 60)} mins`);
        j.sections.forEach(s => {
            if (s.display_informations) {
                console.log(`Line ${s.display_informations.code} (${s.display_informations.network})`);
            }
        });
    } else {
        console.log("No journey found for 2030.");
    }
}

testFutureJourney();
