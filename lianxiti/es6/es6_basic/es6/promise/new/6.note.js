/* eslint-disable */
//promise化
function promiseify (fn){
    return function(...arg){
      return new Promise(function(resolve,reject){
          fn(...arg,function(err,data){
              if(err) reject(err);
              resolve(data);
          });
      });
    }
}
let read = promiseify(fs.readFile);
read('./xxxx.txt','utf-8').then(function(data){
    console.log(data);
});