/*tips: ------------------------------------------------------
  path: 即是获取的路由亦是加载的js文件目录,目录默认挂载在main下
  title: 这个没啥用,用于找模块维护方便
  {
    path的名称除了首页/，其余的必须遵循以下条件才能正确引入
      1、index.js文件下有正确的路由点击路径
      2、main下必须要有相同名称的JS
      3、JS内部必须用闭包的形式以该名称命名
  }
----------------------------------------------------------GS*/

var Router = [
  {
    path: '/', // 这个一般情况下不要动
    title: '首页'
  }, {
    path: '/IndustryMonitoring',
    title: '产业监测',
    child: [{ // 创建文件支持无限子路由嵌套写法，但路由底层routeJSLoad.js暂不支持(有时间去完善)
      title: '消费类型统计',
      path: '/Consumption_Type'
    }, {
      title: '营销效果对比',
      path: '/Marketing_Effect'
    }]
  }, {
    path: '/Financial_Reporting',
    title: '财务报表',
    child: [{ // 创建文件支持无限子路由嵌套写法，但路由底层routeJSLoad.js暂不支持(有时间去完善)
      title: '财务日统计报表',
      path: '/Day_Statistics'
    }, {
      title: '财务客流统计',
      path: '/PassengerFlow_statistics'
    }, {
      title: '财务上报',
      path: '/Reporting'
    }, {
      title: '财务库存统计',
      path: '/Stock_Statistics'
    }, {
      title: '财务国税核销',
      path: '/NationalTax_Cancel'
    }]
  }, {
    path: '/Tourist_Center',
    title: '游客中心报表',
    child: [{
      title: '销售排名',
      path: '/Sales_Rank'
    },{
      title: '销售检票统计',
      path: '/SalesTicket_Statistics'
    }]
  }, {
    path: '/Sales_Report',
    title: '营销部报表',
    child: [{ // 创建文件支持无限子路由嵌套写法，但路由底层routeJSLoad.js暂不支持(有时间去完善)
      title: '国内团队统计',
      path: '/DomesticTeam_Statistics'
    }, {
      title: '国内团队总计',
      path: '/DomesticTeam_Total'
    }, {
      title: '省内团队统计',
      path: '/ProvincialTeam_Statistics'
    }, {
      title: '省内团队总计',
      path: '/ProvincialTeam_Total'
    }, {
      title: '旅行社销售统计',
      path: '/TourOperatorSale_Statistics'
    }, {
      title: '旅行社销售总计',
      path: '/TourOperatorSale_Total'
    }]
  }, {
    path: '/OnlineBusiness_Report',
    title: '合作网商报表'
  }
]

/*------------------------注意事项------------------------
1、在同一目录下文件夹名称不可相同，文件名称相同的情况下后缀名不可相同
2、文件夹内方可创建child子项目目录，文件下创建child对象不执行
3、文件夹名称不可包含'.'字符
----------------------------END--------------------------*/
var mkDir = []

/* 执行思路 ---------------------------------------------------
 * Start
 * 1、先删除当前目录下的route路由文件，并添加新的route.js
 * 2、判断main目录下是否存在相同名称的js文件以及文件夹(递归判断)
 *    1)多余的未匹配到的文件删除(files.forEach -> for Router)
 *    2)构建main下目录结构(只针对目录下未含有名称的文件，有则不进行覆盖操作)(for Router -> files.forEach)
 * END --------------------------------------------------------
 * */

