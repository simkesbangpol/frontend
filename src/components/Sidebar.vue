<template>
  <div>
    <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
                <router-link class="nav-link" to="/">Beranda</router-link>
                <router-link class="nav-link" to="/buat-laporan">Buat Laporan</router-link>
                <router-link class="nav-link" to="/laporan-saya">Laporan Saya</router-link>
                <router-link class="nav-link" to="/lihat-laporan">Lihat Laporan</router-link>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>

  <!-- <div>
  <b-nav vertical class="w-25">
    <b-nav-item active>Active</b-nav-item>
    <b-nav-item>Link</b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div> -->
</template>

<script>
export default {
    name:"Sidebar"
}
</script>

<style>

</style>