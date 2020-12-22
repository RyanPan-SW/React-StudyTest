const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const base = require("./webpack.base");
const { smart } = require("webpack-merge");

module.exports = smart(base, {
  target: "node",
  entry: {
    filename: "skeleton.js",
    libraryTarget: "commonjs2",
  },
  plugins: [],
});
