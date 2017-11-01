const path = require('path');
const root = path.resolve(__dirname);
const source = path.join(root, 'source');
const nodeModules = 'node_modules';
const webpack = require('webpack');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: IS_PRODUCTION ? false : 'inline-source-map',

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: IS_PRODUCTION ? false : true, // must be enabled here for devtool source-map to work.
      output: { comments: !IS_PRODUCTION, beautify: !IS_PRODUCTION },
      compress: IS_PRODUCTION ? { drop_console: true } : false, // eslint-disable-line camelcase
      mangle: IS_PRODUCTION ? { except: ['_'] } : false // don't mangle lodash
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
              presets: ['env'],
              plugins: [require('babel-plugin-add-module-exports'), require('babel-plugin-transform-runtime')]
            }
          }
        ]
      },

      // Handle Less files
      { test: /\.(css|less)$/,
        use: [
          { loader: 'file-loader',
            options: { name: '[name].css', outputPath: '../styles/' }
          },
          { loader: 'postcss-loader',
            options: { plugins: () => [require('autoprefixer')({ browsers: ['last 2 versions'] })] }
          },
          { loader: 'less-loader' }
        ]
      }
    ]
  }
};
