<template>
  <v-flex>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <h3 class="mb-5">Form Laporan Kejadian</h3>

      <v-row class="ml-1">
        <v-select
          label="Kategori Laporan"
          v-model="select"
          :items="items"
          outlined
          :menu-props="{ offsetY: true }"
        ></v-select>
      </v-row>
      <v-row class="ml-1">
        <v-text-field label="Fakta" outlined></v-text-field>
      </v-row>
      <v-row class="ml-1">
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
              v-model="date"
              append-icon="mdi-calendar"
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
      </v-row>
      <v-row class="ml-1">
        <div style="display: flex; width: 100%">
          <v-text-field label="Wilayah Kejadian" style="width: 40%" class="mr-2" outlined></v-text-field>
          <v-select
            style="width: 30%"
            label="Kecamatan"
            outlined
            class="mr-2"
            v-model="e1"
            :items="states"
            menu-props="auto"
            hide-details
          ></v-select>
          <v-select
            style="width: 30%" 
            label="Kelurahan"
            outlined
            v-model="e2"
            :items="states"
            menu-props="auto"
            hide-details
          ></v-select>
        </div>
      </v-row>
      <v-row class="ml-1">
        <v-textarea label="Uraian Kejadian" outlined></v-textarea>
      </v-row>
      <v-row class="ml-1">
          <v-text-field label="Tindakan" outlined></v-text-field>
      </v-row>
      <v-row class="ml-1">
        <v-textarea label="Rekomendasi" outlined></v-textarea>
      </v-row>

      <v-row>
        <div style="width: 100%; display: flex; justify-content: flex-end;">
          <v-btn color="primary" width="13%">
            Kirim
          </v-btn>
        </div>
      </v-row>
    </v-form>
  </v-flex>
</template>

<script>
// @ is an alias to /src

export default {
  data: () => ({
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
      ],
      e1: "Delaware",
      e2: "Minnesota",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
  }),
  name: 'BuatLaporan',
  components: {
  }
}
</script>
