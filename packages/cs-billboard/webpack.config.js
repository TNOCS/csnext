const buildConfig = require('./../webpack.config.base.js');
const package = require('./package.json');

const config = [
    buildConfig(
        __dirname + '/lib',
        'csbillboard',
        {
            cs: ['./src/index.ts']
        },
        {
            vue: 'Vue',
            vuetify: 'vuetify',
            'vue-markdown': 'vue-markdown'
        },
        'cs'
    )
];
module.exports = config;
