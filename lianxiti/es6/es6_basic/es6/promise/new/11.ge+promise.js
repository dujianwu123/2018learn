/* eslint-disable */
let fs = require('fs');
function readFile(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, 'utf8', function (err, date) {
      err ? reject(err) : resolve(date);
    });
  });
}

function* read() {
  let a = yield readFile('./1.txt');
  // console.log(a);
  let b = yield readFile(a);
  // console.log(b);
  let c = yield readFile(b);
  console.log("c---" + c);
  return c;
}

//调用生成器，返回迭代器
let it = read();
// it.next().value.then(function(date){
//   it.next(date).value.then(function(date){
//     it.next(date).value.then(function(date){
//       console.log(date);
//       console.log(it.next());
//     });
//   })
// })

co(it).then(function (date) {
  console.log(date);
});

function co(it) {
  return new Promise(function (resolve, reject) {
    function coNext(d) {
      let { value, done } = it.next(d);
      if (!done) {
        Promise.resolve(value).then(function (d) {
          coNext(d);
        }, err => {
          reject(err)
        });
      } else {
        resolve(value);
      }
    }

    coNext();
  });
}
