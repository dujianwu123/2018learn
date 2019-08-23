let Promise = require('./promise_test2');

// Promise.resolve(1)
//   .then((res) => {
//     console.log(res)
//     return 2
//   })
//   .catch((err) => {
//     return 3
//   })
//   .then((res) => {
//     console.log(res)
//   })

// Promise.resolve()
//   .then(() => {
//     return new Error('error!!!')
//   })
//   .then((res) => {
//     console.log('then: ', res)
//   })
//   .catch((err) => {
//     console.log('catch: ', err)
//   })

// let p = new Promise((resolve, reject)=>{
//   setTimeout(() => {
//     resolve('我有钱');
//   }, 1000);
// });
// p.then(data=>{
//   console.log('success', data);
// },err=>{
//   console.log('error', 'err');
// });
// p.then(data=>{
//   console.log('success', data);
// },err=>{
//   console.log('error', 'err');
// });
// p.then(data=>{
//   console.log('success', data);
// },err=>{
//   console.log('error', 'err');
// });


// 题目：使用promise实现每隔一秒输出一个1，一共三个

// let p = new Promise((resolve,reject)=>{
//   setTimeout(() => {
//     resolve(1)
//   }, 1000);
// })
// p.then((data)=>{
//   console.log(data);
//   return new Promise((resolve,reject)=>{
//     setTimeout(() => {
//       resolve(1)
//     }, 1000);
//   })
// })
// .then((data)=>{
//   console.log(data);
//   return new Promise((resolve,reject)=>{
//     setTimeout(() => {
//       resolve(1)
//     }, 1000);
//   })
// })
// .then((data)=>{
//   console.log(data);
// })

  
// let fn = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(1);
//       resolve();
//     },1000);
//   })
// }
// let p = fn();
// p.then(fn).then(fn)


// 怎么串行promise

function iter (arr) {
  let promise = Promise.resolve()
  arr.forEach(fn => {
    promise = promise.then(fn()) 
  });
}
let arr = [()=>{
	return new Promise(res=>{
		setTimeout(()=>{
			console.log("run", 1);
			res()
		},1000)
		
	})
},()=>{
	return new Promise(res=>{
		setTimeout(()=>{
			console.log("run", 2);
			res()
		},1000)
		
	})
},()=>{
	return new Promise(res=>{
		setTimeout(()=>{
			console.log("run", 3);
			res()
		},1000)
		
	})
}]
 
iter(arr);