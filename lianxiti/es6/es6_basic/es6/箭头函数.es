//箭头函数中没有arguments，可以用...arg 替代，并且arg是数组
//形参一个时，可以不写括号
let fn = (...arg) =>{return eval(arg.join('+'))};
console.log(fn(1,2,3));

//箭头函数中，没有this，用到this都是所在宿主环境中的this（上级作用域中的this），
//所以以后项目中，不是要把所有的函数都改为箭头函数，根据自身需要来修改即可
// let obj = {
//   name: 'obj',
//   fn(){
//     //this->obj
//     setTimeout(() => {
//       //this ->obj
//     }, 1000);
//   }
// }
// obj.fn();

/**
 * 
 */
let fn = ()=>{
  console.log(this);
}
fn.call(12); //this window

let obj = {
  name: 'obj',
  sum: function(){
    //this -> obj
    fn();//this ->window
    //宿主环境：不是执行的环境而是定义的环境,fn虽然是在这执行的，但是它是在window下定义的，
    //所以它的宿主环境还是window
  }
}
obj.sum();// this ->window