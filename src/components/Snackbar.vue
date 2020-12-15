<template>
  <v-snackbar
    top
    :color="dataSnackbar.colorSnackbar"
    v-model="dataSnackbar.showSnackbar"
    :timeout="dataSnackbar.timeoutSnackbar"
  >
    {{dataSnackbar.message}}
    <template v-slot:action="{ attrs }">
      <v-btn
        :color="dataSnackbar.colorButton"
        v-bind="attrs"
        @click="dataSnackbar.showSnackbar = false"
      >
        {{dataSnackbar.textButton}}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name:"Snackbar",
  props: ["dataSnackbar"],
  computed: {
  },
  mounted() {
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
</style>