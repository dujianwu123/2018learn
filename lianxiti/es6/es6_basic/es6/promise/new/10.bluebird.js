/**
 * bluebird 是世界最快的promise库
 * 它能把任意的通过回调函数实现的异步API换成 promise api
 **/
let Promise = require('bluebird');
let fs = require('fs');
// Promise.promisifyAll(fs);
promisifyAll(fs);

fs.readFileAsync('1.txt','utf8').then(data=>console.log(data));
console.log(fs);


function promisifyAll (obj){
  for(let key in obj){
    if(obj.hasOwnProperty(key) && typeof obj[key] === 'function'){
      obj[key+'Async'] = Promise.promisify(obj[key]);
    }
  }
}


//会返回一个新的函数
function promisify(fn) {
  return function (...arg) {
    return new Promise(function (resolve,reject) {
      fn.apply(null, [...arg, function (err, data) {
        err ? reject(err) : resolve(data);
      }]);
    });
  }
}
