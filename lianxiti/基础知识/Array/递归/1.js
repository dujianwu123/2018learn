//在1-100之间获取即是3也是5的倍数（也就是15的倍数）的和

// let total = 0;
// for (let i = 0; i < 100; i++) {
//     if(i%15 ===0){
//       total +=i;
//     }
// }
// console.log(total);

// function fn(n){
//     if(n>100){
//         return 0;
//     }
//     if(n % 15 ===0){
//         return n + fn(n+1);
//     }
//     return fn(n+1);
// }
// console.log(fn(1));

let arr = [1,2,3,[4,5,[6,7,8,[9]]],[10,11,12],[13,14,15],16];
// let str = JSON.stringify(arr);
// str = str.replace(/(\[|\])/g,'');
// str = '['+str+']';
// arr = JSON.parse(str);
// console.log(str);

// function zhankai (p,c){
//   let array = c||[];
//   for(let i=0;i<p.length;i++){
//     if(p[i].constructor === Array){
//       zhankai(p[i],array)
//     }else{
//       array.push(p[i]);
//     }
//   }
//   return array;
// }

let a =[];
function zhankai2 (arr){
  
  if(arr.length === 0){
      return ;
  }
  for(let i=0;i<arr.length;i++){
      let cur = arr[i];
      if(cur.constructor === Array){
          zhankai2(cur);
      }else{
          a.push(cur);
      }
  }

}
zhankai2(arr);
console.log(111111,a);