let Promise = function (executor) {
  let self = this;
  self.value = undefined;
  self.reason = undefined;
  self.status = 'pending';
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];
  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled';
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
  } catch (e) {
    reject(e);
  }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function'? onFulfilled : function(value){return value;}
  onRejected = typeof onRejected === 'function'? onRejected : function(err){throw err;}
  let self = this;
  let promise2;
  if (self.status === 'fulfilled') {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  if (self.status === 'rejected') {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  if (self.status === 'pending') {
    promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
      self.onRejectedCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    });
  }
  return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
  let called = false;
  if (promise2 === x) {
    return reject(new TypeError('这是一个错误类型!'));
  }
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, function (y) {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, function (e) {
          if (called) return;
          called = true;
          reject(e);
        })
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

Promise.defer = Promise.deferred = function(){
  let dfd = {};
  dfd.promise  = new Promise(function(resolve,reject){
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd
}
module.exports = Promise;