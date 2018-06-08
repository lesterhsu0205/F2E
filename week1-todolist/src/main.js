// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'animate.css'
import './assets/all.scss'
import App from './App'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// 沒有用 vuex 就在這邊註冊常數
Vue.prototype.api = {
  getTodoList : 'http://localhost:3000/todoItems',
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
