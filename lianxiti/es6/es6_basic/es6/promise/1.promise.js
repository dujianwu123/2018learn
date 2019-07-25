/* eslint-disable */
let Promise = require('./promise.js');
console.log(Promise);


let p = new Promise(function(resolve,reject){
    console.log(1);
    // setTimeout(() => {
    //     resolve('djw');
    // }, 2000);
    resolve('djw');
    console.log(2);
});
let p2 =p.then(function(data){
    console.log(data+"成功1");
},function(e){
  console.log(e+"--e1");
  return 100;
});
p.then(function(data){
  console.log(data+"成功2");
},function(e){
console.log(e+"--e2");
});

