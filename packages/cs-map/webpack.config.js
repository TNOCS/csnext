const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'csmap',
    { cs: ['./src/index.ts'] },
    {
        '@csnext/cs-core': '@csnext/cs-core',
        'cs-core': 'cs-core',
        '@csnext/cs-client': '@csnext/cs-client',
        'cs-client': 'cs-client',
        vue: 'Vue',
        Vue: 'Vue',
        'mapbox-gl': 'mapbox-gl',
        axios: 'axios',
        '@mapbox/mapbox-gl-draw': '@mapbox/mapbox-gl-draw',
        '@mapbox/mapbox-gl-draw/dist': '@mapbox/mapbox-gl-draw/dist',
        'vue-perfect-scrollbar': 'vue-perfect-scrollbar',
        'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
        handlebars: 'handlebars/dist/cjs/handlebars.runtime'
    },
    'csmap'
);

config.node = {
    fs: 'empty'
};

module.exports = [config];
