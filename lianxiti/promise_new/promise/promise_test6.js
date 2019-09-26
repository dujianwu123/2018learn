let PENDING = 'pending';
let FULFILLED = 'fulfilled';
let REJECTED = 'rejected';

let resolvePromise = function (promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('xxx'));
  }
  if ((x !== null && typeof x === 'object') || typeof x === 'function') {
    let called;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        resolve(x)
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
class Promise {
  constructor(excuter) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
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
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }
    try {
      excuter(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
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

    });

    return promise2;
  }

  catch(errCallbacks) {
    return this.then(null, errCallbacks);
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    })
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(p => {
        p.then(resolve, reject);
      })
    })
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      let arr = [];
      let len = 0;
      let processData = (index, data) => {
        arr[index] = data;
        if (++len === promises.length) {
          resolve(arr);
        }
      }

      for (let i = 0; i < promises.length; i++) {
        let curr = promises[i];
        if ((curr !== null && typeof curr === 'object') || typeof curr === 'function') {
          curr.then((data) => {
            processData(i, data);
          }, reject);
        } else {
          processData(i, curr);
        }
      }

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
