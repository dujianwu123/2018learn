// 事务 开始的时候 做某件事 结束的时候在做某件事
const perform = (anymethod, warppers) => {
  warppers.forEach(item=>{
    item.initilizae()
  });
  anymethod();
  warppers.forEach(item=>{
    item.close()
  });
}
perform(() => {
  console.log('说话');
},[
  {
    // warpper
    initilizae () {
      console.log('开始');
    },
    close () {
      console.log('再见');
    }
  },
  {
    //warpper
    initilizae() {
      console.log('开始1');
    },
    close() {
      console.log('再见2');
    }
  }
])