<template>
  <v-container fluid>
    <v-row>
      <v-col>
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
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
          :search="search"
          :custom-filter="filterOnlyCapsText"
          class="elevation-6"
        >
          <template v-slot:top>
            <v-row no-gutters class="mr-1 ml-1" align="baseline">
              <v-col md="10" cols="12">
                <v-btn color="primary" to="/buat-akun" @click="{}">
                  <v-icon >mdi-account-plus</v-icon>
                  Tambah
                </v-btn>
              </v-col>
              <v-col md="2" cols="12" class="mt-2">
                <v-text-field
                  dense
                  outlined
                  append-icon="mdi-table-search"
                  v-model="search"
                  label="Search"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          
          <template v-slot:item.actions="{ item }">
            <v-row align="center">
              <v-btn color="primary" :to="'/detail-akun/'+item.id" icon @click="{}">
                <v-icon >
                  mdi-eye
                </v-icon>
              </v-btn>
              <v-btn icon @click="{}" :to="'/ubah-akun/'+item.id">
                <v-icon >
                  mdi-account-edit
                </v-icon>
              </v-btn>
              
              <v-dialog
                ref="dialog"
                v-model="showModalDelete"
                persistent
                width="35%"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" color="error" icon>
                    <v-icon >
                      mdi-trash-can-outline
                    </v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    Apakah anda ingin menghapus akun ini ?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      @click="showModalDelete = false"
                    >
                      Batal
                    </v-btn>
                    <v-btn
                      color="error darken-1"
                      @click="deleteUser(item)"
                    >
                      Hapus
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
      
      <v-snackbar
        top
        :color="dataSnackbar.colorSnackbar"
        v-model="dataSnackbar.showSnackbar"
        :timeout="dataSnackbar.timeoutSnackbar"
      >
        {{ dataSnackbar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn
            :color="dataSnackbar.colorButton"
            v-bind="attrs"
            @click="()=>{dataSnackbar.showSnackbar = false}"
          >
            {{ dataSnackbar.textButton }}
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
  name: 'KelolaAkun',
  components: {
  },
  data () {
    return {
      dataSnackbar: {
        showSnackbar: false,
        timeoutSnackbar: 2000,
        message: "",
        textButton: "",
        colorSnackbar: "",
        colorButton: "",
      },
      showModalDelete: false,
      search: '',
      headers: [
        {
          text: 'Nama',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', sortable: false, value: 'email' },
        { text: 'No Telp', sortable: false, value: 'phone_number' },
        { text: 'Aksi', sortable: false, value: 'actions' },
      ],
      breadcrumbsItems: [
          {
          text: 'Data Akun',
          disabled: true,
          to: '#',
          },
      ],
      users: []
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers(){
      client.get('users').then(response => {
        if(response.status === 200){
          this.users = response.data.data
        }
      })
    },
    deleteUser(dataUser) {
      const id = dataUser.id
      client.delete('users/'+id)
        .then(() => {
          this.fetchUsers()
          this.showModalDelete = false
          this.dataSnackbar.showSnackbar = true
          this.dataSnackbar.message = "Data berhasil terhapus !"
          this.dataSnackbar.textButton = "Tutup"
          this.dataSnackbar.colorSnackbar = "success"
          this.dataSnackbar.colorButton = "error"
        }).catch(() => {
          this.showModalDelete = false
          this.dataSnackbar.showSnackbar = true
          this.dataSnackbar.message = "Data gagal terhapus !"
          this.dataSnackbar.textButton = "Tutup"
          this.dataSnackbar.colorSnackbar = "error"
          this.dataSnackbar.colorButton = "error"
        })
    }
  }
}
</script>
