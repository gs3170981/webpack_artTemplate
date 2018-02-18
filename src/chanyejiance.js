const path = '../../src/'
const poject_url = 'chanyejiance'
const data = require('@/option/json/' + poject_url + '.json')
const head = require('components/' + poject_url + '/publicTemplate/head.art.html')

//const body = require('components/' + poject_url + '/publicTemplate/body.art.html')

import { Router } from 'js/routeJSLoad.js'
//const poject_url = '../../src/'
//window.option_data = data
//require('js/routeJSLoad.js')


$('head').html(head({
  'root': path,
  'data': data
}))
Router.init(data, poject_url)
//require('components/chanyejiance/js/route.js')

//setTimeout(() => {
//$('body').html(body(data))
//Router.init(data, poject_url)

//layui.use(['layer', 'form'], function () {
//  var layer = layui.layer,
//    form = layui.form;
//  layer.msg('Hello World');
//});
//}, 100)