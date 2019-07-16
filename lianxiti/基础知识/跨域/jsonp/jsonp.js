/* eslint-disable */
function jsonp ({url, params, cb}) {
  return new Promise((resolve,reject)=>{
    let script = document.createElement('script');
    window[cb] = function (data) {
      resolve(data);
      document.body.removeChild(script);
    }
    params = {...params,cb:cb};// wd=b&cb=show
    let arrs = [];
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`);
    }
    script.src = `${url}?${arrs.join('&')}`;
    document.body.appendChild(script);
  });
}
// jsonp({
//   url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
//   params: {wd:'b'},
//   cb: 'show'
// }).then((data)=>{
//   console.log(data);
// });
jsonp({
  url: 'http://localhost:3000/say',
  params: {wd:'13'},
  cb: 'show'
}).then((data)=>{
  console.log(data);
});
// jsonp 只能发送get请求  不支持post put delete
// 不安全 xss攻击 不采用