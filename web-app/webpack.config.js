const path    = require("path")
const webpack = require("webpack")
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    application: "./app/javascript/application.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new Dotenv()
  ]
}
