let a1 = Symbol('1');
let a2 = Symbol('1');
console.log(a1===a2);
//Symbol 返回的是独立的不相等的值

//for 后面的参数一样获取的值就相等
let a3 = Symbol.for('a1');
let a4 = Symbol.for('a1');
console.log(a4===a3);
console.log(a1===a3);

let b1 = Symbol.for('abc');
let obj = {
  [b1]:123,//Symbol的返回值作为key，即使都是abc，但也是不同的abc，需要用[]包裹
  'abc':345,
  'c':456
}
console.log('obj',obj);

for(let [key,value] of Object.entries(obj)){
  console.log('let of --',key,'--',value);//Symbol作为key不能被遍历出来
}


//此方法只能遍历出Symbol的key
Object.getOwnPropertySymbols(obj).forEach(item=>{console.log(item,"--",obj[item]);});

//此方法可以都遍历出来
Reflect.ownKeys(obj).forEach(function(item){
  console.log('ownkeys--',item,'--',obj[item]);
});