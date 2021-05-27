const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'cscore',
    { cs: ['./src/index.ts'] },
    {        
    },
    'cscore'
);
config.node = {
    fs: 'empty'
  }

  const es = buildConfig(
    __dirname + '/lib',
    'cscore-es6',
    { cs: ['./src/index.ts'] },
    {        
    },
    'cscore'
);
es.output.filename = 'cscore.mjs';
es.output.libraryTarget = "commonjs";
es.node = {
    fs: 'empty'
  }

module.exports = [config, es];
