<template>
  <v-app >
    <Navbar v-if="this.$store.getters.isLoggedIn" />
    <v-content class="ma-16">
      <router-view class="mt-5"></router-view>
    </v-content>
    <Footer v-if="this.$store.getters.isLoggedIn" />
  </v-app>
</template>

<script>

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default {
  name: 'App',

  components: {
   Navbar,
   Footer
  },

  data: () => ({
    //
  }),
};
</script>