let str = '哦阿瑟东one哦阿瑟东 asd按时的技术 name age size girl';

// let reg = new RegExp('[a-zA-Z]+',"g");
// console.log(str.match(reg));

// let reg = /([a-zA-Z]+)([\u4e00-\u9fa5]+)/g;
let reg =/(?:(?:([a-zA-Z]+)([\u4e00-\u9fa5]+))|(?:([\u4e00-\u9fa5]+)([a-zA-Z]+)))/g;
str = str.replace(reg,function(...arg){
  console.log(arg);
  let [,val1,val2] = arg;
  console.log(val1,val2);
  return ` ${val1} ${val2}`;
});
console.log(str);


//=>扩展：把一个英文段落中，每一个单词首字母大写
let str = 'the-man is practice is to cultivate his body and cultivate his virtues. Not indifferent to clear ambition, non tranquil and far away. If we need to study quietly, we must learn and learn. Prostitution is not able to help, and impatience can not be smelt. When the year goes with the time, the meaning goes with the sun, and then it becomes dry and withered.';
let reg = /(?:^| )([^\s]+)(?: |$)/g;
str = str.replace(/ /g, '  ').replace(reg, (...arg) => {
  console.log(arg);
    return arg[1].substr(0, 1).toUpperCase() + arg[1].substr(1) + ' ';
});
console.log(str);
