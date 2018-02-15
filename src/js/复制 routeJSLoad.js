(function () {
  function Router() {
    this.routes = {}
    this.data = []
  }
  Router.prototype.route = function (path) {
    this.routes[path.path] = {
      data: path,
      load: function (child) {
        var path = $.extend(true, [], this.data).path;
        lazyLoadJs(path === '/' ? 'index' : path.substring(1, path.length), child)
      }
    }
  }
  Router.prototype.refresh = function () {
    this.path = location.hash.slice(1) || '/'
    if (!this.routes[this.path]) { // 路由纠正
      // 无当前路由的情况下判断子路由
      var path = this.path.substring(0, this.path.lastIndexOf('/'))
      var child = false
      if (this.routes[path]) {
        child = this.path.substring(this.path.lastIndexOf('/'), this.path.length)
        this.path = path
        this.child = child
      } else {
        this.path = '/'
      }
    }
    // 前传父路由，后传子路由
    this.routes[this.path].load(child)
  }
  Router.prototype.init = function () {
    window.addEventListener('load', this.refresh.bind(this), false)
    window.addEventListener('hashchange', this.refresh.bind(this), false)
  }
  window.Router = new Router()
  window.Router.init()

  function lazyLoadJs(src, child) {
    if (child) {
      var path = 'js/logic/main/' + (src + child) + '.js'
      src += '_' + child.substring(1, child.length)
    } else {
      var path = 'js/logic/main/' + src + '.js'
    }
    var head = $('head').html()
    // 避免重复loadJS
    if (head.indexOf(path) !== -1) {
      load(src)
      return
    }
    // 防止在路由中刷新导致的未加载index --- bug
//  var index = 'js/logic/main/index.js'
//  if (head.indexOf(index) === -1) {
//    jsLoad(index, 'index')
//    // 防止加载当前index所导致的不跳出
//    if (path === index) {
//      return
//    }
//  }
//  setTimeout(function () {
      jsLoad(path, src)
//  }, 0)

    function jsLoad(path, src) {
      var script = document.createElement('script')
      script.setAttribute("type", "text/javascript")
      script.setAttribute("src", path)
      try {
      	$('head')[0].appendChild(script)
        script.onload = script.onreadystatechange = function () {
          if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            console.log(path + ' --- 引入')
            load(src)
          }
          script.onload = script.onreadystatechange = null
        }
      } catch (e) {
      	console.error('JS引入路径报错！', e)
      }
    }

    function load(src) {
      try {
        $('.content').html('') // 内容清空
        // echarts自适应清空
        window.charts = []
        window[src].init()


        /*刷新路由时并执行添加的活动标志*/
        var path = '#' + window.Router.path
        var child = window.Router.child
        var title = $('a[href="' + (path + child) + '"]')
        var childTitle = $(title).closest('.leftMenu-li').find('.layui-nav-child')
        $(title).closest('.leftMenu-li').find('.leftMenu-li-title').addClass('active')
        $(title).addClass('succ')
        if (childTitle) {
          $(childTitle).css({
            'max-height': '2.3rem'
          })
          setTimeout(function () {
            if (!$(childTitle).hasClass('mCustomScrollbar')) {
              $(childTitle).mCustomScrollbar()
            }
          }, 500)
        }
      } catch (e) {
        toastr.error('该JS文件有误，错误信息： ' + e.message + ' 请查看控制台定位进行调试', src)
        setTimeout(function () {
          window[src].init()
          return
        }, 300)
      }
    }
  }
})()