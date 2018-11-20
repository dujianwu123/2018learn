$(function () {
  let page = 0;
  let imgData = null;
  let isRun = false;
  //获取数据
  let queryData = () => {
    page++;
    $.ajax({
      url: `./js/data.json?page=${page}`,
      method: 'get',
      async: false,
      dataType: 'json',
      success: result => {
        imgData = result;
      }
    });
  }


  queryData();
  // console.log(imgData);

  //数据绑定
  let queryHTML = item => {
    let {id,pic,title} = item;
    if(typeof id === 'undefined'){
        return '';
    }
    return `<a href="javascript:;">
            <div><img src="./${pic}" alt=""></div>
            <span>${title}</span>
            </a>`;
  };
  let bindHTML = () => {
      let $boxList = $('.box > li');
      let boxList = [].slice.call($boxList);
      for (let i = 0; i < imgData.length; i += 3) {
        let item1 = imgData[i];
        let item2 = imgData[i+1];
        let item3 = imgData[i+2];

        boxList.sort(function(a,b){
          return a.offsetHeight - b.offsetHeight;
        });
        // console.log(boxList);
        if(item1){
          boxList[0].innerHTML += queryHTML(item1);
        }
        if(item2){
          boxList[1].innerHTML += queryHTML(item2);
        }
        if(item3){
          boxList[2].innerHTML += queryHTML(item3);
        }
      }

      isRun = false;

  }
  bindHTML();


  //滚动到底部加载更多数据
  
  $(window).on('scroll',()=>{
    
    let winH = $(window).outerHeight();
    let pageH = document.documentElement.scrollHeight || document.body.scrollHeight;
    let srcT = $(window).scrollTop();
    
    //卷去的高度，大于 真实高度-一屏幕高度
    if((srcT+100) >= (pageH - winH)){
      if(isRun) return;
      isRun = true;

      if(page > 5){
          alert('没有数据了');
          return ;
      }

      queryData();
      bindHTML();
    }
  });

});