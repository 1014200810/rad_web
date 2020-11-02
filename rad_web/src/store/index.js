/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-04 22:21:39
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-29 22:41:00
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
let config = require('api/config')
Vue.use(Vuex)
const state = {
  maxTime: 0,
  minTime: 0,
  timeRange: [new Date(config.timeRange[0]),new Date(config.timeRange[1])],
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  }
})
