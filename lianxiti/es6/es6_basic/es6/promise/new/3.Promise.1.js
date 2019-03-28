function Promise(executor) {
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
      self.onResolvedCallbacks.forEach(fn => {
        fn();
      });
    }
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.reason = reason;
      self.onRejectedCallbacks.forEach(fn => {
        fn();
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
  let self = this;
  let promise2;
  if (self.status === 'resolved') {
    promise2 = new Promise(function (resolve, reject) {
      let x = onFulfilled(self.value);
      resolve(x);
    });

  }
  if (self.status === 'rejected') {
    console.log(000);
    promise2 = new Promise(function (resolve, reject) {
      let x = onRejected(self.reason);
      reject(x);
    });
  }
  if (self.status === 'pending') {
    new Promise(function (resolve, reject) {
      self.onResolvedCallbacks.push(function () {
        onFulfilled(self.value);
      });
      self.onRejectedCallbacks.push(function () {
        onFulfilled(self.reason);
      });
    });
  }

  return promise2;
}

module.exports = Promise;