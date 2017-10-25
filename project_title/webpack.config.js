require('dotenv').config({ silent: true });

const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const config = {
  devtool: IS_PRODUCTION ? false : 'inline-source-map',
  entry: {
    site: [
      './scripts/site.js',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'scripts/[name]-bundle.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: './.eslintrc',
              emitWarning: true,
              emitError: true,
              failOnError: IS_PRODUCTION ? true : false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: [
                require('babel-plugin-add-module-exports'),
                require('babel-plugin-transform-runtime')
              ]
            }
          }
        ]
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
    }),

    new ProgressBarPlugin({
      clear: false,
      complete: '+',
      summary: false
    })
  ],
  stats: {
    env: true,
    modules: false
  }
};

module.exports = config;
