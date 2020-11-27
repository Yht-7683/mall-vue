// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'      // 引入vue-cookie插件 api: https://github.com/alfhen/vue-cookie
import httpRequest from '@/utils/httpRequest' // 引入axios api: https://github.com/axios/axios
import { isAuth } from '@/utils'

Vue.config.productionTip = false
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth  // 权限方法
Vue.prototype.$store = store
Vue.use(ElementUI)
Vue.use(VueCookies)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
