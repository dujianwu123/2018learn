let path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    'app': './app.js'
  },
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'//越放在后面的越先被接触，先把app.js中可以处理的import 
            //的css用css-loader处理，后用style-loader把样式放到页面上
          }
        ]
      }
    ]
  }
}

