/* eslint-disable */
/*
 * 关于AUDIO的一些常用属性
 *    [属性]
 *    duration:播放的总时间(S)
 *    currentTime:当前已经播放的时间(S)
 *    ended:是否已经播放完成
 *    paused:当前是否为暂停状态
 *    volume:控制音量 (0~1)
 *
 *    [方法]
 *    pause() 暂停
 *    play() 播放
 *
 *    [事件 on+]
 *    canplay：可以正常播放（但是播放过程中可能出现卡顿）
 *    canplaythrough：资源加载完毕，可以顺畅的播放了
 *    ended：播放完成
 *    loadedmetadata：资源的基础信息已经加载完成
 *    loadeddata：整个资源都加载完成
 *    pause:触发了暂停
 *    play:触发了播放
 *    playing:正在播放中
 */

// LOADING
let loadingRender = (function () {

  let $loadingBox = $('.loadingBox');
  let $current = $loadingBox.find('.current');
  let imgData = ["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style1.jpg", "img/zf_style2.jpg", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher1.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher4.png", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"];
  let n = 0;
  let len = imgData.length;

  //预加载图片
  let run = function (callback) {

    imgData.forEach((item) => {
      let tempImg = new Image();
      tempImg.onload = function () {
        tempImg = null;
        $current.css('width', ++n / len * 100 + '%');
        //加载完成：执行回调函数(让当前loading页面消失)
        if (n === len) {
          //如果不到10m正常加载完了，需要把delayTimer清除
          clearTimeout(delayTimer);
          callback && callback();
        }
      }
      tempImg.src = item;
    });
  };

  //设置最长等待事件（假设10s，到达90%以上，可以正常访问内容了，如果不足直接提示用户当前网络状况不佳，稍后重试）
  let delayTimer = null;
  let maxDelay = function () {
    delayTimer = setTimeout((callback) => {
      if (n / len >= 0.9) {
        $current.css('width', '100%');//当网慢加载到90%时，瞬间到100%，让用户以为到100%
        callback && callback();
        return;
      }
      alert('非常遗憾，当前您的网络状况不加，请稍后在试!');
      //此时我们不应该继续加载图片，而是让其关掉页面或者是跳转到其它页面
      window.location.href = 'http://www.baidu.com';
    }, 10000);
  };
  //DONE：完成
  let done = function done() {
    //停留一秒在移除进入下一环节
    let timer = setTimeout(() => {
      $loadingBox.remove();
      phoneRender.init();
    }, 1000);
  }
  return {
    init: function () {
      $loadingBox.css('display','block');
      run(done);
      maxDelay(done);
    }
  }
})();

// PHONE
let phoneRender = (function () {
  let $phoneBox = $('.phoneBox');
  let $time = $phoneBox.find('h2>span');
  let $answer = $phoneBox.find('.answer');
  let $answerMarkLink = $answer.find('.markLink');
  let $hang = $phoneBox.find('.hang');
  let $hangMarkLink = $hang.find('.markLink');
  let answerBell = $('#answerBell').get(0);
  let introduction = $('#introduction').get(0);
  let answerMarkTouch = function () {
    //1、remove answer
    $answer.remove();
    answerBell.pause();
    $(answerBell).remove();//必须先暂停在移除，否则有时浏览器还会播放声音

    //2、hang显示出来
    $hang.css('transform', 'translateY(0rem)');
    $time.css('display', 'block');
    introduction.play();
    computedTime();
  };

  //->计算播放时间
  let autoTimer = null;
  let computedTime = function computedTime() {
    // let duration = 0;
    //->我们让AUDIO播放，首先会去加载资源，部分资源加载完成才会播放，才会计算出总时间
    //所以把获取信息放在canplay事件中
    // introduction.oncanplay = function () {
    //   duration = introduction.duration;
    // }
    autoTimer = setInterval(() => {
      let val = introduction.currentTime;//当前播放的时间 单位是秒
      let duration = introduction.duration;
      if (val >= duration) {
        clearInterval(autoTimer);
        closePhone();
        return;
      }
      let minute = Math.floor(val / 60);
      let second = Math.floor(val - minute * 60);
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;
      $time.html(`${minute}:${second}`);
    }, 1000);
  };

  //->关闭PHONE
  let closePhone = function () {
    clearInterval(autoTimer);
    introduction.pause();
    $(introduction).remove();
    $phoneBox.remove();
    messageRender.init();
  }

  return {
    init: function () {
      $phoneBox.css('display','block');

      //=>播放bell
      answerBell.play();
      answerBell.volume = 0.3;

      $answerMarkLink.on('click', answerMarkTouch);
      $hangMarkLink.on('click', closePhone);
    }
  }
})();

