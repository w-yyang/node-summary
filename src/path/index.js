const path = require('path');

console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'));
console.log(path.delimiter); //定界符
console.log(path.extname('index.html')); // 扩展名
console.log(path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
  // 未指定base 使用name + ext
}));
console.log(path.isAbsolute('qux/')); // 是否绝对路径
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')); // 从1到2的路径
