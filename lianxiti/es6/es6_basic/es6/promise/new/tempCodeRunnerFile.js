
 function *read(){
   console.log(1);
   let a = yield '珠峰';
   console.log(a);
   let b = yield 9;
   console.log(b);
   return b;
 }
let it = read();
console.log(it.next('213'));//1 {value:珠峰,flag:false}
console.log(it.next('100'));//100 {value:9,flag:false}
console.log(it.next('200'));//200 {value:200,flag:false}
console.log(it.next('400')); //{value:undefined,flag:true}