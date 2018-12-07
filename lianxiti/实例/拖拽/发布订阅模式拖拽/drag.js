~function anonymous (){
  console.log(11111);
  if (typeof Subscribe === 'undefined') {
    throw new ReferenceError('随便写!');
}

  class Drag extends Subscribe {
      constructor (ele){
        super();
        //this => DRAG 实例
        //this.pond = []; add remove fire
        this.ele =ele;
        // ['disX','disY','curT','curL'].forEach((item,index)=>{
        //     this[item] = null;
        // });

        this.subDown = new Subscribe;
        this.subMove = new Subscribe;

        this.DOWN = this.down.bind(this);
        this.ele.addEventListener('mousedown', this.DOWN);
      }
      down(ev){
        let ele = this.ele;
        this.disX = ev.clientX - ele.offsetLeft;//这块获取的应该是css的样式值
        this.disY = ev.clientY - ele.offsetTop;

        this.MOVE = this.move.bind(this);
        this.UP = this.up.bind(this);
        document.addEventListener('mousemove', this.MOVE, false);
        document.addEventListener('mouseup', this.UP, false);
        this.subDown.fire(ele, ev);
        return false;
      }
      move(ev){
        let ele = this.ele;
        this.curL = ev.clientX - this.disX;
        this.curT = ev.clientY - this.disY;
  
        let maxL = document.documentElement.clientWidth - ele.offsetWidth;
        let minL = 0;
        let maxT = document.documentElement.clientHeight - ele.offsetHeight;
        let minT = 0;
        this.curL = this.curL < minL ? minL : (this.curL > maxL ? maxL : this.curL);
        this.curT = this.curT < minT ? minT : (this.curT > maxT ? maxT : this.curT);
  
        ele.style.left = this.curL + "px";
        ele.style.top = this.curT + "px";
        this.subMove.fire(ele, ev);
      }
      up(ev){
        document.removeEventListener('mousemove', this.MOVE, false);
        document.removeEventListener('mouseup', this.UP, false);

        this.fire(this.ele, ev);//继承方式的好处，子类的实例可以直接调取父类的方法，也继承了
        //父类实例的一些私有属性，用的时候没必要在单独创建父类的实例来搞了，直接基于子类的实例即可
      }
  }

  window.Drag = Drag;
}();