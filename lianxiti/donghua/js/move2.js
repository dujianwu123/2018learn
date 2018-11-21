/**
 * time
 * duration
 * 
 * 
 * begin
 * target
 * change
 */
let oBox = document.getElementById('box');
let time = 0;
let interval = 17;
let duration = 1000;
let target = {
  'left': document.documentElement.clientWidth - oBox.offsetWidth,
  'top': document.documentElement.clientHeight - oBox.offsetHeight,
  'width': 50,
  'height':50
};
let begin = {};
let change = {};

for(let attr in target){
  if(target.hasOwnProperty(attr)){
    // hasOwnProperty
    begin[attr] = parseFloat(getComputedStyle(oBox,null)[attr]);
    change[attr] = target[attr] - begin[attr];
  }
}
let timer = setInterval(() => {
  time += interval;
  if(time>=duration){
    clearInterval(timer);
    for(let attr in target){
      if(target.hasOwnProperty(attr)){
        oBox.style[attr] = target[attr] + "px";
      }
    }
    return;
  }
  for(let attr in target){
    if(target.hasOwnProperty(attr)){
      oBox.style[attr] = time/duration*change[attr] + begin[attr] + "px";
    }
  }
}, interval);