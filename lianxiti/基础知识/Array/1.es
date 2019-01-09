/*
        every
            返回一个布尔值，只有数组中每一项条件都成立，才会为true，否则false
        
        some
            返回一个布尔值，在数组中只要有一个条件成立，就返回true，否则false

        filter
            返回一个新数组，过滤条件成立的数组项
        map
            返回一个新的数组
        reduce 收敛  4个参数 返回的是叠加后的结果 原数组不发生变化，回调函数返回的结果
        [1,2,3,4].reduce(function(prev,next,index,item){
            prev 就是上一个的返回结果，第一次默认是数组的第一项
            next 是是数组的第二项
            index 是next的索引
            item 原数组

            1,        2,1,[1,2,3,4]
            undefined,3,2,[1,2,3,4]
            undefined,4,3,[1,2,3,4]
        },a);a-->默认指定一次的prev的值

        
        求和，返回一个计算结果
            (total,num)=>{
                total :  上次的和
                num   :  这次的值
            },初始值

        forEach 声明式 不关心如何实现

        in: for(key in arr){//key会变成字符串类型，包括数组的私有属性也可以打印出来

        }

        of for(key of arr){//支持return 并且是值of数组（不能遍历对象）

        }

        find 返回找到的那一项，不会改变数组，回调函数中返回true表示找到了，找到后停止循环
    */ 

    
   let arr = [1,1,1,1,1,7,8,11,55,555];

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


   //  [1,2,3,4].reduce(function(...arr){
  //   console.log(...arr);
  //  }); 

  //  let b = arr.reduce((total,num)=>{
  //      console.log(total,num);
  //      return total + num;
  //  },0);

  //  console.log(b);

  // let sum2 = [{price:30,count:2},{price:30,count:3},{price:30,count:4}].reduce(function(prev,next){
  //     return prev+next.price*next.count
  // },0);//第一次的prev是0

  // console.log(sum2);


  let result = arr.find((item,index)=>{
      return item.toString().indexOf(5)>-1
  });

   console.log(result);