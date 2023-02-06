/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-01-12 17:07:29
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-02-03 11:07:41
 */
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', 'json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/,
        type: 'asset/resource'
      },
      {
        test: /\/js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
     },
     {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
     },
      {
        test: /\.scss|sass$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'less-loader',
         'css-loader', 'sass-loader'
        ]
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "my web",
      template: './public/index.html', // 这是html模板存放的地址
      filename: 'index.html',
    }),
    new CleanWebpackPlugin()
  ],
}
