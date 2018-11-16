/*
 * @Author: DuJianWu 
 * @Date: 2018-11-09 16:40:34 
 * @Last Modified by: DuJianWu
 * @Last Modified time: 2018-11-09 16:53:24
 * 获取元素样式
 */

let oOuter = document.getElementById('outer');
let oInner = document.getElementById('inner');
let oCenter = document.getElementById('center');


let getCss = function getCss (obj,attr){
    if('getComputedStyle' in window){
        let val = window.getComputedStyle(obj,null)[attr]
        let reg = /^-?\d+(\.\d+)?(px|pt|rem|em)?$/i
        reg.test(val) ? val = parseFloat(val) : null
        return  val
    }
    throw new SyntaxError('浏览器版本过低，请升级浏览器！')
}



let setCss = function setCss (obj,attr,value){
  if(attr === 'opacity'){
    obj.style[attr] = value;
    obj.style[attr] = `filter:alpha(opacity=${value*100})`;
    return ;
  }

  if(!isNaN(value)){
    let reg = /^(width|height|fontSize|((margin|padding)?(top|left|bottom|right)?))$/i;
    reg.test(attr) ? value += 'px' : null;
  }
  obj.style[attr] = value;
}



let setGroupCss = function setGroupCss (obj,options = {}){
  for (let attr in options){
    if(!options.hasOwnProperty(attr)) break;//for in有顺序，数字在先，私有在先，公有在后，所以当便利到公有的第一个时说明私有的已经遍历完了，所以可以是 break
    setCss(obj,attr,options[attr]);
  }
}

// setCss(oOuter,'width',2000);
// setGroupCss(oOuter,{
//   'width':2000,
//   'opacity':0.1
// });
console.log(getCss(oOuter,'width'),getCss(oOuter,'border'));

let css = function css (...arg){
  let len = arg.length;
  if(len>=3){
    setCss(...arg);
    return ;
  }
  if(len === 2 && arg[1] !== null && typeof arg[1] === 'object'){
    setGroupCss(...arg);
    return ;
  }
  return getCss(...arg);
}
console.log(css(oOuter,'width'),getCss(oOuter,'border'));
// css(oOuter,'width',2000);
// css(oOuter,{
//     'width':2000,
//     'opacity':0.1
//   });