import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BuatLaporan from '../views/BuatLaporan.vue'
import LaporanSaya from '../views/LaporanSaya.vue'
import LihatLaporan from '../views/LihatLaporan.vue'
import KelolaAkun from '../views/KelolaAkun.vue'

Vue.use(VueRouter)

const routes = [
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

export default router
