import base from './src/css/base.css';
import common from './src/css/common.css';

let flag = false;
setInterval(() => {
    if(flag){
      base.unuse();
      flag = false;
    }else{
      base.use();
      flag = true;
    }
}, 500);