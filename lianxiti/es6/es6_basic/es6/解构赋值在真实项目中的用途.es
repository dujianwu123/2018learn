/**
 * 快速交换两个变量值
 */
let a = 10;
let b = 11;
[a,b] = [b,a] ;
console.log(a,b);

/**
 * 
 */
let fn = function (){
  let a = 12,
      b = 13,
      c = 14;
  return [a,b,c];
}
let [a,b,c] = fn();
console.log(a,b,c);

/**
 * 
 * @param param0 
 */
function fn([a,b,c=0]){
  console.log(a,b,c);
}
fn([1,2]);

function fn({x,y,z=0}){
  console.log(x,y,z);
}
fn({x:10,y:11});

let animate = function ({curEle = null,target = {},duration = 1000,callback = null}={}){
  console.log(curEle,target,duration,callback);
};
animate({
  curEle:document.body,
  target:{opacity:0}
});


