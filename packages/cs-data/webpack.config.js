const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'csdata',
    { cs: ['./src/index.ts'] },
    {
        'axios': 'axios',
        '@csnext/cs-core': '@csnext/cs-core'
    },
    'csdata'
);
config.node = {
    fs: 'empty'
  }

module.exports = config;
