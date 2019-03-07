import * as Types from './mutations.type.js';
const mutations = {
  [Types.INCRENENT](state,count){ //state 是自动放入的，默认指的就是当前的state
    state.count+=count;
  },
  [Types.DECRENENT](state){
    state.count -= 1;
  }
};
export default mutations;