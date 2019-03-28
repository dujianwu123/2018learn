// function copy(p){
//   let newObj = {}
//   for(let key in p){
//       if(typeof p[key] === 'object'){
//         // Object.prototype.toString.call(p[key])==="[object object]"
//         newObj[key] = copy(p[key]);
//       }else{
//         newObj[key] = p[key];
//       }
//   }
//   return newObj;
// }

function copy(p, c) {
  let newObj = c || {};
  for (let key in p) {
    if (typeof p[key] === 'object') {
      newObj[key] = Object.prototype.toString.call(p[key])==="[object Array]" ? newObj[key] = [] : void(0);
      newObj[key] = copy(p[key],newObj[key]);
    } else {
      newObj[key] = p[key];
    }
  }
  return newObj;
}
let obj = { a: 1, b: 2 ,c:[11,22,33,[2321,123]],d:{xxx:222}};
let newObj = copy(obj);

newObj.b = 3;
newObj.c.push(44);
newObj.d.sss=555;
console.log('旧', obj);
console.log('新', newObj);


let new2Obj = JSON.parse(JSON.stringify(obj));
new2Obj.d.sss=666;
console.log('新2', new2Obj);
console.log('旧', obj);
