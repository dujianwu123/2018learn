let bannerRender = (function () {
  let container = document.querySelector('#container');
  let wrapper = container.querySelector('.wrapper');
  let focus = container.querySelector('.focus');
  let arrowLeft = container.querySelector('.arrowLeft');
  let arrowRight = container.querySelector('.arrowRight');
  let slideList = null;
  let focusList = null;
  let isOk = true;
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

    /**
     * 克隆一个slide
     */
    slideHtml += `<div class="slide"><img src="./${data[0].img}" alt="${data[0].desc}"></div>`;
    wrapper.innerHTML = slideHtml;
    focus.innerHTML = focusHtml;


    slideList = wrapper.querySelectorAll('div');
    focusList = focus.querySelectorAll('li');

    // //克隆一个slide
    // wrapper.append(slideList[0].cloneNode(true));
    // slideList = wrapper.querySelectorAll('div');

    //动态设置 wrapper 的宽度
    utils.css(wrapper, { 'width': slideList.length * 1000 });
  }

  //自动轮播
  let stepIndex = 0;
  let autoTimer = null;
  let interval = 1500;//间隔多长时间切换一次
  let autoMove = function autoMove() {
    stepIndex++;
    if (stepIndex >= slideList.length) {
      utils.css(wrapper, { 'left': 0 });
      stepIndex = 1;
    }
    djw_animation(wrapper, { 'left': -stepIndex * 1000 }, 200,()=>{
      isOk = true;
    });
    changeFocus();

  }

  //焦点对齐
  let changeFocus = function changeFocus() {
    let indexFocus = stepIndex;
    //当轮播图运动到最后一张(克隆第一张的时候，我们需要让第一个LI索引为0的选中)
    indexFocus === slideList.length - 1 ? indexFocus = 0 : null;
    [].slice.call(focusList).forEach((item, index) => {
      item.className = index === indexFocus ? 'active' : '';
    });
  }

  //移入移除鼠标
  let handleContainer = function handleContainer() {
    container.onmouseenter = () => {
      clearInterval(autoTimer);
      arrowLeft.style.display = 'block';
      arrowRight.style.display = 'block';
    };
    container.onmouseleave = () => {
      autoTimer = setInterval(() => {
        // stepIndex++;
        autoMove()
        
      }, interval);
      arrowLeft.style.display = 'none';
      arrowRight.style.display = 'none';
    }
  }

  //点击焦点
  let handleFocus = function handleFocus() {
    [].slice.call(focusList).forEach((item, index) => {
      item.onclick = function () {
        if(!isOk) return;
        isOk = false;
        stepIndex = index;
        // autoMove()

        djw_animation(wrapper, { 'left': -stepIndex * 1000 }, 200,()=>{
          isOk = true;
        });
        changeFocus();
      }

    });
  }

  //点击左右按钮
  let handleArrow = function handleArrow() {
    arrowRight.onclick = function () {
      if(!isOk) return;
      isOk = false;
      // stepIndex++;
      autoMove();
    };
    arrowLeft.onclick = function () {
      if(!isOk) return;
      isOk = false;
      stepIndex--;
      if (stepIndex < 0) {
        utils.css(wrapper, { 'left': -(slideList.length - 1) * 1000 });//马上到克隆的位置
        stepIndex = slideList.length - 2;
      }
      djw_animation(wrapper, { 'left': -stepIndex * 1000 }, 200,()=>{
        isOk = true;
      });
      changeFocus();
      // autoMove()
    }
  }
  return {
    init: function init() {
      let promise = queryData();
      promise.then(bindHtml, () => {
        console.log(失败了);
      }).then(() => {
        //开启定时器，运行轮播图
        // autoTimer = setInterval(() => {
        //   stepIndex++;
        //   autoMove();
        // }, interval);
        autoTimer = setInterval(autoMove, interval);
      }).then(() => {
        //左右按钮显示
        handleContainer();
        //焦点切换
        handleFocus();
        //左右切换
        handleArrow();
      });
    }
  }
})();

bannerRender.init();