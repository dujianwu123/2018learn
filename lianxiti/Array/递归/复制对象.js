// function objectCopy (p,c){
//   let obj =  c || {};
//   for (key in p){
//     if(p[key].toString === "[object Object]"){
//       obj[key] = p[key] instanceof Array ? [] : {};
//       objCopy(p[key],obj[key]);
//     }else{
//       obj[key] = p[key];
//     }
//   }
//   return obj;
// }

function objectCopy(p, c) {
  let newObj = c || {};
  for (let key in p) {
    if (p[key].toString === '[object Object]') {
      newObj[key] = p[key] instanceof Array ? newObj[key] = [] : newObj[key] = {};
      objectCopy(p[key], newObj[key]);
    } else {
      newObj[key] = p[key];
    }
  }
  return newObj;
}
let obj = { a: 1, b: 2, c: [1, 2, 3] };
console.log(objectCopy(obj));