/*
        every
            返回一个布尔值，只有数组中每一项条件都成立，才会为true，否则false
        
        some
            返回一个布尔值，在数组中只要有一个条件成立，就返回true，否则false

        filter
            返回一个新数组，过滤条件成立的数组项
        map
            返回一个新的数组
        reduce
            求和，返回一个计算结果
            (total,num)=>{
                total :  上次的和
                num   :  这次的值
            },初始值

        forEach
    */ 

   let arr = [1,1,1,1,1,7,8,11];

  //  let b = arr.every((e)=>{
  //      return e==1;
  //  });

  //  let b = arr.some((e)=>{
  //      return e > 10;
  //  });

  //  let b = arr.filter((e)=>{
  //      return e > 7;
  //  });

  //  let b = arr.map((e)=>{
  //      return `<li>${e}</li>`;
  //  });
   // console.log(b.join(''));

   let b = arr.reduce((total,num)=>{
       console.log(total,num);
       return total + num;
   },0);

   console.log(b);