#!/usr/bin/env node


const program = require('commander')
const inquirer = require('inquirer')


let _methods = {
  init () { // 命令行配置初始化
    program /* 相当于输入itera-cli -v */
      .version('v' + require('../package.json').version)
      .option('-v, --version', 'Current version view')
      .option('-p, --peppers', 'set config path')
      .option('-c, --config <path>', 'set config path')

    program /* 相当于输入itera-cli setup */
      .command('setup')
      .description('run remote setup commands')
      .action(r => {
        console.log('setup');
      });

    program /* 相当于输入itera-cli install xxx */
      .command('exec <cmd>')
      .description('run the given remote command')
      .action(cmd => {
        console.log('exec "%s"', cmd);
      });

    program /* 相当于输入itera-cli install xxx1 xxx2 xxx3 */
      .command('teardown <dir> [otherDirs...]')
      .description('run teardown commands')
      .action((dir, otherDirs) => {
        console.log('dir "%s"', dir);
        if (otherDirs) {
          otherDirs.forEach(oDir => {
            console.log('dir "%s"', oDir);
          });
        }
      });

    program /* 相当于输入itera-cli xxx (非规定的指令的回调) */
      .command('*')
      .description('deploy the given env')
      .action(env => {
        console.log('warning "%s"', env);
      });
    program.parse(process.argv)

    this.option_Handle()
  },
  option_Handle () { // 命令行option处理
    if (program.peppers) {
      console.log('  - peppers');
      inquirer.prompt([
        {
          type: 'confirm',
          name: 'test',
          message: 'Are you handsome?',
          default: true
        }
      ]).then((answers) => {
        console.log('END:')
        console.log(answers)
      })
      return
    } else if (program.pineapple) {
      console.log('  - pineapple');
    }
  }
}
_methods.init()




