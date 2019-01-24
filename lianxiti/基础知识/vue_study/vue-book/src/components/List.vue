<template>
  <div>
    <mheader>列表页</mheader>
    <div class="content">
      <ul>
        <router-link 
          v-for="(book,index) in books" 
          :to="{name:'detail',params:{bid:book.bookId}}" 
          :key="index"
          tag="li"
          >
          <img :src="book.bookCover">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <button @click.stop="remove(book.bookId)">删除</button>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { getBooks, removeBook } from "../api/index.js";
import mheader from "../base/MHeader.vue";
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      books: []
    };
  },
  components: {
    mheader
  },
  methods: {
    async getData() {
      this.books = await getBooks();
    },
    async remove(id) {
      await removeBook(id);//删除某一项 后台
      //删除前台
      this.books = this.books.filter(item=>item.bookId!==id);
    }
  }
};
</script>

<style scoped lang="less">
.content {
  h4 {
    font-size: 20px;
    line-height: 35px;
  }
  ul {
    padding: 10px;
    li {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #f1f1f1;
      img {
        width: 130px;
        height: 150px;
      }
    }
  }
  p {
    color: #2a2a2a;
    line-height: 25px;
  }
  b {
    color: red;
  }
  button {
    display: block;
    width: 60px;
    height: 25px;
    background: orangered;
    color: #fff;
    border: none;
    border-radius: 15px;
    outline: none;
  }
}
</style>
