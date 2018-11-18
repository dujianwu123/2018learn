/**
 * JQ选择器：基于各种选择器创建一个JQ实例（JQ对象）
 * 1.selector：选择器的类型（一般都是字符串，但是支持函数或者元素对象）
 * 2.context 基于选择器获取元素时候指定的上下文（默认document）
 * //JQ对象：一个类数组结构（JQ实例），这个类数组集合中包含了获取到的元素
 * 
 */
console.log($('.box'));
/**
 * JQ对象（类数组）-->JQ实例
 * 0：div.box
 * length: 1
 * context: document
 * selector: '.box'
 * __proto__: jQuery.prototype
 */

 /**
  * JQ转 原生
  * let $box = $(.box);
  * let oBox = $box[0] = $box.get(0)
  * get 是JQ原型上提供的方法供JQ实例基于索引获取到指定的JS对象
  * eq  也是基于索引获取集合中的某一项，只不过GET获取的是JS对象，EQ会把
  * 获取的结果包裹成一个新的JQ对象（JQ实例返回）
  * 
  * 原生转 JQ
  * $(oBox)
  */

  $(function ($){
    //-->：私有变量，而且特定就是JQ
    $();
  });
  //函数执行，但是会在当前页面中的HTML结构都加载完后再执行
  //会形成自己的闭包


  /**
   * JQ选择器的SELECTOR可以是字符串，字符串这种格式也有两种
   *  1.选择器
   *  2.HTML字符串拼接的结构：把拼接好的HTML字符串转换为JQ对象，然后
   * 可以基于appendTo等方法追加到页面中
   */
$('<div id="AA"></div>').appendTo(document.body);

/**
 * EACH： JQ中的EACH方法是用来进行遍历的（类似于数组的forEach）
 * [可遍历内容]
 *  1.数组
 *  2.对象
 *  3.类数组（JQ对象）
 * 。。。
 *  [三种EACH]
 *  1.给JQUERY设置的私有属性  $.each();
 *  2.给实例设置的公有属性 $([selector]).each()
 *  3.内置的EACH
 */
$('.box li').each(function(index,item){
    //参数 和forEach相反
    //this，item --> 是原生的
    $(this);//需要转换下成JQ的
    $(item).click(function(){
      //this:就是当前点击的Li
    });
});

jQuery.noConflict();//转让JQ使用$的权力
console.log($);//undefined

let zzz = jQuery.noConflict(true);//深度转让：把jQuery这个名字也让出去，返回结果赋值给一个变量，此时这个变量
//是新的JQ代言人
console.log(jQuery);//undefined
console.log(zzz);//jQuery

