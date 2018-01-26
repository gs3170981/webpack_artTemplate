const data = require('@/option/json/chanyejiance.json')
const head = require('components/chanyejiance/publicTemplate/head.art.html')
const body = require('components/chanyejiance/publicTemplate/body.art.html')
console.log(data)
$('head').html(head({
  'root': '../../src/',
  'path': '../../src/components/chanyejiance/',
  'data': data
}))
require("js/layui/layui.all.js")
//require("font-awesome-webpack")
//require('font-awesome/css/font-awesome.min.css')
//require("fonts/css/font-awesome.min.css")
//console.log(a)
//require("layui-layer")
//layer.msg('123')
//import layui from 'js/layui/layui.all.js'
//require('js/layui')
//require('js/layui/css/layui.css')
//require('less/public.css')
setTimeout(() => {
  $('body').html(body(data))
  layui.use(['layer', 'form'], function () {
    var layer = layui.layer,
      form = layui.form;
    layer.msg('Hello World');
  });
}, 100)