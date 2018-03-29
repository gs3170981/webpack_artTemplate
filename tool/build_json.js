/* 高耦合文件,闲杂人等快快离开
 *
 * --- GS */
console.log('\x1B[45m' + '正在构建依赖，请尽量等以下时间结束......\nTIPS：如果您构建过一次，建议下一次可直接执行：> npm run start' + '\x1B[49m')
const fs = require("fs")
const path = {
  baseJs: './tool/jsArt_create/base.js',
  baseArt: './tool/jsArt_create/basics.art.html',
  json: '../option/config.js'
}
const {
  CONFIG, FILE_NAME
} = require(path.json)

const Fun = {
  tpl_load (obj, callback) { // 文件的读取
    fs.readFile(obj.url, 'utf8', (err, data) => {
      if (err) {
        typeof (callback) === 'function' && callback(false)
        return console.error(err)
      }
      typeof (callback) === 'function' && callback(true, obj, data)
    })
  },
  Folder_create(obj, callback) { // 文件夹创建
    fs.mkdir(obj.path, (err) => {
      if (err) {
        typeof (callback) === 'function' && callback(true, obj)
        return console.error('创建文件夹：' + obj.name + '失败，也许已有该文件存在，如执行正常则无视该条')
      }
      console.log('检索到新文件夹 --- 创建', obj.path)
      typeof (callback) === 'function' && callback(true, obj)
    })
  },
  file_create (obj, callback) { // 文件创建
    // TODO 对创建的js文件进行模板引入路径配置，引到各自的模板文件中
    fs.appendFile(obj.path, obj.data, 'utf8', (err) => {
      if (err) {
        typeof (callback) === 'function' && callback(false)
        return console.error('创建文件：' + obj.name + '失败，错误码：', err)
      }
      console.log('检索到新文件 --- 创建', obj.path)
      typeof (callback) === 'function' && callback(true, obj)
    })
  },
  module_create (obj) { // 对art的module创建
    let art = obj.art
    let path = fs.readdirSync(obj.path)
    if (art.length) {
      for (let i = 0; i < art.length; i++) {
        let is = false // 默认没找到该文件
        for (let j = 0; j < path.length; j++) {
          let path_m = path[j].substring(0, path[j].lastIndexOf('.art.html'))
          if (path === art[i]) {
            is = true
            break
          }
        }
        if (!is) {
          console.log('无' + art[i])
        }
      }
    }
  },
  str_j (url) { // 删除字符串第一项
    return (url.indexOf('@') !== -1 || url.indexOf('!') !== -1) ? url = url.slice(2) : url = url.slice(1)
  },
  js_r (objj, art) { // js下main遍历创建文件
    let path_f = fs.readdirSync(objj.path)
    for (let i = 0; i < objj.data.length; i++) {
      let is = false // 找不到文件
      let f = objj.data[i].child ? false : true; // true：文件 false：文件夹
      let href = this.str_j(objj.data[i].href)
      let file_name = href
      if (art === 'art') { // 用于匹配的时候添加后缀
        file_name = href + '.art.html'
      } else if (f) {
        file_name = href + '.js'
      }
      for (let j = 0; j < path_f.length; j++) { // 找到文件or文件夹
        
        if (file_name === path_f[j]) { // 如果找到该文件or文件夹
          is = true
          if (!f) { // 如果是文件夹的话，递归
            console.log('找到文件夹', href)
            
            Fun.Folder_create({
              path: objj.path + '/' + href,
              name: href,
              data: objj.data[i],
              js_data: objj.js_data,
              obj_name: objj.name,
              art: art
            }, (is, obj) => {
              if (is) {
                console.log('创建成功！', obj.name)
                this.js_r({
                  data: obj.data.child,
                  path: obj.path,
                  js_data: obj.js_data,
                  name: obj.obj_name
                }, obj.art)
              }
            })
            
//          this.js_r({
//            data: objj.data[i].child,
//            path: objj.path + '/' + href,
//            js_data: objj.js_data,
//            name: objj.name
//          }, art)
          }
          break
        }
      }
      if (!is) { // 找不到
        console.log('找不到', href)
        Fun.file_create({ // 不管是文件夹还是文件先创建JS或art文件
          path: art === 'art' ? (objj.path + '/' + href + '.art.html') : (objj.path + '/' + href + '.js'),
          data: objj.js_data.replace(/@@@/g, objj.name),
          name: objj.name
        })
        
        if (!f) { // 如果是文件夹的话，创建+递归
          Fun.Folder_create({
            path: objj.path + '/' + href,
            name: href,
            data: objj.data[i],
            js_data: objj.js_data,
            obj_name: objj.name,
            art: art
          }, (is, obj) => {
            if (is) {
              console.log('创建成功！', obj.name)
              this.js_r({
                data: obj.data.child,
                path: obj.path,
                js_data: obj.js_data,
                name: obj.obj_name
              }, obj.art)
            }
          })
        }
        
      }
      // 不管有没有找着只要是art状态下，都得判断module是否需要创建
      
      if (art === 'art' && objj.data[i].module) {
        Fun.module_create({
          art: objj.data[i].module,
          path: objj.path
        })
      }

    }

//  for (let i = 0; i < path_f.length; i++) {
//    
//  }
  }
}
let project = fs.readdirSync('./src/components/')

