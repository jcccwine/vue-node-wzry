import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './style.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

// 将路由挂载到#app下
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
