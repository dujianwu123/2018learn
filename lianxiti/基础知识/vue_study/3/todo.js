let vm = new Vue({
  el: '#app',
  data: {
    todos: [
      { isSelected: false, title: '睡觉' },
      { isSelected: true, title: '吃饭' }
    ],
    title: '',
    cur: '',
    hash:''
  },
  methods: {
    add() {
      this.todos.push({
        isSelected: false,
        title: this.title
      });
      this.title = '';
    },
    del(obj) {
      this.todos = this.todos.filter(item => item != obj);
    },
    remember(obj) {
      this.cur = obj;
    },
    cancel() {
      this.cur = '';
    }
  },
  computed: {
    count() {
      return this.todos.filter(item => !item.isSelected).length;
    },
    filterTodos(){
      if(this.hash==='all') return this.todos;
      if(this.hash==='finish') return this.todos.filter(item=>item.isSelected);
      if(this.hash==='unfinish') return this.todos.filter(item=>!item.isSelected);
    }
  },
  directives: {
    focusAa(el, bindings) {
      // console.log(arguments);
      // 当点击当前li时让内部的输入框获取焦点
      if (bindings.value) {
        el.focus();
      }
    }
  },
  created() {//ajax 获取 初始化数据
    //如果localStorage中有数据  就用有的 没有数据就用默认的
    this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;

    //监控hash值的变化，如果页面以及有hash了 重新刷新页面也要获取hash值
    this.hash = window.location.hash.slice(2) || 'all';
    window.addEventListener('hashchange',()=>{
      let ss = window.location.hash.slice(2);
      // alert(window.location.hash.slice(2));
      //当hash值变化，重新操作记录的数据
      vm.hash = ss;
    },false);
  },
  watch: {
    todos: {//watch 默认只监控一层的数据变化(如对象内的变化不会被触发，对象的索引变化了会被触发)，深度监控
      handler() {//默认写成函数 就相当于默认写了handler
        //localStorage 默认存的是字符串
        localStorage.setItem('data', JSON.stringify(this.todos));
      },
      deep: true
    }
  }
});

//1、将数据循环到页面上 
//2、敲回车时添加新数据（需要输入isSelected属性）
//3、删除功能
//4、计算一下当前没有被选中的数量