<template>
  <v-breadcrumbs style="padding: 0;"  large light :items="dataBreadcrumbs">
      <template style="background: red;" v-slot:item="{ item }">
          <v-breadcrumbs-item
              :to="item.to"
              :disabled="item.disabled"
          >
              <h2>{{ item.text }}</h2>
          </v-breadcrumbs-item>
      </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name:"Breadcrumbs",
  props: ["dataBreadcrumbs"],
  computed: {
  },
  mounted() {
  },
  data() {
    return {
      breadcrumbsItems: {},
    }
  },
  methods: {
  }
}
</script>

<style>
</style>