// MESSAGE
let messageRender = (function () {
  let $messageBox = $('.messageBox'),
        $wrapper = $messageBox.find('.wrapper'),
        $messageList = $wrapper.find('li'),
        $keyBoard = $messageBox.find('.keyBoard'),
        $textInp = $keyBoard.find('span'),
        $submit = $keyBoard.find('.submit'),
        demonMusic = $('#demonMusic')[0];

  let step = -1,//=>记录当前展示信息的索引
      total = $messageList.length + 1,//=>记录的是信息总条数(自己发一条所以加1)
      autoTimer = null,
      interval = 2000;//=>记录信息相继出现的间隔时间
  
  // 展示信息
  let tt = 0;
  let showMessage = function showMessage () {
    ++step;
    if (step === 2) {
      //=>已经展示两条了:此时我们暂时结束自动信息发送，让键盘出来，开始执行手动发送
      clearInterval(autoTimer);
      handleSend();
      return ;
    }
    let $cur = $messageList.eq(step);
    $cur.addClass('active');
    if (step >= 3) {
      // 展示的条数已经是四条或者四条以上了， 此时我们让wrapper向上移动(移动的距离是新展示这一条的高度)
      let curH = $cur.get(0).offsetHeight;
      tt -= curH;
      $wrapper.css('transform', `translateY(${tt}px)`);
    }
    if (step >= total - 1) {
      //=>展示完了
      clearInterval(autoTimer);
      closeMessage();
    }
    
  }
  // 手动发送
  let handleSend = function handleSend () {
    $keyBoard.css('transform', 'translateY(0rem)').one('transitionend', ()=>{
      // transitionend : 监听当前元素transition动画结束的事件(并且有几个样式属性改变，并且执行了过渡效果，事件就会被触发执行几次)
      // 所有这里怕多次触发了，所以没用on 用的 one
      let textTimer = null;
      let str = '好的，马上介绍!';
      let n = -1;
      textTimer = setInterval(() => {
        let orginHTML = $textInp.html();
        $textInp.html(orginHTML + str[++n]);
        if (n === str.length-1) {
          clearInterval(textTimer);
          $submit.css('display','block');
        }
      }, 100);
    });
  };

  // 点击SUBMIT
  let handleSubmit = function handleSubmit () {
    // 把新创建的LI增加到页面中第二个LI的后面
    $(`<li class="self">
    <i class="arrow"></i>
    <img src="img/zf_messageStudent.png" alt="" class="pic" />
    ${$textInp.html()}
    </li>`).insertAfter($messageList.eq(1)).addClass('active');
    $messageList = $wrapper.find('li');//=>重要:把新的LI放到页面中,我们此时应该重新获取LI，让MESSAGE-LIST和页面中的LI正对应，方便后期根据索引展示对应的LI
    
    // 该消失的消失
    $textInp.html('');
    $submit.css('display', 'none');
    $keyBoard.css('transform', 'translateY(3.7rem)');
    autoTimer = setInterval(showMessage, interval);
  }

  //=>关掉MESSAGE区域
  let closeMessage = function closeMessage() {
    let delayTimer = setTimeout(() => {
        demonMusic.pause();
        $(demonMusic).remove();
        $messageBox.remove();
        clearTimeout(delayTimer);
    }, interval);
  };
  return {
    init: function () {
      $messageBox.css('display','block');

      // 加载模块立即展示一条信息，后期间隔interval在发送一条信息
      showMessage();
      autoTimer = setInterval(showMessage, interval);

      // submit
      $submit.tap(handleSubmit);

      //music
      demonMusic.play();
      demonMusic.volume = 0.3;
    }
  }
})();

/**
 * 在开发中，由于当前项目板块众多（每一个板块都是一个单例），我们最好规划一种机制，通过标识的判断可以
 * 让程序只执行对应板块的内容，这样开发哪个版块，我们就把标识改为啥（HASH路由控制）
 */

let url = window.location.href;//获取当前页面的URL地址，location.href=xxx这种写法是让其跳转跳转到某一个页面

let well = url.indexOf('#');
let hash = well === -1 ? null : url.substr(well + 1);
console.log('hash', hash);
switch (hash) {
  case 'loading':
    loadingRender.init();
    break;
  case 'phone':
    phoneRender.init();
    break;
  case 'message':
    messageRender.init();
    break;

  default: 
    loadingRender.init();
    break;
}

