const {
  SyncHook, 
  SyncBailHook, 
  SyncWaterfallHook, 
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require("tapable");

class Car {
  constructor() {
    this.hooks = {
      start: new SyncHook(["newSpeed"]),
      brake: new SyncBailHook(),
      water: new SyncWaterfallHook(["newSpeed"]),
      loop: new SyncLoopHook(),
      // 并行插件
      asyncp: new AsyncParallelHook(),
      asyncpp: new AsyncParallelHook(),
      drift: new AsyncParallelBailHook(),
      // 串行插件
      chuan: new AsyncSeriesHook(),
      chuanbail: new AsyncSeriesBailHook(),
      swater: new AsyncSeriesWaterfallHook(["home"]),
    };
  }

  start(speed) {
    this.hooks.start.call(speed);
  }

  brake() {
    this.hooks.brake.call();
  }

  water(speed) {
    this.hooks.water.call(speed);
  }

  loop() {
    this.hooks.loop.call();
  }

  asyncp(callback) {
    this.hooks.asyncp.callAsync(callback);
  }

  asyncpp() {
    return this.hooks.asyncpp.promise();
  }

  drift(callback) {
    this.hooks.drift.callAsync(callback);
  }

  chuan() {
    return this.hooks.chuan.promise();
  }

  chuanbail() {
    return this.hooks.chuanbail.promise();
  }

  swater() {
    return this.hooks.swater.promise();
  }
}

const demo = new Car();

demo.hooks.start.tap("startPlugin", (speed) => {
  console.log("start running", speed);
});
demo.start(1111);
demo.hooks.brake.tap("aaa", () => {
  console.log("aaa");
});
demo.hooks.brake.tap("bbb", () => {
  console.log("bbb");
  return 111;
});
demo.hooks.brake.tap("ccc", () => {
  console.log("ccc");
});
demo.brake();
demo.hooks.water.tap("111", (speed) => {
  console.log("111", speed);
  return speed + 111;
});
demo.hooks.water.tap("222", (speed) => {
  console.log("222", speed);
  return speed + 111;
});
demo.hooks.water.tap("333", (speed) => {
  console.log("333", speed);
});
demo.water(111);
let ind = 0;
demo.hooks.loop.tap("loopFunc", () => {
  if(ind < 6) {
    console.log("循环执行");
    ind++;
    return 1;
  }
  return undefined;
});
demo.hooks.loop.tap("loop", () => {
  console.log("循环结束");
});
demo.loop();
// demo.hooks.asyncp.tapAsync("async1", (callback) => {
//   setTimeout(() => {
//     console.log("路线1");
//     callback();
//   }, 1000);
// });
// demo.hooks.asyncp.tapAsync("async2", (callback) => {
//   setTimeout(() => {
//     console.log("路线2");
//     callback();
//   }, 1000);
// });
// demo.asyncp(() => {
//   console.log("最终回调");
// });
// demo.hooks.asyncpp.tapPromise("p1", () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("ppp1");
//       resolve();
//     }, 2000);
//   })
// });
// demo.hooks.asyncpp.tapPromise("p2", () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("ppp2");
//       resolve();
//     }, 2000);
//   });
// });
// demo.asyncpp().then(() => {
//   console.log("最终回调");
// });
// demo.hooks.drift.tapAsync("drift1", (callback) => {
//   setTimeout(() => {
//     console.log("gggg");
//     callback(null, 1); // // 第一个参数是err, 这里传递个1，第二个参数传递result
//   }, 3000);
// });
// demo.hooks.drift.tapAsync("drift2", (callback) => {
//   setTimeout(() => {
//     console.log("hhhh");
//     callback();
//   }, 3000);
// });
// demo.drift((res, count=undefined) => {
//   console.log("最终回调", res, count);
// });
demo.hooks.chuan.tapPromise("chun1", () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("chuan111");
      resolve();
    }, 1000);
  });
});
demo.hooks.chuan.tapPromise("chun2", () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("chuan222");
      resolve();
    }, 3000);
  });
});
demo.chuan().then(() => {
  console.log("最终回调");
}); // 1s   1s + 3s
demo.hooks.chuanbail.tapPromise("chuan111", () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("xxxxx");
      resolve(1);
    }, 4000);
  });
});
demo.hooks.chuanbail.tapPromise("chuan222", () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("yyyyy");
      resolve(2);
    }, 4000);
  });
});
demo.chuanbail().then(() => {
  console.log("最终回调");;
});
demo.hooks.swater.tapPromise("swter111", (result) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("99999", result);
      resolve(2);
    }, 1000);
  });
});
demo.hooks.swater.tapPromise("swter222", (result) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("99999", result);
      resolve(4);
    }, 1000);
  });
});
demo.swater().then(() => {
  console.log("最终的回调");
});

// const hook = new SyncHook();

// hook.tap("loginPlugin", () => {
//   console.log("被勾了");
// });
// hook.call();