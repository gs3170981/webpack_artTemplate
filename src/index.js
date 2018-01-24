//var a = require("plugin/layui/css/layui.css")
/* TODO 该行不可删除
 * 1、‘ * ’：键值不可修改
 * 2、‘ & ’：必填项
 * 3、‘ | ’：可选项
 * 4、‘ href ’：添加路由但不加载界面可在路由前方填写‘ ! ’例：‘ !/IndustryMonitoring ’
 */

const router = {
  'title': '产业监测系统后台',
  'menu': [ // *
    {
      'title': '产业监测',
      'fa': 'fa-cube',
      'href': '/IndustryMonitoring', // * &
      'module': ['table', 'content'], // |
      'child': [ // |
        {
          'title': '消费类型统计',
          'href': '/Consumption_Type',
          'module': ['table', 'content']
        }, {
          'title': '营销效果对比',
          'href': '!/Marketing_Effect'
        }
      ]
    }
  ]
}
/* TODO 该行不可删除 */

const template = require('./template.art.html')

const text = 'Hello World!'
document.getElementById('main').innerHTML = template({ text: text })