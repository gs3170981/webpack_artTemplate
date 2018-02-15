console.log('\x1B[42m' + '正在构建中，请尽量等以下时间结束......\nTIPS：如果您构建过一次，建议下一次可直接执行：> npm run start' + '\x1B[49m')
const fs = require("fs")
let file_handle = {
  url: './option/json',
  build: './option/build/',
  css_path: './src/css',
  promise_arr: {
    file_name: [],
    arr: []
  },
  config: []
}
let files = fs.readdirSync(file_handle.url)
/* 读取option json配置项 */
files.forEach((file, index) => {
  let promise_arr = file_handle.promise_arr
  promise_arr.arr.push(new Promise((resolve, reject) => {
    fs.readFile(file_handle.url + '/' + file, 'utf8', (err, data) => {
      err ? reject(err) : resolve(data)
    })
  }))
  promise_arr.file_name.push(file.substring(0, file.lastIndexOf('.json')))
})

Promise.all(file_handle.promise_arr.arr).then(results => {
  let file_C = (name, build_option, del) => {
    fs.exists(name, function (exists) {
      if (exists) { // 有这个文件的话 --- 跳过
        return false
      }
      // 添加
      fs.appendFile(name, build_option, 'utf8', function (err) {
        if (err) {
          return console.error(err)
        }
      })
    })
  }
/* 给package.json添加各项目的webpack打包配置 */
  let file_name = file_handle.promise_arr.file_name
  fs.readFile('./package.json', 'utf8', (err, data) => {
    if (err) {
      return console.error(err)
    }
    let obj = JSON.parse(data)
    for (let i = 0; i < file_name.length; i++) {
      obj.scripts[file_name[i]] = 'node option/build/' + file_name[i] + ' && webpack --config webpack.prod.config.js --progress';
/* 创建项目入口JS文件 */
      let build_inlet = `const data = require('@/option/json/`+ file_name[i] +`.json')
const head = require('components/`+ file_name[i] +`/publicTemplate/head.art.html')
const body = require('components/`+ file_name[i] +`/publicTemplate/body.art.html')
window.option_data = data
const path = '../../src/' // 不可修改!
$('head').html(head({
  'root': path,
  'data': data
}))
`
      file_C('./src/' + file_name[i] + '.js', build_inlet);
/* 对build项目打包做预处理 */
      ((i) => {
        let build_option = `console.log('\\x1B[42m' + '正在打包预处理 --- ` + JSON.parse(results[i]).title + `' + '\\x1B[49m')
const fs = require("fs")
const deleteDir = (path) => {
  var files = []
  if(fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function(file, index) {
      var curPath = path + "/" + file
      if(fs.statSync(curPath).isDirectory()) {
        deleteDir(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}
deleteDir('./dist')
fs.readFile('./src/` + file_name[i] + `.js', 'utf8', (err, data) => {
  if (err) {
    return console.error(err)
  }
  fs.unlinkSync('./src/index.js', err => { // 删除
    if (err) throw err
  })
  fs.appendFile('./src/index.js', data.replace('../../src/', ''), 'utf8', function (err) {
    if (err) {
      return console.error(err);
    }
  })
})
`
        file_C(file_handle.build + file_name[i] + '.js', build_option)
      })(i)

/* 对css全局样式创建 */
//    file_C(file_handle.css_path + file_name[i] + '.less', build_option)
    }
    fs.unlinkSync('./package.json', err => { // 删除
      if (err) throw err
    })
/* 简单格式化并输出 */
    fs.appendFile('./package.json', JSON.stringify(obj).replace(/,/g, ',\n'), 'utf8', function (err) {
      if (err) {
        return console.error(err);
      }
    })
  })
/* 配置项合并导出config.js可方便import依赖 */
  fs.unlinkSync('./option/config.js', err => { // 删除
    if (err) throw err
  })
  let _results = 'const CONFIG = [' + results + ']\n' +
  'const FILE_NAME = ' + JSON.stringify(file_name) + '\n' +
//'export { CONFIG, FILE_NAME }'
  'module.exports = { CONFIG: CONFIG,FILE_NAME: FILE_NAME }'
  fs.appendFile('./option/config.js', _results, 'utf8', function (err) {
    if (err) {
      return console.error(err);
    }
  })

})
