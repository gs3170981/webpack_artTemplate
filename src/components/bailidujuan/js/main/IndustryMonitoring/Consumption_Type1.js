import { Arr, _this } from "bailidujuan/js/inheritCore_extend.js"
export default res => new Arr([{
  data: {
    title: '展示数据',
    build: {
      width: 12,
      line: 1, // 每到新的一行必写父级元素高
      height: '100%', // 例如此处
      res: res
    }
  },
  handle () {
    this.render() // 输出
  }
}])
