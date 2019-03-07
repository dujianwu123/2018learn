import Vue from 'vue'
import Router from 'vue-router'

// import Home from '../components/Home.vue'
// import List from '../components/List.vue'
// import Add from '../components/Add.vue'
// import Detail from '../components/Detail.vue'
// import Collect from '../components/Collect.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',//打包后的路径可以不用写#/,如 #/home --> /home
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      // component: Home,
      component: () => import('../components/Home.vue'),
      meta: { keepAlive: true,title:'首页' }
    },
    {
      path: '/list',
      // component: List
      component: () => import('../components/List.vue'),
      meta: { title:'列表页' }
    },
    {
      path: '/add',
      // component: Add
      component: () => import('../components/Add.vue'),
      meta: { title:'添加' }
    },
    {
      path: '/detail/:bid',
      // component: Detail,
      component: () => import('../components/Detail.vue'),
      name: 'detail',
      meta: { title:'修改' }
    },
    {
      path: '/collect',
      component: () => import('../components/Collect.vue'),
      meta: { title:'购物车' }
    },
    { path: '*', redirect: '/home' }
  ]
})
