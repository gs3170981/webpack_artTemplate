console.log('\x1B[42m' + '正在打包预处理 --- 产业监测系统后台' + '\x1B[49m')
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
fs.readFile('./src/chanyejiance.js', 'utf8', (err, data) => {
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
