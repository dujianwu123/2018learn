let fn = ()=>{
  console.log(this);
}
fn.call(12);