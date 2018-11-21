/**
 * promise :目的是为了管理JS中的异步编程的，所以我们也把它称为“Promise设计模式”
 */
// let p = new Promise();
// p.then();


/**
 * 三个状态  pending(准备:初始化成功，开始执行异步的任务)/fulfilled（成功）/rejected（失败）
 * 
 * 
 * 
 */
new Promise(()=>{
  /**
   * 执行一个异步的任务（new Promise的时候，创建Promise的一个实例，立即会把当前
   * 函数体中异步操作执行）Promise本身是同步的，它可以管理异步操作
   */
  setTimeout(() => {

  }, 1000);
  console.log(1); //先输出1
});
console.log(2);//在输出2


new Promise((resolve,reject)=>{
  /**
   * resolve:当异步操作执行成功，执行resolve方法
   * reject: 当异步操作执行失败，执行reject方法
   */
  setTimeout(() => {
    resolve(100);
  }, 1000);
}).then((res)=>{
  console.log('ok',res);
},()=>{
  console.log('no');
});
/**
 * then 就是继续做什么事
 * then 有两个函数
 * 第一个传递的函数是resolve
 * 第二个传递的函数是reject
 */

 let val = null;
 let xhr = new XMLHttpRequest();
 xhr.open('get','./js/data.js',true);
 xhr.onreadystatechange = () => {
   if(xhr.readyState === 4 && xhr.status === 200){
      val = shr.responseText;
      //此处是获取结果，获取结果后还要做很多的事情，（此时我们只能把数据绑定等任务写在这里）

   }
 }
 xhr.send(null);
 console.log(val);//如果使用异步AJAX请求，不等AJAX彻底完成，就把val输出了，是null


 /**
  * 用promise 管理
  */
 let pro = new Promise((resolve,reject)=>{

    let xhr = new XMLHttpRequest();
    xhr.open('get','./js/data.js',true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && xhr.status === 200){
        let val = shr.responseText;
        resolve(val);
      }
      if(xhr.status != 200){
        reject();
      }
    }
    xhr.send(null);

 });

 pro.then((res)=>{
    console.log(res);
    //1.可以在这做数据绑定

    return 100;
 },()=>{
   console.log('NO');
 }).then((res)=>{
  //当第一个then中的函数执行完，会执行第二个
  //2.可以在这排序
  console.log(res); //100
 }).then(()=>{
   //当第二个then中的函数执行完，会执行第三个
   //3.操作元素
 });