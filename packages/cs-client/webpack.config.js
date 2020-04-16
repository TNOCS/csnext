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
      'socket.io-client': 'socket.io-client',
      // 'vue-router': 'vue-router',
      // vuetify: 'vuetify',
      '@csnext/cs-core': '@csnext/cs-core',
      'axios': 'axios',
      // 'vue-i18n': 'vue-i18n'
    },
    'csclient'
  )
];
module.exports = config;