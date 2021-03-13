// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'
import moment from 'moment'
import Qs from 'qs'

Vue.use(ViewUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = Qs
Vue.prototype.back_server = 'http://10.251.0.57:8081'
// Vue.prototype.back_server = 'http://localhost:8081'
Vue.prototype.front_server = 'http://10/251/0/57:80'
// Vue.prototype.front_server = 'http://localhost:8080'
Vue.prototype.$moment = moment

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (sessionStorage.getItem('username')) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

window.addEventListener('storage', (e) => {
  sessionStorage.setItem(e.key, e.oldValue)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
