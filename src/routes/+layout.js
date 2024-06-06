import { ACUTETOX, RDT, textIds } from '$lib/reportIds.js';
export const prerender = false

// const guideLineRegex = /Guideline:[\s\S]*?Ref\.*:*\s\d+\s/gm;
// const scssCommentRegex = guideLineRegex
const scssCommentRegex = /^Comment[\s\S]*^(?=(\d.))/gm
// const guideLineRegex = /Guideline:[\s\S]*?Comment[\s\S]*?^(?=\d.)|Guideline:[\s\S]*?Ref[\s\S]*?/gm;
const guideLineRegex = /Guideline:[\s\S]*?([C|c]omment[s]?\s[\s\S]*?\d.)|Guideline[\s\S]*?Ref/gm;


const scrapeRDT = (txt, textId) => {

    const regexRepeatedDoseToxicity =
        /3\.\d\.\d[.]*\s+Repeated dose toxicity[\s\S]*?(?=3\.\d\.\d[.]*\s+Mutagenicity \/ [g|G]enotoxicity)/g;

    const alt_regexRepeatedDoseToxicity =
        /3\.\d\.\d[.]*\s+Repeated dose toxicity[\s\S]*?(?=3\.\d\.\d[.]*\s+Mutagenicity \/ [g|G]enotoxicity)/g;


    const rdtMatchesIter = txt.matchAll(regexRepeatedDoseToxicity)
    // console.log('rdtMatchesIter', rdtMatchesIter)
    const rdtMatches = [...rdtMatchesIter];
    const rdtText = rdtMatches[rdtMatches.length - 1]?.[0];
    // if (textId === 'sccs_o_230') console.log('rdtText', rdtText)

    if (rdtText === undefined) throw new Error('No RDT text found')


    // console.log('guidelineMatchesRDTIter', [...guidelineMatchesRDTIter])
    // const sccs = scssComments[scssComments.length - 1]?.[0];
    console.log('guideline match', [...rdtText?.matchAll(guideLineRegex)])

    let matchesRDT = [...rdtText?.matchAll(guideLineRegex)].map((d, i) => ({
        id: `${textId}-rdt-${i}`,
        txt: d[0]
        // txt: scssComments.find(e => {
        //     if (e[0].includes(d[0])) {
        //         console.log('hit')
        //         return true

        //     }
        //     return false
        // })?.[0] || d[0]
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
    if (acuteToxMatches.length === 0) throw new Error('No Acute Toxicity text found')

    const acuteToxicityTxt = [...acuteToxMatches][acuteToxMatches.length - 1]?.[0];
    // if (textId === 'sccs_o_230') console.log('acuteToxicityTxt', acuteToxicityTxt)
    // console.log('acuteToxMatch', [...acuteToxicityTxt?.matchAll(guideLineRegex)])

    // const guidRes = acuteToxicityTxt?.matchAll(pattern)

    // const guidelineMatches = [...guidRes].length > 0 ? [...guidRes] : [[rdtText]]
    // console.log('txt', txt.slice(0, 20))

    const scssComments = [...acuteToxicityTxt?.matchAll(scssCommentRegex)]
    // if (scssComments.length > 0)
    //     console.log('scssComments', scssComments)
    const matchesAcuteToxicity = [...acuteToxicityTxt?.matchAll(guideLineRegex)].map((d, i) => ({
        id: `${textId}-acute-${i}`,
        txt: d[0],//addScssComment(d, scssComments[i]),
        type: ACUTETOX
    }));

    return matchesAcuteToxicity;
    // return
};

const fetchData = ((fetch, textId) => {
    console.log('fetching data...', textId)
    const prs = [
        fetch('/scss_o_067.txt').then((response) => response.text()),
        fetch('/sccs_o_044.txt').then((response) => response.text()),
        fetch('/sccs_o_040.txt').then((response) => response.text()),
        fetch('/sccs_o_059.txt').then((response) => response.text()),
        fetch('/sccs_o_082.txt').then((response) => response.text()),
        fetch('/sccs_o_087.txt').then((response) => response.text()),
        fetch('/sccs_o_180.txt').then((response) => response.text()),
        fetch('/sccs_o_195.txt').then((response) => response.text()),
        fetch('/sccs_o_230.txt').then((response) => response.text()),
        fetch('/sccs_o_222.txt').then((response) => response.text())
        // const promise230 = fetch('/sccs_o_230.txt').then((response) => response.text());
    ];

    return Promise.all([...prs]).then((values) => {
        console.log("Values", values)
        const tmpMap0 = new Map();
        values.forEach((v, i) => {
            tmpMap0.set(textIds[i], v);
        });
        const originalTxtsMap = tmpMap0;
        // console.log('originalTxtsMap', originalTxtsMap.keys())

        const tmpMap1 = new Map();
        values.forEach((v, i) => {
            tmpMap1.set(textIds[i], {
                id: textId, rdt: scrapeRDT(v, textId), acuteTox: scrapeAcuteTox(v, textId), text: v.replace(/\r/g, '\n')
            });
        });
        return { scrapedTxtsMap: tmpMap1, originalTxtsMap, textIds }
    }).catch((err) => console.log('Error fetching data', err))

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