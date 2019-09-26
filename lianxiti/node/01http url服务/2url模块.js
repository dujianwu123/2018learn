let http = require('http');
let url = require('url');

http.createServer((req, res) => {
  // 输入http://localhost:8001/news?aid=123&cid=3   拿到aid 和cid
  //req.url  获取浏览器url输入的信息 /news?aid=123&cid=3 只有此部分

  res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
  if (req.url != '/favicon.ico') {
    //http://localhost:8001/news?aid=123
    //console.log(req.url);  //返回  /news?aid=123
    var result = url.parse(req.url, true);  //第一个参数是地址    第二个参数是true的话表示把get传值转换成对象
    console.log(result);
    console.log('aid=' + result.query.aid);  /*获取url的get传值*/
    console.log('cid=' + result.query.cid);
  }
  res.write('你好 nodejs');
  res.end(); /*结束响应*/
}).listen(8089)