const {
  resolve
} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
function _path (url) {
  return resolve(__dirname, url)
}
module.exports = {
  entry: [
    resolve(__dirname, './src/index.js')
  ],
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /.art.html$/,
      use: ['art-template-loader']
    }]
  },
  resolve: {
    //查找module的话从这里开始查找
//  root: '',
    // require模块可以省略不写后缀名
    extensions: ['.js', '.art.html'],
    alias: {
      'components': _path('src/components'),
      'assets': _path('src/assets'),
      'img': _path('src/img'),
      'static': _path('src/static'),
      'plugin': _path('src/js/plugin'),
      'logic': _path('src/js/logic'),
      'main': _path('src/js/logic/main'),
      'plug': _path('plug')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './src/index.html')
    })
  ]
}