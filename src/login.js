require('./less/public.css')
require('./less/login.less')
//require('js/scroll/jquery.mCustomScrollbar.css')
//require('js/scroll/jquery.mCustomScrollbar.concat.min.js')
import { FILE_NAME, CONFIG } from '@/option/config.js'
const template = require('components/public/login.art.html')
$('body').html(template({
  config: CONFIG,
  fileName: FILE_NAME
}))
//$('.content .item').mCustomScrollbar()
