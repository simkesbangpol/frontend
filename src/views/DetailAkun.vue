<template>
  <v-container fluid>
    <v-row>
        <v-col cols="12">
            <!-- <h3 class="subheading black--text"><a @click="navigateToKelolaAkun">Data Akun </a> / Detail Akun</h3> -->
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
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                        <tr
                        v-for="item in detailAkun"
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
        <v-col cols="11"/>
        <v-col md="1" cols="12">
            <v-btn color="primary">Ubah</v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'DetailAkun',
    components: {
    },
    data () {
        return {
            detailAkun: [
                {title: "Nama", desc:"test Nama"},
                {title: "Alamat", desc:"test Alamat"},
                {title: "No Telp", desc:"test Telp"},
                {title: "Email", desc:"test Email"},
                {title: "Username", desc:"test Username"},
                {title: "Password", desc:"test Password"},
            ],
            breadcrumbsItems: [
                {
                text: 'Data Akun',
                disabled: false,
                to: '/kelola-akun',
                },
                {
                text: 'Detail Akun',
                disabled: true,
                to: '#',
                },
            ],
        }
    },
}
</script>