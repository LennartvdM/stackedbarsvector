// Chart data and global parameters

// Chart data structure
const chartData = {
    leadership: {
        title: "Leiderschap",
        items: [
            { label: "De top heeft zich verbonden (is gecommitteerd) aan de doelstellingen en het beleid voor meer mensen met herkomst Buiten-Europa", score: 4 },
            { label: "De top draagt het belang van culturele-diversiteit actief uit", score: 2 },
            { label: "De top stuurt aanwijsbaar op het bereiken van de gewenste resultaten", score: 1 },
            { label: "De top stelt voldoende middelen (financiën, personeel, technologie) ter beschikking om de doelstellingen te kunnen realiseren", score: 4 },
            { label: "De top neemt eindverantwoordelijkheid voor het culturele diversiteitsbeleid", score: 2 }
        ]
    },
    hr: {
        title: "HR Management",
        items: [
            { label: "De organisatie zet bewust maatwerkinstrumenten en regelingen in om de doorstroom van mensen met herkomst Buiten-Europa te bevorderen", score: 4 },
            { label: "Bij de werving van kandidaten voor top- en subtopfuncties wordt doelbewust gestuurd naar culturele diversiteit", score: 4 },
            { label: "Subjectiviteit en stereotypering worden tegengegaan door transparante en objectieve selectieprocedures", score: 3 },
            { label: "Onze arbeidsmarktcommunicatie reflecteert ons streven naar culturele diversiteit", score: 2 },
            { label: "Begeliding van de carrière-ontwikkeling van mensen met herkomst Buiten-Europa door opleiding en management-development", score: 4 },
            { label: "Begeliding van de carrière-ontwikkeling van mensen met herkomst Buiten-Europa door middel van coaching en mentoring", score: 3 },
            { label: "Effectiviteit van onze HR-maatregelen ten behoeve het realiseren van culturele diversiteit wordt gemeten om beleid te kunnen verbeteren", score: 4 },
            { label: "Het aandeel met herkomst Buiten-Europa naar functieniveau en naar afdeling wordt gemeten", score: 4 },
            { label: "Bij de personeels-/successieplanning wordt doelbewust gestuurd naar het realiseren van culturele diversiteit", score: 3 },
            { label: "Ondersteuning van de carrièreontwikkeling van mensen met herkomst Buiten-Europa door netwerken", score: 3 },
            { label: "Ondersteuning van de carrièreontwikkeling van mensen met herkomst Buiten-Europa door rolmodellen", score: 3 },
            { label: "Ons streven naar meer mensen met herkomst Buiten-Europa in de top is geïntegreerd in al onze diversiteitsbeleid", score: 3 },
            { label: "Door empowerment worden mensen met herkomst Buiten-Europa gestimuleerd tot carrièreontwikkeling vanuit eigen kracht", score: 2 },
            { label: "Ongewenste uitstroom van talentvolle mensen met herkomst Buiten-Europa wordt voorkomen", score: 1 }
        ]
    },
    strategy: {
        title: "Strategie en Management",
        items: [
            { label: "Culturele diversiteit is een business case voor onze organisatie", score: 4 },
            { label: "De organisatie streeft expliciete doelstellingen voor het aandeel mensen met herkomst Buiten-Europa in de top na", score: 4 },
            { label: "Vastgelegd is hoe deze doelstellingen bereikt gaan worden en op welke termijn", score: 3 },
            { label: "Bedrijfsonderdelen (business units, afdelingen, teams) rapporteren over het realiseren van culturele diversiteitsdoelstellingen", score: 4 },
            { label: "Leidinggevenden worden beoordeeld op het realiseren van culturele diversiteits-doelstellingen in het kader van de periodieke beoordeling", score: 4 },
            { label: "Wij evalueren met vastgestelde regelmaat (bijvoorbeeld elk kwartaal) de resultaten van ons culturele diversiteitsbeleid", score: 3 },
            { label: "De uitkomsten van evaluaties worden gebruikt om ons culturele diversiteitsbeleid te verbeteren", score: 3 },
            { label: "Wij vergelijken ons culturele diversiteitsbeleid met dat van andere organisaties", score: 4 }
        ]
    },
    communication: {
        title: "Communicatie",
        items: [
            { label: "Interne communicatie streven aantal mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 4 },
            { label: "Externe communicatie streven mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 4 },
            { label: "Interne communicatie aantal mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 4 },
            { label: "Externe communicatie aantal mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 3 },
            { label: "Mensen met een niet-Westerse migratieachtergrond in hogere functies zichtbaar in woord en beeld", score: 3 }
        ]
    },
    knowledge: {
        title: "Kennis en Vaardigheden",
        items: [
            { label: "Inzicht in bevorderende maatregelen culturele diversiteit", score: 3 },
            { label: "Inzicht in belemmerende maatregelen culturele diversiteit", score: 3 },
            { label: "Leidinggevenden bewust van meerwaarde culturele diversiteit", score: 3 },
            { label: "Leidinggevenden bewust van mechanismen belemmering", score: 3 },
            { label: "Leidinggevenden zetten maatregelen doorstroom in", score: 3 },
            { label: "Gebruik beschikbare kennis en ervaring voor verbetering", score: 4 },
            { label: "MTO gebruiken voor sturen op culturele diversiteit", score: 4 },
            { label: "Organisatie kent vertrekredenen en gebruikt deze voor behoud", score: 2 }
        ]
    },
    climate: {
        title: "Klimaat",
        items: [
            { label: "Stereotypen/discriminatie actief bestreden", score: 4 },
            { label: "Inzet van maatregelen investeren culturele diversiteit geaccepteerd", score: 4 },
            { label: "Culturele verschillen in gehele organisatie erkend en gewaardeerd", score: 3 },
            { label: "Aandacht culturele diversiteit leeft", score: 3 },
            { label: "Leidinggevenden verantwoordelijk voor culturele diversiteit", score: 3 },
            { label: "Organisatie gezien als culturele diversiteitsminded", score: 3 }
        ]
    }
};

// Global parameters
let params = {
    fontScale: 1.0,
    padding: 15,
    lineHeight: 1.3,
    barHeight: 25,
    barSpacing: 5,
    columnWidth: 70
};

// Utility functions for data manipulation
function randomizeData() {
    Object.keys(chartData).forEach(key => {
        chartData[key].items.forEach(item => {
            item.score = Math.floor(Math.random() * 4) + 1;
        });
    });
    
    if (window.updateAllCharts) {
        window.updateAllCharts();
    }
}

function resetData() {
    // Reset to original scores (you could store originals separately)
    // For now, just randomize again
    randomizeData();
} 