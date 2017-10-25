require('dotenv').config({ silent: true });

const webpack = require('webpack');
const ETP = require('extract-text-webpack-plugin');
const path = require('path');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const config = {
  devtool: IS_PRODUCTION ? false : 'inline-source-map',
  entry: {
    site: [
      './scripts/site.js',
      './styles/site.less'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'scripts/[name]-bundle.js',
  },
  module: {
    rules: [
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
      },
      {
        test: /\.(css|less)$/,
        loader: ETP.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({ browsers: ['last 2 versions'] }),
                  require('cssnano')({})
                ]
              }
            },
            { loader: 'less-loader' }
          ]
        })
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

    new ETP('./styles/[name].css')
  ]
};

module.exports = config;
