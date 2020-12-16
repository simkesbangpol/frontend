<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card color="#d4d4d4">
          <v-card-title>
            <h3>Selamat Datang di Sistem Aplikasi Pelaporan</h3>
          </v-card-title>
          <v-card-text>
            <h5 class="black--text">
              Sistem aplikasi pelaporan ini adalah sistem untuk merekap seluruh laporan gangguan yang berkaitan dengan ideologi,
              politik, ekonomi, sosial, dan budaya di lingkungan Kabupaten Tangerang.
            </h5>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              elevation="2"
              to= "/buat-laporan"
            >Buat Laporan</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
      <v-col v-if="this.$store.getters.getRoles[0]!=='user'" cols="12">
        <v-card color="#d4d4d4">
          <v-card-title>
            <v-row>
              <v-col cols="12" lg="6">
                <h3>Jumlah Laporan Kejadian</h3>
              </v-col>
              <v-col cols="12" lg="6">
                <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        placeholder="Tanggal"
                        solo
                        v-model="dateRangeText"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dates" scrollable range>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dates = []" >
                      Ulang
                    </v-btn>
                    <v-btn text color="error" @click="modal = false" >
                      Batal
                    </v-btn>
                    <v-btn text color="success" @click="$refs.dialog.save(dates)" >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>

          </v-card-title>
          <v-card-text>
            <v-row class="d-flex flex-wrap flex-row">
                <v-flex v-for="(category, index) in categories" :key="index" >
                  <v-card class="text-center ma-3" router :disabled="category.unprocessed_count===0" :to="'/lihat-laporan'" style="text-decoration: none;">
                    <div>
                      <v-icon size="80" :color="colorSentIcon[index]">mdi-send mdi-rotate-315</v-icon>
                    </div>
                    <v-card-text>
                      <h5 style="color: black; font-weight: bold; font-size: 30px">{{category.unprocessed_count}}</h5>
                      <h5 style="color: black; font-weight: 500; font-size: 15px">{{category.name}}</h5>
                    </v-card-text>
                  </v-card>
                </v-flex>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col v-if="this.$store.getters.getRoles[0]!=='user'" cols="12">
        <v-row>
          <v-col cols="12" lg="6" v-for="tableData in tables" :key="tableData.title" class="table-container">
            <div style="background: #d4d4d4; border-radius: 5px;" >
              <v-card-title><v-icon class="mr-2">{{tableData.icon}}</v-icon>{{tableData.title}}</v-card-title>
              <v-data-table
                style="background: #d4d4d4;"
                dense
                :headers="headers"
                :hide-default-header="true"
                :hide-default-footer="true"
                :items="tableData.reports"
                item-key="name"
              ><router-link to="/lihat-laporan"></router-link></v-data-table>
              <v-card-actions>
                <v-btn text color="primary" style="text-transform: none;" :to="tableData.route">Selengkapnya ...</v-btn>
              </v-card-actions>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import client from '@/axios'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      categories: [],
      colorSentIcon: ['blue', 'yellow', 'green', 'orange', 'red'],
      latestReports: [],
      onProgressReports: [],
      reports: [],
      tables: [
        {title: 'Laporan Terbaru', reports: [], icon: 'mdi-message-alert', route: '/lihat-laporan'},
        {title: 'Laporan Sedang Diproses', reports: [], icon: 'mdi-message-processing', route: '/lihat-laporan'},
      ],
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
      ],
      dates: [],
      modal: false,
    }
  },
  computed: {
    dateRangeText () {
      return this.dates.join('  ~  ')
    },
  },
  mounted() {
    this.$store.dispatch('setLoadings', {isLoading: true})
    this.fetchSummary()
  },
  methods: {
    fetchSummary(){
      client.get('dashboard/summary')
      .then(response => {
        this.categories = response.data.data
      })
      .finally(() => this.fetchLatestReports())
    },
    fetchLatestReports(){
      client.get('dashboard/reports/status/0')
      .then(response => {
        this.tables[0].reports = response.data.data.data
      })
      .finally(() => this.fetchOnProgressReports())
    },
    fetchOnProgressReports(){
      client.get('dashboard/reports/status/1').then(response => {
        this.tables[1].reports = response.data.data.data
        this.$store.dispatch('setLoadings', {isLoading: false})
      })
    }
  }
}

</script>

<style>

</style>
