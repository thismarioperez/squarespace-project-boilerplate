require('dotenv').config({ silent: true });
const path = require('path');
const root = path.resolve(__dirname);
const source = path.join(root, 'source');
const nodeModules = 'node_modules';
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: IS_PRODUCTION ? false : 'inline-source-map',

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
    modules: true,
    exclude: /node_modules/
  },

  resolve: {
    modules: [root, source, nodeModules],
    mainFields: ['webpack', 'browserify', 'web', 'main']
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
      { test: /source\/js\/.*\.js$/, exclude: /node_modules/, use: ['eslint-loader'], enforce: 'pre' },
      { test: /source\/js\/.*\.js$/, exclude: /node_modules/, use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: [
            require('babel-plugin-add-module-exports'),
            require('babel-plugin-transform-runtime')] }
      }] },
      { test: /\.(css|less)$/,
        use: [
          'file-loader?name=../styles/[name].css',
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
      }
    ]
  }
};
