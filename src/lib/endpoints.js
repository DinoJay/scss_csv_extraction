export default [
    {
        name: 'Test-Substance',
        cols: ['homogeneity and stability', 'pH', 'material form', 'achieved concentration (%)', 'composition', 'purity (%)', 'chemical batch nr',
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
            'osmolarity or specific gravity', 'pH', 'protein', 'glucose', 'blood/blood cells',
            'description Urinanalysis'
        ],
        path: '/Endpoints/Clinical-Biochemistry'
    }, {
        name: 'Plasma Biomarkers', cols: [
            'sodium', 'potassium', 'glucose', 'changes in total cholesterol', 'high-density lipoprotein', 'low-density lipoprotein',
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
            'liver',
            'kidneys',
            'adrenals',
            'testes',
            'epididymides',
            'uterus',
            'ovaries',
            'thymus',
            'spleen',
            'brain',
            'heart',
            'description Gross Necropsy'
        ], path: '/Endpoints/Pathology'
    }, {
        name: 'Histopathology', cols: [
            'brain',
            'spinal cord',
            'pituitary',
            'thyroid',
            'parathyroid',
            'thymus',
            'oesophagus',
            'salivary glands',
            'stomach',
            'small and large intestines',
            'liver',
            'pancreas',
            'kidneys',
            'adrenals',
            'spleen',
            'heart',
            'trachea',
            'lungs',
            'aorta',
            'gonads',
            'uterus',
            'accessory sexs organs',
            'female mammary gland',
            'prostate',
            'urinary bladder',
            'gallbladder',
            'lymph nodes',
            'peripheral nerve',
            'bone marrow',
            'skin',
            'eye',
            'description Pathology'
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