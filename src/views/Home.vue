<template>
  <div class="home">
    <Navbar />
    <Sidebar />
    <div>
      <b-card
        title="Selamat Datang di Sistem Informasi Pelaporan"
        tag="article"
        style="background: #dbdbdb;"
        class="mb-2"
      >
        <b-card-text>
          Sistem ini adalah sistem untuk merekap seluruh laporan kejadian yang berkaitan dengan ideologi, politik, ekonomi, sosial, dan budaya di lingkungan Kabupaten Tangerang.
        </b-card-text>

        <b-button class="mb-2" variant="primary" to="/buat-laporan">Buat  Laporan</b-button>
      </b-card>
    </div>
    
    <div>
      <b-card
        title="Jumlah Laporan Peristiwa"
        tag="article"
        style="background: #dbdbdb;"
        class="mb-2"
      >
        
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
      </b-card>
    </div>
    
    <!-- <div> -->
      <!-- <b-card
        style="background: white;"
        class="mb-2"
      > -->
        <div class="report-table-container">
          <div class="report-each-table-container">
            <h4>Laporan Terbaru</h4>
            <b-table striped hover :items="items"></b-table>
          </div>
          <div class="report-each-table-container">
            <h4>Laporan Sedang Diproses</h4>
            <b-table striped hover :items="items"></b-table>
          </div>
        </div>
      <!-- </b-card> -->
    <!-- </div> -->
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
