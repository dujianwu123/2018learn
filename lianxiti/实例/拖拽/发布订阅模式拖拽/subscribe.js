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
}(window);





