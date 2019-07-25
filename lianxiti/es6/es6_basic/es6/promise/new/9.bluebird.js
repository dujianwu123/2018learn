/* eslint-disable */
/**
 * bluebird 是世界最快的promise库
 * 它能把任意的通过回调函数实现的异步API换成 promise api
 **/
let Promise = require('bluebird');
let readFile = require('fs').readFile;

// let readFileSync = Promise.promisify(readFile);
let readFileSync = promisify(readFile);
//  /2018learn/lianxiti/es6/es6_basic/es6/promise/new/1.txt
readFileSync('./1.txt', 'utf8').then(function (data) {
  console.log(data);
});

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
