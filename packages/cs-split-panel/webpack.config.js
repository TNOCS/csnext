const buildConfig = require('./../webpack.config.base.js');

const config = [
    buildConfig(
        __dirname + '/lib',
        'cssplitpanel',
        { cs: ['./src/index.ts'] },
        {
            '@csnext/cs-core': '@csnext/cs-core',
            vue: 'Vue',
            Vue: 'Vue'
        }
    )
];

module.exports = config;
