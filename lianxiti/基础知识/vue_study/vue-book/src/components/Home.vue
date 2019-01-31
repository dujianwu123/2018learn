<template>
  <div>
    <mheader>首页</mheader>
    <div class="content">
      <Loading v-if="loading"></Loading>
      <template v-else>
        <swiper :swiperSlides="sliders"></swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="(hot,index) in hotBooks" :key="index">
              <img :src="hot.bookCover">
              <b>{{hot.bookName}}</b>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import mheader from "../base/MHeader.vue";
import swiper from "../base/Swiper.vue";
import { getSliders, getHotBook, getAll } from "../api/index.js";
import Loading from '../base/Loading.vue';
export default {
  created() {
    // this.getSlidersData(); //获取轮播图数据
    // this.getHotBookData(); //获取热门图书
    this.getData();
  },
  data() {
    return {
      sliders: [],
      hotBooks: [],
      loading: true
    };
  },
  methods: {
    async getSlidersData() {
      this.sliders = await getSliders();
    },
    async getHotBookData() {
      this.hotBooks = await getHotBook();
    },
    async getData() {
      let [sliders, hotBooks] = await getAll();
      this.hotBooks = hotBooks;
      this.sliders = sliders;
      //...轮播图和热门图书已经获取完成
      this.loading = false;
    }
  },
  components: {
    mheader,
    swiper,
    Loading
  }
};
</script>

<style scoped lang="less">
.container {
  width: 90%;
  margin: 0 auto;
  h3 {
    color: #999;
    padding: 5px 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap; /*默认不换行*/
    padding-bottom: 10px;
    li {
      width: 50%;
      text-align: center;
      margin: 5px 0;
      img {
        width: 100%;
      }
    }
  }
}
</style>