console.log(num);
console.log(fn);//在新版本浏览器 条件里的预解释，函数只声明不定义
if (1 === 1) {
  //进入条件体中，第一件事就是对预解释中，声明的函数定义
  var num = 12;
  function fn() {
    
  }
}

