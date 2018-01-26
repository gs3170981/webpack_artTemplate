const {
  resolve
} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const ExtractTextPlugin = require('extract-text-webpack-plugin')
const _path = (url) => {
  return resolve(__dirname, url)
}
module.exports = {
  entry: [
    _path('src/index.js')
  ],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[chunkhash].js',
//  publicPath: 'dist/'
  },
  module: {
    rules: [{
      test: /.art.html$/,
      use: ['art-template-loader']
    }, {
      test: /\.(less|css)$/, // 这里除了安装loader之外还要yarn add less 这尼玛的
      use: ['style-loader', 'css-loader', 'less-loader'],
    }, {
      test: /\.(png|jpg)$/, // 没这个require-css的时候图片加载不进 - 还是有些问题，最后换base64解决
      loader: 'url-loader?limit=25000&name=images/[hash:8].[name].[ext]'
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
      'js': _path('src/js'),
//    'plugin': _path('src/js/plugin'),
//    'logic': _path('src/js/logic'),
      '@': __dirname,
      //    'css': _path('src/css'),
      'main': _path('src/js/logic/main')
      //    'plug': _path('plug')
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './src/index.html'),
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true
      }
    }),
    new webpack.ProvidePlugin({ // 加载jq
      $: 'jquery'
    })
  ]
}