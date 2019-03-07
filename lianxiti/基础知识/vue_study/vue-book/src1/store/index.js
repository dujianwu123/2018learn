import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger'; //是一个vuex的日志插件
import mutations from './mutatios.js';
Vue.use(Vuex);
const state = {
  count:0
};
const getters = {
  val:(state)=>{
    return state.count % 2 ? '奇数' : '偶数';
  }
};
export default new Vuex.Store({ //容器是唯一的
  state ,
  mutations,
  getters,
  plugins:[logger()],
  strict:true  //只能通过mutation(管理员)来更改状态，mutation不支持异步
});