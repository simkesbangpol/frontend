<template>
  <v-container fluid>
    <v-row>
        <v-col cols="12">
            <Breadcrumbs :dataBreadcrumbs='breadcrumbsItems'/>
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
            <v-btn color="primary" :to="'/ubah-akun/'+idUser">Ubah</v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import client from '@/axios'
import Breadcrumbs from '../components/Breadcrumbs'

export default {
    name: 'DetailAkun',
    components: {
        Breadcrumbs,
    },
    data () {
        return {
            idUser: "",
            detailAkun: [],
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
    mounted() {
        this.fetchUsers()
    },
    methods: {
        fetchUsers(){
            client.get('users/'+this.$route.params.id)
            .then(response => {
                if(response.status === 200){
                    const dataUser = response.data.data
                    this.idUser = dataUser.id
                    this.detailAkun = [
                        {title: "Nama", desc: dataUser.name},
                        {title: "Alamat", desc: dataUser.address+", "+dataUser.village.name+", "+dataUser.district.name},
                        {title: "No Telp", desc: dataUser.phone_number},
                        {title: "Email", desc: dataUser.email},
                        {title: "Role Akses", desc: dataUser.roles[0]},
                        {title: "Username", desc: dataUser.username},
                    ]
                }
            })
        }
    },
}
</script>