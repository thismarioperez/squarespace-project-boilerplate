const path = require('path');
const root = path.resolve(__dirname);
const source = path.join(root, 'source');
const nodeModules = 'node_modules';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const browsers = ['last 2 versions', 'ios >= 9'];
const extractLess = new ExtractTextPlugin({
  filename: '../assets/styles/[name].css'
});
const CleanUpStatsPlugin = require('./webpack.cleanup-stats-plugin');

module.exports = {
  devtool: IS_PRODUCTION ? false : 'inline-source-map',

  plugins: [
    // Give the app scripts access to node environment variable.
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new CleanUpStatsPlugin(),

    extractLess,

    new BabiliPlugin({
      // mangle: IS_PRODUCTION ? { blacklist: ['_'] } : false // don't mangle lodash
    },
    {
      sourceMap: IS_PRODUCTION ? false : true, // must be enabled here for devtool source-map to work.
      compress: IS_PRODUCTION ? true : false, // eslint-disable-line camelcase
    })
  ],

  stats: {
    colors: true,
    modules: true,
    exclude: /node_modules/
  },

  resolve: {
    modules: [root, source, nodeModules]
  },

  entry: {
    app: path.resolve( __dirname, 'source/js/app.js' ),
  },

  output: {
    path: path.resolve( __dirname, 'build', 'scripts' ),
    filename: '[name].js',
  },

  module: {
    rules: [
      // JS Linter
      { test: /source\/js\/.*\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
        enforce: 'pre'
      },

      // Handle JS files
      { test: /source\/js\/.*\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  'targets': {
                    'browsers': browsers
                  },
                  'debug': IS_PRODUCTION ? false : true
                }]
              ],
              plugins: [require('babel-plugin-transform-runtime')]
            }
          }
        ]
      },

      // Handle Less files
      { test: /\.(css|less)$/,
        use: extractLess.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: IS_PRODUCTION ? true : false
              }
            },
            { loader: 'postcss-loader',
              options: { plugins: () => [require('autoprefixer')({ browsers: browsers })] }
            },
            { loader: 'less-loader' }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  }
};
