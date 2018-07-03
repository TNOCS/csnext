const webpack = require('webpack');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'csdraggrid';

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
    library: libraryName
};

const mod = {
    rules: [
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'tslint-loader'
        },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
        },
        {
            test: /\.html$/,
            loader: 'raw-loader',
            exclude: ['./src/index.html']
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

    return (baseConfig = {
        entry: entry,
        devtool: 'source-map',
        output: output,
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
        }
    )
];

module.exports = config;
