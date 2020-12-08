<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-form
          ref="form"
          @submit.prevent="submit"
        >
          <h3 class="mb-5"><a @click="navigateToKelolaAkun">Data Akun </a>/ Form Buat Akun</h3>
          
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-home-city" label="Nama" outlined></v-text-field>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-map-marker" label="Alamat" style="width: 100%" outlined></v-text-field>
            <v-select
              prepend-icon="mdi-blank"
              style="margin-bottom: 30px;"
              label="Kecamatan"
              outlined
              v-model="e1"
              :items="states"
              menu-props="auto"
              hide-details
            ></v-select>
            <v-select
              prepend-icon="mdi-blank"
              style="margin-bottom: 30px;"
              label="Kelurahan"
              outlined
              v-model="e2"
              :items="states"
              menu-props="auto"
              hide-details
            ></v-select>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-phone-classic" label="No Telp" outlined></v-text-field>
          </v-row>
          <v-row class="ml-1">
              <v-text-field prepend-icon="mdi-email-plus" label="Email" outlined></v-text-field>
          </v-row>

          <v-row class="ml-1" style="margin-top: 90px;">
            <v-text-field prepend-icon="mdi-account-key" label="Username" outlined></v-text-field>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-key-variant" type="password" label="Password" outlined></v-text-field>
          </v-row>

          <v-row>
            <div style="width: 100%; display: flex; justify-content: flex-end;">
              <v-btn color="primary" width="13%">
                Simpan
              </v-btn>
            </div>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'BuatAkun',
    components: {
    },
    data () {
        return {
        }
    },
    methods: {
        navigateToKelolaAkun() {
            this.$router.push({ path: "/kelola-akun" });
        }
    },
}
</script>
