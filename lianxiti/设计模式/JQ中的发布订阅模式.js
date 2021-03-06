/**
 * 发布订阅设计模式（观察者模式）
 * 思想：准备一个容器，把到达指定时候要处理的事情，事先一一的增加到容器中（发布
 * 计划并且向计划中订阅方法），当到达指定时间点，通知容器中的方法依次执行即可
 */
let $plan = $.Callbacks();//创建一个空的计划表，空容器->$PLAN
setTimeout(() => {
    $plan.fire(10,20);//FIRE就是通知容器中的方法按照顺序依次执行的
    //10,20是执行容器中每一个方法的时候，都给他们传递两个参数值
}, 1000);

$plan.add((x,y)=>{//add 是向容器中增加方法，remove是从容器中移除方法 
  console.log(1);
});
$plan.add((x,y)=>{
  console.log(2);
});
$plan.add((x,y)=>{
  console.log(3);
});