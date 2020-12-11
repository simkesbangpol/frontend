<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-form
          ref="form"
          @submit.prevent="createAccount"
        >
          <v-breadcrumbs style="padding: 0;"  large light :items="breadcrumbsItems">
              <template style="background: red;" v-slot:item="{ item }">
                  <v-breadcrumbs-item
                      :to="item.to"
                      :disabled="item.disabled"
                  >
                      <h1>{{ item.text }}</h1>
                  </v-breadcrumbs-item>
              </template>
          </v-breadcrumbs>
          
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-home-city" label="Nama" outlined v-model="user.name"></v-text-field>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-map-marker" label="Alamat" style="width: 100%" outlined v-model="user.address"></v-text-field>
            <v-select
              prepend-icon="mdi-blank"
              style="margin-bottom: 30px;"
              label="Kecamatan"
              outlined
              v-model="district_id"
              :items="districts"
              item-text="name"
              item-value="id"
              @change="fetchVillages"
              :placeholder="this.$route.params.id!==undefined && this.user.district.name"
              menu-props="auto"
              hide-details
            ></v-select>
            <v-select
              prepend-icon="mdi-blank"
              style="margin-bottom: 30px;"
              label="Kelurahan"
              outlined
              v-model="user.village_id"
              :items="villages"
              item-text="name"
              item-value="id"
              :loading="villageLoading"
              no-data-text="Pilih Kecamatan"
              :disabled="this.$route.params.id!==undefined ? false : (villages.length === 0)"
              :placeholder="this.$route.params.id!==undefined && this.user.village.name"
              menu-props="auto"
              hide-details
            ></v-select>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-phone-classic" label="No Telp" outlined v-model="user.phone_number"></v-text-field>
          </v-row>
          <v-row class="ml-1">
              <v-text-field prepend-icon="mdi-email-plus" label="Email" outlined v-model="user.email"></v-text-field>
          </v-row>

          <v-row class="ml-1" style="margin-top: 90px;">
            <v-text-field prepend-icon="mdi-account-key" label="Username" outlined v-model="user.username"></v-text-field>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-key-variant" type="password" label="Password" outlined v-model="user.password"></v-text-field>
          </v-row>
          <v-row class="ml-1">
            <v-select
              prepend-icon="mdi-account-convert"
              style="margin-bottom: 30px;"
              label="Role Akses"
              outlined
              v-model="user.roles"
              :items="roleList"
              item-text="name"
              item-value="role"
              menu-props="auto"
              hide-details
            ></v-select>
          </v-row>

          <v-row>
            <div style="width: 100%; display: flex; justify-content: flex-end;">
              <v-btn type="submit" color="primary" width="13%">
                Simpan
              </v-btn>
            </div>
          </v-row>
        </v-form>
      </v-col>

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
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import client from '@/axios'

export default {
    name: 'BuatAkun',
    components: {
    },
    data () {
        return {
          dataSnackbar: {
            showSnackbar: false,
            timeoutSnackbar: 3000,
            message: "",
            textButton: "",
            colorSnackbar: "",
            colorButton: "",
          },
          roleList: [
            {name:'Admin', role: 'admin'},
            {name:'Executive', role: 'pegawai'},
            {name:'Operational', role: 'user'},
          ],
          user: {
            username: "",
            email: "",
            name: "",
            address: "",
            phone_number: "",
            password: "",
            village_id: null,
            roles:"",
          },
          breadcrumbsItems: [
              {
              text: 'Data Akun',
              disabled: false,
              to: '/kelola-akun',
              },
              {
              text: this.$route.params.id!==undefined || this.$route.params.id!==null ? 'Ubah Data Akun' : 'Form Buat Akun',
              disabled: true,
              to: '#',
              },
          ],
          villageLoading: false,
          district_id: null,
        }
    },
    created(){
      this.$store.dispatch('fetchDistricts')
    },
    computed: {
      districts() {
        return this.$store.getters.getDistricts
      },
      villages() {
        return this.$store.getters.getVillages
      }
    },
    mounted() {
      (this.$route.params.id!==undefined || this.$route.params.id!==null) && this.getUserById()
    },
    methods: {
      getUserById(){
          client.get('users/'+this.$route.params.id)
          .then(response => {
              if(response.status === 200){
                  this.user = response.data.data
              }
          })
      },

      fetchUsers(){
        client.get('users').then(response => {
          if(response.status === 200){
            this.users = response.data.data
          }
        })
      },

      fetchVillages() {
        this.villageLoading = true
        this.$store.dispatch('fetchVillages', { district_id: this.district_id })
        .then(() => {
          this.villageLoading = false
        }).catch(() => {
          this.villageLoading = false
        })
      },

      resetForm(){
          this.user = {
            username: "",
            email: "",
            name: "",
            address: "",
            phone_number: "",
            password: "",
            village_id: null,
            roles:"",
          }
      },

      createAccount() {
        client.post('users', this.user)
          .then(() => {
            // if(response.data.status){
              this.dataSnackbar.showSnackbar = true
              this.dataSnackbar.message = "Data berhasil tersimpan !"
              this.dataSnackbar.textButton = "Tutup"
              this.dataSnackbar.colorSnackbar = "success"
              this.dataSnackbar.colorButton = "error"
              this.resetForm()
            // }
          }).catch((err) => {
            this.dataSnackbar.showSnackbar = true
            this.dataSnackbar.message = "Data gagal tersimpan ! "+err
            this.dataSnackbar.textButton = "Tutup"
            this.dataSnackbar.colorSnackbar = "error"
            this.dataSnackbar.colorButton = "error"
          })
      }
    }
}
</script>
