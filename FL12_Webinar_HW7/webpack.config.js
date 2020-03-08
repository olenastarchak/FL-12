const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
  entry: {
    app: './src/js/index.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
      ]
    }]
  },
  devServer: {
    overlay: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([{
      from: './src/img/',
      to: path.resolve(__dirname, './dist/img')
    }]),
    new ImageminPlugin({
      disable: process.env.NODE_ENV === 'dev',
      pngquant: {quality: '30-50'},
      gifsicle: {
        optimizationLevel: 3,
        colors: 200,
        interlaced: true
      },
    }),
    new PrettierPlugin()
  ],
}