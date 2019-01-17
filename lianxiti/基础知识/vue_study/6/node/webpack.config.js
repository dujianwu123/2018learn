//webpack 必须采用commonJs 方法
let path = require('path');// 专门处理路径用的,以当前路径解析出一个相对路径
// console.log(path.resolve(__dirname,'./dist'));
module.exports={
  entry:'./src/main.js',
  output:{
    filename:'bundle.js',//打包后的名字
    path:path.resolve(__dirname,'./dist')//必须是一个绝对路径
  }
}