const buildConfig = require('./../webpack.config.base.js');

const config = [
    buildConfig(
        __dirname + '/lib',
        'csmarkdown',
        {
            cs: ['./src/index.ts']
        },
        {
            '@csnext/cs-client': '@csnext/cs-client',
            '@csnext/cs-core': '@csnext/cs-core',
            vue: 'Vue',   
            Vue: 'Vue'    
        },
        'csmarkdown'
    )
];
module.exports = config;
