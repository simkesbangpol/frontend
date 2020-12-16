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
                              v-for="(item, key) in filteredProfile"
                              :key="'profile'+key"
                          >
                            <td style="background: #e3e3e3; width: 300px; font-weight: bold;">{{ item.title }}</td>
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
        <Breadcrumbs :dataBreadcrumbs='breadcrumbsItems'/>
      </v-col>
        <v-col cols="12" align-self="baseline">
            <h5 class="subheading black--text"><v-icon>mdi-account</v-icon>Diposting oleh <a @click="showModal = true">
              {{ this.report !== {} ? this.report.user.name : ''}}
            </a></h5>
            <h5 class="subheading black--text"><v-icon>mdi-calendar-edit</v-icon>
              {{ this.report.parsed_date }}
            </h5>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                        <tr
                            v-for="(item, key) in filteredReport"
                            :key="key"
                        >
                            <td style="background: #e3e3e3; width: 300px; font-weight: bold;">{{ item.title }}</td>
                            <td>{{ item.desc }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-row>
              <v-col md="8" cols="12">
                <v-btn class="mt-5" outlined color="indigo" @click="downloadFile"><v-icon>mdi-download</v-icon>Unduh File</v-btn>
              </v-col>
              <v-col md="3" cols="12">
                <v-select
                    class="mr-4"
                    label="Status Laporan"
                    v-model="selectedStatus"
                    :items="statusList"
                    :menu-props="{ offsetY: true }"
                ></v-select>
              </v-col>
              <v-col md="1" cols="12">
                <v-btn color="primary" @click="updateStatus">Simpan</v-btn>
              </v-col>
            </v-row>
        </v-col>
        <Snackbar :dataSnackbar="dataSnackbar" />
    </v-row>
  </v-container>
</template>

<script>
import client from '@/axios'
import Breadcrumbs from '../components/Breadcrumbs'
import Snackbar from '../components/Snackbar'

export default {
    name: 'DetailLaporan',
    components: {
      Breadcrumbs,
      Snackbar,
    },
    data () {
        return {
          breadcrumbsItems: [
              {
                text: 'Data Laporan Kejadian',
                disabled: false,
                to: '/lihat-laporan',
                name: 'LihatLaporan',
              },
              {
                text: 'Detail Laporan Kejadian',
                disabled: true,
                to: '#',
                name: '',
              },
          ],
          report: {
            status: 0
          },
          filteredReport: {},
          filteredProfile: {},
            showModal: false,
          statusList: [
            { text: "Belum diproses", value: 0 },
            { text: "Sedang diproses", value: 1 },
            { text: "Selesai", value: 2 },
            { text: "Ditolak", value: 3 },
          ],
          selectedStatus: 0,
          shownReportProps: [
            'title',
            'fact',
            'date',
            'location',
            'description',
            'action',
            'recommendation',
            'parsed_status',
            'category'
          ],
          shownUserProps: [
            'email',
            'name',
            'address',
            'phone_number'
          ],
          dataSnackbar: {
              showSnackbar: false,
              timeoutSnackbar: 0,
              message: "",
              textButton: "",
              colorSnackbar: "",
              colorButton: "",
          },
        }
    },
  mounted(){
    this.fetchReport()
  },
  methods: {
      fetchReport(){
        this.$store.dispatch('setLoadings', {isLoading: true})
        client.get(`reports/${this.$route.params.id}`)
        .then(response => {
          this.$store.dispatch('setLoadings', {isLoading: false})
          if (response.status === 200) {
            this.report = response.data.data
            this.getDetailReport()
          } else {
            this.dataSnackbar.showSnackbar = true
            this.dataSnackbar.message = "Data gagal diperbarui ! "
            this.dataSnackbar.textButton = "Tutup"
            this.dataSnackbar.colorSnackbar = "error"
            this.dataSnackbar.colorButton = "error"
          }
        })
        .catch((err) => {
            this.$store.dispatch('setLoadings', {isLoading: false})
            this.dataSnackbar.showSnackbar = true
            this.dataSnackbar.message = `Data gagal diperbarui ! ${err}`
            this.dataSnackbar.textButton = "Tutup"
            this.dataSnackbar.colorSnackbar = "error"
            this.dataSnackbar.colorButton = "error"
        })
      },
    getDetailReport(){
        this.filteredReport = [
            {title: "Judul", desc: this.report.title},
            {title: "Kategori Laporan", desc: this.report.category.name},
            {title: "Fakta", desc: this.report.fact},
            {title: "Tanggal Kejadian", desc: this.report.date},
            {title: "Wilayah Kejadian", desc: this.report.location+", "+this.report.village_id},
            {title: "Tindakan", desc: this.report.action},
            {title: "Rekomendasi", desc: this.report.recommendation},
        ]
        this.filteredProfile = [
            {title: "Nama", desc: this.report.user.name},
            {title: "Username", desc: this.report.user.username},
            {title: "Email", desc: this.report.user.email},
            {title: "No Telp", desc: this.report.user.phone_number},
            {title: "Alamat", desc: this.report.user.address+", "+this.report.user.village_id},
        ]
        this.selectedStatus = this.report.status
    },
    downloadFile(){
        window.location = client.defaults.baseURL+this.report.file.substring(1)
    },
    updateStatus(){
      this.$store.dispatch('setLoadings', {isLoading: true})
      client.patch(`reports/${this.$route.params.id}`, {status: this.selectedStatus})
      .then(response => {
        this.$store.dispatch('setLoadings', {isLoading: false})
        if (response.status === 200) {
          this.report = response.data.data
          this.dataSnackbar.showSnackbar = true
          this.dataSnackbar.message = `Data berhasil diperbarui !`
          this.dataSnackbar.textButton = "Tutup"
          this.dataSnackbar.colorSnackbar = "success"
          this.dataSnackbar.colorButton = "error"
          this.dataSnackbar.timeoutSnackbar = 3000
          this.getDetailReport()
        } else {
          this.dataSnackbar.showSnackbar = true
          this.dataSnackbar.message = `Data gagal diperbarui !`
          this.dataSnackbar.textButton = "Tutup"
          this.dataSnackbar.colorSnackbar = "error"
          this.dataSnackbar.colorButton = "error"
          this.dataSnackbar.timeoutSnackbar = 3000
        }
      })
      .catch((err) => {
          this.$store.dispatch('setLoadings', {isLoading: false})
          this.dataSnackbar.showSnackbar = true
          this.dataSnackbar.message = `Data gagal diperbarui ! ${err}`
          this.dataSnackbar.textButton = "Tutup"
          this.dataSnackbar.colorSnackbar = "error"
          this.dataSnackbar.colorButton = "error"
          this.dataSnackbar.timeoutSnackbar = 3000
      })
    }
  }
}
</script>