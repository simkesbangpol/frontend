<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Data Akun</h1>
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
          :search="search"
          :custom-filter="filterOnlyCapsText"
          class="elevation-6"
          :loading="tableLoading"
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
              
              <v-btn @click="onClickDelete(item)" color="error" icon>
                <v-icon >
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
      
      <v-dialog
        ref="dialog"
        v-model="showModalDelete"
        persistent
        width="35%"
      >

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
              @click="deleteUser(itemSelected)"
            >
              Hapus
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      <Snackbar :dataSnackbar='dataSnackbar' />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import client from '@/axios'
import Snackbar from '../components/Snackbar'

export default {
  name: 'KelolaAkun',
  components: {
    Snackbar,
  },
  data () {
    return {
      tableLoading: false,
      itemSelected: "",
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
      users: []
    }
  },
  mounted() {
    if (this.$route.params.dataSnackbar) {
      this.dataSnackbar = this.$route.params.dataSnackbar
    }
    this.fetchUsers()
  },
  methods: {
    onClickDelete(item) {
      this.itemSelected=item
      this.showModalDelete=true
    },

    fetchUsers(){
      this.tableLoading = true
      client.get('users')
      .then(response => {
        this.tableLoading = false
        if(response.status === 200){
          this.users = response.data.data
        } else {
          this.dataSnackbar.showSnackbar = true
          this.dataSnackbar.message = "Data gagal diperbarui !"
          this.dataSnackbar.textButton = "Tutup"
          this.dataSnackbar.colorSnackbar = "error"
          this.dataSnackbar.colorButton = "error"
          this.dataSnackbar.timeoutSnackbar = 0
        }
      })
      .catch((err) => {
        this.tableLoading = false
        this.dataSnackbar.showSnackbar = true
        this.dataSnackbar.message = `Data gagal diperbarui ! ${err}`
        this.dataSnackbar.textButton = "Tutup"
        this.dataSnackbar.colorSnackbar = "error"
        this.dataSnackbar.colorButton = "error"
        this.dataSnackbar.timeoutSnackbar = 0
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
