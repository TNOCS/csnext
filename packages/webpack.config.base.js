const webpack = require('webpack');
const path = require('path');

const env = require('yargs').argv.env; // use --env with webpack 2
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


const mod = {
  rules: [
    {
      test: /\.ts$/,
      exclude: [/node_modules/],
      use: [        
       {
        loader: 'ts-loader',
        // options: {
        //     happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
        // }
    }]
    },
    {
      test: /\.html$/,
      loader: 'raw-loader'
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'vue-style-loader'
        },
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
      use: ['base64-inline-loader?limit=1000&name=[name].[ext]']
    },
    
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              fiber: require('fibers'),
              indentedSyntax: true // optional
            }
          }
        ]
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
    plugins: plugins.concat(pl),

  });
}

module.exports = buildConfig;

