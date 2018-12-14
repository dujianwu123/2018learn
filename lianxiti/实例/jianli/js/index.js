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
        $current.css('width','100%');//当网慢加载到90%时，瞬间到100%，让用户以为到100%
        callback && callback();
        return;
      }
      alert('非常遗憾，当前您的网络状况不加，请稍后在试!');
      //此时我们不应该继续加载图片，而是让其关掉页面或者是跳转到其它页面
      window.location.href='http://www.baidu.com';
    }, 10000);
  };
  //DONE：完成
  let done = function done(){
    //停留一秒在移除进入下一环节
    let timer = setTimeout(() => {
      $loadingBox.remove();
    }, 1000);
  }
  return {
    init: function () {
      run(done);
      maxDelay(done);
    }
  }
})();

loadingRender.init();