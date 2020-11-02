/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-04 22:21:39
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-27 19:56:00
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import 'assets/style/styles.scss'
import * as d3 from 'api/d3.min';
Vue.use(ElementUI)
Vue.prototype.$d3=d3
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
