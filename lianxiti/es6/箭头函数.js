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