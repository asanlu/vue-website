/**
 * 配置请求和响应拦截器
 */

import axios from 'axios'
import Router from 'vue-router'
import { Loading, Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
const router = new Router();

var loadinginstace;

// 修改请求前配置，如token认证之类
axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['x-auth-token'] = '';

  // loadinginstace = Loading.service({ fullscreen: true })
  return config
}, error => {
  // loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})

// 响应处理，如业务代码code之类
axios.interceptors.response.use(res => {// 响应成功关闭loading
  // loadinginstace.close()
  if (res.data) {
    // 根据code处理对应业务问题，超时、全局错误之类的
    if (res.data.code !== '0000') {
      return Promise.reject(error)
    } else {
      return res
    }
  }
}, err => {
  console.log(err);
  // loadinginstace.close()
  switch (err.data.code) {
    case '2001':
      Message.error({
        message: '验证码或密码错误！',
        type: 'warning'
      });
    case '2003':
      router.push('/login');
      break;
    case '3000':
      Message.error({
        message: '您没有访问该资源的权限',
        type: 'warning'
      });
      break;
    default:
      break;
  }
  Message.error({
    message: `访问的网络资源异常status:${err.response.status}`
  })
  return Promise.reject(error)
})

export default axios
