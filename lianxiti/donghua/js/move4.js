~function () {
  let utils = (function () {
    let getCss = (ele, attr) => {

      if ('getComputedStyle' in window) {
        let val = window.getComputedStyle(ele, null)[attr];
        let reg = /^-?\d+(\.\d+)?(px|pt|rem|em)?$/;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
      }
      throw new SyntaxError('浏览器版本过低，请升级浏览器！')

    };
    let setCss = (obj, attr, val) => {
      if (attr === 'opacity') {
        obj.style[attr] = val;
        obj.style[attr] = `filter:alpha(opacity=${val * 100})`;
      }
      if (!isNaN(val)) {
        let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i;
        reg.test(attr) ? val += 'px' : null;
      }
      obj.style[attr] = val;
    };
    let setGroupCss = function setGroupCss(obj, options = {}) {
      for (let attr in options) {
        if (!options.hasOwnProperty(attr)) break;//for in有顺序，数字在先，私有在先，公有在后，所以当便利到公有的第一个时说明私有的已经遍历完了，所以可以是 break
        setCss(obj, attr, options[attr]);
      }
    };

    let css = function css(...arg) {
      let len = arg.length,
        secound = arg[1];
      fn = getCss;
      len >= 3 ? fn = setCss : null;
      len === 2 && (secound instanceof Object) ? fn = setGroupCss : null;
      return fn(...arg);
    };

    return {
      getCss,
      setCss,
      setGroupCss,
      css
    };
  })();

  //公式
  let Effect = {
    Linear: (t, b, c, d) => {
      return t / d * c + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
      return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
      return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
      if ((t/=d/2) < 1) {
        return c/2*t*t + b;
      }
      return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
      return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
      if ((t/=d/2) < 1) {
        return c/2*t*t*t*t + b;
      }
      return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
      if (t === 0) { 
        return b; 
      }
      if ( (t /= d) == 1 ) {
        return b+c; 
      }
      if (!p) {
        p=d*0.3; 
      }
      if (!a || a < Math.abs(c)) {
        a = c; 
        var s = p/4;
      } else {
        var s = p/(2*Math.PI) * Math.asin (c/a);
      }
      return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
      if (t === 0) {
        return b;
      }
      if ( (t /= d) == 1 ) {
        return b+c;
      }
      if (!p) {
        p=d*0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else {
        var s = p/(2*Math.PI) * Math.asin (c/a);
      }
      return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },    
    elasticBoth: function(t, b, c, d, a, p){
      if (t === 0) {
        return b;
      }
      if ( (t /= d/2) == 2 ) {
        return b+c;
      }
      if (!p) {
        p = d*(0.3*1.5);
      }
      if ( !a || a < Math.abs(c) ) {
        a = c; 
        var s = p/4;
      }
      else {
        var s = p/(2*Math.PI) * Math.asin (c/a);
      }
      if (t < 1) {
        return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
            Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      }
      return a*Math.pow(2,-10*(t-=1)) * 
          Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
      if (typeof s == 'undefined') {
         s = 1.70158;
      }
      return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
      if (typeof s == 'undefined') {
        s = 3.70158;  //回缩的距离
      }
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }, 
    backBoth: function(t, b, c, d, s){
      if (typeof s == 'undefined') {
        s = 1.70158; 
      }
      if ((t /= d/2 ) < 1) {
        return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      }
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
      return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },       
    bounceOut: function(t, b, c, d){
      if ((t/=d) < (1/2.75)) {
        return c*(7.5625*t*t) + b;
      } else if (t < (2/2.75)) {
        return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
      } else if (t < (2.5/2.75)) {
        return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
      }
      return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },      
    bounceBoth: function(t, b, c, d){
      if (t < d/2) {
        return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
      }
      return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
  };


  //封装动画库
  function djw_animation(obj, target = {}, duration = 1000, callback = new Function('')) {
    if(typeof duration === 'function'){
      callback = duration;
      duration = 1000;
    }
    //算begin 和 change
    let begin = {};
    let change = {};
    let time = 0;
    for (let attr in target) {
      if (target.hasOwnProperty(attr)) {
        begin[attr] = utils.css(obj, attr);
        change[attr] = target[attr] - begin[attr];
      };
    };
    obj.timer = setInterval(() => {
      time += 17;
      if (time >= duration) {
        utils.css(obj, target);
        clearInterval(obj.timer);
        callback.call(obj);//动画完成后执行callback并且让回调函数中的this是当前操作的元素本身
        return;
      }
      let cur = {};
      for (let attr in target) {
        if (target.hasOwnProperty(attr)) {
          cur[attr] = Effect.elasticBoth(time, begin[attr], change[attr], duration);
        }
      }

      utils.css(obj, cur);
    }, 17);
  }

  window.djw_animation = djw_animation;
}();