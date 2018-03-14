import { Fun, Core, Arr, _this } from "js/inheritCore.js"

class Core_extend extends Core {
  constructor(data) {
    super(data)
  }
  render () { // 扩展输出配置
    let build = Fun.build_default({ // 自动补全的默认配置
      width: 12,
      line: 1,
      height: 'auto',
      template: 'basics',
      css: ['height: 100%;'],
      res: {}
    }, this.data ? this.data.build : this.data) // build缺省值补全a
    if (!build) {
      return
    }
    this.name = this.name ? this.name : 'G' + Math.random().toString().slice(2) // 尽量要写自己name
    /* 这行可能会出BUG，就是该死的require解析机制FUCK!!! */
    // TODO START
    const content = require('@@@/publicTemplate/' + build.template + '.art.html')
    // TODO END build_auto耦合
    let obj = $('.G-content .layui-row')
    if (build.width >= 6) {
      build.klass = 'layui-col-xs12 content-layui-col layui-col-sm12 layui-col-md' + build.width
    } else if (build.width >= 4) {
      build.klass = 'layui-col-xs12 content-layui-col layui-col-sm6 layui-col-md' + build.width
    } else {
      build.klass = 'layui-col-xs12 content-layui-col layui-col-sm12 layui-col-md' + build.width
    }
    if ($(obj)[0]) {
      // 如果有相同的则重新渲染 --- 一般用于重新加载自身的时候
      if ($('.G-content #' + this.name)[0]) {
        let objParent = $('.G-content #' + this.name).parent()
        $('.G-content #' + this.name).html(content(this.data))
        return
      }
      for (let i = 0; i < obj.length; i++) {
        let h = parseInt($(obj[i]).attr('data-line'))
        if (build.line === h) {
          $(obj[i]).append("<div id='" + this.name + "' style='"+ build.css +";' class='" + build.klass + "'>" + content(this.data) + "</div>")
          return
        }
      }
    }
    $('.G-content').append("<section data-line=" + build.line + " class='layui-row' style='height:" + build.height + ";margin: 0;'><div id='" + this.name + "' style='"+ build.css +";' class='" + build.klass + "'>" + content(this.data) + "</div></section>")
  }
}
class Arr_extend extends Arr {
  constructor(data) {
    super(data)
  }
  mounted () {
    Fun.mounted_diy(this, Core_extend)
  }
}
export {
  Arr_extend as Arr,
  _this
}