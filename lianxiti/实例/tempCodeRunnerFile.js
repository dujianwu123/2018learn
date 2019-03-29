let str = 'the-man is practice is to cultivate his body and cultivate his virtues. Not indifferent to clear ambition, non tranquil and far away. If we need to study quietly, we must learn and learn. Prostitution is not able to help, and impatience can not be smelt. When the year goes with the time, the meaning goes with the sun, and then it becomes dry and withered.';
let reg = /(?:^| )([^\s]+)(?: |$)/g;
str = str.replace(/ /g, '  ').replace(reg, (...arg) => {
  console.log(arg);
    return arg[1].substr(0, 1).toUpperCase() + arg[1].substr(1) + ' ';
});
console.log(str);