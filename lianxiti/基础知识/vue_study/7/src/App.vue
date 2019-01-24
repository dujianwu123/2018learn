<template>
  <div>
      {{msg}}
      <!-- <router-view></router-view> -->
      <button @click="show">notify</button>
      <!-- <aaa></aaa> -->
  </div>
</template>
<script>
  export default {
    data(){
      return {
        msg:"ss"
      };
    },
    methods:{
      show(){
        // this.$notify('哈哈哈',{delay:1000});
      }
    }
  };
</script>
<style scoped>

</style>
