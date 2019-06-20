function observer (obj){
  if(typeof obj === 'object'){
    for(let key in obj){
      definReactive(obj,key,obj[key]);
    }
  }
}
function definReactive(obj,key,value){
  observer(value);// 判断value是不是一个对象，如果是对象，会继续监控
  Object.defineProperty(obj,key,{
    get(){
      return value;
    },
    set(val){
      observer(val);//如果设置的值是一个对象，需要在进行这个对象的监控
      console.log('操作视图更新');
      value = val;
    }
  });
}

let obj = {a:1,b:2,age:{c:3},arr:[1,2,3,4]};
observer(obj);
// obj.a = 'zf';
// console.log(obj.a);

// obj.xxx = 3;//如果属性不存在，默认后增加的内容，并不会刷新视图
//obj.age={};
obj.arr.push(5);//数组调用push 是无效的  Object.defienProperty 不支持数组的
// let oldPush = Array.prototype.push;
// Array.prototype.push = function(value){
//   console.log('操作视图更新');
//   oldPush.call(this,value);
// }//这就是vue中数组为什么指定方法才好用的原理


//vue 把这个数组上的所有方法 都重写了
let arr = ['push','slice','shift','unshift'];
arr.forEach((method)=>{
  let oldMethod = Array.prototype[method];
  Array.prototype[method] = function(value){
    console.log('操作视图更新');
    oldMethod.call(this,value);
  }
});
console.log(obj.arr);

obj.arr.length --//这个不行，因为没有被重写

/**
 * 总结
 * vue中的对象必须先存在才能响应式
 * 数组中的方法只能用vue重新给写好了的方法
 * 
 **/