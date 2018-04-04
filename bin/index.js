#!/usr/bin/env node


const program = require('commander')
const inquirer = require('inquirer')

const {
  fs
} = require('./src/methods.js')

const log = console.log



let _methods = {
  data: {
    now_path: process.cwd(), // 执行的当前目录地址
    json_create: {}
  },
  init () { // 命令行配置初始化
    let _thisD = this.data
    program /* 相当于输入itera-cli -v */
      .version('v' + require('../package.json').version)
      .option('-v, --version', 'Current version view')
//    .option('-p, --peppers', 'set config path')
//    .option('-c, --config <path>', 'set config path')

//  program /* 相当于输入itera-cli setup */
//    .command('setup')
//    .description('run remote setup commands')
//    .action(r => {
//      console.log('setup');
//    });

    program /* 相当于输入itera-cli install xxx */
      .command('init <name>')
      .description('Initialize the framework and configure the initial defaults for the project')
      .action(name => {
        fs.Access_is({
          path: _thisD.now_path + '/' + name,
          name: name
        }, (is, obj) => {
          if (is) {
            inquirer.prompt([ // 这里用Promise链式仍然会被直接执行,可能有预解析机制,所以只能嵌套
              {
                type: 'input',
                name: 'val',
                message: 'project name',
                default: obj.name
              }
            ]).then((r) => {
              _thisD.json_create['name'] = r.val
              inquirer.prompt([
                {
                  type: 'input',
                  name: 'val',
                  message: 'project description'
                }
              ]).then((r) => {
                _thisD.json_create['description'] = r.val
                console.log(_thisD.json_create)
                inquirer.prompt([
                  {
                    type: 'confirm',
                    name: 'val',
                    message: 'Is that okay?',
                    default: true
                  }
                ]).then((r) => {
                  if (r.val) { // 同意的话
//                  let path_f = 
//                  path_f = fs.readdirSync(path_f)
//                  console.log(process.cwd() )
                    fs.Folder_create({
                      path: _thisD.now_path + '/' + _thisD.json_create.name
                    }, (is, obj) => {
                      if (is) {
                        let set_path = __dirname.substring(0, __dirname.lastIndexOf('bin') - 1)
                        fs.package_create({ // 单独创建package
                          set_path: set_path,
                          out_path: obj.path,
                          data: _thisD.json_create
                        })
                        fs.Project_create({ // 创建
                          set_path: set_path,
                          out_path: obj.path
                        })
                      }
                    })
                    
//                  console.log(_thisD.json_create)
                  }
                })
              })
            })
          }

        })

      });

//  program /* 相当于输入itera-cli install xxx1 xxx2 xxx3 */
//    .command('teardown <dir> [otherDirs...]')
//    .description('run teardown commands')
//    .action((dir, otherDirs) => {
//      console.log('dir "%s"', dir);
//      if (otherDirs) {
//        otherDirs.forEach(oDir => {
//          console.log('dir "%s"', oDir);
//        });
//      }
//    });

    program /* 相当于输入itera-cli xxx (非规定的指令的回调) */
      .command('*')
      .description('deploy the given env')
      .action(env => {
        program.help()
      });
    program.parse(process.argv)

    this.option_Handle()
  },
  option_Handle () { // 命令行option处理
    if (program.args.length < 1) { // 无指令的情况下输出 -h 帮助信息
      return program.help()
    }
//  if (program.peppers) {
//    console.log('  - peppers');
//    inquirer.prompt([
//      {
//        type: 'confirm',
//        name: 'test',
//        message: 'Are you handsome?',
//        default: true
//      }
//    ]).then((answers) => {
//      console.log('END:')
//      console.log(answers)
//    })
//  } else if (program.pineapple) {
//    console.log('  - pineapple');
//  } else {
//    program.help()
//  }
  }
}
_methods.init()




