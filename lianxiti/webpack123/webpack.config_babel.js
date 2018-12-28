let path = require('path');
module.exports ={
  mode:'development',
  entry:{
    app:'./dist/es6.es'
  },
  output:{
    path:path.resolve(__dirname,'build'),
    filename:'[name]-[hash:5].js'
  },
  module:{
    rules: [
      {
        test: /\.es$/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env']
            /**
             * presets 是指针对语法的变换，向map、includes等函数和方法并不变换
             * 这时就需要借助Babel Polyfill 和 Babel Runtime Transform 来变换函数和方法
             * Generator、Set、Map、Array.from、Array.prototype.includes...
             * Babel Polyfill插件就是在对应的js中引用就好 （开发应用用，会用到这些函数和方法时用）
             * Babel Runtime Transform  需要在babelrc配置下（开发框架用，防止污染变量）
             * 
             * browsers 指定规范的版本
             * > 1% 大于1%的用户量的浏览器
             * last 2 versions 各个浏览器最后的两个版本
             * chrome: '52' 谷歌浏览器版本号为52的
             */
            // presets: [
            //   ['@babel/preset-env',{
            //     targets: {
            //       browsers: ['> 1%','last 2 versions']
            //     }
            //   }]
            // ]
          }
        },
        exclude: '/node_modules/'
      }
    ]
  }
}