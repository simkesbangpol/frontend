import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BuatLaporan from '../views/BuatLaporan.vue'
import LaporanSaya from '../views/LaporanSaya.vue'
import LihatLaporan from '../views/LihatLaporan.vue'
import KelolaAkun from '../views/KelolaAkun.vue'
import DetailLaporan from '../views/DetailLaporan.vue'
import Login from '../views/Login.vue'
import { store } from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/buat-laporan',
    name: 'BuatLaporan',
    component: BuatLaporan
  },
  {
    path: '/laporan-saya',
    name: 'LaporanSaya',
    component: LaporanSaya
  },
  {
    path: '/lihat-laporan',
    name: 'LihatLaporan',
    component: LihatLaporan
  },
  {
    path: '/kelola-akun',
    name: 'KelolaAkun',
    component: KelolaAkun
  },
  {
    path: '/detail-laporan',
    name: 'DetailLaporan',
    component: DetailLaporan
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !store.getters.isLoggedIn) next({ name: 'Login' })
    else next()
})

export default router
