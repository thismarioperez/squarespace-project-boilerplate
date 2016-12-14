const path = require('path');
// const webpack = require('webpack');

module.exports = {

  devtool: 'inline-source-map',

  resolve: {
    root: path.resolve(__dirname)
  },

  entry: {
    'app': path.resolve(__dirname, 'src/scripts/app/app.js')
  },

  output: {
    path: path.resolve(__dirname, 'src/template/scripts/'),
    filename: '[name].js'
  },

  module: {

    preLoaders: [
      // ESLint
      {
        test: /src\/scripts\/app\/.*\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [
      // Babel
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src', 'scripts', 'app'),
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'es2015'
          ]
        }
      }
    ]
  }
};
