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

  let setCss2 = function setCss2 (obj,attr,value){
    if(attr === 'opacity'){
      obj.style[attr] = value;
      obj.style[attr] = `filter:alpha(opacity=${value*100})`;
      return;
    }

    if(!isNaN(value)){
      let reg = /^(width|height|fontSize|((margin|padding)?(left|top|right|bottom)?))$/i;
      reg.test(attr) ? value += 'px' : null
    }
    obj.style[attr] = value;
  }

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
    while (p){
      l += p.clientLeft;
      l += p.offsetLeft;

      t += p.clientTop;
      t += p.offsetTop;

      p = p.offsetParent;
    }
    return {l:l,t:t}
  };

  let winHandle = function winHandle (attr,value){
    if( typeof value !== 'undefined'){
      document.documentElement[attr] = value;
      document.body[attr] = value;
      return ;
    }
    return document.documentElement[attr]||document.body[attr];
  };

  let myJsonParse = function myJsonParse (jsonStr){
    if(window.JSON){
      return JSON.parse(jsonStr);
    }else{
      return eval('('+jsonStr+')');
    }
  };

  return {
    css,
    offset,
    winHandle
  };
})();