for (let i = 0; i < project.length; i++) {
  let is = false
  for (let j = 0; j < FILE_NAME.length; j++) {
    if (project[i] === FILE_NAME[j] || project[i] === 'public') { // 这边还是要确保json配置文件跟目录文件一致
      is = true
      break
    }
  }
  if (is && project[i] !== 'public') {
    // 加载JS-main
//  let jsMain_create = fs.readdirSync('./src/components/' + project[i] + '/js/main')
    let menu = CONFIG[i].menu // 菜单
    let AloneRouter = CONFIG[i].AloneRouter // 独立路由
//  console.log(CONFIG[i])

    Fun.tpl_load({ // JS文件构建依赖构建
      url: path.baseJs,
      i: i
    }, (is, obj, data) => { // 读取js模板
      if (is) {
        Fun.js_r({ // 对js/main下创建 --- 集成路由
          data: CONFIG[obj.i].menu,
          path: './src/components/' + project[obj.i] + '/js/main',
          js_data: data,
          name: FILE_NAME[obj.i]
        })
        Fun.js_r({ // 对js/main下创建 --- 独立路由
          data: CONFIG[obj.i].AloneRouter,
          path: './src/components/' + project[obj.i] + '/js/main',
          js_data: data,
          name: FILE_NAME[obj.i]
        })
      }
    })
    
    Fun.tpl_load({ // 模板文件构建依赖构建 --- 这两个分别写可异步执行
      url: path.baseArt,
      i: i
    }, (is, obj, data) => { // 读取art模板
      if (is) {
        Fun.js_r({ // 对js/content下创建 --- 集成模板
          data: CONFIG[obj.i].menu,
          path: './src/components/' + project[obj.i] + '/publicTemplate/content',
          js_data: data,
          name: FILE_NAME[obj.i]
        }, 'art') // 这里增加函数复杂性了，进入art模板创建判断
        Fun.js_r({ // 对js/content下创建 --- 独立模板
          data: CONFIG[obj.i].AloneRouter,
          path: './src/components/' + project[obj.i] + '/publicTemplate/content',
          js_data: data,
          name: FILE_NAME[obj.i]
        }, 'art')
      }
    })



  } else if (project[i] !== 'public') {
    console.log('\n\x1B[41m' + '依赖构建失败!' + '\x1B[49m')
    console.log('option/config.js配置项与./src/components/的文件数不符！\n请先执行')
    console.log('\x1B[42m' + '> npm run auto' + '\x1B[49m')
  }
}
