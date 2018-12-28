const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'csmap',
    { cs: ['./src/index.ts'] },
    {
        'cs-core': 'cs-core',
        '@csnext/cs-client': '@csnext/cs-client',
        vue: 'Vue',
        Vue: 'Vue',
        'mapbox-gl': 'mapbox-gl',
        'axios': 'axios',
        '@mapbox/mapbox-gl-draw': '@mapbox/mapbox-gl-draw',
        '@mapbox/mapbox-gl-draw/dist': '@mapbox/mapbox-gl-draw/dist',
        'vue-perfect-scrollbar': 'vue-perfect-scrollbar'
    },
    'csmap'
);

config.node = {
    fs: 'empty'
};

module.exports = [config];
