const buildConfig = require('./../webpack.config.base.js');

const config = [
    buildConfig(
        __dirname + '/lib',
        'cscrossfilter', {
            cs: ['./src/index.ts']
        }, {
            '@csnext/cs-client': '@csnext/cs-client',
            '@csnext/cs-core': '@csnext/cs-core',
            '@csnext/cs-data': '@csnext/cs-data',
            '@csnext/cs-map': '@csnext/cs-map',
            'simplebar-vue': 'simplebar-vue',
            vue: 'Vue',
            Vue: 'Vue'
        },
        'cscrossfilter'
    )
];

config.node = {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
};

module.exports = config;