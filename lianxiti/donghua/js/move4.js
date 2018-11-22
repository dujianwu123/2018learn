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
          cur[attr] = Effect.Linear(time, begin[attr], change[attr], duration);
        }
      }

      utils.css(obj, cur);
    }, 17);
  }

  window.djw_animation = djw_animation;
}();