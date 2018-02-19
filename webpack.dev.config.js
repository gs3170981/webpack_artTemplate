const {
  resolve
} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const ExtractTextPlugin = require('extract-text-webpack-plugin')
const _path = (url) => {
  return resolve(__dirname, url)
}
const {
  FILE_NAME
} = require('./option/config.js')
let entry = {}
for (let i = 0; i < FILE_NAME.length; i++) {
  entry[FILE_NAME[i]] = _path('src/' + FILE_NAME[i] + '.js')
}
entry.login = _path('src/login.js')
module.exports = {
  entry: entry, // auto自动创建入口
  output: {
    filename: '[name].js'
    //  path: __dirname + '/dist'
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
      //    'plugin': _path('src/js/plugin'),
      //    'logic': _path('src/js/logic'),
      '@': __dirname,
      //    'css': _path('src/css'),
      'main': _path('src/js/logic/main')
      //    'plug': _path('plug')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      //    template: _path('src/login.html'),
      //    inject: 'head',
      chunks: ['login'], // 所需插入的js，数量超过一个用数组
      title: 'layoutModF'
      //    filename: 'login.html'
    }),
    //  new HtmlWebpackPlugin({
    //    template: _path('src/index.html')
    //  }),
    //  new HtmlWebpackPlugin({
    //    filename: 'index.html',
    //    template: _path('src/index.html'),
    //    inject: true,
    //    chunks: ['index']
    //  }),
    //  new HtmlWebpackPlugin({
    //    filename: 'login.html', //http访问路径
    //    template: _path('src/login.html'), //实际文件路径
    //    inject: true,
    //    chunks: ['login']
    //  }),
    //  new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
    ////    favicon: './src/img/favicon.ico', // favicon路径，通过webpack引入同时可以生成hash值
    ////    filename: './login.html', // 生成的html存放路径，相对于path
    //    template: _path('src/login.html'), // html模板路径
    ////    inject: 'body', // js插入的位置，true/'head'/'body'/false
    ////    hash: true, // 为静态资源生成hash值
    //    chunks: ['login'], // 需要引入的chunk，不配置就会引入所有页面的资源
    ////    minify: { // 压缩HTML文件
    ////      removeComments: true, // 移除HTML中的注释
    ////      collapseWhitespace: false // 删除空白符与换行符
    ////    }
    //  }),
    //  new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
    ////    favicon: './src/img/favicon.ico', // favicon路径，通过webpack引入同时可以生成hash值
    ////    filename: './index.html', // 生成的html存放路径，相对于path
    //    template: _path('src/index.html'), // html模板路径
    ////    inject: 'body', // js插入的位置，true/'head'/'body'/false
    ////    hash: true, // 为静态资源生成hash值
    //    chunks: ['index'], // 需要引入的chunk，不配置就会引入所有页面的资源
    ////    minify: { // 压缩HTML文件
    ////      removeComments: true, // 移除HTML中的注释
    ////      collapseWhitespace: false // 删除空白符与换行符
    ////    }
    //  }),
//  new webpack.ProvidePlugin({ // 加载jq
//    $: 'jquery',
//    jQuery: 'jquery'
//  })
    //  new webpack.ProvidePlugin({
    //    layui: 'layui-src'
    //  })
    //  new webpack.optimize.CommonsChunkPlugin({
    ////    name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
    //    chunks: ['login', 'index'] // 提取哪些模块共有的部分
    ////    minChunks: 3 // 提取至少3个模块共有的部分
    //  })
  ],
  devServer: {
    //  proxy: {
    //    "/api": {
    //      target: "http://localhost:8080",
    //      bypass: function (req, res, proxyOptions) {
    //        var accept = req.headers.accept
    //        if (accept) {
    //          if (accept.indexOf("html") !== -1) {
    //            console.log('\x1B[32m' + "Browser prohibition of input!" + '\x1B[39m')
    //            return "/"
    //          }
    //        }
    //        console.log(123)
    //        //      if (req.headers.accept.indexOf("html") !== -1) {
    //        //        console.log("Skipping proxy for browser request.");
    //        //        return "/index.html";
    //        //      }
    //      }
    //    }
    //  }
  }
}