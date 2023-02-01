/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-01-12 17:07:52
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-01-30 14:24:18
 */
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.css|scss|sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 5001,
    client: {
      logging: 'none',
    },
    hot: true,
    historyApiFallback: true
  },
  mode: 'development',
  devtool: 'inline-source-map'
})
