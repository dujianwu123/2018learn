// import Vue from 'vue/dist/vue.js';
import Vue from 'vue';
//这样直接引用vue  引用的并不是vue.js  引用的是vue的runtime
//vue = compiler + runtime (compiler 可以编译模板)
//compiler 有6k
//如果 引入是vue 那么就没有compiler 那么就用render ，就不能用template
import App from  './App.vue';
console.log(App);

new Vue({
  // el:'#app'
  // template:'<div>hellow</div>'
  //render 函数的作用是将虚拟DOM渲染成真实的dom
  //createElement 返回的是虚拟的dom
  //但是用render太麻烦了，写法过于复杂 所以就出现了 App.vue   .vue文件就是一个组件，可以理解为是一个对象
  
  // render:function (createElement){
  //   return createElement('h1',[
  //     'hello',
  //     createElement('span','一则头条')
  //   ]);
  // }

  // render:function(creEle){
  //   return creEle(App);
  // }
  render:(h)=>h(App)//简写
}).$mount('#app');