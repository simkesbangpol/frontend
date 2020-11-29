<template>
  <div class="screen-container">
    <div class="container-navbar">
      <Navbar />
    </div>

    <div class="container-content">
      <div class="container-sidebar">
        <Sidebar />
      </div>
      <div class="container-body">
        <div>
          <v-card
            style="background: #dbdbdb;"
            class="mb-2"
          >
            <v-card-title>Selamat Datang di Sistem Informasi Pelaporan</v-card-title>
            <v-card-text>
              Sistem ini adalah sistem untuk merekap seluruh laporan kejadian yang berkaitan dengan ideologi, politik, ekonomi, sosial, dan budaya di lingkungan Kabupaten Tangerang.
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" to="/buat-laporan">Buat  Laporan</v-btn>
            </v-card-actions>

          </v-card>
        </div>
        
        <div>
          <v-card
            style="background: #dbdbdb;"
            class="mb-2"
          >
          <v-card-title>Jumlah Laporan Peristiwa</v-card-title>
            
          <v-card-text>
            <div class="report-container">
              <div class="box">
                <b-icon-envelope-fill class="mr-2"/>
                <div>1</div>
              </div>
              <div class="box">
                <b-icon-envelope-fill class="mr-2"/>
                <div>2</div>
              </div>
              <div class="box">
                <b-icon-envelope-fill class="mr-2"/>
                <div>3</div>
              </div>
              <div class="box">
                <b-icon-envelope-fill class="mr-2"/>
                <div>4</div>
              </div>
              <div class="box">
                <b-icon-envelope-fill class="mr-2"/>
                <div>5</div>
              </div>
            </div>
          </v-card-text>
          </v-card>
        </div>
        
        <div class="report-table-container">
          <div class="report-each-table-container">
            <h5>Laporan Terbaru</h5>
            <!-- <b-table striped hover :items="items"></b-table> -->
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <!-- <th class="text-left">
                      Calories
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="item.first_name"
                  >
                    <td>{{ item.first_name }}</td>
                    <!-- <td>{{ item.calories }}</td> -->
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <div class="report-each-table-container">
            <h5>Laporan Sedang Diproses</h5>
            <!-- <b-table striped hover :items="items"></b-table> -->
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <!-- <th class="text-left">
                      Calories
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="item.first_name"
                  >
                    <td>{{ item.first_name }}</td>
                    <!-- <td>{{ item.calories }}</td> -->
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar
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
      ]
    }
  }
}

</script>
