if('m' in window){
  var m = 1 && 12;
}
console.log(m);

let n = 10;
if (!('n' in window)){
  let n = n + 30; //报错，因为let 不预解释，正常是先准备值，在给n赋值，但是在n+30 的时候由于是let不会像var那样预解释，所以在此时n是不存在的
}
console.log(n);