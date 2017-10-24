require('dotenv').config({ silent: true });

const webpack = require('webpack');
const path = require('path');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const siteJs = ['./scripts/site.js'];

const config = {
  devtool: IS_PRODUCTION ? false : 'inline-source-map',
  entry: {
    'scripts/site-bundle': siteJs
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              require('babel-plugin-add-module-exports'),
              require('babel-plugin-transform-runtime')
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEBUG__': JSON.stringify(!IS_PRODUCTION)
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: !IS_PRODUCTION,
      compress: IS_PRODUCTION ? {
        drop_console: true, // eslint-disable-line camelcase
        warnings: false
      } : false,
      mangle: IS_PRODUCTION ? {
        except: ['_'] // don't mangle lodash
      } : false
    })
  ]
};

module.exports = config;
