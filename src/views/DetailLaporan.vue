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
                            <td style="background: #e3e3e3; width: 300px; font-weight: bold;">{{ key }}</td>
                            <td>{{ item }}</td>
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
        <div class="text-h2">Data Laporan Kejadian</div>
      </v-col>
        <v-col cols="12" align-self="baseline">
            <h5 class="subheading black--text"><v-icon>mdi-account</v-icon>Diposting oleh <a @click="showModal = true">
              {{ this.report !== {} ? this.report.user.name : ''}}
            </a></h5>
            <h5 class="subheading black--text"><v-icon>mdi-calendar-edit</v-icon>
              {{ this.report.parsed_created_at }}
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
                            <td style="background: #e3e3e3; width: 300px; font-weight: bold;">{{ key }}</td>
                            <td>{{ key === 'category' ? item.name : item }}</td>
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
    </v-row>
  </v-container>
</template>

<script>
import client from '@/axios'

export default {
    name: 'DetailLaporan',
    components: {
    },
    data () {
        return {
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
          ]
        }
    },
  mounted(){
    this.fetchReport()
  },
  methods: {
      fetchReport(){
        client.get(`reports/${this.$route.params.id}`).then(response => {
          this.report = response.data.data
          this.getDetailReport()
        })
      },
    getDetailReport(){
        this.filteredReport = Object.keys(this.report)
            .filter(key => this.shownReportProps.includes(key))
            .reduce((obj, key) => {
              obj[key] = this.report[key];
              return obj;
            }, {});
        this.filteredProfile = Object.keys(this.report.user)
            .filter(key => this.shownUserProps.includes(key))
            .reduce((obj, key) => {
              obj[key] = this.report.user[key];
              return obj;
            }, {});
        this.selectedStatus = this.report.status
    },
    downloadFile(){
        window.location = client.defaults.baseURL+this.report.file.substring(1)
    },
    updateStatus(){
      client.patch(`reports/${this.$route.params.id}`, {status: this.selectedStatus}).then(response => {
        this.report = response.data.data
        this.getDetailReport()
      })
    }
  }
}
</script>