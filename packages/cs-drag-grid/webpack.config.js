const buildConfig = require('./../webpack.config.base.js');

const config = [
    buildConfig(
        __dirname + '/lib',
        'csdraggrid',
        {
            cs: ['./src/index.ts']
        },
        {
            vue: 'Vue',
            vuetify: 'vuetify',
            'vue-markdown': 'vue-markdown',
            '@csnext/cs-core': '@csnext/cs-core'
        },
        'cs'
    )
];
module.exports = config;
