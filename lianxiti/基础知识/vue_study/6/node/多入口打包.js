let path = require('path');
module.exports={
  entry:{
    main:'./src/main.js',
    main2:'./src/main2.js'
    //多入口打包,下面output换成 [name]
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'./dist')
  }
}