const webpack = require('webpack');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'csmap';

let plugins = [],
    outputFile;

if (env === 'build') {
    outputFile = libraryName + '.[name].min.js';
} else {
    outputFile = libraryName + '.[name].js';
}

const output = {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd'
};

const mod = {
    rules: [
        {
            test: /\.ts$/,
            exclude: [/node_modules/],
            loader: 'ts-loader'
        },
        {
            test: /\.html$/,
            loader: 'raw-loader'
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }
            ]
        }
    ]
};

function buildConfig(entry, externals, analyzer) {
    let pl = [];
    pl.push(new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]));

    if (analyzer) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
          .BundleAnalyzerPlugin;
        pl.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'reports/report.' + analyzer + '.html',
            generateStatsFile: false
          })
        );
      }

    return (baseConfig = {
        entry: entry,
        devtool: 'source-map',
        output: output,
        node: {
            fs: 'empty'
        },
        module: mod,
        externals: externals,
        resolve: {
            extensions: ['.ts', '.js', '.html']
        },
        plugins: plugins.concat(pl)
    });
}

const config = [
    buildConfig(
        { cs: ['./src/index.ts'] },
        {
            'cs-core': 'cs-core',
            '@csnext/cs-client': '@csnext/cs-client',
            vue: 'Vue',
            Vue: 'Vue'
        },
        'csmap'
    )
];

module.exports = config;
