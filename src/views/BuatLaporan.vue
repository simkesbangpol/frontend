<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-form
          ref="form"
          @submit.prevent="submit"
        >
          <h3 class="mb-5">Form Laporan Kejadian</h3>

          <v-row class="ml-1">
            <v-select
              prepend-icon="mdi-email-variant"
              label="Kategori Laporan"
              v-model="select"
              :items="items"
              outlined
              :menu-props="{ offsetY: true }"
            ></v-select>
          </v-row>
          <v-row class="ml-1">
            <v-text-field prepend-icon="mdi-comma" label="Fakta" outlined></v-text-field>
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
                  prepend-icon="mdi-calendar"
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
            <v-text-field prepend-icon="mdi-map-marker" label="Wilayah Kejadian" style="width: 100%" outlined></v-text-field>
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
            <v-textarea prepend-icon="mdi-pencil" label="Uraian Kejadian" outlined></v-textarea>
          </v-row>
          <v-row class="ml-1">
              <v-text-field prepend-icon="mdi-alarm-light" label="Tindakan" outlined></v-text-field>
          </v-row>
          <v-row class="ml-1">
            <v-textarea prepend-icon="mdi-comment-check" label="Rekomendasi" outlined></v-textarea>
          </v-row>

          <v-row class="ml-1">
            <v-file-input
              v-model="files"
              counter
              label="File input"
              multiple
              placeholder="Select your files (pdf, jpg, png, etc)"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>
          </v-row>

          <v-row>
            <div style="width: 100%; display: flex; justify-content: flex-end;">
              <v-btn color="primary" width="13%">
                Kirim
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
  data: () => ({
      files: [],
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
