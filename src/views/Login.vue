<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-form
          ref="form"
          @submit.prevent="submit"
        >
          <h3 class="mb-5">Login</h3>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-comma" label="Username" outlined></v-text-field>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-comma" label="Password" outlined></v-text-field>
          </v-row>
          <v-row>
            <div style="width: 100%; display: flex; justify-content: flex-end;">
              <v-btn color="primary" width="13%">
                Login
              </v-btn>
            </div>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Login',
  components: {
  }
}
</script>
