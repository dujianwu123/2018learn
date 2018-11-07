var n = 10
var obj = {
    n: 20,
    fn: (function () {
        var n = 30
        return function () {
            console.log(n)
        }
    })()
}
obj.fn()


// var n = 10;
// var obj = {
//   n: 20,
//   fn: (function () {
//     return function () {
//       console.log(n);
//     }
//   })()
// }
// obj.fn();



// var n = 10;
// var obj = {
//   n: 20,
//   fn: (function (n) {
//     return function () {
//       console.log(n);
//     }
//   })(obj.n)
// }
// obj.fn();