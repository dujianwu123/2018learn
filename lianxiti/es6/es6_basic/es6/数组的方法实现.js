//filter

Array.prototype.myFilter = function(fn){
  
    let newArr = [];
    for(let i = 0;i<this.length;i++){
      let flag = fn(this[i]);
      flag&&newArr.push(this[i])
    }
    return newArr;
}

let arr = [1,2,3];
arr = arr.myFilter(function(item){
    return item > 1;
});
console.log(arr);