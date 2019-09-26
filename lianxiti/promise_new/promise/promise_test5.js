let PANDING = 'panding';
let REJECTED = 'rejected';
let FULFILLED = 'fulfilled';
let resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError('xxx'))
  }
  if ((x !== null && typeof x === 'object') || typeof x === 'function') {
    let called = false;
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
        })
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
    this.status = PANDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallBacks = [];
    let resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      if (this.status === PANDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }
    let reject = (reason) => {
      if (this.status === PANDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallBacks.forEach(fn => fn());
      }
    }
    try {
      excuter(resolve, reject)
    } catch (error) {
      reject(error)
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
            reject(error)
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

      if (this.status === PANDING) {
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
        this.onRejectedCallBacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          });
        })
      }
    });

    return promise2
  }

  catch(errCallback) {
    return this.then(null, errCallback);
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    })
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
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
      let i = 0;

      let processData = (index, data) => {
        arr[index] = data;
        if (++index === promises.length) {
          resolve(arr)
        }
      }

      for (let i = 0; i < promises.length; i++) {
        let current = promises[i];
        if ((current !== null && typeof current === 'object') || typeof current === 'function') {
          current.then((data)=>{
            processData(i,data)
          },reject);
        }else{
          processData(i,current)
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