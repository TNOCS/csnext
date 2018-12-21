const buildConfig = require('./../webpack.config.base.js');

const config = [
    buildConfig(
      __dirname + '/lib',
      'cs',
    {
      cs: ['./src/index.ts']
    },
    {
      vue: 'Vue',
      vuetify: 'vuetify',
      'vue-markdown': 'vue-markdown'
    },
    'cs'
  )
];
module.exports = config;