
// //迭代器
// function read(arrs){
//     let index = 0;
//     return {
//       next(){
//         let done = index === arrs.length;
//         let value = done?undefined : arrs[index++];
//         return {
//           done,value
//         }
//       }
//     }
// }
// let it = read([1,2,3]);
// let result;
// do{
//   result = it.next();
//   console.log(result);
// }while(!result.done)
// //////////////////////////////////
// function * rea (books){
//   console.log('start');
//   for(let i=0;i<books.length;i++){
//     yield books[i]; // yield 放弃屈服 产出 
//   }
//  console.log('结束');
// }
// let ite = rea(['js','node']);
// let res ;
// do{
//   res = ite.next();//返回yield后面的值
//   console.log(res);
// }while(!res.done);


function * read (){
  try {
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
    let c = yield 3;
    console.log(c);
  } catch (error) {
    console.log('e:'+error);
  }
}
let it = read();
console.log(it.next('xxx'));
it.throw('xxx');



function read (arrs){
  let index = 0;
  return {
    next(){
      let done = index === arrs.length;
      let value = done?undefined:arrs[index++]
      return {
        done,value
      }
    }
  }
}
let it = read([1,2,3]);
let res;

do{
  res = it.next();
  console.log(res);
}while(!res.done)

//{ done: false, value: 1 }