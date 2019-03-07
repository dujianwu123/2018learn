<template>
  <div>
    计算器 <button @click="add">+</button><br>
    当前:{{$store.state.count}}<br>
    计算器 <button @click="minus">-</button>
    {{$store.getters.val}}
  </div>
</template>

<script>
  import * as Types from '../store/mutations.type.js';
  export default {
    data () {
      return {
      }
    },
    methods:{
      add(){
        //提交add的mutation
        //载荷payload
        this.$store.commit(Types.INCRENENT,2);
      },
      minus(){
        this.$store.commit(Types.DECRENENT);
      }
    }
  }
</script>

<style scoped>

</style>