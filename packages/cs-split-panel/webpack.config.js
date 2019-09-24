const buildConfig = require('./../webpack.config.base.js');

const config = [
    buildConfig(
        __dirname + '/lib',
        'cssplitpanel',
        { cs: ['./src/index.ts'] },
        {
            '@csnext/cs-client': '@csnext/cs-client',
            vue: 'Vue'
        },
        "cssplitpanel"
    )
];

module.exports = config;
