

// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000

var loadinginstace;

// 修改请求前配置，如token认证之类
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({ fullscreen: true })
  return config
}, error => {
  loadinginstace.close()
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
    switch (res.data.code) {
      case '0000':
        break;
      case '2000':
        break;
      case '3000':
        Message.error({
          message: "您没有访问该资源的权限",
          type: 'warning'
        });
        return res;
        break;
      default:
        break;
    }
  }
  return res
}, err => {
  // loadinginstace.close()
  Message.error({
    message: `访问的网络资源异常status:${err.response.status}`
  })
  return Promise.reject(error)
})

export default axios
