/**
 * generator 函数要用* 来比表标识，yield（暂停 产出）
 * 他会将函数分割出好多个部分，调用一次next就会继续向下执行
 * 返回结果是一个迭代器  迭代器有一个next方法
 * 
 * yield 后面跟着的是value的值
 * yield 等号前面的是我们当前调用next传进来的值
 * 第一次next传值是无效的
 **/

 function *read(){
   console.log(1);
   let a = yield '珠峰';
   console.log(a);
   let b = yield 9;
   console.log(b);
   return b;
 }
let it = read();
console.log(it.next('213'));//1 {value:珠峰,flag:false}
console.log(it.next('100'));//100 {value:9,flag:false}
console.log(it.next('200'));//200 {value:200,flag:false}
console.log(it.next('400')); //{value:undefined,flag:true}


//异步  generator 主要和promise搭配使用
let bluebird = require('bluebird');
let fs = require('fs');
let read = bluebird.promisify(fs.readFile);//promise化
function *r(){
  let content1 = yield read('./xx/1.txt','utf8');
  let content2 = yield read(content1,'utf8');
  return content2;
}
let it = r();
it.next().value.then(function(data){
    it.next(data).value.then(function(data){
        console.log(it.next(data));//{value:'最终结果',flag:true}
    });
});

//这样获取generator最终的结果比较麻烦
//co库  npm  install co  可以自动的将generator 进行迭代
let co = require('co');
co(r()).then(function(data){
    console.log(data);//这个就是最终的generator结果
});


//generator  原理  是将一个函数划分成若干个小函数，每次调用时移动指针，内部是一个条件判断，走对应的逻辑






 