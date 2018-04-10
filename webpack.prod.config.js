const {
  resolve
} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
//const ExtractTextPlugin = require('extract-text-webpack-plugin')
const _path = (url) => {
  return resolve(__dirname, url)
}
module.exports = {
  entry: [
    _path('src/index.js')
  ],
  output: {
    path: _path('dist'),
    filename: '[chunkhash].js',
    //  publicPath: './'
  },
  module: {
    rules: [{
        test: /\.js$/,
//      exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /.art.html$/,
        use: ['art-template-loader']
      }, {
        test: /\.(less|css)$/, // 这里除了安装loader之外还要yarn add less 这尼玛的
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      //  {
      //    test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
      //    loader: 'file'
      //  },
      {

//      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//      loader: "url-loader?limit=10000&mimetype=application/font-woff"

        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
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
      'less': _path('src/less'),
      'fonts': _path('src/fonts'),
      '@': __dirname,
      'main': _path('src/js/logic/main'),
      /* 警告：此标记不可删除（被依赖于build_auto构建工具） */
// TODO START
      "bailidujuan": _path("src/components/bailidujuan"),
      "chanyejiance": _path("src/components/chanyejiance"),
// TODO END
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    }),
    new HtmlWebpackPlugin({
      template: _path('./src/index.html'),
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true
      }
    }),
    new webpack.ProvidePlugin({ // 加载jq
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyWebpackPlugin([{ // copy
      from: __dirname + '/src/js',
      to: __dirname + '/dist/js',
      toType: 'dir'
    }]),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/less',
      to: __dirname + '/dist/less',
      toType: 'dir'
    }]),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/fonts',
      to: __dirname + '/dist/fonts',
      toType: 'dir'
    }]),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/static',
      to: __dirname + '/dist/static',
      toType: 'dir'
    }])
  ]
}