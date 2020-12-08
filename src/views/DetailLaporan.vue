<template>
  <v-container fluid>
    <v-row no-gutters>
        <v-col cols="12">
            <h3 class="subheading black--text"><a @click="navigateToLihatLaporan">Data Laporan Kejadian </a> / Detail Laporan</h3>
        </v-col>
        <v-col cols="12" align-self="baseline">
            <h5 class="subheading black--text"><v-icon>mdi-account</v-icon>Diposting oleh <a>Dinas Pemadam</a></h5>
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
                            <td style="background: #e3e3e3;">{{ item.title }}</td>
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
        detailReport: [
            {title: "Kategori", desc:"test kategori"},
            {title: "Fakta", desc:"test fakta"},
            {title: "Tanggal", desc:"test tgl"},
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