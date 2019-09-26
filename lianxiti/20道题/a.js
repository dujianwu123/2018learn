var obj = {

  valueOf() {
    console.log('‘valueOf’');
    return 20;
  },
  toString() {
    console.log('‘toString’');
    return '‘hello’';
  }
}
console.log(obj + '‘yvette’'); //default 

// let a = {
//   valueOf: (function () {
//     let i = 1;
//     return function () {
//       return i++;
//     }
//   })()
// }
// let i = 1;
// Object.defineProperty(global,'a',{
//   get: function(){
//     return i++
//   }
// })
let a = new Proxy({},{
  i:1,
  get: function(){
    return () => this.i++
  }
})
console.log((a == 1 && a == 2 && a == 3 && a==4));