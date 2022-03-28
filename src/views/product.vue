<template>
  <v-row>
    <v-col cols="12" class="text-center text-h2 text-b">
      TEE
    </v-col>
    <v-col
      v-for="(row, index) in rows"
      lg="3"
      :key="index"
      sm="6"
      md="4"
      class="text-center"
    >
      <v-container
        class="pa-0 productItem"
        cols="12"
        @click="selectItem(row.id)"
      >
        <v-badge color="#BDBDBD" tile overlap offset-x="29" offset-y="25">
          <template v-slot:badge> Sale </template>
          <v-carousel hide-delimiters :width="isMobile ? 150 : 250" :height="isMobile ? 150 : 250">
            <v-carousel-item
              v-for="(item,i) in row.images"
              :key="i"
              :src="item.src"
              :height="isMobile ? 150 : 250"
              :width="isMobile ? 150 : 250"
            ></v-carousel-item>
          </v-carousel>
        </v-badge>
        <v-row class="pl-5 pr-5 pt-1">
          <v-col
          cols="10"
          class="text-caption text-left"
          style="line-height: 140%; text-transform: uppercase"
        >
          <b>{{row.name}}</b><br />
          <em>${{row.price}}</em>
        </v-col>
        <v-col cols="2" class="text-body2">
          XL
        </v-col>
        </v-row>
      </v-container>
    </v-col>
    <!-- <v-col cols="12" class="text-center mt-5 mb-10">
      <v-btn class="mx-2" fab disabled>
        <v-icon dark @click="changePage('left')"> mdi-chevron-left </v-icon>
      </v-btn>
      {{page}}
      <v-btn class="mx-2" fab>
        <v-icon dark @click="changePage('right')"> mdi-chevron-right </v-icon>
      </v-btn>
    </v-col> -->
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            fixed
            right
            bottom
            x-large
            v-bind="attrs"
            v-on="on"
            :style="{ bottom: '7%' }"
          >
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-card-text>
              <div class="text-h3 pa-12">Filter!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">DONE</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
    <v-col cols="12" class="mt-15" id="prodRow">
      
    </v-col>
  </v-row>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";
// import db from "../lib/db"

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Replace with your app's Firebase project configuration
    const firebaseConfig = {
        apiKey: 'AIzaSyA-ECAo2IzfT30j51vu4I5vxa1IrZ4QMu0',
      authDomain: 'vue-crazyfinds.firebaseapp.com',
      databaseURL: 'https://vue-crazyfinds-default-rtdb.firebaseio.com',
      projectId: 'vue-crazyfinds',
      storageBucket: 'vue-crazyfinds.appspot.com',
      messagingSenderId: '782007552940',
      appId: '1:782007552940:web:f06c8c6e20595952708809',
      measurementId: 'G-B4E62WEYX5',
    };

    const app = initializeApp(firebaseConfig);

    // Get a reference to the database service
    const database = getDatabase(app);



export default {
  name: "productPage",
  components: {
    MarqueeText,
  },
  data() {
    return {
      drawer: false,
      rows: [],
      scrollItem: 12,
      masterRows: [],
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
    };
  },
  mounted() {
    this.scroll()
  },
  created() {
    const starCountRef = ref(database, 'product/')
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      this.setData(data)
    });
  },
  computed: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    scroll () {
      window.onscroll = () => {
        let scrolledTo = document.querySelector('#prodRow')

        if (scrolledTo && this.isScrolledIntoView(scrolledTo)) {
          this.scrollItem = this.scrollItem + 12
          this.rows = this.masterRows.slice(0, this.scrollItem)
        }
      }
    },
    isScrolledIntoView (el) {
      let rect = el.getBoundingClientRect()
      let elemTop = rect.top
      let elemBottom = rect.bottom

      let isVisible = elemTop < window.innerHeight && elemBottom >= 0
      return isVisible
    },
    async selectItem(id) {
      this.$router.push({ name: "details", params: { id } });
    },
    async setData(data) {
      for (let id in data) {
        data[id].images = JSON.parse(data[id].imgs)
        this.masterRows.push(data[id])
      }
      this.rows = this.masterRows.slice(0, 12)
      console.log('data', this.rows)
    },
    async changePage(at) {
      let from = 0
      let to = 9
      if (at === 'right') {
        this.page++
      } else {
        this.page--
      }
      from = (to * this.page) - 8
      to = to * this.page
      if (this.page === 1) {
        from = 0
      }
      this.rows = this.masterRows.slice(from, to)
    },
  },
};
</script>

<style lang="sass">
.productItem
  cursor: pointer !important
</style>
