let webpack = require('webpack');
let path = require('path');
module.exports = {
  entry :{
    'pageA':'./src/pageA',
    'pageB':'./src/pageB',
    'vender':['lodash']
  },
  output:{
    path: path.resolve(__dirname,'./dist'),
    filename: '[name]-bundle.js',
    chunkFilename: '[name].chunk.js'
  },
//   optimization: {
//     splitChunks: {
//         cacheGroups: {
//             commons: {
//                 name: "commons",
//                 chunks: 'all',
//                 minChunks: 2
//             }
//         }
//     }
// }
  plugins:[
    // new webpack.optimize.CommonsChunkPlugin({
    //   name:'common',
    //   minChunks: 2
    // })
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      minChunks: 2,
      chunks:['pageA','pageB']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vender',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'manifest',
      minChunks: Infinity
    })
  ]
}