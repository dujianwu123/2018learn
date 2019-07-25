/* eslint-disable */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
let Promise = function (executor) {
  let that = this;
  that.status = PENDING;
  that.value = undefined;
  that.reason = undefined;
  that.onResolvedCallbacks = [];
  that.onRejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }

    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = FULFILLED;
        that.value = value;
        that.onResolvedCallbacks.forEach(fn => {
          fn(that.value);
        });
      }
    });

  }
  function reject(reason) {
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = REJECTED;
        that.reason = reason;
        that.onRejectedCallbacks.forEach(fn => {
          fn(that.reason);
        });
      }
    });
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
function resolvePromise(Promise2, x, resolve, reject) {
  if (Promise2 === x) {
    reject(new TypeError('重复调用了!'));
  }
  let called;
  if (x instanceof Promise) {
    if (x.status === PENDING) {
      x.then(function (y) {
        resolvePromise(Promise2, y, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
  }
  if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, function (y) {
          if (called) return;
          called = true;
          resolvePromise(Promise2, y, resolve, reject);
        }, function (err) {
          if (called) return;
          called = true;
          reject(err);
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
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (val) { return val };
  onRejected = typeof onRejected === 'function' ? onRejected : function (err) { throw err };
  let that = this;
  let Promise2;
  if (that.status === FULFILLED) {
    Promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(Promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  if (that.status === REJECTED) {
    Promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(Promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  if (that.status === PENDING) {
    Promise2 = new Promise(function (resolve, reject) {
      that.onResolvedCallbacks.push(function () {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(Promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
      that.onRejectedCallbacks.push(function () {
        try {
          let x = onRejected(that.reason);
          resolvePromise(Promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  return Promise2;
}

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = Promise;