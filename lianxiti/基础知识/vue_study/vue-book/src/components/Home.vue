<template>
  <div>
    <mheader>首页</mheader>
    <div class="content">
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
    </div>
  </div>
</template>

<script>
import mheader from "../base/MHeader.vue";
import swiper from "../base/Swiper.vue";
import { getSliders, getHotBook } from "../api/index.js";
export default {
  created() {
    this.getSlidersData(); //获取轮播图数据
    this.getHotBookData(); //获取热门图书
  },
  data() {
    return {
      sliders: [],
      hotBooks: []
    };
  },
  methods: {
    async getSlidersData() {
      this.sliders = await getSliders();
    },
    async getHotBookData() {
      this.hotBooks = await getHotBook();
    }
  },
  components: {
    mheader,
    swiper
  }
};
</script>

<style scoped lang="less">
.container {
  width: 90%;
  margin: 0 auto;
  h3{
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
      img{
        width: 100%;
      }
    }
  }
}
</style>