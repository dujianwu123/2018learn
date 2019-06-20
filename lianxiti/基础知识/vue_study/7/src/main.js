import Vue from  'vue';//runtime 不支持模板，只支持render
import App from  './App.vue';
import router from './router/index.js';
import notify from  './plugin/notify.js';
Vue.use(notify,{delay:2000});
new Vue({
  router,
  el:"#app",
  render:function(h){
    return h(App);
  }
});