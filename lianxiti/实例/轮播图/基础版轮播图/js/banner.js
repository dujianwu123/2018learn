let bannerRender = (function () {
  let container = document.querySelector('#container');
  let wrapper = container.querySelector('.wrapper');
  let focus = container.querySelector('.focus');
  let arrowLeft = container.querySelector('.arrowLeft');
  let arrowRight = container.querySelector('.arrowRight');
  let slideList = null;
  let focusList = null;

  //获取数据
  let queryData = function () {
    return new Promise((resolve, reject) => {

      let xhr = new XMLHttpRequest();
      xhr.open('GET', './js/data.json', true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          resolve(data);
        }
        if (xhr.status != 200) {
          reject();
        }
      };

      xhr.send(null);

    });
  }

  //数据绑定
  let bindHtml = function bindHtml(data) {
    console.log(data);
    let slideHtml = '';
    let focusHtml = '';
    [].slice.call(data).forEach((item, index) => {
      slideHtml += `<div class="slide"><img src="./${item.img}" alt="${item.desc}"></div>`;
      focusHtml += `<li class="${index === 0 ? 'active' : ''}"></li>`;
    });
    wrapper.innerHTML = slideHtml;
    focus.innerHTML = focusHtml;

    //动态设置 wrapper 的宽度
    slideList = wrapper.querySelectorAll('div');
    utils.css(wrapper,{'width':slideList.length*1000});
  }

  //自动轮播
  let stepIndex = 0;
  let autoTimer = null;
  let interval = 3000;//间隔多长时间切换一次
  let autoMove = function autoMove(){
    stepIndex ++;
    if(stepIndex >= slideList.length){
      stepIndex=0;
    }
    djw_animation(wrapper,{'left':-stepIndex*1000},200);
  }

  return {
    init: function init() {
      let promise = queryData();
      promise.then(bindHtml, () => {
        console.log(失败了);
      }).then(()=>{
        autoTimer = setInterval(autoMove,interval);
      });
    }
  }
})();

bannerRender.init();