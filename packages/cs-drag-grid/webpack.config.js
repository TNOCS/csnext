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
            '@csnext/cs-client': '@csnext/cs-client',
            '@csnext/cs-core': '@csnext/cs-core'
        },
        'csdraggrid'
    )
];
module.exports = config;
