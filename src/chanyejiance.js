const path = '../../src/'
const poject_url = 'chanyejiance'
const data = require('@/option/json/' + poject_url + '.json')
const head = require('components/' + poject_url + '/publicTemplate/head.art.html')
import { Router } from 'js/routeJSLoad.js'
Router(data, poject_url)
$('head').html(head({
  'root': path,
  'data': data
}))
require('components/' + poject_url + '/less/public.less')
