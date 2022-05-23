const process = require('process');

// beforeExit
// Node.js 清空其事件循环并且没有额外的工作要安排时，触发 'beforeExit' 事件。
// 当没有工作要调度时，Node.js 进程会退出，但是注册在 'beforeExit' 事件上的监听器可以进行异步的调用，从而使 Node.js 进程继续。
// 'beforeExit' 不应用作 'exit' 事件的替代，除非打算安排额外的工作
process.on('beforeExit', (code) => {
  console.log('beforeExit', code);
});

process.on('exit', (code) => {
  setTimeout(() => {
    console.log('process exit not run ');
  }, 0);
  console.log('exit', code);
});

// 如果 Node.js 进程是使用 IPC 通道衍生, IPC 通道关闭时将触发 'disconnect' 事件
// process.exitCode指定退出码
// Node.js 进程将在调用 'exit' 事件监听器之后立即退出，从而使任何仍在事件循环中排队的其他工作被丢弃。 

// process.argv
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

// process.env
console.log('process.env', process.env);