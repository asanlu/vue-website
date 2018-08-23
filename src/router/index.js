import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from '../pages/login'
import Admin from '../pages/admin'



export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name: 'admin',
      component: Admin
    }
  ]
})
