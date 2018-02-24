//import { Arr, _this } from "js/inheritCore.js"
import { Arr, _this } from "chanyejiance/js/inheritCore_extend.js"
//import { Router } from 'js/routeJSLoad.js'
export default res => new Arr([{
  data: {
    title: '展示数据',
    build: {
      width: 6,
      line: 1, // 每到新的一行必须写父级元素高
      height: '60%', // 例如此处
      css: ['height: 100%;float: right;'],
//    template: 'IndustryMonitoring/Consumption_Type',
      res: res
    }
  },
  handle () {
    this.render() // 输出
  }
}, {
  data: {
    title: '展示数据',
    build: {
      width: 6,
      line: 1,
      css: ['height: 40%'],
//    template: 'IndustryMonitoring/Consumption_Type',
      res: res
    }
  },
  handle () {
    this.render() // 输出
  }
}, {
  data: {
    title: '展示数据',
    build: {
      width: 6,
      line: 1,
      css: ['margin-top: 5px;height: 58%'], // 细微的要自己调整
//    template: 'IndustryMonitoring/Consumption_Type',
      res: res
    }
  },
  handle () {
    this.render() // 输出
  }
}, {
  data: {
    title: '展示数据',
    build: {
      width: 12,
      line: 2,
      height: '20%',
//    template: 'IndustryMonitoring/Consumption_Type',
      res: res
    }
  },
  handle () {
    this.render() // 输出
  }
}])
