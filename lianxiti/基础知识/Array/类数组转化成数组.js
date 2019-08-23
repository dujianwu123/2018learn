// 将类数组转化成数组
// 类数组的定义  1.索引 2.长度
function add () {
  // console.log([...arguments]);

  // ... for of 必须要给当前对象 提供一个生成器方法
  // console.log([...{0:1,1:2,length:2,[Symbol.iterator](){
  //   let len = this.length;
  //   let index = 0;
  //   // 迭代器 是有next方法 而且方法执行后 需要返回 value,done  
  //   return {
  //       next: () => {
  //         return { value: this[index++], done: index === len + 1};
  //       }
  //     }
  //   }}
  // ])

  console.log([...{0:1,1:2,length:2,[Symbol.iterator]: function *(){
      let index = 0;
      while (index !== this.length) {
        yield this[index++]
      }
    }}
  ])
}
add(1, 2, 3, 4, 5);