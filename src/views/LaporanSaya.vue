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
          :items="desserts"
          :items-per-page="5"
          class="elevation-6"
        >
          <template v-slot:item.actions>
            <v-row align="center">
              <v-btn color="primary" text @click="{}">
                <v-icon left >
                  mdi-square-edit-outline
                </v-icon>
                Ubah
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
    name: 'LaporanSaya',
    components: {
    },
    data () {
      return {
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
        desserts: [
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
        breadcrumbsItems: [
            {
            text: 'Data Laporan Saya',
            disabled: true,
            to: '#',
            },
        ],
      }
    },
  }
</script>