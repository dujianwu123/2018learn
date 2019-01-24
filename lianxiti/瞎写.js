// //a.js
// var a="boy";
// var b=function(value){
// 　　console.log(value)
// }
// export {a,b};

// //b.js
// import {a,b} from './a.js'

let data_invest_strat = new Date();
let data_invest_end = new Date('2019-11-24 09:00:00');//
let time= (data_invest_end.getTime()-data_invest_strat.getTime())/1000;
console.log(parseInt(time/86400));
console.log('2019-'+(data_invest_strat.getMonth()+1)+'-30');
console.log(data_invest_strat.getDate());
console.log(typeof data_invest_strat.getFullYear());


[
  {
    "bookCover": "https://img12.360buyimg.com/n1/s200x200_jfs/t1/29531/40/3019/209181/5c2230bfEde402979/3fdf3724b991767f.jpg",
    "bookName": "社交心理学",
    "bookInfo": "籍全8册 人际交往+九型人格+魅力口才+高效沟通+乌合之众+自卑与超越 畅销图",
    "bookPrice": 78.2,
    "bookId": 1
  },
  {
    "bookCover": "https://img12.360buyimg.com/n1/s200x200_jfs/t19768/365/644453327/265704/e4a01f78/5a9ceb5eN275eb773.jpg",
    "bookName": "追风筝的人（2018版）",
    "bookInfo": "囤书过大年，30万图书每满100减50！（具体以商详页促销信息为准）去选书",
    "bookPrice": 58.2,
    "bookId": 2
  },
  {
    "bookCover": "https://img13.360buyimg.com/n1/s200x200_jfs/t1/16244/10/5477/108951/5c3d949aE9890ff07/4264c297fc192257.png",
    "bookName": "岛上书店",
    "bookInfo": "每个人的生命中，都有无比艰难的那一年，将人生变得美好而辽阔",
    "bookPrice": 33.33,
    "bookId": 3
  },
  {
    "bookCover": "https://img11.360buyimg.com/n1/s200x200_jfs/t856/216/1127983647/1080639/43a3eae9/5577d15cNf5f7c9c9.jpg",
    "bookName": "霍乱时期的爱情(2015版)",
    "bookInfo": "具体以商详页促销信息为准",
    "bookPrice": 49.5,
    "bookId": 4
  },
  {
    "bookCover": "https://img12.360buyimg.com/n1/s200x200_jfs/t19768/365/644453327/265704/e4a01f78/5a9ceb5eN275eb773.jpg",
    "bookName": "追风筝的人（2018版）",
    "bookInfo": "囤书过大年，30万图书每满100减50！（具体以商详页促销信息为准）去选书",
    "bookPrice": 58.2,
    "bookId": 5
  },
  {
    "bookCover": "https://img13.360buyimg.com/n1/s200x200_jfs/t1/16244/10/5477/108951/5c3d949aE9890ff07/4264c297fc192257.png",
    "bookName": "岛上书店",
    "bookInfo": "每个人的生命中，都有无比艰难的那一年，将人生变得美好而辽阔",
    "bookPrice": 33.33,
    "bookId": 6
  },
  {
    "bookCover": "https://img11.360buyimg.com/n1/s200x200_jfs/t856/216/1127983647/1080639/43a3eae9/5577d15cNf5f7c9c9.jpg",
    "bookName": "霍乱时期的爱情(2015版)",
    "bookInfo": "具体以商详页促销信息为准",
    "bookPrice": 49.5,
    "bookId": 7
  }
]