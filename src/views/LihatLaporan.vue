<template>
  <div>
    <Navbar />
    <Sidebar />
    <h1>Lihat Laporan</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'LihatLaporan',
  components: {
    Navbar,
    Sidebar
  }
}
</script>
