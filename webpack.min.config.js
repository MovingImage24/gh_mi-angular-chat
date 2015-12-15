'use strict';

// modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////
var webpack = require('webpack');
var path = require('path');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// pathes //////////////////////////////////////////////////////////////////////////////////////////////////////////////
var srcPath = path.resolve(__dirname, 'src', 'index.js');
var dstPath = path.resolve(__dirname, 'dist');

// the base config /////////////////////////////////////////////////////////////////////////////////////////////////////
var config = {
  entry: srcPath,
  output: {
    path: dstPath,
    filename: 'mi-angular-chat.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new ngAnnotatePlugin({add: true}),
    new webpack.optimize.UglifyJsPlugin(
      {compress: {warnings: false}}
    ),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};

module.exports = config;
