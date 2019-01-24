<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
      <img :src="slide" alt>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  name: "carousel",
  props: ["swiperSlides"],
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        },
        observeParents: true
      }
    };
  }
};
</script>
<style scoped lang="less">
img {
  width: 100%;
  display: block;
}
</style>