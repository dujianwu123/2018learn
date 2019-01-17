node包模块的写法
let str = require('./a.js');引用
module.exports = str;导出

webpack 不要安装到全局

在package.json 中配置一个脚本,这个脚本用的命令是webpack,会去当前的node_modules下找bin对应的webpack名字让其执行,执行的就是bin/webpack.js,webpack.js需要当前目录下有个名字叫webpack.config.js的文件,我们通过npm run build 执行的目录是当前文件的目录,所以会去当前目录下查找

babel es6-es5
npm install babel-core --save-dev
npm install babel-loader --save-dev
npm install babel-preset-es2015 让翻译官拥有解析es6语法的功能

------------------------------------------------------------
css-loader 将css解析成模块，将解析的内容插入到style标签内(style-loader)

npm install css-loader style-loader --save-dev

less、sass、stylus(预处理语言)
-less-loader less css-loader style-loader
npm install less less-loader --save-dev
------------------------------------------------------
解析图片
file-loader  url-loader(url-loader是依赖于file-loader的，在用url的时候会自动调用file-loader所以两个都需要下载)
npm install file-loader  url-loader --save-dev
--------------------------------------------------------
解析html
-插件的作用是以我们自己的html为模板将打包后的结果，自动引入到html中产出到dist目录下
npm install html-webpack-plugin --save-dev
---------------------------------------------------------
webpack-dev-server
- 这里面内置了服务，可以帮我们启动一个端口号，当代码更新时，可以自动打包（内存中打包），代码有变化就重新执行

npm install webpack-dev-server --save-dev
在package.json的script中添加  "dev": "webpack-dev-server"
-----------------------------------------------------------
## 安装vue-loader  vue-template-compiler
vue-loader 解析.vue文件的，会自动调用vue-template-compiler
vue-template-compiler 解析vue模板的


