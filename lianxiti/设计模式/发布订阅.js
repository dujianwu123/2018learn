~function anonymous(window){
  class Subscribe{
    constructor (){
      //->创建一个容器
      //->每一个实例都有一个自己独有的容器，管理自己需要执行的方法即可
      this.pond = [] ;
    }
    add (fn){
      let pond = this.pond
      pond.includes(fn) ? null : pond.push(fn);
    }
    fire (...arg){
      let pond = this.pond;
      for(let i = 0;i<pond.length;i++){
        let item = pond[i];
        if(item===null){
          pond.splice(i,1);
          i --;
          continue;
        }
        item(...arg);
      }
    }
    remove (fn){
      let pond = this.pond;
      pond.forEach((item,index)=>{
          if(item === fn){
            pond[index] = null;
          }
      });
    }
  }


  window.Subscribe = Subscribe;
}(global);



let fn1 = function (x,y){
  console.log(1,x,y);
}
let fn2 = function (){
  console.log(2);
  subscribe.remove(fn3);
}
let fn3 = function (){
  console.log(3);
}
let fn4 = function (){
  console.log(4);
}
let subscribe = new Subscribe();
subscribe.add(fn1);
subscribe.add(fn2);
subscribe.add(fn1);
subscribe.add(fn1);
subscribe.add(fn3);
subscribe.add(fn4);

subscribe.fire(100,200);

