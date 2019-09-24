const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'csmap',
    { cs: ['./src/index.ts'] },
    {
        '@csnext/cs-core': '@csnext/cs-core',
        '@csnext/cs-client': '@csnext/cs-client',
        '@csnext/cs-form': '@csnext/cs-form',
        vue: 'Vue',
        'mapbox-gl': 'mapbox-gl',
        axios: 'axios',
        '@mapbox/mapbox-gl-draw': '@mapbox/mapbox-gl-draw',
        '@mapbox/mapbox-gl-draw/dist': '@mapbox/mapbox-gl-draw/dist'        
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
