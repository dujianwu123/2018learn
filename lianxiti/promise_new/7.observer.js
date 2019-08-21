class Subject { // 被观察者 里存入观察者
  constructor() {
    this.arr = [];
    this.state = '我很开心'
  }
  attch(obj) {
    this.arr.push(obj);
  }
  setState(newState){// 被观察者状态发生改变，会触发观察者
    this.setState = newState;
    this.arr.forEach((item)=>{
      item.update(newState)
    })
  }
}
class Observer { // 观察者
  constructor(name) {
    this.name = name;
  }
  update(newState) {
    console.log(this.name + ',小宝宝:' + newState);
  }
}
let s = new Subject('小宝宝');
let o1 = new Observer('我');
let o2 = new Observer('我媳妇');
s.attch(o1);
s.attch(o2);
s.setState('不开心了')