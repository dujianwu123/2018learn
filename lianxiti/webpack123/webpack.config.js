let path = require('path');
module.exports ={
  mode:'development',
  entry:{
    app:'./dist/app.js'
  },
  output:{
    path:path.resolve(__dirname,'build'),
    filename:'[name]-[hash:5].js'
  }
}