<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>Laporan Saya</h1>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="reports"
          :items-per-page="5"
          class="elevation-6"
          :loading="tableLoading"
        >
          <template v-slot:item.actions="{ item }">
            <v-row align="center">
              <v-btn color="primary" text :to="'/ubah-laporan-saya/'+item.id">
                <v-icon left >
                  mdi-square-edit-outline
                </v-icon>
                Ubah
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
      </v-col>

      <Snackbar :dataSnackbar='dataSnackbar' />
    </v-row>
  </v-container>
</template>

<script>
import client from '@/axios'
import Snackbar from '../components/Snackbar'

  export default {
    name: 'LaporanSaya',
    components: {
      Snackbar,
    },
    data () {
      return {
        headers: [
          {
            text: 'Kategori',
            align: 'start',
            sortable: false,
            value: 'category.name',
          },
          { text: 'Laporan', sortable: false, value: 'title' },
          { text: 'Tanggal Kejadian', sortable: false, value: 'date' },
          { text: 'Status', sortable: false, value: 'parsed_status' },
          { text: 'Actions', sortable: false, value: 'actions' },
        ],
        reports: [],
        pagination: {},
        tableLoading: false,
        dataSnackbar: {
          showSnackbar: false,
          timeoutSnackbar: 3000,
          message: "",
          textButton: "",
          colorSnackbar: "",
          colorButton: "",
        },
      }
    },
    mounted() {
      this.fetchUserReports()
    },
    methods: {
      fetchUserReports(){
        this.tableLoading = true;
        client.get('auth/reports').then(response => {
          if (this.$route.params.dataSnackbar) this.dataSnackbar=this.$route.params.dataSnackbar
          this.reports = response.data.data.data
          delete response.data.data.data
          this.pagination = response.data.data
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      }
    }
  }
</script>