let Promise = require('./test5.js');

let p1 = new Promise(function(resolve,reject){
  setTimeout(() => {
    resolve(100);
  }, 1000);
});
let p2 = new Promise(function(resolve,reject){
  setTimeout(() => {
    resolve(200);
  }, 2000);
});

console.time("const");
Promise.all([p1,p2]).then(function(date){
  console.log(date);
  console.timeEnd("const");
},function(err){
  console.log(err);
  console.timeEnd("const");
});