// {
//   /**
//    * 修饰器
//    * 1.修饰器是一个函数
//    * 2.修改类的行为，下面的@readonly 把 time的属性改成了只读
//    * 3.修饰器是在类的范畴里用的
//    **/
//   let readonly = function (target, name, descriptor) {
//     descriptor.writable = false;
//     return descriptor;
//   }
//   class Test {
//     @readonly
//     time() {
//       return '11111'
//     }
//   }

//   let test = new Test();
//   test.tim = function () {
//     console.log('reset time');
//   };

//   console.log(test.time());
// }
// {
//   //类的修饰
//   let typename = function(target, name, descriptor){
//     target.myname = 'hello';
//   }
//   @typename
//   class Test{

//   }
//   console.log('类的修饰',Test.myname);
// }

// //有个第三方库支持修饰器
// //core-decorators 