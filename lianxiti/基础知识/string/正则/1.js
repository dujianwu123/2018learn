// let reg = /^[.]+$/;
// console.log(reg.test('n'));//false
// console.log(reg.test('...'));//true


// let reg =/\d+/;//不加^和$代表字符串中只要包含xxx即可


// let reg =/^[12-65]$/;//这个正则的意思是，1或者2或者6或者5
// console.log(reg.test('6'));


//年龄 18-65之间
/**
 * 18-19   1[8|9]
 * 20-59   [2-5][0-9]
 * 60-65   6[0-5]
 */
// let reg = /^(1[8|9])|([2-5][0-9])|(6[0-5])$/;



// let reg = /^([a-z])([a-z])\2\1$/;//正则中出现的\1代表和第一个分组一模一样的内容
// console.log(reg.test('oppo'));
// console.log(reg.test('poop'));

//有效数字
// let reg = /^[+=]?(\d|([1-9]\d+))(\.\d+)?$/;

//中文姓名
// let reg = /^[\u4E00-\u9FA5]{2,}(·[\u4E00-\u9FA5]{2,})?$/;

//邮箱
// let reg =/^\w+([-.]\w+)*@[A-Za-z0-9]+([-.][A-Za-z0-9]+)*(\.[A-Za-z0-9]+)$/;


//自己写exec方法
// RegExp.prototype.myExecAll = function (str){

//   if(!this.global){//为了防止死循环，判断是否加g，没有加g只把第一次捕获的结果返回即可
//     return this.exec(str);
//   }

//   let result = [];
//   let valAry = this.exec(str);
//   while(valAry){
//     result.push(valAry[0]);
//     valAry = this.exec(str);
//   }
//   return result;
// }

// console.log(reg.myExecAll(str));


let str = '2018/10/10 11:11:12';
let ary = str.split(/?:\/| |:/g);//?:  只匹配不捕获