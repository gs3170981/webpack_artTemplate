//(() => {
//function Router() {
//  this.routes = {};
//  this.currentUrl = '';
//}
//Router.prototype.route = function (path, callback) {
//  this.routes[path] = callback || function () {};
//};
//Router.prototype.refresh = function () {
//  this.currentUrl = location.hash.slice(1) || '/';
//  this.routes[this.currentUrl]();
//};
//Router.prototype.init = function () {
//  window.addEventListener('load', this.refresh.bind(this), false);
//  window.addEventListener('hashchange', this.refresh.bind(this), false);
//}
//window.Router = new Router();
//window.Router.init();
//})()
const Fun = {
  router_filter: href => { // 过滤！等字符
    if (Router.data.filter.indexOf(href) !== -1) {
      href = href.substring(1, href+length)
    }
    return href
  }
}
const Router = {
  data: {
    filter: ['!'], // 过滤字符
    menu: {},
    url: ''
  },
  init (r, url) {
    console.log(this)
    this.data.menu = r.menu
    this.data.url = url
//  addEventListener('load', this.route())
    addEventListener('hashchange', this.route())

//  this.load()
  },
  load (r) {
    let data = this.data.menu

//  for (let i = 0; i < data.length; i++) {
//    let href = Fun.router_filter(data[i].href)

//  }
  },
  route () {
    let url = location.hash.slice(1).split('/') || '/'
    url = url[url.length - 1]
    if (!url.length) {
      url = 'index'
    }
    try {
      require('components/' + this.data.url + '/js/main/' + url + '.js')
    } catch (e) {
      console.warn('当前查询到JS文件出错, 视情况忽略该条警告', 'components/' + this.data.url + '/js/main/' + url[url.length - 1] + '.js', '错误信息：', e)
    }
  }
}
export { Router }