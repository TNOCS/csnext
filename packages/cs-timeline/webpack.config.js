const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'cstimeline',
    {cs: ['./src/index.ts']},
    {
        '@csnext/cs-core': '@csnext/cs-core',
        '@csnext/cs-client': '@csnext/cs-client',        
        vue: 'Vue'
    },
    'cstimeline'
);

config.node = {
    fs: 'empty'
};

module.exports = [config];
