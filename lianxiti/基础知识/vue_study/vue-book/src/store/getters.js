const getters = {
  count: (state) => {
    return state.cartList.reduce(function (prev, next) {
      return prev + next.bookCount;
    }, 0);
  }
};
export default getters;