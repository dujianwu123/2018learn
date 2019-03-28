function * rea (books){
  console.log('start');
  for(let i=0;i<books.length;i++){
    yield books[i]; // yield 放弃屈服 产出 
  }
 console.log('结束');
}
let ite = rea(['js','node']);
let res ;
do{
  res = ite.next();//返回yield后面的值
  console.log(res);
}while(!res.done);