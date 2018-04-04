const fs = require('fs')
const chalk = require('chalk')

const log = console.log
const Fun = {
  Project_copy (obj) { // 文件复制
    fs.writeFileSync(obj.out_path + '/' + obj.name, fs.readFileSync(obj.set_path + '/' + obj.name));
  },
  File_notOut (val) {
    if (val.lastIndexOf('.git') === -1
      && val.lastIndexOf('.') !== -1
      && val.indexOf('package') === -1
      && val.indexOf('yarn') === -1
      && val.indexOf('project') === -1
    ) {
      return 'file'
    } else if (val.lastIndexOf('bin') === -1
      && val.indexOf('node_modules') === -1
      && val.indexOf('.') === -1
    ) {
      return 'folder'
    } else {
      return 'other'
    }
  },
  Folder_create(obj, callback) { // 文件夹创建
    fs.mkdir(obj.path, (err) => {
      if (err) {
        typeof (callback) === 'function' && callback(false)
        log(chalk.redBright('ERROR! in '+ obj.path +'\nModule build failed: Error: ENOENT: The file with the same name has been in this directory. Please delete it.'))
        return
      }
//    console.log('检索到新文件夹 --- 创建', obj.path)
      typeof (callback) === 'function' && callback(true, obj)
    })
  },
  Access_is(obj, callback) { // 判断该文件是否存在
    fs.access(obj.path, err => {
      if (err) {
        typeof (callback) === 'function' && callback(true, obj)
      } else {
        typeof (callback) === 'function' && callback(false, obj)
        log(chalk.redBright('ERROR! in '+ obj.path +'\nModule build failed: Error: ENOENT: The file with the same name has been in this directory. Please delete it.'))
      }
    })
  },
  file_create (obj, callback) { // 文件创建
    fs.appendFile(obj.path, obj.data, 'utf8', (err) => {
      if (err) {
        typeof (callback) === 'function' && callback(false)
        return
      }
      typeof (callback) === 'function' && callback(true)
    })
  },
  package_create (obj) {
    let data = obj.data
    let json = `
{
  "name": "`+ data.name +`",
  "version": "1.0.0",
  "description": "`+ data.description +`",
  "author": "",
  "main": "login.js",
  "scripts": {
    "start": "webpack-dev-server --config webpack.dev.config.js --open",
    "dev": "node tool/build_auto && timeout /t 7 && node tool/build_json && timeout /t 7 && webpack-dev-server --config webpack.dev.config.js --open",
    "build": "webpack --config webpack.prod.config.js --progress",
    "auto": "node tool/build_auto",
    "json": "node tool/build_json",
    "chanyejiance": "node option/build/chanyejiance && webpack --config webpack.prod.config.js --progress"
  },
  "license": "ISC",
  "devDependencies": {
    "art-template": "^4.10.1",
    "art-template-loader": "^1.4.3",
    "html-webpack-plugin": "^2.28.0",
    "jquery": "^3.3.1",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.10.1"
  },
  "dependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-es2015": "^6.24.1",
    "chalk": "^2.3.2",
    "commander": "^2.15.1",
    "copy-webpack-plugin": "^4.3.1",
    "css-loader": "^0.28.9",
    "file-loader": "^1.1.6",
    "inquirer": "^5.2.0",
    "itera-cli": "^1.0.3",
    "less": "^2.7.3",
    "less-loader": "^4.0.5",
    "style-loader": "^0.19.1",
    "url-loader": "^0.6.2"
  }
}`
    this.file_create({
      path: obj.out_path + '/' + 'package.json',
      data: json
    })
  },
  Project_create (obj) { // 开始Copy所有目录结构
    let set_path = fs.readdirSync(obj.set_path)
    for (let i = 0; i < set_path.length; i++) {
      let is = this.File_notOut(set_path[i])
      if (is === 'file') { // 是文件的情况下
        this.Project_copy({
          out_path: obj.out_path,
          set_path: obj.set_path,
          name: set_path[i]
        })
      } else if (is === 'folder') { // 是文件夹的情况下
        this.Folder_create({
          path: obj.out_path + '/' + set_path[i],
          set_path: obj.set_path + '/' + set_path[i]
        }, (is, obj) => {
          if (is) {
            this.Project_create({
              set_path: obj.set_path,
              out_path: obj.path
            })
          }
        })
      }
    }
  }
}
module.exports = {
  fs: Fun
}