import * as Types from './mutations-type';

const mutations = {
  [Types.ADD_CART](state,book){
      let product = state.cartList.find(item=>item.bookId===book.bookId);
      if(product){
        product.bookCount += 1; //还要更新掉原数组，否则不会刷新
        state.cartList = [...state.cartList];
      }else{
        book.bookCount = 1;
        state.cartList = [...state.cartList,book];
      }
    }
};
export default mutations;
