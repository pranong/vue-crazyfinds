<template>
  <v-container>
    <!-- Carousel -->
    <v-row>
      <v-carousel cycle width="100%" show-arrows-on-hover hide-delimiter-background>
        <v-carousel-item
          v-for="(item,i) in carouselItem"
          :key="i"
          :src="item.src"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-row>

    <!-- Devider -->
    <v-row>
      <v-col>
        <v-divider
            class="mt-5 mb-5"
          ></v-divider>
      </v-col>
    </v-row>

    <!-- New Arrival -->
    <v-row>
      <v-col class="text-b">
        <marquee-text>
          <h1>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Arrival&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Arrival&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Arrival&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Arrival&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Arrival&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Arrival
          </h1>
        </marquee-text>
      </v-col>
      <v-row align="center" justify="center">
        <v-col
          v-for="(row, index) in rows"
          :key="index"
          lg="3"
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
      </v-row>
    </v-row>

    <!-- Shop more btn -->
    <v-row align="center" justify="center">
      <v-btn class="mt-5 mb-5 cool-btn">
        shop more
      </v-btn>
    </v-row>

    <!-- Devider -->
    <v-row>
      <v-col>
        <v-divider
            class="mt-5 mb-5"
          ></v-divider>
      </v-col>
    </v-row>

    <!-- Shop Category -->
    <v-row>
      <v-col class="text-b">
        <marquee-text>
          <h1>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shop Categories&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shop Categories
          </h1>
        </marquee-text>
        <!-- <h1>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shop Categories
          </h1> -->
      </v-col>
      <v-col
        v-for="(row, index) in rows"
        :key="index"
        lg="3"
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
    </v-row>

    <!-- Devider -->
    <v-row>
      <v-col>
        <v-divider
            class="mx-4 pt-5 pb-5"
          ></v-divider>
      </v-col>
    </v-row>

    <!-- insta -->
  </v-container>
</template>

<script>
  import MarqueeText from "../components/MarqueeText.vue";
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
    name: 'Home',
    components: {
      MarqueeText,
    },
    data() {
      return {
        carouselItem: [
            {
              src: 'https://cdn.shopify.com/s/files/1/0016/4013/6813/files/CedarPark_PO_Desktop_2380x770_b01e8de4-5409-478d-9d68-ad40727158e0_1512x.jpg?v=1662665175',
            },
            {
              src: 'https://cdn.shopify.com/s/files/1/0016/4013/6813/files/CedarPark_PO_Desktop_2380x770_b01e8de4-5409-478d-9d68-ad40727158e0_1512x.jpg?v=1662665175',
            },
            {
              src: 'https://cdn.shopify.com/s/files/1/0016/4013/6813/files/CedarPark_PO_Desktop_2380x770_b01e8de4-5409-478d-9d68-ad40727158e0_1512x.jpg?v=1662665175',
            },
            {
              src: 'https://cdn.shopify.com/s/files/1/0016/4013/6813/files/CedarPark_PO_Desktop_2380x770_b01e8de4-5409-478d-9d68-ad40727158e0_1512x.jpg?v=1662665175',
            },
          ],
        rows: [],
        masterRows: [],
      }
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
      setData (data) {
        console.log(data)
        for (let id in data) {
          data[id].images = JSON.parse(data[id].imgs)
          this.masterRows.push(data[id])
        }
        this.rows = this.masterRows.slice(0, 4)
        console.log('this.rows', this.rows)
      },
      async selectItem(id) {
        this.$router.push({ name: "details", params: { id } });
      },
    }
  }
</script>

<style lang="sass">
.productItem
  cursor: pointer !important
.cool-btn
  background-color: black !important
  color: white !important
  border-radius: 0px !important
</style>