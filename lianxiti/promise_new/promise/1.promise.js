const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected'
class Promise {
  constructor(excuter) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = value => {
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

    }
  }

  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        try {
          let x = onFulfilled(this.value)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === REJECTED) {
        try {
          let x = onRejected(this.reason)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value)
            resolve(x);
          } catch (error) {
            reject(error)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason)
            resolve(x);
          } catch (error) {
            reject(error)
          }
        })
      }
    })
    return promise2;

  }
}

module.exports = Promise;