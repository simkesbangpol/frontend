<template>
  <div>
    <v-container>
      <v-layout column wrap>
        <v-flex sm6 xs12 md6 lg3 >
          <v-card color="#d4d4d4">
            <v-card-title><h3>Selamat Datang di Sistem Aplikasi Pelaporan</h3></v-card-title>
            <v-card-text><p class="black--text">ini adalah sistem untuk merekap seluruh laporan gangguan yang berkaitan dengan ideologi, politik, ekonomi, sosial, dan budaya di lingkungan Kabupaten Tangerang.</p></v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                elevation="2"
                to= "/buat-laporan"
              >Buat Laporan</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      
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
                    v-model="dateRangeText"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dates" scrollable range>
                  <v-spacer></v-spacer>
                  <v-btn text color="success" @click="dates = []" >
                    Ulang
                  </v-btn>
                  <v-btn text color="error" @click="modal = false" >
                    Batal
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(dates)" >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </div>
        </div>
        
        <div style="flex-direction: row; flex-wrap: wrap; display: flex;">
          <v-flex v-for="person in team" :key="person.count_report" >
            <v-card class="text-center ma-3" router :to="person.route">
              <v-responsive class="pt-4">
                <v-icon x-large >mdi-send mdi-rotate-315</v-icon>
              </v-responsive>
              <v-card-text>
                <div class="subheading">{{person.count_report}}</div>
                <div class="grey--text">{{person.category}}</div>
              </v-card-text>
            </v-card>
          </v-flex>
        </div>
      </div>
      
      <div style="flex-direction: row; flex-wrap: wrap; display: flex; border-radius: 5px; justify-content: space-between;">
        <div class="table-container">
          <v-card>
            <v-card-title style="background: blue;"><v-icon>mdi-message-alert</v-icon>Laporan Terbaru</v-card-title>
            <v-data-table
              style="background: #d4d4d4;"
              dense
              :headers="headers"
              :hide-default-header="true"
              :hide-default-footer="true"
              :items="reports"
              item-key="name"
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </div>
        <div class="table-container">
          <v-card>
            <v-card-title style="background: blue;"><v-icon>mdi-message-processing</v-icon>Laporan Sedang Diproses</v-card-title>
            <v-data-table
              style="background: #d4d4d4;"
              dense
              :headers="headers"
              :hide-default-header="true"
              :hide-default-footer="true"
              :items="reports"
              item-key="name"
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </div>
      </div>
    </v-container>

  </div>
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
      team: [
        {count_report: '70', category: 'Ideologi', route: '/lihat-laporan'},
        {count_report: '15', category: 'Politik', route: '/lihat-laporan'},
        {count_report: '9', category: 'Ekonomi', route: '/lihat-laporan'},
        {count_report: '19', category: 'Sosial', route: '/lihat-laporan'},
        {count_report: '10', category: 'Budaya', route: '/lihat-laporan'},
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
@media screen and (max-width:2000px){
    .table-container {
      width: 49%;
      margin-top: 10px; 
    }
}

@media screen and (max-width:958px){
    .table-container {
      width: 100%;
      margin-top: 10px; 
    }
}
</style>
