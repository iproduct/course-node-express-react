var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  context: helpers.root('src'),
  entry: {
    'polyfills': './polyfills.js',
    'vendor': './vendor.js',
    'app': ['./app/index.js']
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-decorators-legacy'
          ],
          presets: [
            ['es2015', { 'modules': false }],
            // webpack understands the native import syntax, and uses it for tree shaking
            'stage-0',
            // Specifies what level of language features to activate.
            // Stage 1 is proposal, Stage 2 is "draft", 4 is finished, 0 is strawman.
            // See https://tc39.github.io/process-document/
            'react'
            // Transpile React components to JavaScript
          ]
        },
        
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   use: [{
      //     loader: 'url-loader',
      //     options: { limit: 10000 } // Convert images < 10k to base64 strings
      //   }]
      // },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[hash].[ext]'
        }
      },
      {
        test: /\.p?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // modules: true,
              importLoaders: 1
            }
          },
          // {
          //   loader: 'sass-loader'
          // }, 
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  // require('autoprefixer')
                ];
              }
            }
          }]
        })
      },
      // {
      //   test: /\.css$/,
      //   include: 'app',
      //   loader: 'raw-loader'
      // },
      // {
      //   test: /\.css$/,
      //   include: helpers.root('src', 'app'),
      //   use: [
      //     'style-loader',
      //     'css-loader?modules',
      //     'postcss-loader',
      //   ],
      // },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'React TODO Demo'
    })
  ]
};
