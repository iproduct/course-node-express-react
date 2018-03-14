const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    polyfills: "./polyfills.js",
    vendor: "./vendor.js",
    app: ["./index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["es2015", { modules: false }], "stage-1", "react"]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: "file-loader",
        options: {
          name: "assets/[name].[hash].[ext]"
        }
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, "src"),
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        })
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader?modules"]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new ExtractTextPlugin('assets/css/[name].css')
  ]
};
