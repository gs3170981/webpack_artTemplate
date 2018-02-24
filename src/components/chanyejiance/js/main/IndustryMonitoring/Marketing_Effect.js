import { Arr, _this } from "chanyejiance/js/inheritCore_extend.js"
export default res => new Arr([{
  data: {
    title: '展示数据',
    build: {
      width: 6,
      line: 1, // 每到新的一行必须写父级元素高
      height: '60%', // 例如此处
      css: ['height: 100%;left: 25%;top: 25%;z-index: 1;background: white;'],
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
      css: ['height: 40%;transform: rotate(-45deg);left: -50%;top: 30%;'],
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
      width: 8,
      line: 3,
      css: ['margin-top: 100px;height: 100%'], // 细微的要自己调整
      height: '50%',
      res: res
    }
  },
  handle () {
    this.render() // 输出
  }
}])
