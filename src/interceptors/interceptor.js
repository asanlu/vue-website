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
  config.headers['x-auth-token'] = 'ss';

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
axios.interceptors.response.use(res => {
  if (res.status == 200 && res.data) {
    // 根据后台返回code处理对应业务问题，超时、全局错误之类的
    switch (res.data.code) {
      case '0000':   // 数据正确
        break;
      case '2001':   // 密码或账号错误
        Message({
          message: res.data.msg,
          type: 'error',
          onClose: (msg) => {
            router.push('/ads');
          }
        });
        break;
      case '2003':   // 会话超时
        Message({
          message: res.data.msg,
          type: 'success',
          onClose: (msg) => {
            router.push('/login');
          }
        });
        break;
      case '3000':
        Message({
          message: '您没有访问该资源的权限',
          type: 'warning'
        });
        break;
      // default:
      //   throw new Error(res);
    }
    return res;
  }
}, err => {
  // loadinginstace.close()
  Message.error({
    message: `访问的网络资源异常status:${err.response.status}`
  })
  return Promise.reject(err);
})

export default axios
