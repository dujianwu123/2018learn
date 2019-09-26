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
// function object (o) {
//   function f (){}
//   f.prototype = o;
//   return new f();
// }
// function inheritPrototype (superType, subType) {
//   let prototype = object(superType.prototype);
//   prototype.constructor = subType;
//   subType.prototype = prototype;
// }
// inheritPrototype(SuperType, SubType);

function object (o) {
  function f () {}
  f.prototype = o;
  return new f();
}
function inheritPrototype (superType, subType) {
  let prototype = object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}
inheritPrototype (SuperType, SubType)
SubType.prototype.ddd = function(){};
let son = new SubType('djw', 18);
son.arg.push(4);
son.getName();
son.getArg();


let son2 = new SubType('djw2', 19);
son2.getName();
son2.getArg();