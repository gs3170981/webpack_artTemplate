# 【框架】IteraG：项目迭代一体化工程框架
### 说在前头

-------------------

### 一、最精简的配置项（默认）

```
import { Arr, _this } from "bailidujuan/js/inheritCore_extend.js"
export default res => new Arr([{
  data: {
    title: '展示数据',
    build: {
      line: 1, // 每到新的一行必写父级元素高
      height: '100%', // 例如此处
      res: res,
      template: 'content/IndustryMonitoring/Marketing_Effect/Consumption_Type'
    }
  },
  handle () {
    console.log('--- 我是数据处理，并输出')
    this.render() // 这就是输出
  }
}])
```

-------------------

### 一、完整配置项（默认）

```
import { Arr, _this } from "bailidujuan/js/inheritCore_extend.js"
export default res => new Arr([{
  data: {
    title: '展示数据',
    build: { // 配置项 - 更多配置项请去inheritCore_extend.js扩展
    name: 'test', // id - 不写则为随机id
      width: 12, // 宽 - 参照bs栅格
      line: 1, // 行 - 每到新的一行必写第几行
      height: '100%', // 高 - 相对于浏览器高百分比
      res: res, // 默认
      css: ['height: 100%;'], // 样式 - 自定义父级样式，例如定位问题
      template: 'content/IndustryMonitoring/Marketing_Effect' // 模板位置
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
    this.render() // 这就是输出 --- 输出后自动执行bind
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
// mounted () { --- 已取消自定义配置输出项
//   console.log('我是执行自定义创建过程')
// },
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
    debugger // 这里你不debugger，你看不到console的内容，因为速度太快，页面已刷新
  }
})
```

-------------------

## 关于

make：o︻そ╆OVE▅▅▅▆▇◤（清一色天空）

blog：http://blog.csdn.net/mcky_love

掘金：https://juejin.im/user/59fbe6c66fb9a045186a159a/posts

-------------------


## 结束语

