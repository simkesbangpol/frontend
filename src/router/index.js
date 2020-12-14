import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BuatLaporan from '../views/BuatLaporan.vue'
import LaporanSaya from '../views/LaporanSaya.vue'
import LihatLaporan from '../views/LihatLaporan.vue'
import KelolaAkun from '../views/KelolaAkun.vue'
import DetailLaporan from '../views/DetailLaporan.vue'
import BuatAkun from '../views/BuatAkun.vue'
import DetailAkun from '../views/DetailAkun.vue'
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
    path: '/ubah-laporan-saya/:id',
    name: 'UbahLaporanSaya',
    component: BuatLaporan
  },
  {
    path: '/ubah-laporan/:id',
    name: 'UbahLaporan',
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
    path: '/detail-laporan/:id',
    name: 'DetailLaporan',
    component: DetailLaporan
  },
  {
    path: '/kelola-akun',
    name: 'KelolaAkun',
    component: KelolaAkun
  },
  {
    path: '/buat-akun',
    name: 'BuatAkun',
    component: BuatAkun
  },
  {
    path: '/ubah-akun/:id',
    name: 'UbahAkun',
    component: BuatAkun
  },
  {
    path: '/detail-akun/:id',
    name: 'DetailAkun',
    component: DetailAkun
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !store.getters.isLoggedIn) next({ name: 'Login' })
    else next()
    
    switch(to.name) {
      case 'KelolaAkun':
      case 'BuatAkun':
      case 'UbahAkun':
      case 'DetailAkun':
        if (store.getters.getRoles[0]!=='admin') next({ name: 'Home' })
        else next()
        break
      case 'LihatLaporan':
      case 'DetailLaporan':
        if (store.getters.getRoles[0]==='user') next({ name: 'Home' })
        else next()
        break
      default:
        break
    }
})

export default router
