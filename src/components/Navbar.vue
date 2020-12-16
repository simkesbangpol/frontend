<template>
  <div>
    <v-app-bar
      color="#3895ff"
      fixed
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-img :src="require('../assets/logo_kesbangpol.png')" style="width: 5px; height: 5px;"></v-img> -->
      <v-toolbar-side-icon>
        <v-img class="mr-3" src="@/assets/logo_kabupatentangerang.png" contain alt="" height="45px" width="45px" ></v-img>
      </v-toolbar-side-icon>

      <v-toolbar-title style="font-size: 30px; font-weight: bold;">Sistem Aplikasi Pelaporan</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>mdi-account-circle</v-icon>
            {{ user.name }}
            <v-icon right>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in items"
            :key="n"
            @click="n.onClick"
          >
            <v-icon left>{{ n.icon }}</v-icon>
            <v-list-item-title>{{ n.menu_name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-progress-linear
      :active="this.$store.getters.getLoadings"
      :indeterminate="this.$store.getters.getLoadings"
      absolute
      bottom
      color="pink lighten-1"
    />
    </v-app-bar>

    <v-navigation-drawer  v-model="drawer" app dark class="sidebar">
      <v-layout column align-center>
        <v-flex class="mt-5"> 
          <v-img src="@/assets/logo_kesbangpol.png" contain alt="" height="200px" width="200px" ></v-img>
          <p class="white--text subheading mt-1 text-center" style="font-size: 35px; font-weight: 500;">Menu</p>
        </v-flex>
      </v-layout>
      <v-list dense v-model="selectedItem">
        <v-list-item-group
          v-model="selectedItem"
        >
          <v-list-item v-for="link in menu" :key="link.text" :to="link.route" mandatory active-class="border" style="color: blue; text-decoration: none; border: .2px solid black; background: white;">
            <v-list-item-action>
              <v-icon class="black--text">{{link.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content >
              <v-list-item-title class="black--text">{{link.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-dialog
      v-model="showModalProfile"
      persistent
      max-width="900px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{`Data Profil `}}<strong>{{user.name}}</strong></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-simple-table>
                    <template v-slot:default>
                        <tbody>
                            <tr
                            v-for="item in detailProfile"
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
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="showModalProfile = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import client from '@/axios'

export default {
  name:"Navbar",
  computed: {
      user() {
        return this.$store.getters.getUser
      }
  },
  data() {
    return {
      showModalProfile: false,
      selectedItem: 1,
      drawer: false,
      menu: this.$store.getters.getRoles[0]==='admin' ?
        [
          { title: 'Beranda', icon: 'mdi-view-dashboard', route: '/' },
          { title: 'Buat Laporan', icon: 'mdi-file-plus', route: '/buat-laporan' },
          { title: 'Laporan Saya', icon: 'mdi-file-account', route: '/laporan-saya' },
          { title: 'Lihat Laporan', icon: 'mdi-file-find', route: '/lihat-laporan' },
          { title: 'Kelola Akun', icon: 'mdi-account-search', route: '/kelola-akun' },
        ] : this.$store.getters.getRoles[0]==='pegawai' ?
        [
          { title: 'Beranda', icon: 'mdi-view-dashboard', route: '/' },
          { title: 'Buat Laporan', icon: 'mdi-file-plus', route: '/buat-laporan' },
          { title: 'Laporan Saya', icon: 'mdi-file-account', route: '/laporan-saya' },
          { title: 'Lihat Laporan', icon: 'mdi-file-find', route: '/lihat-laporan' },
        ] :
        [
          { title: 'Beranda', icon: 'mdi-view-dashboard', route: '/' },
          { title: 'Buat Laporan', icon: 'mdi-file-plus', route: '/buat-laporan' },
          { title: 'Laporan Saya', icon: 'mdi-file-account', route: '/laporan-saya' },
        ],
      items: [
        { menu_name: 'Profil', icon: 'mdi-account-settings', onClick: this.onClickProfile },
        { menu_name: 'Log Out', icon: 'mdi-logout', onClick: this.onLogout },
      ],
      detailProfile: [
      ],
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('userLogout')
      this.$router.push({name: 'Login'})
    },
    onClickProfile() {
      client.get(`users/${this.user.id}`)
      .then(response => {
        if(response.status === 200){
          const dataUser = response.data.data
          this.detailProfile = [
            {title: "Nama", desc: dataUser.name},
            {title: "Alamat", desc: `${dataUser.address}, Kelurahan ${dataUser.village.name}, Kecamatan ${dataUser.district.name}`},
            {title: "No Telp", desc: dataUser.phone_number},
            {title: "Email", desc: dataUser.email},
            {title: "Username", desc: dataUser.username},
            {title: "Role Akses", desc: dataUser.roles[0]},
          ]
        } else {
          this.detailProfile = [
            {title: `Tidak bisa mengakses data profil !`},
          ]
        }
        this.showModalProfile = true
      })
      .catch((err) =>{
        this.detailProfile = [
          {title: `Tidak bisa mengakses data profil ! ${err}`},
        ]
        this.showModalProfile = true
      })
    },
    getVillagesIdByVillageId(villageId){
      this.$store.dispatch('setLoadings', {isLoading: true})
      client.get('villages/'+villageId)
      .then((response) => {
        this.$store.dispatch('setLoadings', {isLoading: false})
        if(response.status === 200){
          this.district_id = response.data.data.district_id
          this.fetchVillages()
        }
      })
    },
  }
}
</script>

<style>
@media screen and (max-width:2000px){
    .sidebar {
      margin-top: 64px;
    }
}

@media screen and (max-width:958px){
    .sidebar {
      margin-top: 0px;
    }
}
</style>