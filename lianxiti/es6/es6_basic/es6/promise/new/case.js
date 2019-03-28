let Promise = require('./test3.js');
let p = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(1);
    },1000);
});
//p
// let p2 = p.then(function (data) {
//   return 100;
// }, function (err) {
//   console.log(err);
// })

let p2 = p.then(function (data) {
  console.log('p1--'+data);
  return new Promise(function(resolve,reject){
    setTimeout(() => {
      resolve(2);
    },1000);
  });
}, function (err) {
  console.log(err);
})


p2.then(function (data) {
  console.log('p2--' + data);
}, function (err) {
  console.log('p2--' + err);
});


//1.promise 实例可以多次then，当成功后会将then中的成功方法按顺序执行，
//我们可以先将then中的成功的回调和失败的回调存到数组内，当成功时调用成功的数组即可

//2.链式调用

//3.如果then中无论是成功的回调还是失败的回调只要返回了结果就会走下一个then中的成功，
//如果有错误走一个then的失败

//4.如果第一个promise返回一个普通值，会进到下一次then的成功的回调，
//如果第一个promise返回了一个promise，需要等待返回的promise执行后的结果传递给下一次then中

//5.resolvePromise
/**
 * 返回的结果和promise是同一个永远不会成功或失败
 * var p = new Promise(function(resolve,reject){
 *    return p;
 * });
 * 
 * p.then(function(){
 *    console.log(1);
 * },function(err){
 *    console.log(err);
 * });
 * 
 **/
//6.判断x是不是promise，如果x是对象并且x的then方法是函数我们就认为他是一个promise

//7.有些人写的promise可能会既调用成功又会调用失败，如果两个都调用先调用谁另一个就忽略掉

//8.我们的代码可以在then中什么都不传
//promise 中值的穿透
// Promise.then().then().then(function(data){
//     console.log(data);
// },function(){

// });


//9.promise 规范中要求，所有的onFulfilled和onRejected都需要异步执行，setTimeout

//下载一个Promise的测试库，promises-aplus-tests.
//npm i -g promises-aplus-tests 