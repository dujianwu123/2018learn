let minL = 0;
let maxL = document.documentElement.clientWidth - box.offsetWidth;
// console.log(maxL);
//固定步长的均速运动
// let step = 5;
// let timer = setInterval(()=>{
//   let curL = box.offsetLeft;
//   curL += step;

//   if(curL >= maxL){
//     box.style.left = maxL + "px";
//     clearInterval(timer);
//     return;
//   }

//   box.style.left = curL + "px";
// },17);

//-》固定时间匀速运动

// let duration = 3000;
// let interval = 17;
// let change = maxL- 0;
// let begin = 0;
// let count = Math.floor(duration/interval);
// let n = 0;
// let timer = setInterval(() => {
//   console.log(n);
//   n++;
//   if(n>=count){
//     clearInterval(timer);
//     box.style.left = (begin+change) + "px";
//     return;
//   }
//   box.style.left = (begin+change)*n/count + "px";

// }, interval);

/**
 * t: 当前已经运动的时间
 * d: duration 总时间
 * b: begin 起始位置
 * c: change 总距离(target-begin)
 * 
 * t/d --> 当前已经运动的事件/总时间 --> 当前动画完成的百分比
 * t/d*c --> 当前动画完成的百分比*总距离 --> 当前已经走的距离
 * t/d*c+b --> 当前走的距离+盒子的起始位置 --> 当前盒子应该有的位置
 */

let duration = 1000;
let interval = 17;
let begin = 0; //起始位置
let target = maxL;//目标位置
let change = target - begin;//移动的总距离
let time = 0;//已经运动的时间
let timer = setInterval(() => {
  //根据公式计算出当前盒子应有的位置
  time += interval;
  if(time>=duration){
    clearInterval(timer);
    box.style.left = (target) + "px";
    return;
  }
  let cur = time / duration * change + begin;
  box.style.left = cur + 'px';
}, interval);