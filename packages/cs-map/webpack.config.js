const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'csmap',
    { cs: ['./src/index.ts'] },
    {
        '@csnext/cs-core': '@csnext/cs-core',
        'cs-core': 'cs-core',
        '@csnext/cs-client': '@csnext/cs-client',
        '@csnext/cs-form': '@csnext/cs-form',
        'cs-client': 'cs-client',
        // 'simplebar': 'simplebar',
        vue: 'Vue',
        Vue: 'Vue',
        'mapbox-gl': 'mapbox-gl',
        axios: 'axios',
        '@mapbox/mapbox-gl-draw': '@mapbox/mapbox-gl-draw',
        '@mapbox/mapbox-gl-draw/dist': '@mapbox/mapbox-gl-draw/dist'
        // ,
        // 'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
        // handlebars: 'handlebars/dist/cjs/handlebars.runtime'
    },
    'csmap'
);


config.module.rules.push({ test: /\.handlebars$/, loader: "handlebars-loader" })

config.node = {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
};

module.exports = [config];
