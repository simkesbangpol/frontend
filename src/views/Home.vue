<template>
  <div>
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container>
      <v-layout column wrap style="background: red;">
        <v-flex
          sm6
          xs12
          md6
          lg3
        >
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar
                tile
                class="mt-n7"
              >
                <v-sheet color="#03A9F4" width="80" height="80" elevation="10">
                  <v-icon dark large>add_shopping_cart</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">Shopping</div>
                <v-list-item-title class="headline mb-1 text-right" >$34,245</v-list-item-title>
                <div><v-divider></v-divider></div>
              </v-list-item-content> 
            </v-list-item>
            <v-card-actions>
              <div class="overline">VISA Card</div>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      
      <v-layout row wrap>
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
      </v-layout>
      
      <v-layout row wrap style="background: red;">
        <v-flex style="flex-grow: 2;">
          <v-card class="ma-3">
            <v-card-title style="flex-shrink: 2; background: blue;"><v-icon>mdi-message-alert</v-icon>Laporan Terbaru</v-card-title>
            <v-data-table
              dense
              :headers="headers"
              :hide-default-header="true"
              :hide-default-footer="true"
              :items="reports"
              item-key="name"
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </v-flex>
        <v-flex style="flex-grow: 2;">
          <v-card class="ma-3">
            <v-card-title style="flex-shrink: 2; background: blue;"><v-icon>mdi-message-processing</v-icon>Laporan Sedang Diproses</v-card-title>
            <v-data-table
              dense
              :headers="headers"
              :hide-default-header="true"
              :hide-default-footer="true"
              :items="reports"
              item-key="name"
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
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
        // { text: 'Calories', value: 'calories' },
        // { text: 'Fat (g)', value: 'fat' },
        // { text: 'Carbs (g)', value: 'carbs' },
        // { text: 'Protein (g)', value: 'protein' },
        // { text: 'Iron (%)', value: 'iron' },
      ],
    }
  }
}

</script>
