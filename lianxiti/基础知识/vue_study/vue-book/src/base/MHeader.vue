<template>
  <div class="mheader">
    <!-- 用插槽能获取用这个插件的字 -->
    <slot></slot>
    <i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i>
  </div>
</template>

<script>
  export default {
    props:{
      back:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped lang="less">
  .mheader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #afd9ee;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    i{
      position: absolute;
      left: 10px;
      font-size: 20px;
    }
  }
</style>