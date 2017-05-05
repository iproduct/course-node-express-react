var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

// Enable React HMR
commonConfig.entry['app'].unshift('react-hot-loader/patch');
commonConfig.module.rules.find(rule => rule.loader === 'babel-loader')
  .options.plugins.push('react-hot-loader/babel'); 

// Merge dev and common configs
module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',  // necessary for HMR to know where to load the hot update chunks
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('assets/css/[name].css'),
    new webpack.NamedModulesPlugin() // Enable named module updates with React HMR
  ],

  devServer: {
    hot: true, // enable HMR on the server
    contentBase: helpers.root('dist'), // match the output path
    publicPath: '/', // match the output `publicPath`
    // port: 3000,
    historyApiFallback: true, // HTML 5 History API support
    stats: 'minimal', // Minimal statistics
  }
});
