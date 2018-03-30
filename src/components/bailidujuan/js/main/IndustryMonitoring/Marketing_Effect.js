import { Arr, _this } from "bailidujuan/js/inheritCore_extend.js"
export default res => new Arr([{
  data: {
    title: '展示数据',
    build: {
      width: 12,
      line: 1, // 每到新的一行必写父级元素高
      height: '100%', // 例如此处
      res: res,
      name: 'asd',
      template: 'content/IndustryMonitoring/Marketing_Effect'
    }
  },
  init () {
    console.log('--- 我是节点初始化')
  },
  ajax () {
    console.log('--- 我是获取数据')
  },
  handle () {
    console.log('--- 我是数据处理，并输出')
    this.render() // 这就是输出
  },
  bind () {
    console.log('--- 我是事件绑定')
  }
}], {
  beforeCreated () {
    console.log('我是路由载入时的钩子')
  },
  created () {
    console.log('我是节点创建前的钩子')
  },
//mounted () {
//  console.log('我是执行自定义创建过程')
//},
  beforeDestroy () {
    console.log('我是节点创建后的钩子')
  },
  hashchange () {
    return r => {
      console.log('我是路由跳转前的钩子')
    }
  },
  destroyed () {
    console.log('我是页面销毁前的钩子')
  }
})
