import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  axios,
  render: h => h(App),
}).$mount('#app')
