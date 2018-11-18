let Fn = function () {
  return new Fn.prototype.init(); //创建init实例
}
Fn.prototype.init =function(){};
Fn.prototype.init.prototype = Fn.prototype;
let f = Fn(); //-->目的：不加NEW也能创建FN的实例