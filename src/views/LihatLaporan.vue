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
                <v-btn color="primary" text @click="{}">
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
                <v-btn color="primary" text @click="{}">
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
