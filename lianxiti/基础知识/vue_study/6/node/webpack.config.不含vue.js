//webpack 必须采用commonJs 方法
let path = require('path');// 专门处理路径用的,以当前路径解析出一个相对路径
// console.log(path.resolve(__dirname,'./dist'));

let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',//打包后的名字
    path: path.resolve('./dist')//必须是一个绝对路径
    // path:path.resolve(__dirname,'./dist')
  },
  //模块的解析规则
  //- js 匹配所有的js 用babel-loader转义  排除node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      {
        test:/\.(jpg|png|gif)$/,
        //转化base64只在8192字节一下转化，其他情况下输出图片
        use:['url-loader?limit=8192']
      },
      {
        test:/\.(eot|svg|woff|woff2|wtf)$/,
        use:['url-loader']
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({//自动插入到dist目录中
      template:'./src/index.html'//使用的模板
      // filename:'login.html'//产出的文件名字
    })
  ]

}