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
