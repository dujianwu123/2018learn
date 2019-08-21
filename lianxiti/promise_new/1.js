// 函数的before
// 希望将核心的逻辑提取出来，在外面在增加功能
// 重写原型上的方法
// 不会原型

// js的核心 是回调
Function.prototype.before = function (beforeFn) {
  return (...args) => { // 箭头函数中没有this指向，没有arguments 所以会像上级作用域查找
    beforeFn();
    this(...args); // 展开运算符 say(1,2,3)
  }
}

// AOP 切片 装饰
const say = (...args) => {
  console.log('说话', args);
}
const newSay = say.before(() => {
  console.log('您好');
});
const newSay1 = say.before(() => {
  console.log('天气很好');
})
newSay(1,2,3);
newSay1();