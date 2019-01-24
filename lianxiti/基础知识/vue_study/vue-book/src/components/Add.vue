<template>
  <div>
    <MHeader>添加</MHeader>
    <ul>
      <li>
        <label for="bookName">书的名称</label>
        <input type="text" v-model="book.bookName" id="bookName">
      </li>
      <li>
        <label for="bookInfo">书的信息</label>
        <input type="text" v-model="book.bookInfo" id="bookInfo">
      </li>
      <li>
        <label for="bookPrice">书的价格</label>
        <input type="text" v-model.number="book.bookPrice" id="bookPrice">
      </li>
      <li>
        <label for="bookCover">书的封面</label>
        <input type="text" v-model="book.bookCover" id="bookCover">
      </li>
      <li>
        <button @click="add">添加</button>
      </li>
    </ul>
  </div>
</template>

<script>
import MHeader from "../base/MHeader.vue";
import {addBook} from '../api/index.js';
export default {
  data() {
    return {book:{}};
  },
  components: {
    MHeader
  },
  methods:{
    async add(){
        await addBook(this.book);
        this.$router.push('/list');
    }
  }
};
</script>

<style scoped lang="less">
ul {
  margin: 50px 10px 0 10px;
  li {
    labei {
      display: block;
      font-size: 25px;
    }
    input {
      margin: 10px 0;
      height: 25px;
      width: 100%;
    }
    button {
      display: block;
      width: 80px;
      height: 35px;
      background: #2aabd2;
      color: #fff;
      border: none;
      border-radius: 4px;
      outline: none;
    }
  }
}
</style>