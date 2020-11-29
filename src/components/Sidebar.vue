<template>
  <!-- <div>
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
  </div> -->

  <v-card
    height="100%"
    width="256"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link class="nav-link" :to="item.link">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
    name:"Sidebar",
    data () {
      return {
        items: [
          { title: 'Beranda', icon: 'mdi-view-dashboard', link: '/' },
          { title: 'Buat Laporan', icon: 'mdi-image', link: '/buat-laporan' },
          { title: 'Laporan Saya', icon: 'mdi-help-box', link: '/laporan-saya' },
          { title: 'Lihat Laporan', icon: 'mdi-help-box', link: '/lihat-laporan' },
        ],
        right: null,
      }
    },
}
</script>

<style>

</style>