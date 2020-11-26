<template>
  <div>
    <Navbar />
    <Sidebar />
    <h1>Laporan Saya</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'LaporanSaya',
  components: {
    Navbar,
    Sidebar
  }
}
</script>
