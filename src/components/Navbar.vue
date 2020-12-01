<template>
  <div>
    <v-app-bar
      color="#3895ff"
      fixed
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-img :src="require('../assets/logo_kesbangpol.png')" style="width: 5px; height: 5px;"></v-img> -->
      <v-toolbar-side-icon>
        <v-img class="mr-3" src="@/assets/logo_kabupatentangerang.png" contain alt="" height="45px" width="45px" ></v-img>
      </v-toolbar-side-icon>

      <v-toolbar-title>Sistem Aplikasi Pelaporan</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>mdi-account-circle</v-icon>
            Username
            <v-icon right>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in items"
            :key="n"
            @click="() => {}"
          >
            <v-icon left>{{ n.icon }}</v-icon>
            <v-list-item-title>{{ n.menu_name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
      <v-navigation-drawer  v-model="drawer" app class="grey sidebar">
        <v-layout column align-center>
          <v-flex class="mt-5"> 
            <v-img src="@/assets/logo_kesbangpol.png" contain alt="" height="200px" width="200px" ></v-img>
            <p class="black--text subheading mt-1 text-center">Menu</p>
          </v-flex>
        </v-layout>
        <v-list flat>
          <v-list-item v-for="link in menu"  :key="link.text" router :to="link.route" active-class="border">
            <v-list-item-action>
              <v-icon >{{link.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content >
              <v-list-item-title >{{link.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  </div>
</template>

<script>
export default {
    name:"Navbar",
  data() {
    return {
      drawer: false,
      menu: [
        { title: 'Beranda', icon: 'mdi-view-dashboard', route: '/' },
        { title: 'Buat Laporan', icon: 'mdi-file-plus', route: '/buat-laporan' },
        { title: 'Laporan Saya', icon: 'mdi-file-account', route: '/laporan-saya' },
        { title: 'Lihat Laporan', icon: 'mdi-file-find', route: '/lihat-laporan' },
      ],
      items: [
        { menu_name: 'Profil', icon: 'mdi-account-settings' },
        { menu_name: 'Log Out', icon: 'mdi-logout' },
      ]
    }
  }
}
</script>

<style>
@media screen and (max-width:2000px){
    .sidebar {
      margin-top: 64px;
    }
}

@media screen and (max-width:958px){
    .sidebar {
      margin-top: 56px;
    }
}
</style>