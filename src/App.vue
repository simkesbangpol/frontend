<template>
  <v-app >
    <Navbar />
    <v-content class="ma-16">
      <router-view class="mt-5"></router-view>
    </v-content>
  </v-app>
</template>

<script>

import Navbar from '@/components/Navbar'
export default {
  name: 'App',

  components: {
   Navbar,
  },

  data: () => ({
    //
  }),
};
</script>