/* eslint-disable */
if (typeof axios !== 'undefined') {
    axios.defaults.baseURL = 'http://localhost:8000';
    axios.defaults.withCredentials = true;//=>允许跨域请求
    axios.defaults.transformRequest = data => { //post请求下默认情况下传给服务器都是raw格式json的字符串，需要改成urlencode模式的
        let str = ``;
        if (data && typeof data === 'object') {
            for (let attr in data) {
                if (data.hasOwnProperty(attr)) {
                    str += `${attr}=${data[attr]}&`;
                }
            }
        }
        return str.substring(0, str.length - 1);
    };
    axios.defaults.headers['Content-Type'] = 'x-www-form-urlencoded';
    axios.interceptors.response.use(result => result.data); //在响应成功之前把返回的只要data
}