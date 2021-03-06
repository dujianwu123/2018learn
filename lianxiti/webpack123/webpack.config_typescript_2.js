let path = require('path');
module.exports ={
  mode:'development',
  entry:{
    app:'./dist/app.ts'
  },
  output:{
    path:path.resolve(__dirname,'build'),
    filename:'[name]-[hash:5].js'
  },
  module:{
    rules: [
      {
        test:/\.tsx?$/,
        use:{
          loader:'ts-loader'
        }
      }
    ]
  }
}