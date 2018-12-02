~function($){
  if(typeof $ === 'undefined'){
    throw new ReferenceError('必须依赖Jquery');
  }

  class Drag {
    constructor(ele,options={}){
        if(typeof ele === 'undefined' || ele.nodeType !==1){
            throw new ReferenceError('必须传一个元素对象');
        }
        let {selector = ele} = options;
        this.dragTarget = selector;
        this.ele = ele;
        
        if(typeof selector === 'string'){
            //传递一个选择器进来了，想通过操作ele中某个元素让ele实现移动
            console.log(selector);
            this.dragTarget = $(ele).find(selector).get(0);//尽量让this存储的元素对象统一，要不就统一原生要不就统一jquery
        }
        $(this.dragTarget).on('mousedown',this.down.bind(this));
        
    }
    down(ev){
      this.disX = ev.clientX - parseFloat($(this.ele).css('left'));
      this.disY = ev.clientY - parseFloat($(this.ele).css('top'));
      this._MOVE = this.move.bind(this);
      this._UP = this.up.bind(this);
      $(document).on('mousemove',this._MOVE);
      $(document).on('mouseup',this._UP);
    }
    move(ev){
      let curL = ev.clientX - this.disX;
      let curT = ev.clientY - this.disY;
     
      //边界判断
      let winW = document.documentElement.clientWidth;
      let winH = document.documentElement.clientHeight;
      let boxW = this.ele.offsetWidth;
      let boxH = this.ele.offsetHeight;
      let minL = 0;
      let minT = 0;
      let maxL = winW - boxW;
      let maxT = winH - boxH;
      curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
      curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
      
      $(this.ele).css({
        'left':curL,
        'top': curT
      });
    }
    up(){
      $(document).off('mousemove',this._MOVE);
      $(document).off('mouseup',this._UP);
    }
  }

  window.Drag = Drag;
}(jQuery);

/**
 * ele 是当前要实现拖拽的元素
 */
// new Drag(ele,{
//   selector: 'h3'//=>selector 当前需要操作的目标元素选择器（按住它实现让ele移动，不传就是默认按住ele移动）
// });