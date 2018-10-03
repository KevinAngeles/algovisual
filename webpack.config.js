const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./assets/src/index.js"],
  output: {
    path: path.resolve(__dirname, '.tmp/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets"    : '> 0.25%, not dead',
                  "useBuiltIns": "entry"
                }
              ],
              [
                "@babel/preset-react"
              ]
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./assets/src/index.html",
      filename: "index.html"
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
