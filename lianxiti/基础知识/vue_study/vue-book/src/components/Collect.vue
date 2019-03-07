<template>
  <div>
    <mheader>购物车</mheader>
    <ul class="content">
      <li v-for="l in cartList" :key="l.bookId">
        <img v-lazy="l.bookCover" alt="">
        <h3>{{l.bookName}}</h3>
        <button>-</button>{{l.bookCount}}<button>+</button>
        <p>小计 {{l.bookPrice*l.bookCount}}</p>
        <button>删除</button>
      </li>

      <!-- <li>合计选中{{$store.getters.count}}  这么取麻烦可以简写mapGetters   本数</li> -->
      <li>合计选中{{count}} 本书</li>
    </ul>
  </div>
</template>

<script>
import mheader from "../base/MHeader.vue";
import * as Types from "../store/mutations-type";
import { mapState,mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    mheader
  },
  computed: {
    ...mapGetters(['count']),
    ...mapState(['cartList']) //等价与下面 这是默认写法
    // ...mapState({ carts: "cartList" })//改名

    // cartList(){
    //   return this.$store.state.cartList;
    // }
  }
};
</script>

<style scoped>
</style>