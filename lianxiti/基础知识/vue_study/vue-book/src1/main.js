// document.body.innerHTML = 'hahaha';
/**
 * vuex 
 * 平级组件交互，找共同的父级解决，跨组件交互，eventBus混乱（发布订阅）
 * vuex 主要借鉴了 （flux redux）,vuex只能在vue中使用（单独为vue开发的）
 * vuex 为了大型项目，主要是（状态）管理，状态就是数据，将数据统一管理 
 **/

import Vue from 'vue';
import App from './App.vue';
import store from './store';

//计数器
new Vue({
  el: '#app',
  ...App,
  store //store 被注册到了实例上所有组件都会有一个属性 this.$store
});
