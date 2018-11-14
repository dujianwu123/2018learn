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







let fn = (x,y) => {

}
fn(10,20);

let fn2 = x => {
  //只有一个形参，可以省略小括号
}

let fn3 = (x=0,y=0) => x+y;//如果函数中只有一句操作，并且是return的，我们可以省略大括号（给形参设置默认值）

let fn4 = (...arg)=>{
  console.log(arg);
  //箭头函数中没有arguments，可以使用剩余运算符代替，而且agr是一个数组
}
fn4(10,20,30,40);

//箭头函数中没有自己执行的主体（this），它的this都是继承上下文中的this
let obj = {
  fn : (function(){
    return function (){
      console.log(this);
    }
  })()
};
obj.fn();//this-->obj

let obj2 = {
  fn : (function(){
    //this->window
    return ()=>{
      console.log(this);
    }
  })()
};
obj2.fn();//this-->window  箭头函数执行和是否有点，点前面是谁都没关系了，因为它没有自己的执行主体，在箭头函数中
          //使用到的this都是直接找上下文中的this来使用（上级作用域）