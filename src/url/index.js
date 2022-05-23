const url = require('url');

const urlStr = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash';
const urlobj = url.parse(urlStr);
console.log(urlobj);