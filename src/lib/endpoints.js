export default [
    {
        name: 'Test-Substance',
        cols: ['homogeneity and stability', 'pH test substance', 'physical shape', 'achieved concentration (%)', 'composition', 'purity (%)', 'chemical batch nr',
            'description Test-Substance'],
        path: '/Test-Method'

    },
    {
        name: "Vehicle", cols: ['name', 'concentration (%)'], path: '/Test-method/Test-Substance'
    },
    {
        name: 'Test condition', cols: [
            'nominal dose levels',
            'actual dose levels',
            'dose level unit',
            'dose volume ml / kg bw',
            'repeated administration scheme',
            'recovery period'
        ], path: '/Test-Method'
    },
    {
        name: 'Oral Administration', cols: ['gavage', 'diet', 'drinking water'],
        path: '/Test-method/Test-Condition'
    },
    {
        name: 'Test Animal',
        cols: [
            'rodent species/strain',
            'source',
            'age at start of experiment',
            'age unit',
            'sex',
            'housing and feeding',
            'weight',
            'weight unit',
            'n animals / group',
            'number of satellite group'
        ],
        path: '/Test-method/Test-Condition'
    },
    {
        name: 'Urinanalysis', cols: [
            'appearance',
            'volume',
            'osmolarity or specific gravity', 'pH Urin', 'protein', 'glucose urin', 'blood/blood cells',
            'description Urinanalysis'
        ],
        path: '/Endpoints/Clinical-Biochemistry'
    }, {
        name: 'Plasma Biomarkers', cols: [
            'sodium', 'potassium', 'glucose plasma biomarkers', 'changes in total cholesterol', 'high-density lipoprotein', 'low-density lipoprotein',
            'urea', 'creatinine', 'blood urea nitrogen', 'total protein', 'albumin'
        ],
        path: '/Endpoints/Clinical-Biochemistry'
    }, {
        name: 'Hepatocellular Effect', cols: [
            'aspartate aminotransferase',
            'alkaline phosphatase',
            'gamma glutamyl transpeptidase',
            'sorbitol dehydrogenase',
            'other hepatocellular enzymes and biomarker',
            'bile acids',
            'total bilirubin'
        ], path: '/Endpoints/Clinical-Biochemistry'
    }, {
        name: 'Serum Biomarkers', cols: [
            'phosphate',
            'triglycerides',
            'hormones',
            'methaemoglobin',
            'cholinesterase',
            'total T4, T3, TSH',
            'testosterone',
            'oestradiol',
            'follicle stimulating hormones',
            'luteinizing hormone',
            'description Serum Biomarkers'
        ], path: '/Endpoints/Clinical-Biochemistry'
    }, {
        name: 'Clinical Observation', cols: [
            'changes in skin, fur, eyes, mucous membranes',
            'secretions and excretions',
            'autonomic activity'
        ], path: '/Endpoints/Observations'
    }, {
        name: 'Functional Observation', cols: [
            'changes in gait, posture and response to handling',
            'clonic or tonic movement',
            'stereotypies',
            'bizzare behaviours',
            'sensor activity, grip strength; assessment of motor activity'
        ], path: '/Endpoints/Observations'
    }, {
        name: 'Observations', cols: [
            'body weight',
            'food/water consumption',
            'ophtalmological examination',
            'organ/body weight',
            'description Observations'
        ], path: '/Endpoints'
    }, {
        name: 'sensory reactvity', cols: [
            'auditory', 'visual', 'proprioceptive stimuli'
        ], path: '/Endpoints/Observations'
    }, {
        name: 'Haematology', cols: [
            'haematocrit',
            'haemaglobin concentration',
            'erythrocyte count',
            'total and differential leucocyte count',
            'platelet count',
            'measure of blood clotting time/potential',
            'site of blood samples',
            'description Haematology'
        ], path: '/Endpoints/Haematology'
    }, {
        name: 'Gross Necropsy', cols: [
            'gross necropsy: liver',
            'gross necropsy: kidneys',
            'gross necropsy: adrenals',
            'gross necropsy: testes',
            'gross necropsy: epididymides',
            'gross necropsy: uterus',
            'gross necropsy: ovaries',
            'gross necropsy: thymus',
            'gross necropsy: spleen',
            'gross necropsy: brain',
            'gross necropsy: heart',
            'gross necropsy: description '
        ], path: '/Endpoints/Pathology'
    }, {
        name: 'Histopathology', cols: [
            'histopathology: brain',
            'histopathology: spinal cord',
            'histopathology: pituitary',
            'histopathology: thyroid',
            'histopathology: parathyroid',
            'histopathology: thymus',
            'histopathology: oesophagus',
            'histopathology: salivary glands',
            'histopathology: stomach',
            'histopathology: small and large intestines',
            'histopathology: liver',
            'histopathology: pancreas',
            'histopathology: kidneys',
            'histopathology:adrenals',
            'histopathology: spleen',
            'histopathology: heart',
            'histopathology: trachea',
            'histopathology: lungs',
            'histopathology: aorta',
            'histopathology: gonads',
            'histopathology: uterus',
            'histopathology: accessory sexs organs',
            'histopathology: female mammary gland',
            'histopathology: prostate',
            'histopathology: urinary bladder',
            'histopathology: gallbladder',
            'histopathology: lymph nodes',
            'histopathology: peripheral nerve',
            'histopathology: bone marrow',
            'histopathology: skin',
            'histopathology: eye',
            'histopathology: description Pathology'
        ], path: '/Endpoints/Pathology'
    }, {
        name: 'Endpoints', cols: [
            'signs of toxicity',
            'critical effects',
            'point of departure',
            'type of point of departure',
            'target organ',
            'moribund or dead animals prior to study termination',
            'mortality rate',
            'discussion and results',
            'conclusion'
        ], path: '/'
    }, {
        name: 'Reliability', cols: [
            'year',
            'GLP',
            'SCCS comment to test',
            'ref. in dossier',
            'limit test',
            'preliminary study',
            'control group and recovery group'
        ], path: '/'
    }
]