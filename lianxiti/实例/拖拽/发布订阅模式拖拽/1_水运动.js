let box = document.querySelector('#box');
    let subscribeDown = new Subscribe();
    let subscribeMove = new Subscribe();
    let subscribeUp = new Subscribe();

    let down = function down(ev) {
      this.disX = ev.clientX - box.offsetLeft;
      this.disY = ev.clientY - box.offsetTop;
      this.move = move.bind(this);
      this.up = up.bind(this);
      document.addEventListener('mousemove', this.move, false);
      document.addEventListener('mouseup', this.up, false);
      subscribeDown.fire(this, ev);
      return false;
    }
    let move = function move(ev) {
      this.curL = ev.clientX - this.disX;
      this.curT = ev.clientY - this.disY;

      let maxL = document.documentElement.clientWidth - this.offsetWidth;
      let minL = 0;
      let maxT = document.documentElement.clientHeight - this.offsetHeight;
      let minT = 0;
      this.curL = this.curL < minL ? minL : (this.curL > maxL ? maxL : this.curL);
      this.curT = this.curT < minT ? minT : (this.curT > maxT ? maxT : this.curT);

      this.style.left = this.curL + "px";
      this.style.top = this.curT + "px";
      subscribeMove.fire(this, ev);
    }
    let up = function up(ev) {
      document.removeEventListener('mousemove', this.move, false);
      document.removeEventListener('mouseup', this.up, false);

      subscribeUp.fire(this, ev);
    }

    box.addEventListener('mousedown', down, false);

    /**
     * 浏览器有最小计算（反应）时间，同样的距离移动，操作快（用的事件短），浏览器能够反应
     * 过来的次数就少，触发MOUSE-MOVE这个行为次数也就变少了，如果移动的慢，反应次数多，触发
     * 行为的次数也就多了
     * 
     * 水平方向的运动只跟即将松开手的一瞬间运动的速度有关系，我们需要获取的就是即将松开一瞬间的速度
     *  
     */

    //1、移动中随时计算速度

    subscribeMove.add((curEle, ev) => {
      if (!curEle.lastFly) {
        //第一次开始运动，让last-fly（上一次的位置）以及speedfly（最新的速度）都为初始
        //当前位置
        curEle.lastFly = curEle.offsetLeft;
        curEle.speedFly = 0;

        return;
      }
      //第二次移动：用当前的值-上一次记录的值，就是最新的差值（速度），当前最新的值很快就会
      //成为下一次的上一次的值，直到拖动结束为止
      curEle.speedFly = curEle.offsetLeft - curEle.lastFly;
      curEle.lastFly = curEle.offsetLeft;
    });

    //2、离开的时候做一些事情（根据获取的speedfly）让元素运动起来
    subscribeUp.add((curEle, ev) => {
      let minL = 0;
      let maxL = document.documentElement.clientWidth - curEle.offsetWidth;
      let speed = curEle.speedFly;
      let dir = 'rihgt';
      speed < 0 ? dir = 'left' : null;
      speed = Math.abs(speed);

      curEle.flyTimer = setInterval(() => {
        //因为offsetLeft获取的值都会四舍五入，所以在当前left基础上+小于0.5的速度，下一次
        //在获取当前left值的时候还是会被省略到，也就是元素不在运动，此时结束定时器
        speed *= 0.98;
        if (speed <= 0.5) {
          clearInterval(curEle.flyTimer);
          return;
        }
        let curL = curEle.offsetLeft;
        if (dir === 'right') {
          if (curL >= maxL) {
            //到达有边界，往左走
            curEle.style.left = maxL + 'px';
            dir = 'left';
            return;
          }
          curL += speed;
        } else {
          if (curL <= minL) {
            //到达左边界，往右走
            curEle.style.left = minL + 'px';
            dir = 'right';
            return;
          }
          curL -= speed;
        }

        curEle.style.left = curL + 'px'
      }, 17);
    });

    //3、当按住盒子的时候，还要结束当前所有正在运动的动画
    subscribeDown.add((curEle, ev) => {
      clearInterval(curEle.flyTimer);
      curEle.speedFly = undefined;
    });