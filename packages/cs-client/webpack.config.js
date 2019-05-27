const buildConfig = require('./../webpack.config.base.js');

const config = [
    buildConfig(
      __dirname + '/lib',
      'csclient',
    {
      cs: ['./src/index.ts']
    },
    {
      vue: 'Vue',
      vuetify: 'vuetify',
      '@csnext/cs-core': '@csnext/cs-core',
      'vue-markdown': 'vue-markdown',
      'vue-router': 'vue-router'
    },
    'csclient'
  )
];
module.exports = config;