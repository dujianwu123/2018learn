// 解构赋值
// [12,[23,34],[45,56,[67,78]]]  把多维数组中的 34/56/78获取到，并且分别赋值给 A,B,C

let [, [, A], [, B, [, C]]] = [12, [23, 34], [45, 56, [67, 78]]]
console.log(A, B, C)

let [D] = [1, 2, 3]//1
//如果只想获取数组中前面的某几项内容，后面的结构不需要补全
console.log(D)

let [, E] = [1, 2, 3]
let [, , F] = [1, 2, 3]
console.log(E, F)


let [, , G = 0] = [1, 2]
console.log(G)

//扩展运算符
let [H, ...I] = [1, 2, 3, 4, 5]
console.log(H, I)

let [...J] = [1, 2, 3, 4, 5]//数组克隆
console.log(J)

// let [...K,L] = [1,2,3,4,5];//报错，扩展运算符只能出现在结构的末尾

//对象的解构赋值
let { name = 0 } = { name: 1, age: 2 }
console.log(name)

// let {,...age} = {name:1,age:2}//报错，和数组解构赋值不一样的是，对象前面不允许出现空来占位（因为对象获取需要通过具体的属性名获取，写成空的话，浏览器不知道怎么识别）
let { name, ...obj } = { name: 1, age: 2, obj: 333 }
console.log(obj);//{ age: 2, obj: 333 }


let { name: K, age: L } = { name: 1, age: 2 }
console.log(K, L);

let data = [{
  "name": "xxx",
  "age": 18,
  "score": {
    "english": [101, 90, 95],
    "math": [100, 102, 100],
    "chinese": [98, 99, 103]
  }
}];
let [{ score: { english: [A] , math: [, B], chinese: [, , C] }}] = data;
console.log(A,B,C);