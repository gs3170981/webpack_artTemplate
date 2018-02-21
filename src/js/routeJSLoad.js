const Fun = (r, path) => {
  let url = location.hash.slice(2) || 'index'
  let router_js = {}
  let data = {
    data: r,
    path: path
  }
  let AloneR = false
  const AloneRouter = r.AloneRouter
  for (let i = 0; i < AloneRouter.length; i++) {
    if (AloneRouter[i].href === '/' + url) {
      AloneR = true
      break
    }
  }
  if (AloneR) {
    console.log('进入独立路由')
  } else if (url === 'index') {
    window.INDEX = true // 避免重复加载，这里的判断用局部变量失效，只能用全局
  } else if (!window.INDEX) {
    router_js = require('components/' + path + '/js/main/' + 'index' + '.js')
    router_js.default(data)
    window.INDEX = true
  }
  router_js = require('components/' + path + '/js/main/' + url + '.js')
  router_js.default(data)
}
const Router = (r, path) => {
  addEventListener('load', () => Fun(r, path)) // 用于无#的载入
  addEventListener('hashchange', () => Fun(r, path)) // 用于有#的载入
}
export {
  Router
}