const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'csmap',
    { cs: ['./src/index.ts'] },
    {
        '@csnext/cs-core': '@csnext/cs-core',
        '@csnext/cs-client': '@csnext/cs-client',
        '@csnext/cs-form': '@csnext/cs-form',        
        '@csnext/cs-data': '@csnext/cs-data',    
        axios: 'axios',
        '@mapbox/mapbox-gl-draw': '@mapbox/mapbox-gl-draw',
        '@mapbox/mapbox-gl-geocoder' : '@mapbox/mapbox-gl-geocoder',
        '@mapbox/mapbox-gl-traffic' : '@mapbox/mapbox-gl-traffic',
        "handlebars": "handlebars",
        "handlebars-intl": "handlebars-intl"
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
