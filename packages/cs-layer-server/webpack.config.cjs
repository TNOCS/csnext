const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'cslayerserver', { cs: ['./src/index.ts'] }, {
        '@csnext/cs-core': '@csnext/cs-core',
        '@csnext/cs-data': '@csnext/cs-data'
    },
    'cslayerserver'
);
config.output.filename = 'cslayerserver.cs.cjs'
config.node = {
    fs: 'empty'
}

const es = buildConfig(
    __dirname + '/lib',
    'cslayerserver-es6', { cs: ['./src/index.ts'] }, {
        '@csnext/cs-core': '@csnext/cs-core',
        '@csnext/cs-data': '@csnext/cs-data'
    },
    'cslayerserver'
);
es.output.filename = 'cslayerserver.mjs';
es.output.libraryTarget = "umd";
es.output.globalObject = 'this';
es.node = {
    fs: 'empty'
}

module.exports = [config];