<template>
  <div>
    <mheader>列表页</mheader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <ul>
        <router-link
          v-for="(book,index) in books"
          :to="{name:'detail',params:{bid:book.bookId}}"
          :key="index"
          tag="li"
        >
          <!-- <img :src="book.bookCover"> -->
          <!-- 懒加载 -->
          <img v-lazy="book.bookCover">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <button @click.stop="remove(book.bookId)">删除</button>
          </div>
        </router-link>
      </ul>
      <div @click="more" class="more">加载更多</div>
    </div>
  </div>
</template>

<script>
import { getBooks, removeBook, pagination } from "../api/index.js";
import mheader from "../base/MHeader.vue";
export default {
  created() {
    this.getData();
  },
  mounted() {
    let scroll = this.$refs.scroll; //获取到要拖拽的元素
    let top = scroll.offsetTop;
    let distance = 0;
    scroll.addEventListener(
      "touchstart",
      e => {
        //滚动条在最顶端时  并且当前盒子在顶端时候 才继续走
        if (scroll.scrollTop != 0 || scroll.offsetTop != top) return;
        let start = e.touches[0].pageY; //手指点击的开始
        let move = e => {
          let current = e.touches[0].pageY;
          distance = current - start; //求的拉动的距离  负的就不要了
          if (distance > 0) {
            if (distance <= 50) {
              scroll.style.top = distance + top + "px";
            } else {
              distance = 50;
              scroll.style.top = 50 + top + "px";
            }
          } else {
            // 如果不在考虑范围内  移除掉move 和 end事件
            scroll.removeEventListener("touchmove", move);
            scroll.removeEventListener("touchend", end);
          }
        };
        let end = e => {
          clearInterval(this.timer1);
          this.timer1 = setInterval(() => {
            if (distance <= 0) {
              clearInterval(this.timer1);
              distance = 0;
              scroll.style.top = top + "px";
              
              scroll.removeEventListener("touchmove", move);
              scroll.removeEventListener("touchend", end);

              this.books = [];
              this.offset = 0;
              this.getData();
              return ;
            }
            distance -= 1;
            scroll.style.top = top + distance + "px";
          }, 1);
        };
        scroll.addEventListener("touchmove", move, false);
        scroll.addEventListener("touchend", end, false);
      },
      false
    );
  },
  data() {
    return {
      books: [],
      offset: 0,
      hasMore: true,
      isLoading: false //默认是没在加载
    };
  },
  components: {
    mheader
  },
  methods: {
    async getData() {
      //没有分页的
      // this.books = await getBooks();

      //有分页的
      if (this.hasMore && !this.isLoading) {
        this.isLoading = true;
        let { hasMore, books } = await pagination(this.offset);
        this.books = [...this.books, ...books]; // 获取的书放到books属性上
        this.hasMore = hasMore;
        this.offset = this.books.length; //维护偏移量  就是总书的长度
        this.isLoading = false; //加载完毕
      }
    },
    async remove(id) {
      await removeBook(id); //删除某一项 后台
      //删除前台
      this.books = this.books.filter(item => item.bookId !== id);
    },
    more() {
      this.getData();
    },
    loadMore() {
      /**
       * scrollTop      元素卷去的高度
       * clientHeight   元素可见的高度
       * scrollHeight   元素真实高度（总高度）
       */

      //触发scroll事件，可能触发n次，先进来开一个定时器，下次触发时将上一次定时器清除掉
      clearTimeout(this.timer); //防抖
      this.timer = setTimeout(() => {
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.more(); //获取更多
        }
      }, 60);
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
        width: 130px !important; 
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
  .more {
    margin: 10px;
    background: #2afedd;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
  }
}
</style>
