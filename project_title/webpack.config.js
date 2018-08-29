const path = require('path');
const root = path.resolve(__dirname);
const source = path.join(root, 'source');
const nodeModules = 'node_modules';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const browsers = ['last 2 versions', 'ios >= 9'];

module.exports = {
  mode: process.env.NODE_ENV,

  devtool: IS_PRODUCTION ? false : 'inline-source-map',
  
  optimization: {
    minimize: IS_PRODUCTION ? true : false
  },
  
  plugins: [
    // Give the app scripts access to node environment variable.
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new MiniCssExtractPlugin({
      filename: '../assets/styles/[name].css'
    }),

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
    modules: [root, source, nodeModules],
    mainFields: ['webpack', 'browserify', 'web', 'hobo', 'main']
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

      // Expose custom properjs-hobo build
      { test: /(hobo|hobo.build)\.js$/, use: ['expose-loader?hobo'] },

      // Handle Sass files
      { test: /\.(css|scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              minimize: IS_PRODUCTION ? true : false,
              sourceMap: IS_PRODUCTION ? false : true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')({ browsers: browsers })],
              options: {
                sourceMap: IS_PRODUCTION ? false : true
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_PRODUCTION ? false : true
            }
          }
        ]
      }
    ]
  }
};
