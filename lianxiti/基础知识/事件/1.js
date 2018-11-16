box.onclick = function(ev){
  //在IE低版本浏览器中，浏览器执行绑定的方法，并没有把事件对象传递进来，此时ev===undefiend,
  //需要基于window.event来获取（由于是全局属性，鼠标每次操作都会把上一次操作的值替换掉）
  if(!ev){//兼容低版本中没有的属性，手动设置下，后期在使用的时候，直接安高本版的使用就可以了
    ev = window.event;
    ev.target = ev.srcElement;
    // console.log(ev.srcElement);//标准浏览器使用的是ev.target
    // console.log(ev.pageX);//低版本浏览器的事件对象中不存在pageX/pageY
    ev.pageX = ev.clientX + (document.documentElement.scrollLeft||document.body.scrollLeft);
    ev.pageY = ev.clientY + (document.documentElement.scrollTop||document.body.scrollTop);
    ev.which = ev.keyCode;
    ev.preventDefault = function(){
      ev.returnValue = false;//低版本阻止默认行为
    };
    ev.stopPropagation = function(){
      ev.cancelBubble = true;//低版本阻止冒泡传播
    }
  }

  console.log(ev.target);
}
//或
/**
 * ev = ev || window.event;
 * var target = ev.target||ev.srcElement;
 * ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
 */