Array.prototype.myReduce = function (fn, init) {
  if(init){
    for (let i = 0; i < this.length; i++) {
      init = fn(init, this[i]);
    }
  }else{
    init = this[0]
    for (let i = 1; i < this.length; i++) {
      init = fn(init, this[i]);
    }
  }
  
  return init;
}
let res = [1, 2, 3].myReduce(function (pre, next) {
  return pre + next;
},0);
console.log(res);