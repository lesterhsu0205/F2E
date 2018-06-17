import Vue from 'vue'
import Router from 'vue-router'
import DeskTop from '@/pages/desktop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'desktop',
      component: DeskTop
    }
  ]
})
