/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-06 18:32:58
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-30 20:31:19
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

Vue.use(VueRouter)
const RiverMainPage = ()=>import('views/river/RiverMainPage')
const SpectroPage = ()=>import('views/spectro/SpectroPage')
const MapPage = ()=>import('views/map/MapPage')
//const testData = ()=>import('../views/layout/testData')
const routes = [
  {
    path: '/',
    redirect: '/RiverMainPage'
  },
  {
    path: '/RiverMainPage',
    component:RiverMainPage
  },
  {
    path: '/SpectroPage',
    component:SpectroPage
  },
  {
    path: '/MapPage',
    component:MapPage
  },
]

const router = new VueRouter({
  routes,
  mode:'history',
  linkActiveClass: 'Active'
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
