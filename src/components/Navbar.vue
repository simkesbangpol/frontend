<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Sistem Aplikasi Pelaporan</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
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
  </div>
</template>

<script>
export default {
    name:"Navbar",
  data() {
    return {
      items: [
        { menu_name: 'Profil', icon: 'mdi-account-settings' },
        { menu_name: 'Log Out', icon: 'mdi-logout' },
      ]
    }
  }
}
</script>

<style>

</style>