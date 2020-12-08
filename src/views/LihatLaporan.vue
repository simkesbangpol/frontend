<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 class="subheading black--text">Data Laporan Kejadian</h1>
        <v-data-table
          :headers="headers"
          :items="eventReports"
          :items-per-page="5"
          :search="search"
          :custom-filter="filterOnlyCapsText"
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
                  label="Search"
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
      persistent
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
                    <v-date-picker v-model="dates" scrollable range>
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
                  :items="kategoriList"
                  label="Kategori"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
              >
                <v-select
                  :items="statusList"
                  label="Status"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Kecamatan"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Kelurahan"
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
            @click="showFilterModal = false"
          >
            Tutup
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="showFilterModal = false"
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
                  multiple
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
// @ is an alias to /src

export default {
  name: 'LihatLaporan',
  components: {
  },
  data () {
    return {
      showFilterModal: false,
      showImportModal: false,
      dateModal: false,
      dates: [],
      statusList: ['Belum diproses', 'Sedang diproses', 'Selesai', 'Ditolak'],
      kategoriList: ['Ideologi', 'Politik', 'Ekonomi', 'Sosial', 'Budaya'],
      search: '',
      headers: [
        {
          text: 'Kategori',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Laporan', sortable: false, value: 'laporan' },
        { text: 'Tanggal Kejadian', sortable: false, value: 'tgl_kejadian' },
        { text: 'Status', sortable: false, value: 'status' },
        { text: 'Actions', sortable: false, value: 'actions' },
      ],
      eventReports: [
        {
          name: 'Frozen Yogurt',
          laporan: 159,
          tgl_kejadian: 6.0,
          status: 24,
        },
        {
          name: 'Ice cream sandwich',
          laporan: 237,
          tgl_kejadian: 9.0,
          status: 37,
        },
        {
          name: 'Eclair',
          laporan: 262,
          tgl_kejadian: 16.0,
          status: 23,
        },
        {
          name: 'Cupcake',
          laporan: 305,
          tgl_kejadian: 3.7,
          status: 67,
        },
        {
          name: 'Gingerbread',
          laporan: 356,
          tgl_kejadian: 16.0,
          status: 49,
        },
        {
          name: 'Jelly bean',
          laporan: 375,
          tgl_kejadian: 0.0,
          status: 94,
        },
        {
          name: 'Lollipop',
          laporan: 392,
          tgl_kejadian: 0.2,
          status: 98,
        },
        {
          name: 'Honeycomb',
          laporan: 408,
          tgl_kejadian: 3.2,
          status: 87,
        },
        {
          name: 'Donut',
          laporan: 452,
          tgl_kejadian: 25.0,
          status: 51,
        },
        {
          name: 'KitKat',
          laporan: 518,
          tgl_kejadian: 26.0,
          status: 65,
        },
      ],
    }
  },
  computed: {
    dateRangeText () {
      return this.dates.join('  ~  ')
    },
  },
  methods: {
    filterOnlyCapsText (value, search) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
  },
}
</script>
