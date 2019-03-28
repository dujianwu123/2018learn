let Promise = function (task){
  let that = this;
  that.status = 'pending';
  that.onResolvedCallbacks = [];
  that.onRejectedCallbasks = [];
  that.value = undefined;
  function resolve(value){
    if(that.status === 'pending'){
      that.status = 'fulfilled';
      that.value = value;
      that.onResolvedCallbacks.forEach(element => {
        element(that.value);
      });
    }
  }
  function reject(reson){
    if(that.status === 'pending'){
      that.status = 'rejected'
      that.value = reson;
      that.onResolvedCallbacks.forEach(element => {
        element(that.value);
      });
    }
  }
  try{
    task(resolve,reject);
  }
  catch(e){
    reject(e); 
  }
}

Promise.prototype.then=function(onFulfilled,onReject){
  let that = this;
  if(that.status === 'pending'){
    that.onResolvedCallbacks.push(onFulfilled);
    that.onRejectedCallbasks.push(onReject);
  }
  if(that.status === 'fulfilled'){
    onFulfilled(that.value);
  }
  if(that.status === 'rejected'){
    onReject(that.value);
  }
  
}

module.exports = Promise;