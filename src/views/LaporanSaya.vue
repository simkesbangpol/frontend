<template>
  <div class="screen-container">
    <div class="container-navbar">
      <Navbar />
    </div>

    <div class="container-content">
      <div class="container-sidebar">
        <Sidebar />
      </div>
        <h1>Laporan Saya</h1>
      </div>
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
