/* 高耦合文件,闲杂人等快快离开
 * Tips: 要修改原型请移步至子项目JS中的inheritCore_extend.js去继承并修改扩充配置项
 * --- GS */
const Fun = {
  load_auto (self, now, next) {
    /* 如果只有一个传参，则表示该函数不执行
     * 以及后面的也不再执行
     * (为了标识该函数是否手动执行还是同步执行的判断)
     * --- GS */
    if (!self.load_auto) {
      return
    }
    if (!self.data[now]) { // 如缺省则跳过进行下一个函数周期
      if (self[next]) {
        self[next]()
      }
      return
    }
    if (self.data[now].length !== 1) {
      self.data[now]()
      if (next) {
        self[next]()
      }
    } else {
      self.load_auto = false
      console.warn('当前已进入手动加载模式, 以下函数将停止自动执行（一般用于异步加载场合）')
    }
  },
  cycle_judge (self, action) {
    if (self && self[action]) {
      self[action]()
    }
  },
  build_default (old, now) {
    if (!now) {
      return old
    }
    if (!now.res) {
      console.error('请填写build必填项， res: res')
      return false
    }
    let build = {}
    for (let i in old) {
      let p = false
      for (let j in now) {
        if (i === j) {
          p = true
          build[i] = now[j]
          break
        }
      }
      if (!p) {
        build[i] = old[i]
      }
    }
    return build
  },
  mounted_diy (_self, Core) {
    for (let i = 0; i < _self.data.length; i++) {
      _this[_self.data[i].name] = _self.data[i]
    }
    for (let i = 0; i < _self.data.length; i++) {
      new Core(_self.data[i])
    }
    _self.beforeDestroy()
  }
}
const _this = {}
//const build_default = {
//width: 12,
//line: 1,
//height: '100%',
//template: 'publicTemplate/basics.html',
//res: {}
//}
class Core { // 单个Model的创建周期
  constructor (data) {
    this.data = data
    // 是否支持自定义render输出写法
    data.render ? this.render = this.data.render : this.data.render = this.render
    this.load_auto = true
    this.init()
  }
  init () {
    Fun.load_auto(this, 'init', 'ajax')
  }
  ajax () {
    Fun.load_auto(this, 'ajax', 'handle')
  }
  handle () {
    Fun.load_auto(this, 'handle', 'bind')
  }
  render () { // 输出
//  let build = Fun.build_default(build_default, this.data ? this.data.build : this.data) // build缺省值补全
//  if (!build) {
//    return
//  }
    // * --- 必要START
//  var obj = $('.content .layui-row')
//  if (build.width >= 6) {
//    build.klass = 'layui-col-xs12 content-layui-col layui-col-sm12 layui-col-md' + build.width
//  } else if (build.width >= 4) {
//    build.klass = 'layui-col-xs12 content-layui-col layui-col-sm6 layui-col-md' + build.width
//  } else {
//    build.klass = 'layui-col-xs12 content-layui-col layui-col-sm12 layui-col-md' + build.width
//  }
//  if ($(obj)[0]) {
//    // 如果有相同的则重新渲染
//    if ($('#' + build.id)[0]) {
//      var objParent = $('#' + build.id).parent()
//      $('#' + build.id).html(template('content/' + build.template, data))
//      return
//    }
//    for (var i = 0; i < obj.length; i++) {
//      var h = parseInt($(obj[i]).attr('data-line'))
//      if (build.line === h) {
//        $(obj[i]).append('<div id="' + build.id + '" style="height: '+ build.height +'" class="' + build.klass + '">' + template('content/' + build.template, data) + '</div>')
//        return
//      }
//    }
//  }

//  let path = "components/chanyejiance/publicTemplate/IndustryMonitoring/Consumption_Type.art.html"
//  let art = 'Consumption_Type.art.html'
//  path = $.extend(true, [], path)
//  path = path.toString().replace(/,/g, '')
//  path = JSON.parse(JSON.stringify(path))
// FUCK!!!!!!!!!!!!!!!!!!!!!!!!!
//  let content = require.context("components", true, /^\.\/chanyejiance\/publicTemplate\/IndustryMonitoring\/((?!\/)[\s\S])+\/Consumption_Type.art\.html$/);
//  let content = require('components/' + build.res.path)
//  var _self = this
//  function importAll (r) {
//    console.log('R的值', r)
//    r.keys().forEach(key => {
//      if (key === './chanyejiance/publicTemplate/IndustryMonitoring/Consumption_Type.art.html') {
//        console.log(true)
//      }
////      const content = require('components/chanyejiance/publicTemplate/IndustryMonitoring/Consumption_Type.art.html')
//
////      console.log('输出的值', r(key), key)
////      $('.G-content').append("<section data-line=" + build.line + " class='layui-row layui-col-space18' style='height:" + build.height + ";margin: 0;'><div id='" + _self.name + "' class='" + build.klass + "'>" + r(key)(_self.data) + "</div></section>")
//    });
//  }
//  var asd = eval('/\\' + 'Consumption_Type.art' + '\\.html$/')
//  console.log(asd)
//  let ww = /\Consumption_Type.art\.html$/

//	importAll(require.context("components/", true, /\.art.html$/))

//  const name = 'Consumption_Type.art.html'

//  const content = require('components/'+ build.res.path +'/publicTemplate/' + art + '.art.html')
//  console.log(content)
//  importAll(require.context("components/", true, eval('/\\' + 'Consumption_Type.art' + '\\.html$/')))
//  const content = require('components/chanyejiance/publicTemplate/IndustryMonitoring/Consumption_Type.art.html')
//  $('.G-content').append("<section data-line=" + build.line + " class='layui-row layui-col-space18' style='height:" + build.height + ";margin: 0;'><div id='" + this.name + "' class='" + build.klass + "'>" + content(this.data) + "</div></section>")
    // * --- END
//  const a = require(content)
//  console.log(a)
  }
  bind () {
    Fun.load_auto(this, 'bind')
  }
}
class Arr { // 生命周期
  constructor(data, other) {
    this.data = data
    this.other = other
    this.created()
  }
  created () {
    Fun.cycle_judge(this.other, 'created')
    this.mounted()
  }
  mounted () {
    Fun.mounted_diy(this, Core) // 为了传参继承只能挂出去
//  for (let i = 0; i < this.data.length; i++) {
//    _this[this.data[i].name] = this.data[i]
//  }
//  for (let i = 0; i < this.data.length; i++) {
//    new Core(this.data[i])
//  }
//  this.beforeDestroy()
  }
  beforeDestroy () {
    Fun.cycle_judge(this.other, 'beforeDestroy')
    this.destroyed()
  }
  destroyed () {
    onbeforeunload = e => Fun.cycle_judge(this.other, 'destroyed')
  }
}
export { Fun, Core, Arr, _this }
