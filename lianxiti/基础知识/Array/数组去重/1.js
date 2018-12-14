let arr = [1, 2, 3, 4, 1, 2, 3, 4, 5, 3, 4, 5, 6, 7, 6, 5, 4, 3, 5, 8, 7, 9, 7, 9];
let quchong = (array)=>{
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      let newArray = array.slice(index+1);
      if(newArray.includes(element)){
          array.splice(index,1);
          index --;
      }
    }
    return array;
}
console.log(quchong(arr).sort((a,b)=>a-b));

let [a,b,c,d,...f] = quchong(arr).sort((a,b)=>a-b);
console.log(a,b,c,d,f);

function quchong2(arr){
    let obj = {};
    for(let i =0;i<arr.length;i++){
        let cur = arr[i];
        if(obj[cur]){
            // arr.splice(i,1);//消耗性能，因为每一项都需要往前移
            obj[cur] = obj[arr[length-1]];
            arr.length--;
            i--;
            continue;
        }
        obj[cur] = i;
    }
    obj = null;
    return arr;
}
console.log(222222,quchong2(arr).sort((a,b)=>a-b));
console.log(arr);


let aaa = [1,2,3];
aaa.forEach((item,index)=>{
  if(item === 2){
      item = 3;
  }
});
console.log(aaa);

function quchong3(arr){
    let array = [];
    arr = arr.sort((a,b)=>{return a-b});
    for(let i=0; i < arr.length; i++){
        if(arr[i]!==arr[i+1]){
          array.push(arr[i]);
        }
    }
    return array;
}
console.log(55555555555,quchong(arr));