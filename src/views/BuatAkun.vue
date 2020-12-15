<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-form
          ref="form"
          v-model="isFormValid"
          @submit.prevent="onSubmit"
        >
          <Breadcrumbs :dataBreadcrumbs='breadcrumbsItems'/>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-home-city" label="Nama" outlined v-model="user.name" :rules="fieldRules"></v-text-field>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-map-marker" label="Alamat" style="width: 100%" outlined v-model="user.address" :rules="fieldRules"></v-text-field>
            <v-select
              prepend-icon="mdi-blank"
              label="Kecamatan"
              outlined
              v-model="district_id"
              :items="districts"
              item-text="name"
              item-value="id"
              @change="fetchVillages"
              menu-props="auto"
              :rules="fieldRules"
            ></v-select>
            <v-select
              prepend-icon="mdi-blank"
              label="Kelurahan"
              outlined
              v-model="user.village_id"
              :items="villages"
              item-text="name"
              item-value="id"
              :loading="villageLoading"
              no-data-text="Pilih Kecamatan"
              :disabled="villages.length === 0"
              menu-props="auto"
              :rules="fieldRules"
            ></v-select>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-phone-classic" label="No Telp" outlined v-model="user.phone_number" :rules="phoneRules"></v-text-field>
          </v-row>
          <v-row class="ml-1">
              <v-text-field prepend-icon="mdi-email-plus" label="Email" outlined v-model="user.email" :rules="emailRules"></v-text-field>
          </v-row>

          <v-row class="ml-1 mt-15">
            <v-select
              prepend-icon="mdi-account-convert"
              label="Role Akses"
              outlined
              v-model="user.roles"
              :items="roleList"
              item-text="name"
              item-value="name"
              menu-props="auto"
              :rules="fieldRules"
            ></v-select>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-account-key" label="Username" outlined v-model="user.username" :rules="fieldRules"></v-text-field>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-key-variant" type="password" label="Password" outlined v-model="user.password" :rules="this.$route.params.id!==undefined ? true : fieldRules"></v-text-field>
          </v-row>

          <v-row>
            <div style="width: 100%; display: flex; justify-content: flex-end;">
              <v-btn type="submit" color="primary" width="13%" :disabled="!isFormValid">
                {{this.$route.params.id!==undefined ? "Simpan" : "Buat"}}
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
import Breadcrumbs from '../components/Breadcrumbs'

export default {
    name: 'BuatAkun',
    components: {
      Breadcrumbs
    },
    data () {
        return {
          isFormValid: false,
          phoneRules: [
            v => !!v || 'Field ini tidak boleh kosong.',
            v => Number.isInteger(Number(v)) || 'Diisi dengan angka.',
          ],
          fieldRules: [
            v => !!v || 'Field ini tidak boleh kosong.',
          ],
          emailRules: [
            v => !!v || 'Field ini tidak boleh kosong.',
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Masukkan e-mail yang valid.'
          ],
          dataSnackbar: {
            showSnackbar: false,
            timeoutSnackbar: 3000,
            message: "",
            textButton: "",
            colorSnackbar: "",
            colorButton: "",
          },
          roleList: [
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
                text: this.$route.params.id!==undefined ? 'Ubah Data Akun' : 'Form Buat Akun',
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
        if (this.district_id!==null) {
          return this.$store.getters.getVillages
        } else {
          return []
        }
      }
    },
    mounted() {
      this.$route.params.id!==undefined && this.getUserById()
      this.getRolesData()
    },
    methods: {
      getRolesData() {
        client.get('roles')
        .then(response => {
          this.roleList = response.data.data
        })
      },

      getUserById(){
          this.$store.dispatch('setLoadings', {isLoading: true})
          client.get('users/'+this.$route.params.id)
          .then(response => {
              if(response.status === 200){
                  this.user = response.data.data
                  this.user.roles = response.data.data.roles[0]
                  this.district_id = response.data.data.village.district_id
                  this.fetchVillages()
              }
          })
          .finally(() => this.$store.dispatch('setLoadings', {isLoading: false}))
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

      createAccount() {
        this.$store.dispatch('setLoadings', {isLoading: true})
        client.post('users', this.user)
          .then(() => {
            this.dataSnackbar.showSnackbar = true
            this.dataSnackbar.message = "Data baru berhasil tersimpan !"
            this.dataSnackbar.textButton = "Tutup"
            this.dataSnackbar.colorSnackbar = "success"
            this.dataSnackbar.colorButton = "error"
            this.$router.push({ name: "KelolaAkun", params: {dataSnackbar: this.dataSnackbar} })
          }).catch((err) => {
            this.dataSnackbar.showSnackbar = true
            this.dataSnackbar.message = "Data gagal tersimpan ! "+err
            this.dataSnackbar.textButton = "Tutup"
            this.dataSnackbar.colorSnackbar = "error"
            this.dataSnackbar.colorButton = "error"
          })
          .finally(() => this.$store.dispatch('setLoadings', {isLoading: false}))
      },

      updateAccount() {
        this.$store.dispatch('setLoadings', {isLoading: true})
        client.put('users/'+this.$route.params.id, this.user)
          .then(() => {
            this.dataSnackbar.showSnackbar = true
            this.dataSnackbar.message = "Data berhasil diperbarui !"
            this.dataSnackbar.textButton = "Tutup"
            this.dataSnackbar.colorSnackbar = "success"
            this.dataSnackbar.colorButton = "error"
          }).catch((err) => {
            this.dataSnackbar.showSnackbar = true
            this.dataSnackbar.message = "Data gagal diperbarui ! "+err
            this.dataSnackbar.textButton = "Tutup"
            this.dataSnackbar.colorSnackbar = "error"
            this.dataSnackbar.colorButton = "error"
          })
          .finally(() => this.$store.dispatch('setLoadings', {isLoading: false}))
      },

      onSubmit() {
        this.$route.params.id!==undefined ? this.updateAccount() : this.createAccount()
      }
    }
}
</script>
