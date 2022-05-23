const { Buffer } = require("buffer");

// Buffer.alloc(buffer长度, 填充值, 编码方式);
const buf1 = Buffer.alloc(10, 'a', 'utf8');
console.log(buf1);
// Buffer.allocUnsafe(buffer长度); 
// 底层内存不会被初始化，内容未知
const buf2 = Buffer.allocUnsafe(10);
// Buffer.byteLength(计算长度的值, 编码方式);
const bufLen = Buffer.byteLength("hello, world", "utf8");
console.log(bufLen);
// Buffer.compare(buf1, buf2); 
// 对比返回 -1 0 1，利用返回值排序
const compare = Buffer.compare(buf1, buf2);
console.log(compare);
// Buffer.concat(buffer数组, buffer实例总长度);
const backConcat = Buffer.concat([buf1, buf2], buf1.length + buf2.length);
console.log(backConcat);
// Buffer.from(arrayBuffer, 第一个字节的索引, 字节数);
// 索引和字节数决定返回的buffer
// Buffer.from(buffer);
// Buffer.from(string, encoding);
const arr = new Uint16Array(2);
arr[0] = 4000;
arr[1] = 5000;
const backBuf = Buffer.from(arr.buffer);
console.log(backBuf);
// Buffer.isBuffer(obj);
const isBuf = Buffer.isBuffer([]);
console.log(isBuf);
// Buffer.isEncoding(encoding);
// encoding是否是支持的字符编码的名称
const encode = Buffer.isEncoding("utf8");
console.log(encode);
// Buffer.poolSize
// 池的预分配内部 Buffer 实例的大小（以字节为单位）该值可以修改
console.log(Buffer.poolSize);
Buffer.poolSize = 8192;

// buf[index] 
// buf.toString()
// buf.buffer 创建此 Buffer 对象所基于的底层 ArrayBuffer 对象
const str = "hello";
const bufferDemo = Buffer.alloc(str.length);
for(let i = 0;i < str.length;i++) {
  bufferDemo[i] = str.charCodeAt(i);
}
console.log(bufferDemo, bufferDemo.toString());
const arrayBuffer = new ArrayBuffer(16);
const buffer = Buffer.from(arrayBuffer);
console.log(buffer.buffer === arrayBuffer);
// buf.byteOffset
// buf.compare(buf2)
const comp = buf1.compare(buf2);
console.log(comp);
// buf.copy(target, targetStart, sourceStart, sourceEnd); 
const copyBuf = Buffer.alloc(10);
bufferDemo.copy(copyBuf, 2, 0, 4);
console.log(copyBuf);
// buf.entries()
for(const part of bufferDemo.entries()) {
  console.log(part);
}
