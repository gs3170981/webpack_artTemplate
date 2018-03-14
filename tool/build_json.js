/* 高耦合文件,闲杂人等快快离开
 *
 * --- GS */
console.log('\x1B[45m' + '正在构建依赖，请尽量等以下时间结束......\nTIPS：如果您构建过一次，建议下一次可直接执行：> npm run start' + '\x1B[49m')
const fs = require("fs")
const path = {
  baseJs: './tool/jsArt_create/base.js',
  json: '../option/config.js'
}
const {
  CONFIG, FILE_NAME
} = require(path.json)
const Fun = {
  
}
let project = fs.readdirSync('./src/components/')

for (let i = 0; i < project.length; i++) {
  let is = false
  for (let j = 0; j < FILE_NAME.length; j++) {
    if (project[i] === FILE_NAME[j]) { // 这边还是要确保json配置文件跟目录文件一致
      is = true
      break
    }
  }
  if (is) {
    
  } else {
    console.error('option/config.js配置项与./src/components/的文件数不符！\n请先')
  }
}
console.log(FILE_NAME)