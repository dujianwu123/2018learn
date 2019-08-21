const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
let resolvePromise = (promise2, x, resolve, reject) => {
  if (x === promise2) {
    return reject(new TypeError('类型错误'));
  }
  if ((x !== null && typeof x === 'object') || typeof x === 'function') {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if (called) return;
          called = true;
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error)
    }
  } else {
    resolve(x);
  }
}
class Promise {
  constructor(excuter) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }
    let reject = (reason) => {
      if (this.status === REJECTED) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }
    try {
      excuter(resolve, reject);
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => { return value }
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => { return err }

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        });
      }
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        })
      }
    })
    return promise2;
  }
  catch (errCallback) {
    return this.then(null, errCallback);
  }
  static resolve (value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject (value) {
    return new Promise((resolve, reject) => {
      reject(value)
    })
  }
}
Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}
module.exports = Promise;