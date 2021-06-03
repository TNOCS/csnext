const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'csgraph', { cs: ['./src/index.ts'] }, {
        '@csnext/cs-core': '@csnext/cs-core',
        '@csnext/cs-client': '@csnext/cs-client',
        '@csnext/cs-form': '@csnext/cs-form',
        '@csnext/cs-data': '@csnext/cs-data',
        '@csnext/cs-map': '@csnext/cs-map',
        axios: 'axios'
    },
    'csgraph'
);

// config.module.rules.push({ test: /\.handlebars$/, loader: "handlebars-loader" })

config.node = {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
};

module.exports = [config];