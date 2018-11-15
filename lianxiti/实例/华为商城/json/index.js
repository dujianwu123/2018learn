let productData = null;
let xhr = new XMLHttpRequest();
xhr.open('GET','./json/product.json',false);
xhr.onreadystatechange = () => {
  if(xhr.readyState === 4 && xhr.status === 200){
    productData = xhr.responseText;
  }
}
xhr.send(null);

let myJsonParse = function myJsonParse (jsonStr){
  if(window.JSON){
    return JSON.parse(jsonStr);
  }else{
    return eval('('+jsonStr+')');
  }
};

productData=myJsonParse(productData);
// console.log(productData);
let oList = document.getElementById('list');
let oLis = oList.getElementsByTagName('li');
let oA = document.getElementsByTagName('a');

/**
 * 加载模版页面
 */
let str =``;
for(let i =0;i < productData.length;i++){
  let {title,price,time,hot,img = 'img/timg.jpg'} = productData[i];
  str += `<li data-prize="${price}" data-hot="${hot}" data-time="${time}">
  <img src="${img}" alt="">
  <span>${title}</span>
  <span>${time}</span>
  <span>${hot}</span>
  <span>￥${price}</span>
  </li>`;
}
// console.log(str);
oList.innerHTML = str;

/**
 * 绑定按钮
 */
for(let i=0;i<oA.length;i++){
  oA[i].flag = -1;
  oA[i].onclick = function(){
    [].slice.call(oA).forEach((item,index) => {
      item===this ? null : item.flag = -1;
    });
    this.flag *= -1;
    prizeClick.call(this);
  }
}

/**
 * 排序
 */
let prizeClick = function(){
  let oLiArr=[].slice.call(oLis);
  console.log(this);
  oLiArr.sort((a,b)=>{
    let {flag} = this;
    let oA_data_kk = this.getAttribute('data-kk') ;
    if(oA_data_kk === 'data-time'){
      let a_date_prize = a.getAttribute(oA_data_kk).replace(/-/g,'');
      let b_date_prize = b.getAttribute(oA_data_kk).replace(/-/g,'');
      return (a_date_prize - b_date_prize)*flag;
    }else{
      let a_date_prize = a.getAttribute(oA_data_kk);
      let b_date_prize = b.getAttribute(oA_data_kk);
      return (a_date_prize - b_date_prize)*flag;
    }
  });
  for(let i = 0;i<oLiArr.length;i++){
    let oLi= oLiArr[i];
    oList.append(oLi);
  }
}




