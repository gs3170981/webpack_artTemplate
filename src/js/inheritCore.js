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
      self[next]()
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
  }
}
const _this = {}
const build_default = {
  width: 12,
  line: 1,
  height: '100%',
  template: 'publicTemplate/basics.html'
}
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
    let build = Fun.build_default(build_default, this.data.build) // build缺省值补全
    console.log(build)
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
//  $('.content').append("<section data-line=" + build.line + " class='layui-row layui-col-space18 " + build.class +"' style='height:" + build.height + ";margin: 0;'><div id='" + build.id + "' class='" + build.klass + "'>" + template('content/' + build.template, data) + "</div></section>")
    // * --- END
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
    for (let i = 0; i < this.data.length; i++) {
      _this[this.data[i].name] = this.data[i]
    }
    for (let i = 0; i < this.data.length; i++) {
      new Core(this.data[i])
    }
    this.beforeDestroy()
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
