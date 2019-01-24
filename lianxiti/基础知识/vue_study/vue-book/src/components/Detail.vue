<template>
  <div class="detail">
    <MHeader :back="true">详情页</MHeader>
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
        <button @click="update">确认修改</button>
      </li>
    </ul>
  </div>
</template>

<script>
import MHeader from "../base/MHeader.vue";
import { findOneBook, updateBook } from "../api/index.js";
export default {
  data() {
    return { book: {} };
  },
  watch: {
    $route() {
      //只要路径变化  重新获取数据
      this.findOneBookData();
    }
  },
  created() {
    this.findOneBookData();
  },
  computed: {
    bid() {
      return this.$route.params.bid; //将路径参数的id映射到bid上
    }
  },
  methods: {
    async findOneBookData() {
      this.book = await findOneBook(this.bid);
      //如果是空对象需要跳转回列表页
      Object.keys(this.book).length > 0 ? null : this.$router.push("/list");
    },
    async update() {//点击修改图书信息
      await updateBook(this.bid,this.book);
      this.$router.push('/list');
    }
  },
  components: {
    MHeader
  }
};
</script>

<style scoped lang="less">
.detail {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  z-index: 100;
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
}
</style>