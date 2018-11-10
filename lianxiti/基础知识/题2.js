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


let i = 2;
let fn = function (n){
  i *= 2;
  return function (m){
    i -= (n--) + (++m); //先算右侧的，拿右侧结果和左侧算
    console.log(i);
  }
};
let f = fn(1);
f(2);
fn(3)(4);
f(5);
console.log(i);


