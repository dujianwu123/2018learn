const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected'
const resolvePromise = (promise2, x, resolve, reject) => {
  // 处理x 的类型， 来决定是调用resolve还是reject
  // 必须要写的很谨慎
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  // 判断x 是不是一个普通值 先认为你是一个promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 可能是promise 如何是不是promise then
    let called;// 默认没有调用成功 和失败
    try {
      let then = x.then;
      if (typeof then === 'function') {
        // 是promise
        // x.then(()=>{},()=>{})
        then.call(x, (y) => { //如果是一个promise 就采用这个promise的结果
          // y 有可能还是一个promise
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (called) return;
          called = true;
          reject(r);
        })

      } else { //[1,2,3]
        resolve(x) // 常量直接跑出去即可
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error) //取then抛出异常就 报错了
    }
  } else {
    // 不是 promise
    resolve(x);
  }
}
class Promise {
  constructor(excuter) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = value => {
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(fn => {
          fn();
        });
      }
    }
    let reject = reason => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn => {
          fn()
        })
      }
    }
    // 这里可能发生异常
    try {
      excuter(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value }
    onRejected = typeof onRejected === 'function' ? onRejected : function (err) { throw err }
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            // resolve(x)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            // resolve(x)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        });
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              // resolve(x);
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          });
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              // resolve(x);
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          });
        })
      }
    })
    return promise2;

  }
  catch(errCallback) { // 没有成功的then
    return this.then(null, errCallback)
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(err) {
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      let arr = [];
      let i = 0;
      let processData = (i, data) => {
        arr[i] = data;
        if (++i === arr.length) {
          resolve(arr);
        }
      }
      for (let index = 0; index < promises.length; index++) {
        let current = promises[index];
        if ((current !== null && typeof current === 'object') || typeof current === 'function') {
          current.then((data) => {
            processData(index, data)
          }, reject);
        } else {
          processData(index, current)
        }
      }
    })
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(p => {
        p.then(resolve, reject)
      })
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

// promises-aplus-tests