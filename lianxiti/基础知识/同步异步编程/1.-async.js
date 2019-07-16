/* eslint-disable */
setTimeout(() => {
  console.log(1)
}, 20)

setTimeout(() => {
  console.log(2);
}, 0);//默认会有最小等待时间（V8一般是5-6MS）

console.time('WHILE')
let i = 0;
while(i<=9999999999){
  i++
}
console.time('WHILE')

setTimeout(() => {
  console.log(3);
}, 10);
console.log(4);

// 结果 4->2->1->3