//sort return 为正数则a，b交换顺序，为负数则不交换
let arr = [1,2,3,4,3,43,54,223,3221];

arr.sort((a,b)=>{
  return Math.round(Math.random()*10-5);//-5 dao 5 的随机数
});

console.log(arr);