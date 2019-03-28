let Promise = function (executor) {
  let self = this;
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];
  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.value = value;
      self.onResolvedCallbacks.forEach(element => {
        element(self.value);
      });
    }
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.reason = reason;
      self.onRejectedCallbacks.forEach(element => {
        element(self.reason);
      });
    }
  }
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
// function resolvePromise(promise2, x, resolve, reject) {
//   if (promise2 === x) {
//     return reject(new TypeError('循环引用了'));
//   }
//   let called = false;
//   if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
//     try {
//       let then = x.then;
//       if (typeof then === 'function') {
//         then.call(x, function (y) {
//           if (called) return;
//           called = true;
//           resolvePromise(promise2, y, resolve, reject)
//         }, function (e) {
//           if (called) return;
//           called = true;
//           reject(e);
//         });
//       } else {
//         resolve(x);
//       }
//     } catch (e) {
//       reject(e);
//     }
//   } else {
//     if (called) return;
//     called = true;
//     reject(x);
//   }
// }

Promise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  let promise2;
  if (self.status === 'resolved') {
    promise2 = new Promise(function (resolve, reject) {
      let x = onFulfilled(self.value);
      resolvePromise(promise2, x, resolve, reject);
    });
  }
  if (self.status === 'rejected') {
    promise2 = new Promise(function (resolve, reject) {
      let x = onRejected(self.reason);
      resolvePromise(promise2, x, resolve, reject);
    });
  }
  if (self.status === 'pending') {
    promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallbacks.push(function () {
        let x = onFulfilled(self.value);
        resolvePromise(promise2, x, resolve, reject);
      });
      self.onResolvedCallbacks.push(function () {
        let x = onRejected(self.reason);
        resolvePromise(promise2, x, resolve, reject);
      });
    });
  }
  return promise2;
}
module.exports = Promise;