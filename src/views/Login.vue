<template>
  <v-container class="fill-height" fluid>
    <v-row align="stretch">
      <v-col class="d-flex justify-center align-center" style="background: #03adfc;" md="6" cols="12">
        <v-row class="mr-15 ml-15 d-flex justify-center">
          <h2 class="text-center">Selamat Datang di Halaman Login Sistem Informasi Pelaporan</h2>
          <v-img src="@/assets/logo_kabupatentangerang.png" contain alt="" height="95px" width="95px" />
          <h2 class="text-center">Badan Kesatuan Bangsa dan Politik (Kesbangpol)<br/>Kabupaten Tangerang</h2>
        </v-row>
      </v-col>
      <v-col class="d-flex justify-center align-center" style="border-style: solid; border-color: #03adfc;" md="6" cols="12">
        <v-form
          style="width: 85%;"
          ref="form"
          @submit.prevent="submit"
        >
          <h3 class="text-center mb-5"><v-icon left>mdi-lock</v-icon>Login</h3>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-account" label="Username" v-model="username" outlined></v-text-field>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-key-variant" type="password" v-model="password" label="Password" outlined></v-text-field>
          </v-row>
          <v-row>
            <div style="width: 100%; display: flex; justify-content: center;">
              <v-btn class="d-flex justify-center align-center" @click="login" color="primary" width="25%">
                Masuk
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
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login(){
      this.$store.dispatch('userLogin', {username: this.username, password: this.password})
    }
  }
}
</script>
