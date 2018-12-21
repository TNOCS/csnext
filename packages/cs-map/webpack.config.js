const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'csmap',
    { cs: ['./src/index.ts'] },
    {
        'cs-core': 'cs-core',
        '@csnext/cs-client': '@csnext/cs-client',
        vue: 'Vue',
        Vue: 'Vue'
    },
    'csmap'
);

config.node = {
    fs: 'empty'
};

module.exports = [config];
