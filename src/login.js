require('./less/public.css')
require('./less/login.less')
import { FILE_NAME, CONFIG } from '@/option/config.js'
const template = require('components/public/login.art.html')
$('body').html(template({
  config: CONFIG,
  fileName: FILE_NAME
}))