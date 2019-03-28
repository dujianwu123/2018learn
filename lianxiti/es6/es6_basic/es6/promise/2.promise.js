let p1 = new Promise(function(resolve,reject){
  setTimeout(function(){
    reject(100);
  },1000);
});
let p2 = p1.then(function(data){
  // throw 'xx';
  return data+100;
    
},function(err){
  console.log(err);
  return err+100;
});
p2.then(function(data){
  console.log('p2成功',data);
},function(err){
  console.log('p2失败',err);
});