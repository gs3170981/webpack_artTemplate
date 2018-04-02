#!/usr/bin/env node

//var program = require('commander');
//
//program.version('v' + require('../package.json').version)
//     .description('Manipulate asar archive files')
//
//program.command('pack <dir> <output>')
//     .alias('p')
//     .description('create asar archive')
//     .action(function (__dirpath, output) {
//
//       console.log(output+"文件成功生成");
//     })
//program.parse(process.argv)
//
//if (program.args.length === 0) {
//program.help()
//}

var program = require('commander');

//program
//  .option('-v, --version', 'version')
//  .option('-i, --init', 'structure start')
//  .parse(process.argv);
//
//if (program.peppers)
//
//if (program.init) console.log('  - peppers');
//if (program.pineapple) console.log('  - pineapple');
//if (program.bbq) console.log('  - bbq');

 
//program
////.version('v' + require('../package.json').version)
//.option('-v', '--version', 'Current version view')
//.option('-i', '--init', 'structure start')
//.parse(process.argv)
//
//if (program.version) {
//console.log('v' + require('../package.json').version)
//}
//if (program.init) {
//console.log(123)
//}



program
  .version('v' + require('../package.json').version)
  .option('-v, --version', 'Current version view')
  .option('-p, --peppers', 'Add peppers')
//.command('deploy')
//.description('部署一个服务节点')
//.action(function(name){
//    console.log('Deploying "%s"', name);
//})
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);
 

if (program.peppers) {
  console.log('  - peppers')
} else if (program.pineapple) {
  console.log('  - pineapple');
} else if (program.bbqSauce) {
  console.log('  - bbq');
}
 
