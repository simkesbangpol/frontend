<template>
  <v-container fluid>
    <v-dialog
      v-model="showModal"
      persistent
      max-width="900px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">User Profil</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                  <v-simple-table>
                      <template v-slot:default>
                          <tbody>
                              <tr
                                  v-for="item in dataProfil"
                                  :key="item.title"
                              >
                                  <td style="background: #e3e3e3; width: 200px; font-weight: bold;">{{ item.title }}</td>
                                  <td>{{ item.desc }}</td>
                              </tr>
                          </tbody>
                      </template>
                  </v-simple-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="showModal = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
        <v-col cols="12">
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
        </v-col>
        <v-col cols="12" align-self="baseline">
            <h5 class="subheading black--text"><v-icon>mdi-account</v-icon>Diposting oleh <a @click="showModal = true">Dinas Pemadam</a></h5>
            <h5 class="subheading black--text"><v-icon>mdi-calendar-edit</v-icon>14:20, 20 Oktober 2020</h5>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                        <tr
                            v-for="item in detailReport"
                            :key="item.title"
                        >
                            <td style="background: #e3e3e3; width: 300px; font-weight: bold;">{{ item.title }}</td>
                            <td>{{ item.desc }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-btn class="mt-5" outlined color="indigo"><v-icon>mdi-download</v-icon>Unduh File</v-btn>
        </v-col>
    </v-row>
    <v-row no-gutters align="baseline">
        <v-col cols="8"/>
        <v-col md="3" cols="12">
            <v-select
                class="mr-4"
                label="Status Laporan"
                v-model="selectStatus"
                :items="statusList"
                :menu-props="{ offsetY: true }"
            ></v-select>
        </v-col>
        <v-col md="1" cols="12">
            <v-btn color="primary">Simpan</v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'DetailLaporan',
    components: {
    },
    data () {
        return {
            showModal: false,
            detailReport: [
                {title: "Kategori", desc:"test kategori"},
                {title: "Fakta", desc:"test fakta"},
                {title: "Tanggal Kejadian", desc:"test tgl"},
                {title: "Wilayah", desc:"test wilayah"},
            ],
            dataProfil: [
                {title: "Nama", desc:"Dinas Pemadam"},
                {title: "Alamat", desc:"Jl Terusan Buah Batu"},
                {title: "No Telp", desc:"021 78555 544"},
                {title: "Email", desc:"test@wila.yah"},
            ],
            statusList: ['Belum diproses', 'Sedang diproses', 'Selesai', 'Ditolak'],
            selectStatus: 'Belum diproses',
            breadcrumbsItems: [
                {
                text: 'Data Laporan Kejadian',
                disabled: false,
                to: '/lihat-laporan',
                },
                {
                text: 'Detail Laporan',
                disabled: true,
                to: '#',
                },
            ],
        }
    },
    methods: {
        navigateToLihatLaporan() {
            this.$router.push({ path: "/lihat-laporan" });
        }
    },
}
</script>