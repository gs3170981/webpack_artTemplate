import { Arr, _this } from "@@@/js/inheritCore_extend.js"
import body from "@@@/publicTemplate/body.art.html"
export default res => new Arr([{
  //data: {
  //  title: '全域大数据分析展示平台',
  //  build: {
  //    width: 12,
  //    line: 1,
  //    height: '50%',
  //    template: 'index/index.art.html'
  //  },
  //},
  name: 'main',
  init() {
//  console.log('index', 1)
  },
  ajax() {
//  console.log('index', 2)
  },
  handle() {
    //  console.log(3)
//  console.log('index', 3, res, _this)
    this.render() // 输出
  },
  render() {
    $('body').html(body({
      res: res.data,
      json: JSON.stringify(res.data)
    }))
  },
  //render () {
  ////  _this.b.init()
  //  Render(this)
  //
  //},
  bind() {
    layui.use('element', function () {
      var element = layui.element
      element.init()
      element.on('tab(nav)', function (data) {
        console.log(data)
      })
    })
//  console.log('index', 5)
    $('.G-layui-nav-tree a').off('click').click(function () {
      let child = $(this).next()
      if (child.hasClass('G-item')) {
        let i_down = $(this).find('.fa-angle-down')
        let child_show = child.hasClass('child_show')
        if (!child_show) {
          child.addClass('child_show')
          setTimeout(res => {
            child.css('overflow-y', 'auto')
          }, 200)
        } else {
          child.removeClass('child_show').css('overflow-y', 'hidden')
        }
        i_down[0] && !i_down.hasClass('rotate_180') ? i_down.addClass('rotate_180') : i_down.removeClass('rotate_180')
      }
      if ($(this).attr('href')) {
        $('.G-layui-nav-tree a').removeClass('active')
        $(this).addClass('active')
      }
    })
    // 路由初始化跳转
    let path = location.hash
    let title = $('a[href="' + path + '"]')
    if (!path) {
      title = $('.G-layui-nav-tree .G-item-title[href]')[0]
    }
    $(title).parents('.G-item').prev().click()
    title.click()
  }
}])