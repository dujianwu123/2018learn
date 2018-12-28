let path = require('path');
const HWP = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取出css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const obj = {
  mode: 'production',
  entry: {
    'app': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, './build/js'),
    filename: '[name].js'
  },
  plugins: [
    new OptimizeCssAssetsPlugin({}),
    new HWP({
      template: './index.html',
      filename: '../haha.html',//这个会根据output的path生成，默认是都生成到build/js下，但是想让html出来，所以就../xxx.html
      minify: {//html 压缩成一行
        removeAttributeQuotes: true,
        collapseWhitespace: true
      }
      // inject:false
      // inject:'head'

      // hash:true,
      // chunks:['index','index2']
      // title:'欢迎大家来到珠峰培训'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "../css/[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // use:[
        //   'style-loader',
        //   'css-loader'
        // ]

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  }

}

module.exports = obj;
