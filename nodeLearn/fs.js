//文件系统
// fs 模块提供了一些API,用于一种类似标准POSIX函数的方式与系统进行交互，所有的文件操作系统都有两种形式，同步和异步
const fs = require('fs')
// unlink 删除文件
// fs.unlink('./test.log', err => {
//   if (err) {
//     console.log(err.stack)
//     process.exit()
//   }
//   console.log('成功删除 ')
// })
// unlink 删除文档(异步删除)

// unlinkSync 同步删除
// try {
//   fs.unlinkSync('./test.log')
//   console.log('删除成功')
// }catch (err) {
//   console.log(err)
// }

fs.rename('./test.log', './test.log', (err) => {
  if (err) throw err
  console.log('重命名完成')
  fs.stat('./test.log', (error, stats) => {
    if (error) throw error
    // console.log(`文件属性，${JSON.stringify(stats)}`)
  })
})

// fs.open('./test.log', 'r', (err, data) => {
//   if (err) throw err
//   console.log(data)
// })
// flags 模式有r读取方式 r+ 读写方式 rs+ 同步读写方式
// fs 操作接受字符串、buffer、以file: 协议的URL对象作为文件路径，字符串形式会被解释为表示绝对路径或者相对路径的UTF-8字符序列，相对路径是相对于process.cwd()\
// fstat 文件描述符
fs.open(Buffer.from('./test.log'), 'r', (err, fd) => {
  if (err) throw err
  fs.fstat(fd, (err, stat) => {
    // console.log(err)
    // console.log(stat)
  })
  fs.close(fd, (err) => {
    if (err) throw err
  })
})
let fsWatcher = fs.watch('./test.log', { encoding: 'utf-8' }, (eventType, fileName) => {
  if(fileName) {
    // console.log(eventType)
    // console.log(fileName)
    // console.log(fs.readFileSync(fileName, 'utf8'))
  }
})
// 线程池的使用，注意，所有文件系统的API中，除了fs.FSWatcher()和那些显式同步的方法之外，都使用了libuv的线程池，这对于某些应用程序可能产生出乎意料问题和负面的性能影响
// 成功调用fs.watch()方法会返回一个新的fs.FSWatcher对象
fsWatcher.on('change',(e,l) => {
  console.log(e)
  console.log(l)
})
fsWatcher.on('close',(e,l) => {
  console.log('关闭了')
})
fsWatcher.close()