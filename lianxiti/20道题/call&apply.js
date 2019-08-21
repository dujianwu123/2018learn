// Function.prototype.call = function () {
//   let [thisArg, ...arg] = [...arguments];
//   if (!thisArg) {
//     thisArg = typeof thisArg === 'undefined' ? global : window;
//   }
//   thisArg.func = this;
//   let result = thisArg.func(...arg);
//   delete thisArg.func;
//   return result;
// }

// Function.prototype.apply = function (thisArg, rest) {
//   let result ;// 函数返回结果
//   if (!thisArg) {
//     thisArg = typeof window === 'undefined' ? global : window;
//   }
//   //this的指向的是当前函数 func (func.call)
//   thisArg.func = this;
//   if (rest) {
//     thisArg.func(...rest);
//   } else {
//     // 第二个参数为null / undefined
//     thisArg.func()
//   }
//   delete thisArg.func; //this上并没有func属性，因此需要移除
//   return result;
// }


// Function.prototype.call2 = function () {
//   let [thisArg, ...arg] = [...arguments];
//   if (!thisArg) {
//     thisArg = typeof window === 'undefined' ? global : window;
//   }
//   thisArg.func = this;
//   let result = thisArg.func(...arg);
//   delete thisArg.func;
//   return result;
// }

// Function.prototype.apply2 = function (thisArg, rest) {
//   let result ;
//   if (!thisArg) {
//     thisArg = typeof window === 'undefined' ? global : window;
//   }
//   thisArg.func = this;
//   if (rest) {
//     result = thisArg.func(...rest);
//   }else {
//     result = thisArg.func();
//   }
//   delete thisArg.func;
//   return result;
// }

// const curry = (fn, ...args) => {
//   args.length < fn .length ? (...arguments) => curry(fn,...args,...arguments) : fn(...arg);
// }
// function sumFn(a, b, c){
//   return a + b + c;
// }
// let sum = curry(sumFn);
// console.log(sum(2)(3)(5));
// console.log(sum(2,3,5));
// console.log(sum(2)(3,5));
// console.log(sum(2,3)(5));

// let a = {
//   [Symbol.toPrimitive]: (function(hint) {
//     let i = 1;
//     return function() {
//       return i++;
//     }
//   })()
// }

// let i = 1;
// let a = new Proxy({}, {
//   i: 1,
//   get: function () {
//     return () => this.i++;
//   }
// })

// let i = 1;
// let a = {};
// Object.defineProperty(a,i,{
//   get : function(){
//     return () => this.i++;
//   }
// })
// console.log(a == 1 && a == 2 && a == 3);

// let obj = {
  
//   valueOf() {
//     console.log('valueOf');
//     return 20;
//   },
//   toString() {
//     console.log('toString');
//     return 'hello';
//   }
// }
// console.log(obj + 'yvette');
// console.log(obj == 'yvette');
// console.log(obj * 10);
// console.log(Number(obj));
// console.log(String(obj));



Function.prototype.call = function () {
  let [thisArg, ...arg] = [...arguments];
  if (!thisArg) {
    thisArg = typeof window === 'undefined' ? global : window;
  }
  thisArg.func = this;
  let result = thisArg.func();
  delete thisArg.func;
  return result;
}
Function.prototype.apply = function (thisArg, rest) {
  if (!thisArg) {
    thisArg = typeof window === 'undefined' ? global : window;
  }
  let result ;
  thisArg.func = this;
  if (rest) {
    result = thisArg.func(...rest);
  }else {
    result = thisArg.func();
  }
  delete thisArg.func;
  return result;
}


// let a = {
//   valueOf: (function(){
//     let i = 1;
//     return () => i++
//   })()
// }
// console.log(a == 1 && a == 2 && a == 3);

// let i = 1;
// Object.defineProperty(window, 'a' ,{
//   get: function() {
//     return i++;
//   }
// })
// console.log(a == 1 && a == 2 && a == 3);

Function.prototype.call = function () {
  let [thisArg, ...arg] = [...arguments];
  if(!thisArg){
    thisArg = typeof window === 'undefined' ? global : window;
  }
  thisArg.func = this;
  let result = thisArg.func(arg);
  delete thisArg.func;
  return result
}

Function.prototype.apply = function (thisArg, rest) {
  if(!thisArg){
    thisArg = typeof window === 'undefined' ? global : window;
  }
  thisArg.func = this;
  let result;
  if (rest) {
    result = thisArg.func(...rest)
  }else {
    result = thisArg.func()
  }
  delete thisArg.func;
  return result;
}

