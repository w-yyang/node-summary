const { createReadStream, createWriteStream } = require("fs");
const { stdout } = require("process");
const { pipeline } = require("stream");

// 验证是否支持crypto
let crypto;
try {
  crypto = require("crypto");
} catch(err) {
  console.log("crypto 不支持");
}

// Certificate类未总结

// Cipher类加密数据
const {
  scrypt,
  randomFill,
  createCipheriv,
  createDecipheriv,
  createHash
} = crypto;

const logorithm = 'aes-192-cbc'; //逻辑算法
const password = 'asdfdfdsfs';

scrypt(password, 'salt', 24, (err, key) => {
  if(err)
    throw err;
  console.log('key:', key.toString());
  randomFill(new Uint8Array(16), (err, iv) => {
    if(err) {
      throw err;
    }
    console.log('iv:', iv.toString());

    // 利用密钥和iv创建使用加密
    const cipher = createCipheriv(logorithm, key, iv);
    let encrypted = '';
    
    // 使用cipher对象作为流
    cipher.setEncoding("hex");
    cipher.on('data', (chunk) => encrypted += chunk);
    cipher.on('end', () => console.log('encrypted:', encrypted));
    cipher.write('some clear text data');
    cipher.end();

    // 使用cipher对象和管道流
    const input = createReadStream('./test.js');
    const output = createWriteStream('./testOutput.enc');

    pipeline(input, cipher, output, (err) => {
      if (err) {
        throw err;
      }
    });

    // 需要重新创建实例
    // cipher.update() cipher.final()
    const cipher1 = createCipheriv(logorithm, key, iv);
    let encrypte = cipher1.update('some data text', 'utf8', 'hex');
    encrypte += cipher1.final('hex');
    console.log('enc:', encrypted);
    // 一旦调用了 cipher.final() 方法，则 Cipher 对象就不能再用于加密数据。在 cipher.final() 之后调用 cipher.update() 将导致抛出错误。
    
    // decipher类解密
    const decipher = createDecipheriv(logorithm, key, iv);
    let decrypted = '';
    
    // decipher对象作为流
    decipher.on('readable', () => {
      while(null !== (chunk = decipher.read())) {
        decrypted += chunk.toString('utf8');
      }
    });
    decipher.on('end', () => {
      console.log(decrypted);
    });
    decipher.write(encrypted, 'hex');
    decipher.end();

    // decipher和管道流
    // const inputd = createReadStream('testOutput.enc');
    // const outputd = createWriteStream('test.js');

    // inputd.pipe(decipher).pipe(outputd);

    // decipher.update() decipher.final()
    const decipherd = createDecipheriv(logorithm, key, iv);
    let decrypte = decipherd.update(encrypte, 'hex', 'utf8');
    decrypte += decipherd.final('utf8');
    console.log('decrypte: ', decrypte);
  });
});

// Hash类
const hash = createHash("sha256");

// hash对象作为流
hash.on('readable', () => {
  const data = hash.read();
  if(data) {
    console.log('data: ', data.toString('hex'));
  }
});
hash.write('some hash to hash');
hash.end();

// hash和管道流
const inputh = createReadStream('./test.js');
inputh.pipe(hash).setEncoding('hex').pipe(stdout);

// hash.update() hash.digast()
// digest后不能调用update
hash.update('some hash');
console.log('hash digest:', hash.digest('hex'));

const hash1 = createHash('sha256');
// hash.copy() 
hash1.update('one');
console.log('hash1.copy()', hash1.copy().digest('hex'));

// 未完