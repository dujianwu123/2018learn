// if('m' in window){
//     var m = 1 && 12
// }
// console.log(m)//12
// // m = a && b  如果 a为真，那么 m = b,a为假 m = a;


// let n = 10
// if (!('n' in window)){
//     let n = n + 30 //报错，因为let 不预解释，正常是先准备值，在给n赋值，但是在n+30 的时候由于是let不会像var那样预解释，所以在此时n是不存在的
// }
// console.log(n)


// let n = 10,
//     m = 20;
// ~function(n,m){
//   let arg = n || 100;
//   arg[0] = n || 100;
//   arg[1] = m || 200;
//   console.log(n,m);
// }(m);

// console.log(n,m);


// let ary = [1,2,3];
// (function(ary){
//   ary.pop();
//   ary = ary.slice(0);
//   ary.shift();
//   console.log(ary);
// })(ary);
// console.log(ary);



// var n = 0,
//     fn = function (){
//       this.n *= 2;
//       n++;
//       return function (m){
//         n += ++m;
//         console.log(n);
//       }
//     };
  
//   var f = fn(2);
//   f(3);
//   fn(3)(4);
//   f(4);
//   console.log(n);


// let i = 2;
// let fn = function (n){
//   i *= 2;
//   return function (m){
//     i -= (n--) + (++m); //先算右侧的，拿右侧结果和左侧算
//     console.log(i);
//   }
// };
// let f = fn(1);
// f(2);
// fn(3)(4);
// f(5);
// console.log(i);



//valueOf,对象在转换基本类型时，首先会调用 valueOf 然后调用 toString。并且这两个方法你是可以重写的。
// let a = {
//   valueOf() {
//     return 0
//   },
//   toString() {
//   return '1';
//   },
//   [Symbol.toPrimitive]() {
//     // Symbol.toPrimitive ，该方法在转基本类型时调用优先级最高。
//     return 2;
//   }
// }
// console.log(1 + a);


// 'a' + + 'b' // -> "aNaN"
// // 因为 + 'b' -> NaN



// let n = 1;
// let x = {
//   n: 2,
//   y: (function(n){
//     n = n || 3;
//     return function (m){
//       m = m || 4;
//       this.n += m++; 
//       n += ++m;
//       console.log(n);
//     }
//   })(window.n)
// };
// let z = x.y;
// x.y(5);
// z(6);
// console.log(n,x.n);


// let a = {n: 4};
// let b = a;
// b.x = a = {n: 10};
// console.log(a.x);
// console.log(b.x);


// function C1(name){
//   if(name) this.name = name;
// }
// function C2(name){
//   this.name = name;
// }
// function C3(name){
//   this.name = name || 'join';
// }
// C1.prototype.name = 'Tom';
// C2.prototype.name = 'Tom';
// C3.prototype.name = 'Tom';
// console.log(new C1().name + new C2().name + new C3().name);



// let Fn = function (x = 0, y = 0){
//   this.x = x;
//   this.y = y;
//   this.getX = function (){
//     console.log(this.x);
//   }
// };
// Fn.prototype.getY = function (){
//   console.log(this.y);
// }
// Fn.prototype = {
//   setX : function(val){
//     this.x = val;
//   },
//   getX: function(){
//     console.log(this.x);
//   }
// };

// let f1 = new Fn;
// let f2 = new Fn(1,2);
// console.log(f1.constructor);
// f1.setX(3);
// f1.getX();
// f1.__proto__.getX();
// f1.__proto__.setX(4);
// f2.getX();
// f2.__proto__.getX();
// f2.getY();



// var a = 0;
// function fun(){
//   /**
//    * 形参赋值
//    * 变量提升
//    *  var a
//    */
//   alert(a); //-> undefined
//   var a = 10;
// };
// fun();
// alert(a);//0


// let a = 0,
//     b = 0;
// function A(a){
//   A = function(b){
//     console.log(a + b++);
//   };
//   console.log(a++);
// }
// A(1);//1
// A(2);//4



// window.val = 1;
// let json = {
//   val: 10,
//   dbl: function () {
//     this.val *= 2;
//   }
// };
// json.dbl();
// let dbl = json.dbl;
// dbl();
// json.dbl.call(window);
// alert(window.val + json.val);



// ;(function(){
//   let val = 1;
//   let json = {
//     val: 10,
//     dbl: function(){
//       val *= 2;
//     }
//   };
//   json.dbl();
//   alert(json.val + val);
// })();



// let test = (function(i){
//   return function (){
//     console.log(i*=2);
//   }
// })(2);
// test();


// var n = 2;
// function a(){
//   var n = 3;
//   function b(m){
//     console.log(++n + m);
//   }
//   b(4);
//   return b;
// }
// var c = a(5);
// c(6);
// console.log(n);


 /**
  * 谈一下对作用域链和原型链的理解
  * 
  * 
  */








