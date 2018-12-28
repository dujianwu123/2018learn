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
            loader: 'style-loader/useable'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}

