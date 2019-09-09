const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'csform',
    { cs: ['./src/index.ts'] },
    {
        '@csnext/cs-core': '@csnext/cs-core',
        '@csnext/cs-client': '@csnext/cs-client',
        vue: 'Vue'
    },
    'csform'
);

config.node = {
    fs: 'empty'
};

module.exports = [config];
