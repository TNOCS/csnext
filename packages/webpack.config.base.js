const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


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
    },
    {
      test: /\.woff2$/,
      use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
    }
  ]
};

function buildConfig(path, libraryName, entry, externals, analyzer) {


  let plugins = [],
    outputFile;
  
  if (env === 'build') {
    outputFile = libraryName + '.[name].min.js';
  } else {
    outputFile = libraryName + '.[name].js';
  }
  
  const output = {
    path: path,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd'
    // umdNamedDefine: true
  };

  let pl = []; //new HardSourceWebpackPlugin()
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
    // entry: __dirname + '/src/index.ts',
    devtool: 'source-map',
    output: output,
    module: mod,
    optimization: {
      minimize: false
    },
    externals: externals,
    resolve: {
      extensions: ['.ts', '.js', '.html']
    },
    plugins: plugins.concat(pl)
  });
}

module.exports = buildConfig;

