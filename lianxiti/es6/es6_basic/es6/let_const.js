/**
 * 在ES6中基于LET/CONST等方式创建变量或者函数，不存在变量提升机制
 * 
 * -->切断了全局变量和window属性的映射机制
 * -->在相同的作用中，基于let不能声明相同名字的变量（不管用什么方式在当前作用域下声明了变量，再次使用let创建都会报错）
 *    虽然没有变量提升机制，但是在当前作用域代码自上而下执行之前，浏览器会做一个
 *    重复性检测，自上而下查找当前作用域下所有变量，一旦发现有重复的直接抛出异常，直接抛出异常，代码也不会再执行了，
 *    （虽然没有把变量提前声明定义，但是浏览器已经记住了，当前作用域下有哪些变量）
 */

// console.log(a)//ReferenceError: a is not defined
// let a = 12
// console.log(window.a)//undefined
// console.log(a)//12


// let a = 12
// let a = 13//SyntaxError: Identifier 'a' has already been declared

let a = 10,
    b = 10
let fn = function () {
    console.log(a, b)//ReferenceError: a is not defined
    let a = b = 20
    console.log(a, b)
}
fn()
console.log(a, b)


function fn(x = 0){
  //如果 X没有传递值，默认值是零，一旦传递值，不管传递的是啥，都是按照传递的值处理
  console.log(x);
}
fn();//0
fn(null);// null
fn(undefined);//0 传递undefined，浏览器也是按照没有传递值处理的
