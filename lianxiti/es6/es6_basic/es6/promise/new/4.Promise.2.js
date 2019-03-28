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

function resolvePromise(p2, x, resolve, reject) {
  //有可能这里返回的x是别人的promise
  //尽可能允许其他乱写
  if (p2 === x) {//这里应该报一个类型错误，有问题
    return reject(new TypeError('循环引用了!'));
  }
  let called = false;
  //看x是不是一个promise，promise应该是一个对象
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    //可能是promise 或 {}，看这个对象中是否有then方法，如果有then我就认为他是promise了
    try {
      let then = x.then;//{then:1}
      if (typeof then === 'function') {//判断then是不是一个函数,想要的是一个值，如果是函数那么需要继续递归直到是值为止
        then.call(x, function (y) {
          if (called) return;
          called = true;
          resolvePromise(p2, y, resolve, reject);
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

  } else {// 说明是一个普通值 
    resolve(x);//表示成功了
  }

}
Promise.prototype.then = function (onFulfilled, onRejected) {
  //成功和失败默认不传给一个函数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value }
  onRejected = typeof onRejected === 'function' ? onRejected : function (err) { throw err }
  let self = this;
  let promise2;
  if (self.status === 'resolved') {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          //x 可能是别人的promise ，写一个方法统一处理
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        }

      });
    });

  }
  if (self.status === 'rejected') {
    promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
          // reject(x);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        }
      });
    });
  }
  if (self.status === 'pending') {
    promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallbacks.push(function () {
        setTimeout(() => {
          try {
            //x 可能是一个普通值，也可能是一个promise
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        });
      });
      self.onRejectedCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        });

      });
    });
  }

  return promise2;
}

module.exports = Promise;