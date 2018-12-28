//a.js
var a="boy";
var b=function(value){
　　console.log(value)
}
export {a,b};

//b.js
import {a,b} from './a.js'