function aa (cb){
  setTimeout(() => {
    let str =11;
    cb(str);
  }, 1000);
}
let ss = aa(function(str){
  console.log("str=="+str);
  return str
});
console.log("ss=="+ss);