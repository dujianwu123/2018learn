; (function (win) {

  function AJAX() {
    return new init(options);
  }
  let init = function init(options = {}) {
    //
    let {
      url,
      method = 'GET',
      data = null,
      dataType = 'JSON',
      async = true,
      cache = true,
      success,
      error
    } = options;
    //->MOUNT //=>把配置项挂载到实例上
    ['url', 'method', 'data', 'dataType', 'async', 'cache', 'success', 'error'].forEach((item) => {
      this[item] = eval(item);
    });
    this, sendAjax();//发送请求
  }
  AJAX.prototype = {
    constructor: AJAX,
    init,
    //发送Ajax请求
    sendAjax() {
      this.handleData();
      this.handleCache();

      let { method, url, async, error, success, data } = this;
      let xhr = new XMLHttpRequest();
      xhr.open(method, url, async);
      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
          //error
          if (!/^(2|3)\d{2}$/.test(xhr.status)) {
            error && error(xhr.responseText, xhr);
          }
          //=>处理DATA－ＴＹＰＥ  success
          let result = this.handlDataType(xhr);
          success && success(result, xhr);
        }
      }
      xhr.send(data);
    },
    handlDataType(xhr) {
      let dataType = this.dataType.toUpperCase();
      let result = xhr.responseText;
      switch (dataType) {
        case 'TEXT':
          break;
        case 'JSON':
          result = JSON.parse(result);
          break;
        case 'XML':
          result = xhr.responseText;
          break;
        default:
          break;
      }
      return result;
    },
    //处理cache
    handleCache() {
      let { url, method, cache } = this;
      if (/^GET$/i.test(method) && cache === false) {
        url += `${this.check()}_= ${+(new Date())}`;//url末尾加时间戳
        this.url = url;
      }
    },
    //检测url中是否存在问号
    check() {
      return this.url.indexOf('?') > -1 ? '&' : '?';
    },
    handleData() {
      let { data, method } = this;
      if (!data) return;
      if (typeof data === 'object') {
        let str = ``;
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key];
            str += `${key}=${value}&`;
          }
        }
        data = str.substring(0, str.length - 1);
      }
      //根据请求方式不一样，传递给服务器的方式也不同
      if (/^(GET|DELETE|HEAD|TRACE|OPTIONS)$/i.test(method)) {
        this.url += `${this.check()}+${data}`;
        this.data = null;
        return;
      }
      this.data = data;//POST
    }
  };

  init.prototype = AJAX.prototype;
  win.ajax = AJAX;
})(window);

