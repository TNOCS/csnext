const buildConfig = require('./../webpack.config.base.js');

const config = [
    buildConfig(
        __dirname + '/lib',
        'cssplitpanel', { cs: ['./src/index.ts'] }, {
            '@csnext/cs-client': '@csnext/cs-client',
            '@csnext/cs-core': '@csnext/cs-core',
            vue: 'Vue'
        },
        "cssplitpanel"
    )
];

module.exports = config;