var _methods = {
  data: {
    now: 0, // 当前执行的进度
    sum: 0, // 一共需要执行的步数
    log: '', // 日志
    routePath: 'js/logic/', // route.js要创建的位置
    jsPath: 'js/logic/main/' // main内的js遍历的位置
  },
  _nodeInit: function (mkDir) { /*初始化*/
    this._nodeSum(mkDir) // 计算一共执行次数
    this._route(mkDir) // 创建自身路由文件
    this._nodeDel(mkDir, this.data.jsPath) // 删除多余的文件(main下的js文件以及文件夹)
    this._nodeFor(mkDir, this.data.jsPath, '') // 创建main-JS文件
  },
  _route: function (mkDir) {
    var self = this
    var route = this.data.routePath + 'route.js'
    fs.exists(route, function (exists) {
      if (exists) { // 有这个文件的话 --- 删除
        fs.unlinkSync(route, function (err) { // 删除
          if (err) throw err
        })
      }
      var Text = '' // 添加
      for (var i = 0; i < mkDir.length; i++) {
        Text += 'Router.route('+ JSON.stringify(mkDir[i]) +')\n'
      }
      fs.appendFile(route, Text, 'utf8', function (err) {
        if (err) {
          return console.error(err)
        }
        console.log('[' + '1' + '/' + self.data.sum + ']\x1B[90m ' + 'route.js' + '\x1B[39m' + '\x1B[32m' + ' installed ' + '\x1B[39m' + 'at ' + self.data.routePath)
      })
    })
  },
  _nodeDel: function (mkDir, path) {
    var self = this
    files = fs.readdirSync(path)
    files.forEach(function (file, index) { // 遍历文件夹下所有文件名称
      var js = true // 默认是JS文件
      var p = false // 查找路由下是否有该文件名称
      // 如果是文件夹则false否则去掉后面的js后缀名去匹配name
      var _file = file
      _file.lastIndexOf('.') === -1 ? js = false : _file = _file.substring(0, _file.lastIndexOf('.'))
      for (var i = 0; i < mkDir.length; i++) {
        var name = mkDir[i].path.substring(1, mkDir[i].path.length) // 去掉/
        if (name === _file) {
          // 如果是js文件，Route-json里却是文件夹的时候(含有child)，则删
          // 反过来，如果json里是js，main下是同名文件夹，则删
          if ((!mkDir[i].child && !js) || mkDir[i].child && js) {
            break
          } else if (!js) { // 如果是目录则递归查找
            self._nodeDel(mkDir[i].child, path + name + '/')
          }
          p = true
          break
        }
      }
      if (!p && file !== 'index.js') {
        var _path = path + file
        if (js) { // 是文件则删除
          fs.unlinkSync(_path, function (err) { // 删除
            if (err) throw err
          })
          return
        }
        // 删除目录 --- 不支持删除非空文件夹
        files = fs.readdirSync(_path)
        if (files.length) { // 有子文件夹的话
          files.forEach(function (file, index) {
            fs.unlinkSync(_path + '/' + file, function (err) { // 删除
              if (err) throw err
            })
          })
        }
        fs.rmdirSync(path + file)
      }
    })
  },
  _nodeFor: function (mkDir, path, front_name) { /*无限子节点异步回调创建目录结构*/
    /*  思路
     * 1、for获取每个json的path值(name)以及child(用于后面判断是否有child来递归)
     * 2、遍历path目录路径下的所有文件，找到匹配的名称
     * 2-1、有则判断json是否含有child
     * 2-1-1、有child则传参至1、
     * 2-1-2、无则添加该文件夹并递归1、
     * 2-2、无匹配则添加该js文件
    */
    var self = this
    for (var i = 0; i < mkDir.length; i++) { // 1
      (function (obj) {
        var is = false // 默认没找到文件
        files = fs.readdirSync(obj.path)
        files.forEach(function (file, index) { // 2
          var js = true // 默认自身没有child是js文件
          var _file = file
          _file.lastIndexOf('.') === -1 ? js = false : _file = _file.substring(0, _file.lastIndexOf('.'))
          if (_file === obj.name) {
            is = true
            if (!js) { // 如果是目录则递归查找
              self._nodeFor(obj.child, obj.path + obj.name + '/', obj.name)
            }
            return
          }
        })
        if (!is && obj.name.length) { // 2-2 --- 防止首页 / 的创建
          if (obj.child) {
            fs.mkdir(obj.path + obj.name, function (err) {
              if (err) {
                return console.error(err)
              }
              self._nodeTree(++self.data.now, obj.path, obj.name) /*加载loading*/
              self._nodeFor(obj.child, obj.path + obj.name + '/', obj.name)
            })
            return
          }
          // 2-2
          var val = "var "+ obj.front_name + obj.name +" = (function () {\n" +
          "  var one = {\n" +
          "    // 数据集\n" +
          "    data: {}, // 默认数据 --- 用于未加载ajax前的默认假数据,\n" +
          "    // 初始化\n" +
          "    init: function () {\n" +
          "      this.ajax()\n" +
          "    },\n" +
          "    // 数据获取\n" +
          "    ajax: function () {\n" +
          "      // 加载AJAX前先输出UI空壳(也可作为正在加载的loading界面)\n" +
          "  //  $('.content-table').html(template('xxx/xxx', this.data))\n" +
          "      this.data = {\n" +
          "        title: '123'" +
          "        // AJAX获取后的数据\n" +
          "      }\n" +
          "      this.handle()\n" +
          "    },\n" +
          "    // 数据处理 --- && build 配置项\n" +
          "    handle: function () {\n" +
          "      this.data.build = {\n" +
          "        id: 'a', // 随便写\n" +
          "        name: 'one', // 与调用模块名一致\n" +
          "        width: 6, // bs --- 12\n" +
          "        line: 1, // 第几行\n" +
          "        height: '50%', // 占全屏幕的多高\n" +
          "        template: 'basics' // 调用模板名称\n" +
          "      }\n" +
          "      // 对AJAX获取到后的数据进行处理(如果需要整理的话)\n" +
          "//    for (var i = 0; i < this.data.length; i++) {}\n" +
          "      this.render()\n" +
          "    },\n" +
          "    // 数据渲染\n" +
          "    render: function () {\n" +
          "      Content(this.data, this)\n" +
          "      this.bind()\n" +
          "    },\n" +
          "    // 数据绑定\n" +
          "    bind: function () {\n" +
          "      // do something......\n" +
          "    }\n" +
          "  }\n" +
          "  return {\n" +
          "    init: function () {\n" +
          "      one.init() // 执行初始化\n" +
          "    }\n" +
          "  }\n" +
          "})()\n"
          fs.appendFile(obj.path + obj.name + '.js', val, 'utf8', function (err) {
            if (err) {
              return console.error(err)
            }
            self._nodeTree(++self.data.now, obj.path, obj.name) /*加载loading*/
          })
        }
      })({
        name: mkDir[i].path.substring(1, mkDir[i].path.length), // 去除前面/
        child: mkDir[i].child,
        path: path,
        front_name: front_name ? front_name + '_' : ''
      })
    }
  },
  _nodeSum: function (arr) { /*计算总执行次数*/
    console.log('\x1B[90m' + 'Downloading Current JS to ' + __dirname + '\x1B[39m')
    var self = this
    function sumRec (arr) {
      for (var i = 0; i < arr.length; i++) {
        var child = arr[i].child
        self.data.sum ++
        if (child) {
          sumRec(child)
        }
      }
    }
    sumRec(arr)
    console.log('\x1B[90m' + 'Altogether contains ' + this.data.sum + 'second Execution process' + '\x1B[90m')
  },
  _nodeTree: function (now, path, name) { /*异步过程界面化*/
    console.log('[' + (now + 1) + '/' + this.data.sum + ']\x1B[90m ' + name + '\x1B[39m' + '\x1B[32m' + ' installed ' + '\x1B[39m' + 'at ' + path)
    if ((now + 1) === this.data.sum) {
      console.log('\x1B[32m' + 'All package installed ' + this.data.sum + ' project installed from ' + __dirname + '\x1B[39m')
      console.log('\x1B[35m' + 'Project catalogue:' + '\x1B[39m')
//    console.log(this.data.log + '------------------------------------')
      console.log(",'''╭⌒╮⌒╮.',''',,',.'',,','',.\n" +
      " ╱◥██◣''o',''',,',.''.'',,',.\n" +
      "｜田｜田田│ '',,',.',''',,',.''\n" +
      "╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬" + '\n------------------------------------')
      console.log('\x1B[35m' + 'MAKE：o︻そ╆OVE▅▅▅▆▇◤\nBLOG：http://blog.csdn.net/mcky_love\nGITHUB：https://github.com/gs3170981\njuejin：https://juejin.im/user/59fbe6c66fb9a045186a159a' + '\x1B[39m')
    }
  }
}
var fs = require("fs")
_methods._nodeInit(Router)