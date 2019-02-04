/* global __dirname:false, module:false, require:false, */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/main-process/main.js',
    renderer: './src/renderer-process/renderer.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
