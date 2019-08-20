const buildConfig = require('./../webpack.config.base.js');

const config = [
    buildConfig(
      __dirname + '/lib',
      'csclient',
    {
      cs: ['./src/index.ts']
    },
    {
      vue: {
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
        root: 'Vue'
      },
      // vuetify: 'vuetify',
      '@csnext/cs-core': '@csnext/cs-core',
      'vue-router': 'vue-router'
    },
    'csclient'
  )
];
module.exports = config;