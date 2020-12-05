<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card color="#d4d4d4">
          <v-card-title><h3>Selamat Datang di Sistem Aplikasi Pelaporan</h3></v-card-title>
          <v-card-text><h5 class="black--text">Sistem aplikasi pelaporan ini adalah sistem untuk merekap seluruh laporan gangguan yang berkaitan dengan ideologi, politik, ekonomi, sosial, dan budaya di lingkungan Kabupaten Tangerang.</h5></v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              elevation="2"
              to= "/buat-laporan"
            >Buat Laporan</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
      <v-col cols="12">
        <div style="background: #d4d4d4; flex-direction: column; display: flex; margin-top: 10px; border-radius: 5px;">
          <div style="flex-direction: row; flex-wrap: wrap; display: flex; justify-content: space-between; align-items: center;" >
            <div><v-card-title><h3>Jumlah Laporan Peristiwa</h3></v-card-title></div>
            <div style="display: flex;">
              <v-col cols="12" sm="12">
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
                      style="width:250px;"
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
            </div>
          </div>
          
          <div style="flex-direction: row; flex-wrap: wrap; display: flex;">
            <v-flex v-for="category in categories" :key="category.count_report" >
              <v-card class="text-center ma-3" router :to="category.route" style="text-decoration: none;">
                <div><v-icon size="80" :color="category.color">mdi-send mdi-rotate-315</v-icon></div>
                <v-card-text>
                  <h5 style="color: black; font-weight: bold; font-size: 35px">{{category.count_report}}</h5>
                  <h5 style="color: black; font-weight: 300;">{{category.category}}</h5>
                </v-card-text>
              </v-card>
            </v-flex>
          </div>
        </div>
      </v-col>
      
      <v-col>
        <v-row>
          <v-col v-for="tableData in tables" :key="tableData.title" class="table-container">
            <div style="background: #d4d4d4; border-radius: 5px;" >
              <v-card-title><v-icon class="mr-2">{{tableData.icon}}</v-icon>{{tableData.title}}</v-card-title>
              <v-data-table
                style="background: #d4d4d4;"
                dense
                :headers="headers"
                :hide-default-header="true"
                :hide-default-footer="true"
                :items="reports"
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
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      items: [
        { first_name: 'Dickerson' },
        { first_name: 'Larsen' },
        { first_name: 'Geneva' },
        { first_name: 'Jami' },
        { first_name: 'Dickerson' },
        { first_name: 'Larsen' },
        { first_name: 'Geneva' },
        { first_name: 'Jami' }
      ],
      categories: [
        {count_report: '70', category: 'Ideologi', route: '/lihat-laporan', color: 'blue'},
        {count_report: '15', category: 'Politik', route: '/lihat-laporan', color: 'yellow'},
        {count_report: '9', category: 'Ekonomi', route: '/lihat-laporan', color: 'green'},
        {count_report: '19', category: 'Sosial', route: '/lihat-laporan', color: 'orange'},
        {count_report: '10', category: 'Budaya', route: '/lihat-laporan', color: 'red'},
      ],
      reports: [
        {
          name: 'Frozen Yogurt',
        },
        {
          name: 'Ice cream sandwich',
        },
        {
          name: 'Eclair',
        },
        {
          name: 'Cupcake',
        },
        {
          name: 'Gingerbread',
        },
        {
          name: 'Jelly bean',
        },
        {
          name: 'Lollipop',
        },
        {
          name: 'Honeycomb',
        },
        {
          name: 'Donut',
        },
        {
          name: 'KitKat',
        },
      ],
      tables: [
        {title: 'Laporan Terbaru', icon: 'mdi-message-alert', route: '/lihat-laporan'},
        {title: 'Laporan Sedang Diproses', icon: 'mdi-message-processing', route: '/lihat-laporan'},
      ],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
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
}

</script>

<style>

</style>
