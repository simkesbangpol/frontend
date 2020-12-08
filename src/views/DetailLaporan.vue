<template>
  <v-container fluid>
    <v-dialog
      v-model="showModal"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="showModal = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-row no-gutters>
        <v-col cols="12">
            <h3 class="subheading black--text"><a @click="navigateToLihatLaporan">Data Laporan Kejadian </a> / Detail Laporan</h3>
        </v-col>
        <v-col cols="12" align-self="baseline">
            <h5 class="subheading black--text"><v-icon>mdi-account</v-icon>Diposting oleh <a @click="showModal = true">Dinas Pemadam</a></h5>
        </v-col>
        <v-col cols="12">
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
        statusList: [
            'Belum diproses',
            'Dalam proses',
            'Selesai',
            'Ditolak',
        ],
        selectStatus: 'Belum diproses',
        }
    },
    methods: {
        navigateToLihatLaporan() {
            this.$router.push({ path: "/lihat-laporan" });
        }
    },
}
</script>