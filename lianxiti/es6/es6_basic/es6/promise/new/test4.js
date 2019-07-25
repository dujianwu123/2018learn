/* eslint-disable */
let Promise = function (executor) {
  let that = this;
  that.status = 'pending';
  that.value = undefined;
  that.reason = undefined;
  that.onResolvedCallbacks = [];
  that.onRejectedCallbacks = [];
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (that.status === 'pending') {
        that.status = 'fulfilled';
        that.value = value;
        that.onResolvedCallbacks.forEach(fn => {
          fn(that.value);
        });
      }
    });
  }
  function reject(reason) {
    setTimeout(() => {
      if (that.status === 'pending') {
        that.status = 'rejected';
        that.reason = reason;
        that.onRejectedCallbacks.forEach(fn => {
          fn(that.reason);
        });
      }
    });
  }
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环调用了!'));
  }
  let called;
  if(x instanceof Promise){
    if(x.status === 'pending'){
      x.then(function(y){
        resolvePromise(promise2, y, resolve, reject)
      },reject);
    }else{
      x.then(resolve, reject);
    }
  }else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, function (y) {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject)
        }, function (e) {
          if (called) return;
          called = true;
          reject(e);
        });
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value; };
  onRejected = typeof onRejected === 'function' ? onRejected : function (err) { throw err; };
  let that = this;
  let promise2;
  if (that.status === 'fulfilled') {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  if (that.status === 'rejected') {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  if (that.status === 'pending') {
    promise2 = new Promise(function (resolve, reject) {
      that.onResolvedCallbacks.push(function () {
          try {
            let x = onFulfilled(that.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
      });
      that.onRejectedCallbacks.push(
        function () {
            try {
              let x = onRejected(that.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
        }
      );
    });
  }
  return promise2;
}

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
Promise.prototype.catch = function (cb) {
  return cb.then(null, cb);
}
Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    let arr = [];
    let index = 0;
    function writeData(i, value) {
      arr[i] = value;
      if (++index === promises.length) {
        resolve(arr);
      }
    }
    for (let index = 0; index < promises.length; index++) {
      const element = promises[index];
      element.then(function (y) {
        writeData(index, y);
      }, reject);
    }
  });
}
Promise.race = function (promises) {
  return new Promise(function (resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
}
Promise.resolve = function (value) {
  return new Promise(function (resolve, reject) {
    resolve(value);
  });
}
Promise.reject = function (reason) {
  return new Promise(function (resolve, reject) {
    reject(reason);
  });
}
module.exports = Promise;