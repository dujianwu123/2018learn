/* eslint-disable */
function co (it){
    return new Promise(function(resolve,reject){
        function next (d){
            let {value,done} = it.next(d);
            if(!done){
                value.then(function(data){//2.txt
                    next(data);
                },reject);
            }else{
              resolve(value);
            }
        }
        next();
    });
 }

 function aa (it){
    return new Promise(function(resolve,reject){
      function next(d){
          let {value,done} = it.next(d);
          if(!done){
              value.then(function(data){ 
                  next(data);
              });
          }else{
            resolve(value);
          }
      }
      next();
    });
 }

 function co (it){
    return new Promise(function(resolve,reject){
        function next (d){
          let {value,done} = it();
          if(!done){
            value.then(function(d){
              next(d);
            },reject);
          }else{
            resolve(value);
          }
        }

        next();
    });
 }