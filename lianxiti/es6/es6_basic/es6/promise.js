/**
 * promise :目的是为了管理JS中的异步编程的，所以我们也把它称为“Promise设计模式”
 */
// let p = new Promise();
// p.then();


/**
 * 三个状态  pending(准备:初始化成功，开始执行异步的任务)/fulfilled（成功）/rejected（失败）
 * 
 * 
 * 
 */
new Promise(() => {
  /**
   * 执行一个异步的任务（new Promise的时候，创建Promise的一个实例，立即会把当前
   * 函数体中异步操作执行）Promise本身是同步的，它可以管理异步操作
   */
  setTimeout(() => {

  }, 1000);
  console.log(1); //先输出1
});
console.log(2);//在输出2


new Promise((resolve, reject) => {
  /**
   * resolve:当异步操作执行成功，执行resolve方法
   * reject: 当异步操作执行失败，执行reject方法
   */
  setTimeout(() => {
    resolve(100);
  }, 1000);
}).then((res) => {
  console.log('ok', res);
}, () => {
  console.log('no');
});
/**
 * then 就是继续做什么事
 * then 有两个函数
 * 第一个传递的函数是resolve
 * 第二个传递的函数是reject
 */

let val = null;
let xhr = new XMLHttpRequest();
xhr.open('get', './js/data.js', true);
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    val = shr.responseText;
    //此处是获取结果，获取结果后还要做很多的事情，（此时我们只能把数据绑定等任务写在这里）

  }
}
xhr.send(null);
console.log(val);//如果使用异步AJAX请求，不等AJAX彻底完成，就把val输出了，是null


/**
 * 用promise 管理
 */
let pro = new Promise((resolve, reject) => {

  let xhr = new XMLHttpRequest();
  xhr.open('get', './js/data.js', true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let val = xhr.responseText;
      resolve(val);
    }
    if (xhr.status != 200) {
      reject();
    }
  }
  xhr.send(null);

});

pro.then((res) => {
  console.log(res);
  //1.可以在这做数据绑定

  return 100;
}, () => {
  console.log('NO');
}).then((res) => {
  //当第一个then中的函数执行完，会执行第二个
  //2.可以在这排序
  console.log(res); //100
}).then(() => {
  //当第二个then中的函数执行完，会执行第三个
  //3.操作元素
});

////////////////////////////////////////////

/*
* Promise是ES6中新增加的内置类：目的是为了管理异步操作的
*   1.new Promise() 创建类的一个实例，每一个实例都可以管理一个异步操作
*    ->必须传递一个回调函数进去（回调函数中管理你的异步操作）,不传递会报错
*    ->回调函数中会有两个参数
*      resolve：异步操作成功做的事情（代指成功后的事件队列 =>成功后要做的所有的事情都存放到成功这个事件队列中）
*      reject：异步操作失败做的事情（代指失败后的事件队列）
*    ->new Promise的时候立即把回调函数执行了（Promise是同步的）
*
*  2.基于Promise.prototype.then方法（还有catch/finally两个方法）向成功队列和失败队列中依次加入需要处理的事情
*
*  3.如果是多个THEN掉用，不是像我们想象的依次把增加的方法执行
*    异步操作成功或者失败，先把第一个THEN中的方法执行，每当执行一个THEN会返回一个新的Promise实例，这个实例管控的是第一个THEN中方法执行的是成功还是失败
*
*/
/*let promise1 = new Promise((resolve, reject) => {
    $.ajax({
        url: 'json/data2.json',
        success(result) {
            resolve(result);
        },
        error(msg) {
            reject('no');
        }
    });
});
promise1.then(
    result => {
        console.log('THEN1 OK', result);
        return 100;
    },
    msg => {
        console.log('THEN1 NO', msg);
        return 100;
    }
).then(
    result => {
        console.log('THEN2 OK', result);
    },
    msg => {
        console.log('THEN2 NO', msg);
    }
);*/

//=>建议不要使用THEN中的第二个参数（这样看起来很乱），而是建议我们使用Promise.prototype.catch来管理失败的情况
/*let promise1 = new Promise((resolve, reject) => {
    $.ajax({
        url: 'json/data2.json',
        success(result) {
            resolve(result);
        },
        error(msg) {
            reject('no');
        }
    });
});
promise1.then(result => {
    console.log('THEN1 OK', result);
    100();
    return 100;
}).catch(msg => {
    //=>第一个CATCH
    //1.异步请求失败会执行它
    //2.第一个THEN方法失败也会执行它
    console.log('CATCH1', msg);
}).then(result => {
    console.log('THEN2 OK', result);
}).catch(msg => {
    console.log('CATCH2', msg);
});*/

//=>JS中的异常捕获（目的：把抛出异常的错误捕获到，不让其阻断浏览器的继续执行）
/*
try {
    //=>正常执行的JS代码(可能会报错)
    1();
} catch (e) {
    //=>TRY中的代码报错了会执行CATCH
    console.log(e.message);
} finally {
    //=>不管TRY中的代码成功还是失败都会执行
}
*/

/**
 * promise 解决AJAX回调地狱开始
 */
let A = function A() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

let B = function B() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

let promise = A();
promise.then(() => {
  console.log(1);
  return B();//=>如果方法中返回的一个具体值，而且执行中没有错误异常，会立即执行下一个THEN中的方法（不写RETURN也是返回的了具体值：undefined），但是如果返回的是一个PROMISR实例（并且管控了一个异步操作），只能等PROMISE完成，把成功后的结果当做具体的值返回，才能进入下一个函数执行
}).then(() => {
  console.log(2);
});


let queryA = function queryA() {
  return new Promise(resolve => {
    $.ajax({
      url: 'xxxxx',
      success: resolve
    });
  });
}
let queryB = function queryB() {
  return new Promise(resolve => {
    $.ajax({
      url: 'xxxxx',
      success: resolve
    });
  });
}
let queryC = function queryC() {
  return new Promise(resolve => {
    $.ajax({
      url: 'xxxxx',
      success: resolve
    });
  });
}

let promise = queryA();
promise.then(result => {
  console.log('A',result);//A ajax成功返回的result
  return queryB();//上一个THEN中函数手动返回一个新的PROMISE实例（管控了一个异步操作），
  //下一个THEN会等上一个THEN中的异步成功后在执行
}).then(result => {
  console.log('B',result);//B ajax成功返回的result
  return queryC();
}).then(result => {
  console.log('C',result);//C ajax成功返回的result
  return queryC();
});

/**
 * promise 解决AJAX回调地狱结束
 */






