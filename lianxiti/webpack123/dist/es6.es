import 'babel-polyfill'

const a = 1;
let b =2;
console.log(a+b);
////////////////////
/**
 * preset 是针对语法的
 */
let arr = [1,2,3];
let arrB = arr.map(item=>item * 2);
arr.includes(8);
console.log('new Set',new Set(arrB));