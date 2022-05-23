const async_hooks = require('async_hooks');

// 执行上下文id
const eid = async_hooks.executionAsyncId();
console.log(eid);

// 返回负责触发当前执行范围回调的句柄id
const tid = async_hooks.triggerAsyncId();
console.log(tid);

const asyncHook = async_hooks.createHook({
  init,
  before,
  after,
  destroy,
  promiseResolve
});

asyncHook.enable(); // 启用构子
asyncHook.disable(); //禁用钩子

function init(asyncId, type, triggerAsyncId, resource) {
  console.log('init');
  console.log(asyncId, type, triggerAsyncId, resource);
}

function before(asyncId) {
  console.log('before');
  console.log(asyncId);
}

function after(asyncId) {
  console.log('after');
  console.log(asyncId);
}

function destroy(asyncId) {
  console.log('destroy');
  console.log(asyncId);
}

function promiseResolve(asyncId) {
  console.log('promiseResolve');
  console.log(asyncId)
}