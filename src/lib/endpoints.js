export default [
    {
        name: 'test substance',
        cols: ['homogeneity and stability', 'pH', 'physical form (solid, liquid)', 'achieved concentration (%)', 'composition', 'purity (%)', 'chemical batch nr', 'additional info']
    },
    {
        name: "vehicle", cols: ['name', 'concentration (%)']
    },
    {
        name: 'test condition', cols: [
            'nominal dose levels',
            'actual dose levels',
            'dose level unit',
            'dose volume ml / kg bw',
            'repeated administration scheme',
            'recovery period'
        ]
    },
    {
        name: 'oral administration', cols: ['gavage', 'diet', 'drinking water']
    },
    {
        name: 'test animal',
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
        ]
    },
]