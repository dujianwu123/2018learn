let path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    'app': './app.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath:'./dist/',
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertInto: '#box',
              singleton: true,
              transform: './css.transform.js'//相对于webpack配置文件的路径
            }
          },
          {
            loader: 'css-loader',
            options:{
              // minimize: true
              modules: true
            }
          }
        ]
      }
    ]
  }
}

