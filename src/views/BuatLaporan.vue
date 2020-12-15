<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <Breadcrumbs v-if="this.$route.params.id!==undefined" :dataBreadcrumbs='breadcrumbsItems'/>
        <h1 v-else>Form Laporan Kejadian</h1>
      </v-col>
      <v-col>
        <v-form
            ref="form"
            @submit.prevent="submit"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-comma" label="Judul" outlined v-model="report.title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                  prepend-icon="mdi-email-variant"
                  label="Kategori Laporan"
                  v-model="report.category_id"
                  :items="categories"
                  item-text="name"
                  item-value="id"
                  outlined
                  :menu-props="{ offsetY: true }"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="6">
              <v-text-field prepend-icon="mdi-comma" label="Fakta" outlined v-model="report.fact"></v-text-field>
            </v-col>
            <v-col cols="12" lg="6">
              <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      label="Tanggal Kejadian"
                      outlined
                      v-model="report.date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" lg="4">
              <v-text-field prepend-icon="mdi-map-marker" label="Wilayah Kejadian" v-model="report.location"
                            outlined></v-text-field>
            </v-col>
            <v-col cols="12" lg="4">
              <v-select
                  style="margin-bottom: 30px;"
                  label="Kecamatan"
                  outlined
                  v-model="district_id"
                  :items="districts"
                  item-text="name"
                  item-value="id"
                  menu-props="auto"
                  hide-details
                  @change="fetchVillages"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="4">
              <v-select
                  style="margin-bottom: 30px;"
                  label="Kelurahan"
                  outlined
                  v-model="report.village_id"
                  :items="villages"
                  item-text="name"
                  item-value="id"
                  :loading="villageLoading"
                  no-data-text="Pilih Kecamatan"
                  :disabled="villages.length === 0"
                  menu-props="auto"
                  hide-details
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea prepend-icon="mdi-pencil" label="Uraian Kejadian" outlined v-model="report.description"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-alarm-light" label="Tindakan" outlined v-model="report.action"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea prepend-icon="mdi-comment-check" label="Rekomendasi" outlined v-model="report.recommendation"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-file-input
                  :rules="maxSizeFile"
                  v-model="report.file"
                  counter
                  label="File input"
                  placeholder="Select your files"
                  prepend-icon="mdi-paperclip"
                  outlined
                  :show-size="1000"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip
                      v-if="index < 2"
                      dark
                      label
                      small
                  >
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
            <v-col cols="12">
              <v-btn block type="submit" color="primary" width="13%">
                {{this.$route.params.id!==undefined ? "Ubah" : "Kirim"}}
              </v-btn>
            </v-col>

          </v-row>
        </v-form>
      </v-col>

      <Snackbar :dataSnackbar='dataSnackbar' />
    </v-row>
  </v-container>
</template>

<script>
import client from '@/axios'
import Breadcrumbs from '../components/Breadcrumbs'
import Snackbar from '../components/Snackbar'

export default {
  name: 'BuatLaporan',
  components: {
    Breadcrumbs,
    Snackbar,
  },
  computed: {
      categories() {
        return this.$store.getters.getReportCategories
      },
    districts() {
        return this.$store.getters.getDistricts
    },
    villages() {
      if (this.district_id!==null) {
        return this.$store.getters.getVillages
      } else {
        return []
      }
    }
  },
  data() {
    return {
      report: {
        category_id: '',
        title: '',
        fact: '',
        date: new Date().toISOString().substr(0, 10),
        location: '',
        description: '',
        action: '',
        recommendation: '',
        // file: [],
        village_id: null,
        user_id: this.$store.getters.getUser.id
      },
      villageLoading: false,
      district_id: null,
      maxSizeFile: [
        value => value.size < 2000000 || 'File size max 2 MB!',
      ],
      dataSnackbar: {
        showSnackbar: false,
        timeoutSnackbar: 3000,
        message: "",
        textButton: "",
        colorSnackbar: "",
        colorButton: "",
      },
      breadcrumbsItems: this.$route.name===`UbahLaporan` ?
        [
            {
              text: 'Data Laporan Kejadian',
              disabled: false,
              to: '/lihat-laporan',
              name: 'LihatLaporan',
            },
            {
              text: 'Form Ubah Laporan',
              disabled: true,
              to: '#',
              name: '',
            },
        ] :
        [
            {
              text: 'Laporan Saya',
              disabled: false,
              to: '/laporan-saya',
              name: 'LaporanSaya',
            },
            {
              text: 'Form Ubah Laporan Saya',
              disabled: true,
              to: '#',
              name: '',
            },
        ],
      files: [],
      select: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    }
  },
  mounted(){
    this.$route.params.id!==undefined && this.getReportById()
  },
  created(){
    this.$store.dispatch('fetchReportCategories');
    this.$store.dispatch('fetchDistricts');
  },
  methods: {
    submit() {
      if (this.$route.params.id!==undefined) {
        client.put('reports/'+this.$route.params.id, this.report)
        .then((response) => {
          if(response.data.status){
            this.dataSnackbar.showSnackbar = true
            this.dataSnackbar.message = "Data berhasil diperbarui !"
            this.dataSnackbar.textButton = "Tutup"
            this.dataSnackbar.colorSnackbar = "success"
            this.dataSnackbar.colorButton = "error"
            this.$router.push({ name: `${this.breadcrumbsItems[0].name}`, params: {dataSnackbar: this.dataSnackbar} })
          } else {
            this.dataSnackbar.showSnackbar = true
            this.dataSnackbar.message = "Data gagal diperbarui ! "
            this.dataSnackbar.textButton = "Tutup"
            this.dataSnackbar.colorSnackbar = "error"
            this.dataSnackbar.colorButton = "error"
          }
        })
        .catch((err) => {
          this.dataSnackbar.showSnackbar = true
          this.dataSnackbar.message = "Data gagal diperbarui ! "+err
          this.dataSnackbar.textButton = "Tutup"
          this.dataSnackbar.colorSnackbar = "error"
          this.dataSnackbar.colorButton = "error"
        })
      } else {
        client.post('reports', this.report).then(response => {
          if(response.data.status){
            this.resetForm()
          }
        })
      }
    },

    getReportById(){
        client.get('reports/'+this.$route.params.id)
        .then(response => {
            if(response.status === 200){
                // this.report = response.data.data
                const dataReport = response.data.data
                this.report.category_id = dataReport.category_id
                this.report.title = dataReport.title
                this.report.fact = dataReport.fact
                this.report.date = dataReport.date
                this.report.location = dataReport.location
                this.report.description = dataReport.description
                this.report.action = dataReport.action
                this.report.recommendation = dataReport.recommendation
                this.report.village_id = dataReport.village_id
                this.report.user_id = dataReport.user_id

                this.district_id = response.data.data.village_id
                this.getDistrictIdByVillageId(response.data.data.village_id)
            }
        })
    },

    getDistrictIdByVillageId(villageId){
        client.get('villages/'+villageId)
        .then((response) => {
            if(response.status === 200){
                this.district_id = response.data.data.district_id
                this.fetchVillages()
            }
        })
    },

    resetForm(){
        this.report = {
          category_id: '',
          title: '',
          fact: '',
          date: new Date().toISOString().substr(0, 10),
          location: '',
          description: '',
          action: '',
          recommendation: '',
          // file: [],
          village_id: null,
        }
    },

    fetchVillages() {
      this.villageLoading = true
      this.$store.dispatch('fetchVillages', { district_id: this.district_id }).then(() => {
        this.villageLoading = false
      }).catch(() => {
        this.villageLoading = false
      })
    }
  }
}
</script>
