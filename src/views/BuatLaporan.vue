<template>
  <div>
    <Navbar />
    <Sidebar />
    <h1>Buat Laporan</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'BuatLaporan',
  components: {
    Navbar,
    Sidebar
  }
}
</script>
