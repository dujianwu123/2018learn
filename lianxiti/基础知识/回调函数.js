/**
 * 回调函数，把一个函数当做实参传递给另外一个函数B，在B方法执行的时候，
 * 把A执行了，我们把这种机制叫做"回调函数机制"
 */

 /**
  * 
  * @param {*} callback 
  * 
  * 1.根据需求回调函数可以被执行N多次
  * 2.不仅可以把回调函数执行，还可以给传递的回调函数传递实参，这样在回调函数中
  * 设置形参（或者使用ARG）接收即可
  * 3.还可以改变回调函数中的this
  * 4.可以在宿主函数中接收函数执行的返回值
  */
let fn = (callback) => {
  // callback && callback(100,200);
  // callback && callback(obj,100,200);
  let result = callback && callback(100,200);
  console.log(result);
}
fn((n,m)=>{
  return n+m;
});