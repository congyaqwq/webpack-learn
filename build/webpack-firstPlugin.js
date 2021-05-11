class firstPlugin {
  apply(compiler) {
    // 暂未实现，plugin不是funtion
    compiler.plugin('emit',
      (compilation, callback) => {
        let str = ''
        for (let filename in compilation.assets) {
          str += `文件:${filename}  大小${compilation.assets[filename]['size']()}\n`
        }
        compilation.assets['fileSize.md'] = {
          source: function () {
            return str
          },
          size: function () {
            return str.length
          }
        }
        callback()
      })
  }
}


module.exports = firstPlugin