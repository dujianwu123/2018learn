let fn = function fn(x,y,ev){
  console.log(this,x,y,ev);
  this.val = x+y;
};
let obj = {name:'珠峰'};
document.body.onclick = fn.bind(obj,x,y);
/**
 * 基于FUNCTION.PROTOTYPE上的BIND方法可以预先处理THIS，还可以给函数
 * 预先传递参数，而且还可以把事件对象等信息最后传递给函数
 */
