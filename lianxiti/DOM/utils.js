let utils =(function(){
  let getCss = function getCss (obj,attr){
    if('getComputedStyle' in window){
        let val = window.getComputedStyle(obj,null)[attr]
        let reg = /^-?\d+(\.\d+)?(px|pt|rem|em)?$/i
        reg.test(val) ? val = parseFloat(val) : null
        return  val
    }
    throw new SyntaxError('浏览器版本过低，请升级浏览器！')
  };

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
  };

  let setGroupCss = function setGroupCss (obj,options = {}){
    for (let attr in options){
      if(!options.hasOwnProperty(attr)) break;//for in有顺序，数字在先，私有在先，公有在后，所以当便利到公有的第一个时说明私有的已经遍历完了，所以可以是 break
      setCss(obj,attr,options[attr]);
    }
  };

  let css = function css (...arg){
    let len = arg.length,
        secound = arg[1];
        fn = getCss;
    len >=3 ? fn = setCss : null;
    len ===2 && (secound instanceof Object) ? fn = setGroupCss : null;
    return fn(...arg);
  };

  let offset = function offset (obj){
    
    let l = obj.offsetLeft;
    let t = obj.offsetTop;
    let p = obj.offsetParent;
    while (p.tagName !== 'BODY'){
      l += obj.clientLeft;
      l += obj.offsetLeft;

      t += obj.clientTop;
      t += obj.offsetTop;

      p = obj.offsetParent;
    }
    return {l:l,t:t}
  };

  return {
    css,
    offset
  };
})();