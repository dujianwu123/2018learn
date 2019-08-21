let Promise = require('./1.promise');
let p = new Promise((resolve, reject)=>{
  setTimeout(() => {
    resolve('我有钱');
  }, 1000);
});
p.then(data=>{
  console.log('success', data);
},err=>{
  console.log('error', 'err');
});
p.then(data=>{
  console.log('success', data);
},err=>{
  console.log('error', 'err');
});
p.then(data=>{
  console.log('success', data);
},err=>{
  console.log('error', 'err');
});