import { ACUTETOX, RDT, textIds } from '$lib/reportIds.js';

const scrapeRDT = (txt, textId) => {

    const regexRepeatedDoseToxicity =
        /3\.3\.5[.]*\s+Repeated dose toxicity[\s\S]*?(?=3\.3\.6[.]*\s+Mutagenicity \/ Genotoxicity)/g;

    const alt_regexRepeatedDoseToxicity =
        /3\.4\.4[.]*\s+Repeated dose toxicity[\s\S]*?(?=3\.4\.6[.]*\s+Mutagenicity \/ genotoxicity)/g;

    const rdtMatchesIter = txt.matchAll(regexRepeatedDoseToxicity)
    console.log('rdtMatchesIter', rdtMatchesIter)
    const rdtMatches = [...rdtMatchesIter];
    const rdtText = rdtMatches[rdtMatches.length - 1]?.[0];
    console.log('rdtText', rdtText)

    if (rdtText === undefined) throw new Error('No RDT text found')


    let pattern = /Guideline:[\s\S]*?Ref\.*:* \d+\s/gm;
    const guidelineMatchesRDTIter = rdtText?.matchAll(pattern);
    console.log('guidelineMatchesRDTIter', guidelineMatchesRDTIter)

    let matchesRDT = [...guidelineMatchesRDTIter].map((d, i) => ({
        id: `${textId}-rdt-${i}`,
        txt: d[0], type: RDT
    }))
    // console.log('matchesRDT\n', matchesRDT);
    return matchesRDT;
};


const scrapeAcuteTox = (txt, textId) => {
    const regexAcuteToxicity =
        /3\.3\.1[.]*\s+Acute toxicity[\s\S]*?(?=3\.3\.2[.]*\s*Irritation and corrosivity)/g;

    const alt_regexAcuteToxicity =
        /3\.3\.1[.]*\s+Acute toxicity[\s\S]*?(?=3\.3\.2[.]*\s*Irritation and corrosivity)/g;

    const acuteToxMatches = [...txt.matchAll(regexAcuteToxicity)];
    console.log('acuteToxMatches', acuteToxMatches)
    if (acuteToxMatches.length === 0) throw new Error('No Acute Toxicity text found')

    const acuteToxicityTxt = [...acuteToxMatches][acuteToxMatches.length - 1]?.[0];

    let pattern = /Guideline:[\s\S]*?Ref\.*:*\s\d+\s/gm;
    const tmp = acuteToxicityTxt?.matchAll(pattern)
    // console.log('txt', txt.slice(0, 20))
    let matchesAcuteToxicity = [...acuteToxicityTxt?.matchAll(pattern)].map((d, i) => ({
        id: `${textId}-acute-${i}`,
        txt: d[0],
        type: ACUTETOX
    }));

    return matchesAcuteToxicity;
    // return
};

const fetchData = ((fetch, textId) => {
    console.log('fetching data...', textId)
    const prs = [
        // fetch('/sccs_o_277.txt').then((response) => response.text()),
        fetch('/sccs_o_044.txt').then((response) => response.text()),
        fetch('/sccs_o_040.txt').then((response) => response.text()),
        fetch('/sccs_o_059.txt').then((response) => response.text()),
        fetch('/sccs_o_082.txt').then((response) => response.text()),
        fetch('/sccs_o_087.txt').then((response) => response.text()),
        fetch('/sccs_o_180.txt').then((response) => response.text()),
        fetch('/sccs_o_195.txt').then((response) => response.text())
        // fetch('/sccs_o_222.txt').then((response) => response.text())
        // const promise230 = fetch('/sccs_o_230.txt').then((response) => response.text());
    ];

    return Promise.all([...prs]).then((values) => {
        const tmpMap0 = new Map();
        values.forEach((v, i) => {
            tmpMap0.set(textIds[i], v);
        });
        const originalTxtsMap = tmpMap0;

        const tmpMap1 = new Map();
        values.forEach((v, i) => {
            tmpMap1.set(textIds[i], {
                id: textId, rdt: scrapeRDT(v, textId), acuteTox: scrapeAcuteTox(v, textId), text: v.replace(/\r/g, '\n')
            });
        });
        return { scrapedTxtsMap: tmpMap1, originalTxtsMap, textIds }
    });

    // const prs = [
    //     fetch('/sccs_o_044.txt').then((response) => response.text()),
    //     fetch('/sccs_o_040.txt').then((response) => response.text()),
    //     fetch('/sccs_o_059.txt').then((response) => response.text()),
    //     fetch('/sccs_o_082.txt').then((response) => response.text()),
    //     fetch('/sccs_o_087.txt').then((response) => response.text()),
    //     fetch('/sccs_o_180.txt').then((response) => response.text()),
    //     fetch('/sccs_o_195.txt').then((response) => response.text())
    //     // fetch('/sccs_o_222.txt').then((response) => response.text())
    //     // const promise230 = fetch('/sccs_o_230.txt').then((response) => response.text());
    // ];

    // Promise.all([...prs]).then((values) => {
    //     const tmpMap0 = new Map();
    //     values.forEach((v, i) => {
    //         tmpMap0.set(textIds[i], v);
    //     });

    //     const tmpMap1 = new Map();
    //     values.forEach((v, i) => {
    //         tmpMap1.set(textIds[i], { rdt: scrapeRDT(v), acuteTox: scrapeAcuteTox(v) });
    //     });
    //     // console.log('tmpMap0', tmpMap0)
    // });
});

export async function load({ params, fetch, url }) {
    return { ...await fetchData(fetch, params.textId), url }
}