const buildConfig = require('./../webpack.config.base.js');

const config = [
    buildConfig(
        __dirname + '/lib',
        'csdraggrid',
        {
            cs: ['./src/index.ts']
        },
        {
            '@csnext/cs-client': '@csnext/cs-client',
            '@csnext/cs-core': '@csnext/cs-core',
            'simplebar-vue': 'simplebar-vue'
        },
        'csdraggrid'
    )
];
module.exports = config;
