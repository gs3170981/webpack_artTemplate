require('../../less/public.less')
import { Arr, _this } from "../inheritCore_extend.js"
//import { Router } from 'js/routeJSLoad.js'
export default res => new Arr([{
  data: {
//  title: '全域大数据分析展示平台',
//  build: {
//    width: 12,
//    line: 1,
//    height: '50%',
//    template: 'index/index.art.html'
//  },
  },
  name: 'a',
  init () {
    console.log('我载入拉！', 1)
  },
  ajax () {
    console.log(2)
  },
  handle () {
//  console.log(3)
    console.log(3, res, _this)
    this.render() // 输出
  },
//render () {
////  _this.b.init()
//  Render(this)
//
//},
  bind () {

  }
}])
