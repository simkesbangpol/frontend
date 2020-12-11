<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="text-h2">Data Laporan Kejadian</div>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="reports"
          :items-per-page="perPage"
          :search="search"
          :custom-filter="searchReport"
          :options.sync="options"
          :loading="tableLoading"
          :server-items-length="totalItems"
          :footer-props="{
            itemsPerPageOptions: [5, 10, 15]
          }"
          class="elevation-6"
        >
          <template v-slot:top>
            <v-row no-gutters class="mr-1 ml-1" align="baseline">
              <v-col md="1" cols="12">
                <v-btn color="primary" text @click="{}">
                  <v-icon left >
                    mdi-file-export
                  </v-icon>
                  Export
                </v-btn>
              </v-col>
              <v-col md="8" cols="12">
                <v-btn color="primary" text @click="showImportModal=true">
                  <v-icon left >
                    mdi-file-import
                  </v-icon>
                  Import
                </v-btn>
              </v-col>
              <v-col md="2" cols="12" class="mt-2">
                <v-text-field
                  dense
                  outlined
                  append-icon="mdi-table-search"
                  v-model="search"
                  label="Cari (minimal 4 karakter)"
                ></v-text-field>
              </v-col>
              <v-col md="1" cols="12">
                <v-btn color="primary" text @click="showFilterModal=true">
                  <v-icon left >
                    mdi-filter
                  </v-icon>
                  Filter
                </v-btn>
              </v-col>
            </v-row>
          </template>
          
          <template v-slot:item.actions>
            <v-row align="center">
              <v-btn color="primary" to="/detail-laporan" text @click="{}">
                <v-icon left >
                  mdi-file-document-outline
                </v-icon>
                Detail
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog
      v-model="showFilterModal"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Parameter Filter</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- <div style="display: flex;"> -->
                <v-col cols="12">
                  <v-dialog
                    ref="dialog"
                    v-model="dateModal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label="Rentang Tanggal"
                        v-model="dateRangeText"
                        append-outer-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dates" scrollable range :min="getMinDate()">
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="dates = []" >
                        Ulang
                      </v-btn>
                      <v-btn text color="error" @click="dateModal = false" >
                        Batal
                      </v-btn>
                      <v-btn text color="success" @click="$refs.dialog.save(dates)" >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              <!-- </div> -->

              <v-col
                cols="12"
              >
                <v-select
                  :items="categories"
                  label="Kategori"
                  item-text="name"
                  item-value="id"
                  v-model="filter.category_id"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
              >
                <v-select
                  :items="statuses"
                  label="Status"
                  item-value="id"
                  item-text="text"
                  v-model="filter.status"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
              >
                <v-select
                  :items="districts"
                  label="Kecamatan"
                  item-text="name"
                  item-value="id"
                  v-model="filter.district_id"
                  @change="districtChange"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
              >
                <v-select
                  :items="villages"
                  label="Kelurahan"
                  :disabled="villages.length === 0"
                  item-text="name"
                  item-value="id"
                  v-model="filter.village_id"
                  :loading="villageLoading"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="resetFilter"
          >
            Reset
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="doFilter"
          >
            Filter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="showImportModal"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Import File</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="files"
                  counter
                  label="File input"
                  placeholder="Select your files (xls, xlsx, etc)"
                  prepend-icon="mdi-paperclip"
                  outlined
                  :show-size="1000"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip v-if="index < 2" dark label small >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="overline grey--text text--darken-3 mx-2"
                    >
                      +{{ files.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="showImportModal = false"
          >
            Tutup
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="showImportModal = false"
          >
            Import
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import client from '@/axios'

export default {
  name: 'LihatLaporan',
  components: {
  },
  data () {
    return {
      showFilterModal: false,
      showImportModal: false,
      dateModal: false,
      isFiltered: false,
      isSearching: false,
      dates: [],
      search: '',
      awaitingSearch: false,
      statuses: [
        {id: 0, text: "Belum diproses"},
        {id: 1, text: "Sedang diproses"},
        {id: 2, text: "Selesai"},
        {id: 3, text: "Ditolak"},
      ],
      headers: [
        {
          text: 'Kategori',
          align: 'start',
          sortable: false,
          value: 'category.name',
        },
        { text: 'Laporan', sortable: false, value: 'title' },
        { text: 'Tanggal Kejadian', sortable: false, value: 'date' },
        { text: 'Status', sortable: false, value: 'status' },
        { text: 'Actions', sortable: false, value: 'actions' },
      ],
      options: {},
      perPage: 15,
      totalItems: -1,
      reports: [],
      pagination: {},
      tableLoading: false,
      villageLoading: false,
      filter: {
        date_start: null,
        date_end: null,
        category_id: null,
        status: null,
        village_id: null,
      },
      files: [],
      date: ''
    }
  },
  computed: {
    dateRangeText () {
      return this.dates.join('  ~  ')
    },
    categories() {
      return this.$store.getters.getReportCategories
    },
    districts() {
      return this.$store.getters.getDistricts
    },
    villages(){
      return this.$store.getters.getVillages
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchReports()
      }
    },
    search: {
      handler() {
        this.searchReport()
      }
    }
  },
  mounted() {
    this.fetchReports()
  },
  methods: {
    doFilter(){
      this.filter.date_start = this.dates[0]
      this.filter.date_end = this.dates[1]
      this.isFiltered = true
      this.showFilterModal = false
      this.fetchReports()
    },
    resetFilter(){
      this.filter = {
        date_start: null,
        date_end: null,
        category_id: null,
        status: null,
        village_id: null,
      }
      this.isFiltered = false
      this.showFilterModal = false
      this.fetchReports()
    },
    searchReport(){
      if(!this.awaitingSearch ){
        setTimeout(() => {
          this.isSearching = this.search.length > 3
          if(this.search.length > 3){
            this.fetchReports()
          } else if(this.search.length === 0){
            this.fetchReports()
          }
          this.awaitingSearch = false
        }, 1500)
      }
      this.awaitingSearch = true
    },
    getMinDate(){
      if(this.dates.length === 2)
        return ''
      else
        return this.dates[0]
    },
    fetchReports(){
      this.tableLoading = true;
      const { page, itemsPerPage } = this.options
      client.get('reports', {
        params: {
          page: page,
          perPage: itemsPerPage,
          ...(this.isFiltered ? this.filter : {}),
          ...(this.isSearching ? { search: this.search } : {})
        }
      }).then(response => {
        this.reports = response.data.data.data
        this.totalItems = response.data.data.total
        delete response.data.data.data
        this.pagination = response.data.data
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      })
    },
    districtChange(){
      this.villageLoading = true
      this.$store.dispatch('fetchVillages', { district_id: this.filter.district_id }).then(() => {
        this.villageLoading = false
      }).catch(() => {
        this.villageLoading = false
      })
    }
  },
}
</script>
