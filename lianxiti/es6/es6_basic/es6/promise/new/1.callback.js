//异步的发展流程
//异步：先干一件事，中间去干其他的事，最终在回来干这件事  同步：同步连续执行
//node支持异步
//callback -> promise -> generator + co ->async+await(语法糖)
//读文件读到后再去写文件

//并行 无法在同一时刻合并两节异步的结果，异步方案不支持return
function aa (cb){
  setTimeout(() => {
    let str =11;
    cb(str);

    //return ?
  }, 1000);
}
let ss = aa(function(str){
  console.log(str);
});
//高阶函数
//函数可以作为参数或者函数还可以作为返回值

//判断数据类型
//1）批量生成函数
function isType (type){
  return function(content){
      return Object.prototype.toString.call(content) === `[object ${type}]`;
  }
}

let isArray = isType('Array');
let isString = isType('String');
console.log(isArray([]));
console.log(isArray(2));
console.log(isString('111'));


//预置函数作为参数  loadsh  _.after
function after(times,callback){
  return function(){
    if(--times === 0){
      callback();
    }
  }
}
let eat = after(3,function(){
  console.log('饱了');
});
//设定第几次开始执行
eat();
eat();
eat();


