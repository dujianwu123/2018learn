let path = require('path');
module.exports = {
    entry:'./c.js',//入口文件,解析某个（些）指定的文件，最终编译成我们浏览器可以使用的文件
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'c.js'
    }
}