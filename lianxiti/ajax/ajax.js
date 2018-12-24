//AJAX操作

//->创建AJAX实例，IE6 中是不兼容的，使用的是new ActiveXObject来实现的
let xhr = new XMLHttpRequest();

//->打开请求，发送请求之前的一些配置项
/**
 * @param  {} [HTTPmethod] 请求方式 get/delete/head/options/trace/connect/post/put
 * @param  {} [URL] 向服务器请求api接口地址
 * @param  {} [async]  默认是异步true ， false同步
 * @param  {} [user-name]
 * @param  {} [user-pass]
 */
xhr.open([HTTP method],[URL],[async],[user-name],[user-pass]);
xhr.onreadystatechange=()=>{
  if (!/^(2|3)\d{2}$/.test(xhr.status)) return; //=>证明服务器已经返回内容了（HTTP请求成功）
  if(xhr.readyState===2){console.log(1);}
  if(xhr.readyState===4){console.log(2);}
};
xhr.send();
