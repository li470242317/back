// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(elementui)
/* eslint-disable no-new */
Vue.config.productionTip=false
Vue.prototype.$qs=qs
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
