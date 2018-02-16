const Fun = {
  load_auto (self, now, next) {
    /* 如果只有一个传参，则表示该函数不执行
     * 以及后面的也不再执行
     * (为了标识该函数是否手动执行还是同步执行的判断)
     * --- GS */
    if (!self.load_auto) {
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
  }
}
const _this = {}
class Core { // 单个的原型过程控制
  constructor (data) {
    this.data = data
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
    Fun.load_auto(this, 'handle', 'render')
  }
  render () {
    Fun.load_auto(this, 'render', 'bind')
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
export { Core, Arr, _this }
