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
              <v-text-field prepend-icon="mdi-account" label="Username" v-model="username" outlined @focus="isLoginSuccess=true" :rules="[isLoginSuccess]" />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-key-variant" type="password" v-model="password" label="Password" outlined @focus="isLoginSuccess=true" :rules="[isLoginSuccess || 'Username dan password anda salah !']" />
            </v-col>
            <v-col cols="12">
              <v-btn :loading="isLoading" block type="submit" color="primary">
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
    <Snackbar :dataSnackbar='dataSnackbar' />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import client from '@/axios'
import Snackbar from '../components/Snackbar'

export default {
  name: 'Login',
  components: {
    Snackbar,
  },
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      isLoginSuccess: true,
      dataSnackbar: {
        showSnackbar: false,
        timeoutSnackbar: 2000,
        message: "",
        textButton: "",
        colorSnackbar: "",
        colorButton: "",
      },
    }
  },
  methods: {
    submit(){
      this.isLoading=true
      client.post('auth',{
        username: this.username,
        password: this.password
      })
      .then(response => {
        this.isLoading=false
        if(response.status === 200){
          this.$store.dispatch('userLogin', {response})
          this.$router.push({ name: 'Home' })
        } else {
          this.isLoginSuccess=false
          this.dataSnackbar.showSnackbar = true
          this.dataSnackbar.message = "Login gagal !"
          this.dataSnackbar.textButton = "Tutup"
          this.dataSnackbar.colorSnackbar = "error"
          this.dataSnackbar.colorButton = "error"
        }
      })
      .catch(()=>{
        this.isLoginSuccess=false
        this.isLoading=false
        this.dataSnackbar.showSnackbar = true
        this.dataSnackbar.message = "Login gagal !"
        this.dataSnackbar.textButton = "Tutup"
        this.dataSnackbar.colorSnackbar = "error"
        this.dataSnackbar.colorButton = "error"
      })
    }
  }
}
</script>
