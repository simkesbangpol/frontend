<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 class="subheading black--text">Kelola Akun</h1>
        <v-data-table
          :headers="headers"
          :items="eventReports"
          :items-per-page="5"
          :search="search"
          :custom-filter="filterOnlyCapsText"
          class="elevation-6"
        >
          <template v-slot:top>
            <v-row no-gutters class="mr-1 ml-1" align="baseline">
              <v-col md="10" cols="12">
                <v-btn color="primary" to="/buat-akun" @click="{}">
                  <v-icon >mdi-account-plus</v-icon>
                  Tambah
                </v-btn>
              </v-col>
              <v-col md="2" cols="12" class="mt-2">
                <v-text-field
                  dense
                  outlined
                  append-icon="mdi-table-search"
                  v-model="search"
                  label="Search"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
          
          <template v-slot:item.actions>
            <v-row align="center">
              <v-btn color="primary" to="/detail-akun" icon @click="{}">
                <v-icon >
                  mdi-eye
                </v-icon>
              </v-btn>
              <v-btn icon @click="{}">
                <v-icon >
                  mdi-account-edit
                </v-icon>
              </v-btn>
              <v-btn color="error" icon @click="{}">
                <v-icon >
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'KelolaAkun',
  components: {
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Nama',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', sortable: false, value: 'email' },
        { text: 'Telp', sortable: false, value: 'telp' },
        { text: 'Aksi', sortable: false, value: 'actions' },
      ],
      eventReports: [
        {
          name: 'Frozen Yogurt',
          email: 253,
          telp: 6.0,
          status: 24,
        },
        {
          name: 'Lollipop',
          email: 23,
          telp: 6.0,
          status: 24,
        },
        {
          name: 'Jelly bean',
          email: 45,
          telp: 6.0,
          status: 24,
        },
        {
          name: 'Honeycomb',
          email: 159,
          telp: 6.0,
          status: 24,
        },
        {
          name: 'Gingerbread',
          email: 78,
          telp: 6.0,
          status: 24,
        },
        {
          name: 'Donut',
          email: 159,
          telp: 6.0,
          status: 24,
        },
        {
          name: 'Cupcake',
          email: 94,
          telp: 6.0,
          status: 24,
        },
        {
          name: 'Eclair',
          email: 20,
          telp: 6.0,
          status: 24,
        },
        {
          name: 'Ice cream sandwich',
          email: 121,
          telp: 6.0,
          status: 24,
        },
        {
          name: 'KitKat',
          email: 159,
          telp: 6.0,
          status: 24,
        },
      ],
    }
  },
}
</script>
