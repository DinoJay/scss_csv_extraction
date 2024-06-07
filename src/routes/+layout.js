import { ACUTETOX, RDT, textIds } from '$lib/reportIds.js';
export const prerender = false

// const guideLineRegex = /Guideline:[\s\S]*?Ref\.*:*\s\d+\s/gm;
// const scssCommentRegex = guideLineRegex
// const scssCommentRegex = /^Comment[\s\S]*(?=(\d.))/gm
// const commentGuideLineRegex = /^Ref[\s\S]*?[c|C]omment[\S]*?\r\r/gm;
const guideLineRegex = /(Guideline[\s\S]*?^(?=Guideline|\d\.\d\.))/gm;
// const guideLineRegex = /Guideline[\s\S]*?(?:Ref\.: \d+[\s\S]*?(?:SCCS Comment[\s\S]*?(?=Guideline|$))?)?/g;






const text = `
Guideline: According to OECD Guideline 412 

Species/strain: Rat/Wistar 

Group size: Five per sex per dose 

Test substance: 2-phenoxyethanol 

Batch: 41183068E0 

Purity: > 99.9 core peak-area% (GC) 

Dose level: 0, 40, 200, 1000 mg/m³ (nominal) 

Vehicle: air 

Dose route: Inhalation, nose/head only 

Dosing schedule: 6 hours per day, 5 days per week for 2 weeks (10 exposures) 

Observation period: 14 days 

GLP: Yes 

Study period: 06 Sep 2005 - 17 Feb 2007 

Report date: 2007 

This study was conducted to characterise the toxicity profile of 2-phenoxyethanol including 
target organs and to determine a NOAEL after 2-weeks exposure to liquid aerosols. Special 
emphasis was given to potential irritation effects in the respiratory tract. A total of 10 
Wistar rats (5 males and 5 females) per test group were head-nose exposed to liquid 
aerosols for 6 hours per day, 5 days per week for 14 days (10 exposures). The target 
concentrations were 40, 200, and 1000 mg/m³. The mean measured concentrations were 
48.2, 246, and 1070 mg/m³. A concurrent control group was exposed to conditioned air. On 
exposure days, the clinical examination was performed before, during and after exposure. 
Body weight and food consumption were determined at the start of the exposure period, on 
day 7 and on day 13. At study termination, clinical-pathological examinations of the blood, 
gross necropsy, measurement of organ weights and histopathological examinations of 
selected organs were conducted (liver, kidneys, adrenals, testes, thymus, spleen, lung).

Results 

Repeated inhalation exposure of rats to an aerosol containing up to 1000 mg/m³ of 2-
phenoxyethanol for 6 hours per day for a total of 10 exposure days showed low inhalation 
toxicity. Decreased body weight gain (females only) and food consumption (males and 
females) were observed in animals exposed to 1000 mg/m³ of 2-phenoxyethanol. There 
were no treatment-related changes in clinical chemistry or haematology and no treatment 
related histopathological changes indicative of systemic toxicity. Morphological changes such 
as minimal to slight degeneration/squamous metaplasia, hyperplasia/hypertrophy and 
minimal to slight inflammatory cell infiltrates were noted, indicating irritation potential in 
the nasal cavity, larynx and lung in mid- and high-dose animals. Lung weights were 
increased in mid- and high-dose males.

Conclusion 

The No-observed-adverse-effect concentration (NOAEC) for local effects in upper airways 
and lung was determined to be 48.2 mg/m3. 

Ref.: 3 

SCCS Comment 

No data on lung lavage is available. The NOAEC derived should be multiplied with a factor of 
5/7 in order to take into account the intermittent exposure (5 days a week). An adjusted 
NOAEC of 34.4 mg/m3/day may be used. 

Guideline: According to OECD Guideline no. 408

Species/strain: Rat/Wistar – HsdCpb:WU

Group size: 10 per sex per dose (main and recovery groups); 5 animals per sex

per dose (satellite and satellite recovery groups)

Test substance: 2-Phenoxyethanol

Batch: N0119

Purity: 99.9%

Dose levels: 0, 500, 2500 and 10000 ppm in diet corresponding to 34.0, 169.0,

and 697.0 mg/kg bw/day in males and 50.2, 233.8, and 938.8 mg/kg bw/day in females

Vehicle: Diet

Route: Oral, via diet

Exposure period: 90 days with a 4-week recovery period for high dose animals

GLP: Yes

Study Period: Oct 2001 - Feb 2002 (in-life phase)

Report Date: Oct 2002

Control groups of males and females received diet alone. Recovery group animals were 
given diet containing 0 or 10000 ppm 2-phenoxyethanol for 90 days followed by a four-
week recovery period. Additional groups were administered 0, 500, 2500, and 10000 ppm 
in diet for 13-14 weeks or 0 and 10000 ppm in diet as satellite treatment groups and 
satellite recovery groups, respectively. Animals in all satellite groups were subjected to 
whole body perfusion during necropsy for possible neuropathological investigations.

Results

Analytical data verified that the test material content in diet was within acceptable limits of 
the target concentrations (97-111%); adequate homogeneity was also verified.

In-life findings: 

Survival was unaffected by treatment. There was no difference between untreated and 
treated animals in general behaviour up to and including 10000 ppm in diet. Food and water 
consumption and body weight increase in treated animals were comparable to controls 
throughout the study. The functional observational battery, locomotor activity and grip 
strength testing showed no treatment-related effects. Therefore, no further 
neuropathological examinations were performed in animals from the satellite groups.

Terminal examinations: 

A statistically significant reduction in the mean corpuscular haemoglobin concentration 
(MCHC) was observed in males at 10,000 ppm and at all doses in females of the main group 
at week 13. These changes were marginal (<3% decrease relative to controls) and not 
dose-related. Therefore, they were not considered treatment-related. No difference in MCHC 
was observed in animals in the recovery groups. A statistically significant increase in mean 
corpuscular volume (MCV) was observed in females at 500 ppm and 10,000 ppm. These 
changes were also minimal (<4% decrease relative to controls), and there was no evidence 
of a dose-response. No difference in MCV was observed in recovery group animals. No 
changes were observed in any of the other red blood cell parameters in either males or 
females – haemoglobin (HgB), haematocrit (HCT), mean corpuscular haemoglobin (MCH) 
and reticulocytes (Retic).

Leucocyte counts and differential blood count showed no treatment-related changes in main 
and recovery groups. The statistically significant decreases observed for males in leucocytes 
and lymphocyte counts at 2,500 ppm and 10,000 ppm can be attributed to relatively high 
values in the control group and were not considered to be treatment-related.

Alanine aminotransferase (ALAT) was statistically significantly increased in males at 10,000 
ppm but not in females. Since no histopathological changes in liver or other observations 
suggesting liver toxicity were observed in high-dose males, and no increase in ALAT or liver 
histopathology was observed in females, this observation was considered to be incidental.

At the end of the treatment period, plasma triglycerides (at 500 ppm in males) calcium (at 
500 ppm in females), and chloride (at 10,000 ppm in females) were statistically significantly 
increased whereas cholesterol (at 10,000 ppm in females), protein (at 10,000 ppm in 
females) and albumin (at 10,000 ppm in females) were statistically significantly decreased. 
These statistically significant differences relative to controls were slight (<10%), showed no 
clear dose-response relationship, were predominantly in the range of historical values, and 
were therefore considered not to be treatment-related.

T4 was statistically significantly increased in females at 10,000 ppm. After the recovery 
period, T3 was statistically significantly increased in males and decreased in females at 
10,000 ppm. However, all values were in the range of historical control values. In addition, 
deviations from control values were small and not consistent for both sexes. Therefore, they 
are considered to be of no biological relevance.

Determination of enzymatic activity in liver tissue samples showed statistically significant 
increases as well as decreases for N-demethylase at 2500 ppm, O-demethylase at ≥ 500 
ppm and CYP at ≥ 2,500 ppm in males at the end of treatment. In females, statistically 
significant increases were observed at 10,000 ppm for O-demethylase and CYP.
`;
// const guideLineRegex = /Guideline[\s\S]*?(?=^\d\.)/gm;



