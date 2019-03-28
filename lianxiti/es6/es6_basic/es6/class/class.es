//ES5
// function Person (name,age){
//   console.log(new.target);//ES6新增加的语法，如果是通过new执行的，返回的结果是当前创建的类
//   //如果是当前普通函数执行的，返回的是undefined

//   if(typeof new.target === 'undefined'){
//     throw new SyntaxError('当前Person不能作为一个普通函数执行，请使用new Person来执行~~');
//   }
//   this.name = name;
//   this.age = age;
// }
// Person.prototype = {
//   constructor: Person,
//   say: function (){}
// }
// Person.study = function (){};//静态方法

// class Person {
//   //自带new target判断，class必须是new Person
//   constructor (name = "djw" , age = 9){
//     this.name = name;
//     this.age = age;
//   }
//   say(){

//   }
//   static syudy (){

//   }
// }


/**
 * 
 * @param name 
 * ES5 类的继承
 */
function A(name) {
  this.name = name;
}
A.prototype = {
  constructor: A,
  Myname() {
    console.log(this.name);
  }
}

function objectCopyCreate(obj) {
  let f = function f() { };
  f.prototype = obj;
  return new f;
}

function B(name, age) {
  A.call(this, name);
  this.age = age;
}
B.prototype = objectCopyCreate(A.prototype);
B.prototype.constructor = B;
B.prototype.Myname = function () {
  console.log(this.name, this.age);
}
let oA = new A('diw');
let oB = new B('LLX', 11);

oA.Myname();
oB.Myname();


/**
 * ES6  类的继承
 */

class Parent {
  constructor(...arg) {
    let [x = 0, y = 0] = arg;
    this.x = x;
    this.y = y;
  }
  sum() {
    return this.x + this.y;
  }
}

class Child extends Parent {
  // constructor(x = 0, y = 0, z = 0) {
  //   super(x,y);
  //   this.z = z;
  // }
  constructor (...arg){
    super(...arg);
    let [,,z] = arg;
    this.z = z;
  }
  sum1(){
    return this.x + this.y + this.z;
  }
}

let c = new Child(1,2,3);
console.log(c.sum1());

let p = new Child(1,2);
console.log(c.sum());


