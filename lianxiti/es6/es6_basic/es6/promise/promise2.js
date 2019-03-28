let Primise = function Primise(task) {
  this.status = 'pending';
  this.value = undefined;
  this.onFulfilledAry = [];
  this.onRejectedAry = [];
  function resolve(value) {
    let that = this;
    if (that.status === 'pending') {
      that.status === 'fulfilled';
      that.value = value;
      that.onFulfilledAry.forEach(element => {
        element(that.value);
      });;
    }
  }
  function reject(reson) {
    let that = this;
    if (that.status === 'pending') {
      that.status === 'rejected';
      that.value = reson;
      that.onRejectedAry.forEach(element => {
        element(that.value);
      });;
    }
  }
  try {
    task(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Primise.prototype.then = function (onFulfilled, onRejected) {
  let that = this;
  let primise2;
  if (that.status === 'pending') {
    primise2 = new Promise(function(resolve,reject){
      that.onResolvedCallbacks.push(function(){
        let x = onFulfilled(that.value);
        resolve(x);
      });
      that.onRejectedCallbacks.push(function(){
        let x = onRejected(that.value);
        resolve(x);
      });
    });
    that.onFulfilledAry.push(onFulfilled);
    that.onRejectedAry.push(onRejected);
  }
  if (that.status === 'fulfilled') {
    primise2 = new Primise(function (resolve, reject) {
      let x = onFulfilled(that.value);
      resolve(x);
    });
  }
  if (that.status === 'rejected') {
    primise2 = new Primise(function (resolve, reject) {
      let x = onRejected(that.value);
      resolve(x);
    });

  }

  return primise2;
}
module.exports = Primise;