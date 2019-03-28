let obj = {
  time:'2017-01-01',
  name:'djw',
  _r:123
}
//Proxy 代理
let m = new Proxy(obj,{
  //拦截对象属性的读取
  get(target,key){
    console.log(target,key);
    return target[key].replace('2017','2018');
  },
  //拦截对象设置属性
  set(target,key,value){
    if(key === 'name'){
      return target[key] = value;
    }else{
      return target[key];
    }
  }
});
console.log('get',m.time);
m.time= '1111-11-11';
m.name='dxt';
console.log('set--',m.time,m);


{
  function validator(target,validator){
    return new Proxy(target,{
      _validator:validator,
      set(target,key,value,proxy){
        if(target.hasOwnProperty(key)){
          let va = this._validator[key];
          if(!!va(value)){
            return Reflect.set(target,key,value,proxy);
          }else{
            throw Error(`不能设置${key}到${value}`);
          }
        }else{
          throw Error(`${key} 不存在`);
        }
      }
    });

    const personValidators = {
      name(val){
        return typeof val === 'string'
      },
      age(val){
        return typeof val === 'number' && val > 10
      }
    }

    class Person {
      constructor(name,age){
        this.name = name;
        this.age = age;
        return validator(this,personValidators);
      }
    }
  }

}