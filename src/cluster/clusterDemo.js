const cluster = require('cluster');
// 集群模块可以轻松创建共享服务器端口的子进程
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('process');

if(cluster.isPrimary) {
  let num = 0;
  for(let i = 0;i < numCPUs;i++) {
    cluster.fork();
  }
  for(const id in cluster.workers) {
    cluster.workers[id].on('message', (msg) => {
      if(msg.cmd && msg.cmd === 'notifyRequest') {
        num += 1;
      }
    });
  }
} else {
  http.Server((req, res) => {
    res.writeHead(200);
    res.end("hello world");
    process.send({cmd: 'notifyRequest'});
  }).listen(8000);
}

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   // 衍生工作进程
//   for(let i = 0;i < numCPUs;i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`work ${worker.process.pid} died`);
//   });
// }  else {
//   http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end('hello world');
//   }).listen(8000);
//   console.log(`worker ${process.pid} started`);
// }