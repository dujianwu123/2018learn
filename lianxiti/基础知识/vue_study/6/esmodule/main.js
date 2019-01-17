/**
 * 如果是第三方模块不需要加./
 * 如果是文件模块需要加./
 * 在另一个文件中将内容解构出来即可使用
 */
//import 拥有预解释功能
// console.log(str);

//import 放到页面的顶部
// import {str,str2,a,b} from  './a.js';
// console.log(str,str2);
// a();
// b();
//* 把a中的所有的都导出来,放到obj的对象里,用的时候,obj.key就可以
import * as obj from './a.js';
console.log(obj.str);
obj.a();

import djw from './b.js';
console.log(djw);
console.log(djw.a,djw.b);