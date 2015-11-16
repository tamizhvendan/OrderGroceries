var webpack = require('webpack');
var path = require('path');
var ROOT_DIR = path.resolve(__dirname);
var BUILD_DIR = path.resolve(ROOT_DIR, 'src/client/public');
var APP_DIR = path.resolve(ROOT_DIR, 'src/client/app');

var config = {
  entry: [
    APP_DIR + '/index.jsx',
    APP_DIR + '/main.scss'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test : /\.scss/,
        include : APP_DIR,
        loader: 'style!css!sass'
      },{
        test: /node_modules\/auth0-lock\/.*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify'
        ]
      },{
        test: /node_modules\/auth0-lock\/.*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify'
      },{
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

module.exports = config;
