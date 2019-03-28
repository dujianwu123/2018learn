function Promise (executor){
  let self = this;
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];
  function resolve(value){
    if(self.status === 'pending'){
      self.status = 'resolved';
      self.value = value;
      self.onResolvedCallbacks.forEach(element => {
        element(self.value);
      });
    }
  }
  function reject(reason){
    if(self.status === 'pending'){
      self.status = 'rejected';
      self.value = reason;
      self.onRejectedCallbacks.forEach(element => {
        element(self.reason);
      });
    }
  }
  try{
    executor(resolve,reject);
  }catch(e){
    reject(e);
  }
  
}
Promise.prototype.then = function(onFulfilled,onRejected){
  let self = this;
  if(self.status === 'resolved'){
    onFulfilled(self.value);
  }
  if(self.status === 'rejected'){
    onRejected(self.reason);
  }
  if(self.status === 'pending'){
    self.onResolvedCallbacks.push(function(){
      onFulfilled(self.value);
    });
    self.onRejectedCallbacks.push(function(){
      onFulfilled(self.reason);
    });
  }
}

module.exports = Promise;