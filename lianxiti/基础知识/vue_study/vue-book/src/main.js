// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// swiper
//打入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
//使用轮播图
Vue.use(VueAwesomeSwiper)
// swiper
// 图片懒加载
let path = require('path');
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=396805210,4266088262&fm=27&gp=0.jpg',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548875654366&di=418ec8d3ac78d5512df001b8d0783648&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201503%2F26%2F20150326075021_uFfLC.thumb.700_0.gif',
  attempt: 1
})
// 图片懒加载
// console.log(path.resolve('5-121204193948.gif'));
/* eslint-disable no-new */

//在进入路由之前  每一项都会执行次方法，全局钩子，拦截功能
router.beforeEach(function(to,from,next){
  document.title = to.meta.title;
  next();

  // if(to.path === '/list'){
  //     next({path:'/add'});//拦截所有列表页，跳转到添加页
  // }else{
  //   next();
  // }
});

import store from './store';
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
