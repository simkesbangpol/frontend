<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col cols="12" lg="6" style="background: #03adfc;">
        <v-row class="fill-height align-content-center">
          <v-col cols="12">
            <div class="text-center text-lg-h5 text-h6">Selamat Datang di Halaman Login Sistem Informasi Pelaporan</div>
          </v-col>
          <v-col cols="12">
            <v-img class="mx-auto" src="@/assets/logo_kabupatentangerang.png" max-width="95" />
          </v-col>
          <v-col cols="12">
            <h2 class="text-center text-lg-h5 text-sm-h6 text-subtitle-1">Badan Kesatuan Bangsa dan Politik (Kesbangpol)<br/>Kabupaten Tangerang</h2>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="6">
        <v-form
            ref="form"
            @submit.prevent="submit"
        >
          <v-row>
            <v-col cols="12">
              <h3 class="text-center mb-5"><v-icon left>mdi-lock</v-icon>Login</h3>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-account" label="Username" v-model="username" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-key-variant" type="password" v-model="password" label="Password" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn block type="submit" color="primary">
                Masuk
              </v-btn>
            </v-col>
            <v-row>
              <div style="width: 100%; display: flex; justify-content: center;">
              </div>
            </v-row>
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
    submit(){
      this.$store.dispatch('userLogin', {username: this.username, password: this.password})
    }
  }
}
</script>