const addComments = (refTxt, text) => {

    const comments = [...text.matchAll(/Ref[\S]*[\s\S]*Comment/gm)]
    // console.log('comments', comments);
    // console.log('RefStudy', refStudy)
    // const comment = comments.find(c => c.includes(refStudy))
    // console.log('comment', comment)

    return refTxt
    // return `${refTxt}\r${comment || ''}`;

}
const scrapeRDT = (txt, textId) => {

    const regexRepeatedDoseToxicity =
        /3\.\d\.\d[.]*\s+Repeated dose toxicity[\s\S]*?3\.\d\.\d\.*\s+Mutagenicity \/ [g|G]enotoxicity/g;


    const rdtMatchesIter = txt.matchAll(regexRepeatedDoseToxicity)
    // console.log('rdtMatchesIter', rdtMatchesIter)
    const rdtMatches = [...rdtMatchesIter];
    const rdtText = rdtMatches[rdtMatches.length - 1]?.[0];
    // if (textId === 'sccs_o_230') console.log('rdtText', rdtText)

    if (rdtText === undefined) throw new Error('No RDT text found')


    // console.log('guidelineMatchesRDTIter', [...guidelineMatchesRDTIter])
    // const matchesRDTComments = [...rdtText.matchAll(commentGuideLineRegex)]
    console.log('guideline match', [...rdtText?.matchAll(guideLineRegex)])
    // console.log('with comments', matchesRDTComments)
    // console.log('matchesRDTComments', matchesRDTComments.map(d => d[0]))


    const matchesRDT = [...rdtText?.matchAll(guideLineRegex)].map((d, i) => ({
        id: `${textId}-rdt-${i}`,
        txt: d[0]//addComments(d[0], rdtText)
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

    // if (scssComments.length > 0)
    //     console.log('scssComments', scssComments)
    // const acuteComments = [...acuteToxicityTxt.matchAll(commentGuideLineRegex)]
    const matchesAcuteToxicity = [...acuteToxicityTxt?.matchAll(guideLineRegex)].map((d, i) => ({
        id: `${textId}-acute-${i}`,
        txt: d[0],//addComments(d[0], acuteComments.map(d => d[0])),
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