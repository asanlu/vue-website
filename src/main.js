// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import Cookies from 'js-cookie'
import axios from './interceptors/interceptor'
// import Api from './api'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
// Vue.prototype.Api = Api
// Vue.prototype.Cookies = Cookies

router.beforeEach((to, form, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    // if (Cookies.get('isLogin')) { //登录状态判断
    if ('isLogin') {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
