//es6 module
import {a,sum} from './sum.js';
console.log('sum',sum(10,20));
//commonJS
let minus = require('./minus');
console.log('minus',minus(1,2));
//