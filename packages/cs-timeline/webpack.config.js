const buildConfig = require('./../webpack.config.base.js');

const config = buildConfig(
    __dirname + '/lib',
    'cstimeline',
    {cs: ['./src/index.ts']},
    {
        '@csnext/cs-core': '@csnext/cs-core',
        // 'cs-core': 'cs-core',
        '@csnext/cs-client': '@csnext/cs-client',
        // 'cs-client': 'cs-client',
        vue: 'Vue',
        'timeline-plus': 'timeline-plus',
        // Vue: 'Vue'
    },
    'cstimeline'
);

config.node = {
    fs: 'empty'
};

module.exports = [config];
