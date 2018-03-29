/* 高耦合文件,闲杂人等快快离开
 *
 * --- GS */
console.log('\x1B[42m' + '正在构建文件，请尽量等以下时间结束......\nTIPS：如果您构建过一次，建议下一次可直接执行：> npm run json' + '\x1B[49m')
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
    fs.exists(name, (exists) => {
      if (exists) { // 有这个文件的话 --- 跳过
        return false
      }
      // 添加
      fs.appendFile(name, build_option, 'utf8', (err) => {
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
      let build_inlet = `const path = '../../src/'
const poject_url = '` + file_name[i] + `'
const data = require('@/option/json/' + poject_url + '.json')
const head = require('components/' + poject_url + '/publicTemplate/head.art.html')
import { Router } from 'js/routeJSLoad.js'
Router(data, poject_url)
$('head').html(head({
  'root': path,
  'data': data
}))
require('components/' + poject_url + '/less/public.less')
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
    files.forEach((file, index) => {
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
  fs.appendFile('./src/index.js', data.replace('../../src/', ''), 'utf8', (err) => {
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
    /* 读取webpack.dev.config.js进行添加resolve.alias前缀 */
    fs.readFile('./webpack.dev.config.js', 'utf8', (err, data) => {
      if (err) {
        return console.error(err)
      }
      let poject_path_start = data.indexOf('// TODO START') + 13
      let poject_path_end = data.indexOf('// TODO END', poject_path_start)
      let poject_path = data.substring(poject_path_start, poject_path_end)
      let str = '\n'
      for (let i = 0; i < file_name.length; i++) {
        str += '      "' + file_name[i] + '": _path("src/components/' + file_name[i] + '"),\n'
      }
      fs.unlinkSync('./webpack.dev.config.js', err => { // 删除
        if (err) throw err
      })
      fs.appendFile('./webpack.dev.config.js', data.replace(poject_path, str), 'utf8', (err) => {
        if (err) {
          return console.error(err);
        }
      })
    })
    /* 对package.json做打包预处理 */
    fs.unlinkSync('./package.json', err => { // 删除
      if (err) throw err
    })
    /* 简单格式化并输出 */
    fs.appendFile('./package.json', JSON.stringify(obj).replace(/,/g, ',\n'), 'utf8', (err) => {
      if (err) {
        return console.error(err);
      }
    })
  })
  /* 配置项合并导出config.js可方便import依赖 */
  fs.unlinkSync('./option/config.js', err => { // 删除
    if (err) throw err
  })
  let _results = 'const CONFIG = [' + results + ']\n' + 'const FILE_NAME = ' + JSON.stringify(file_name) + '\n' +
    //'export { CONFIG, FILE_NAME }'
    'module.exports = { CONFIG: CONFIG,FILE_NAME: FILE_NAME }'
  fs.appendFile('./option/config.js', _results, 'utf8', (err) => {
    if (err) {
      return console.error(err);
    }
  })
  /* 构建components项目
   * 思路:
   * 1、先比较模板目录以及项目目录缺则加，有则跳过
   * 2、创建完进行js文件以及template文件各自与json配置文件相比较，缺则加，有则跳
   * */
  const Fun = {
    Folder_create(obj, callback) { // 文件夹创建
      fs.mkdir(obj.path, function (err) {
        if (err) {
          console.error('创建文件夹：' + obj.name + '失败，错误码：', err);
          typeof (callback) === 'function' && callback(false)
          return
        }
        console.log('检索到新文件夹 --- 创建', obj.path)
        typeof (callback) === 'function' && callback(true, obj)
      });
    },
    Folder_create_rec(obj, callback) { // 递归文件夹比较
      let files_basePath = fs.readdirSync(obj.basePath)
      let files_createPath = fs.readdirSync(obj.createPath)
      let file_type = false
      files_basePath.forEach((file, index) => {
        let file_select = false // 是否找到文件
        file.indexOf('.') === -1 ? file_type = 'folder' : file_type = 'file' // 是文件还是文件夹
        for (let i = 0; i < files_createPath.length; i++) {
          if (files_createPath[i] === file) {
            file_select = true
            break
          }
        }
        if (file_select) { // 找到的话
          if (file_type === 'folder') { // 文件夹的话递归找里面的文件
            this.Folder_create_rec({
              basePath: obj.basePath + file + '/',
              createPath: obj.createPath + file + '/',
              name: obj.name
            })
          }
        } else { // 找不到的话
          if (file_type === 'folder') { // 文件夹的话创建后递归再找里面的文件（一定是找不到的，毕竟文件夹都没，所以里面一定会判断到文件无并创建）
            this.Folder_create({
              path: obj.createPath + '/' + file,
              name: file
            }, (is, objj) => {
              if (is) {
                this.Folder_create_rec({
                  basePath: obj.basePath + file + '/',
                  createPath: objj.path + '/',
                  name: obj.name
                })
              }
            })
          } else { // 是文件则创建
            fs.readFile(obj.basePath + file, 'utf8', (err, data) => { // 读取base文件
              if (err) {
                console.error('读取文件：' + file + '失败，错误码：', err)
                return
              }
              // 创建源文件时进行的操作
              fs.appendFile(obj.createPath + file, (file === 'inheritCore_extend.js' || file === 'index.js') ? data.replace(/@@@/g, obj.name) : data, 'utf8', function (err) {
                console.log('检索到新JS文件 --- 创建', obj.createPath + file)
                if (err) {
                  console.error('创建文件：' + file + '失败，错误码：', err)
                  return
                }
              })
            })
          }
        }
      })
    }
  }
  /* 1、先比较模板目录以及项目目录缺则加，有则跳过 */
  for (let i = 0; i < results.length; i++) { // 下次再写，就是无bailidujuan文件夹的时候会报错，要先创建
    let project = fs.readdirSync('./src/components/')
    let is = false
    for (let j = 0; j < project.length; j++) {
      if (project[j] === file_name[i]) {
        is = true
        break
      }
    }
    if (!is) {
      console.log('\x1B[32m' + '发现新项目：' + JSON.parse(results[i]).title + '(' + file_name[i] + ')\n正在构建中......' + '\x1B[39m')
      Fun.Folder_create({ // 创建项目目录
        name: file_name[i],
        path: './src/components/' + file_name[i]
      }, (is, obj) => {
        if (is) {
          Fun.Folder_create_rec({ // 只写一条会因为异步报错
            basePath: './tool/baseFile_create/',
            createPath: './src/components/' + file_name[i] + '/',
            name: obj.name
          })
        }
      })
    } else {
      Fun.Folder_create_rec({ // 只写一条会因为异步报错
        basePath: './tool/baseFile_create/',
        createPath: './src/components/' + file_name[i] + '/',
        name: file_name[i]
      })
    }
  }
})