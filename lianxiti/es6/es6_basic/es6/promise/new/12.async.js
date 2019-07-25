/* eslint-disable */
/**
 * async/await 号称异步的终极解决方案，是最简单的，
 * 但是其实它只是generator+promise的语法糖
 **/

let fs = require('fs');
function readFile(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, 'utf8', function (err, date) {
      err ? reject(err) : resolve(date);
    });
  });
}

/**
 * 1.简洁
 * 2.有很好的语义
 * 3.可以很好的处理异步 throw error return try catch
 * 现在koa2里已经可以支持async/await
 **/
// 用async 来修饰函数，async需要配await，await只能promise
async function read(filename) {
  try {
    let a = await readFile(filename);
    let b = await readFile(a);
    let c = await readFile(b);
    return c;
    // return 'ok'
  } catch (error) {
    console.log(error);
  }
}
read('./1.txt').then(function (date) {
  console.log(date);
});
/**
  * async await 解决的问题有哪些
  * 1.回调地狱
  * 2.并发执行异步，在同一时刻同步返回结果  Promise.all
  * 3.解决了返回值的问题
  * 4.可以实现代码的try/catch
  **/

  //这个就是上面的async转译过来的，其实async/await  =  generator + co
  // function read (){
  //   return co(function *(){
  //     let a = yield readFile(filename);
  //     let b = yield readFile(a);
  //     let c = yield readFile(b);
  //     return c;
  //   });
  // }