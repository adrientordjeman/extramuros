const props = {
    nom: "Montreuil",
    code: "930480604",
    all: { price: 6000, vol: 10 },
    nature: 40,
    noise: 30,
    demo: { social_pct: 15, family_pct: 20, young_pct: 25, senior_pct: 10 },
    vibes: { bobo: 70, village: 50 }
};

// Mock function for calculateMatchRate
function mockCalculateMatchRate(p) {
    const categories = {
        immo: { label: "Marché immobilier" },
        mobility: { label: "Mobilité" },
        env: { label: "Environnement" },
        services: { label: "Services du quotidien" },
        social: { label: "Sorties & Gastronomie" },
        infra: { label: "Infrastructures Municipales" },
        habitat: { label: "Type d'habitat" },
        safety: { label: "Sécurité" },
        socio: { label: "Profil Social" },
        demo: { label: "Démographie" }
    };
    return { categories };
}

const matchData = mockCalculateMatchRate(props);
console.log(Object.keys(matchData.categories));
