function SuperType (name) {
  this.name = name;
  this.arg = [1,2,3]
}

SuperType.prototype.getName = function () {
  console.log(this.name);
}
SuperType.prototype.getArg = function () {
  console.log(this.arg);
}
function SubType (name,age) {
  SuperType.call(this,name);
  this.age = age;
}
function object(o){
  function f (){}
  f.prototype = o;
  return new f();
}
SubType.prototype = object(SuperType.prototype);
SubType.prototype.constructor = SubType;