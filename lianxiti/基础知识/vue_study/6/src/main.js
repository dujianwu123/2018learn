let str = require('./a.js');
// import {xxx} from  './b.js';
import xxx from  './b.js';
console.log(str);
console.log(xxx);

let obj = {a:1};
let obj1 = {b:2};
let newObj = {...obj,...obj1};//es7 语法
console.log(newObj);

// import './index.css';
import './style.less';

//在js中引入图片需要import ，或者写一个线上路径http://www.xxxx.xx.jpg
import page from './1.jpg';
console.log(page);//page 就是打包后图片的路径
let img = new Image();
img.src = page;
 document.body.appendChild(img);