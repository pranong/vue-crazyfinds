<template>
  <v-container>
    <loader v-if="busy"/>
    <!-- Carousel -->
    <v-row>
      <v-carousel
        cycle
        width="100%"
        show-arrows-on-hover
        hide-delimiter-background
      >
        <v-carousel-item
          v-for="(item, i) in carouselItem"
          :key="i"
          :src="item.src"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-row>

    <!-- Devider -->
    <v-row>
      <v-col>
        <v-divider class="mt-5 mb-5"></v-divider>
      </v-col>
    </v-row>

    <!-- New Arrival -->
    <v-row>
      <v-col class="text-b">
        <marquee-text>
          <h1>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New
            Arrival&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New
            Arrival&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New
            Arrival&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New
            Arrival&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New
            Arrival&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New
            Arrival
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
          <v-container class="pa-0 productItem" cols="12">
            <v-badge color="#BDBDBD" tile overlap offset-x="29" offset-y="25">
              <template v-slot:badge> Sale </template>
              <router-link :to="`details/${row.stkId}`">
                <v-carousel
                  hide-delimiters
                  :width="isMobile ? 150 : 250"
                  :height="isMobile ? 150 : 250"
                  @click="window.scrollTo(0, 0)"
                >
                  <v-carousel-item
                    v-for="(item, i) in row.images"
                    :key="i"
                    :src="item.src"
                    :height="isMobile ? 150 : 250"
                    :width="isMobile ? 150 : 250"
                  ></v-carousel-item>
                </v-carousel>
              </router-link>
            </v-badge>
            <v-row class="pl-5 pr-5 pt-1">
              <v-col
                cols="10"
                class="text-caption text-left"
                style="line-height: 140%; text-transform: uppercase"
              >
                <b>{{ row.name }}</b
                ><br />
                <em>${{ row.priceA }}</em>
              </v-col>
              <v-col cols="2" class="text-body2">
                {{ row.size }}
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-row>

    <!-- Shop more btn -->
    <v-row align="center" justify="center">
      <v-btn class="mt-5 mb-5 cool-btn"> shop more </v-btn>
    </v-row>

    <!-- Devider -->
    <v-row>
      <v-col>
        <v-divider class="mt-5 mb-5"></v-divider>
      </v-col>
    </v-row>

    <!-- Shop Category -->
    <v-row>
      <v-col class="text-b">
        <marquee-text>
          <h1>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shop
            Categories&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shop
            Categories
          </h1>
        </marquee-text>
        <!-- <h1>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shop Categories
          </h1> -->
      </v-col>
      <v-col
        v-for="(row, index) in categoryItem"
        :key="index"
        lg="3"
        sm="6"
        md="4"
        class="text-center"
      >
        <v-container class="pa-0 productItem" cols="12">
          <v-badge color="#BDBDBD" tile overlap offset-x="29" offset-y="25">
            <template v-slot:badge> Sale </template>
            <router-link :to="`product/${row.code}`">
              <v-carousel
                hide-delimiters
                :width="isMobile ? 150 : 250"
                :height="isMobile ? 150 : 250"
                :show-arrows="false"
              >
                <v-carousel-item
                  v-for="(item, i) in row.images"
                  :key="i"
                  :src="item.src"
                  :height="isMobile ? 150 : 250"
                  :width="isMobile ? 150 : 250"
                ></v-carousel-item>
              </v-carousel>
            </router-link>
          </v-badge>
          <v-row class="pl-5 pr-5 pt-1">
            <v-col
              cols="12"
              class="text-caption text-left"
              style="line-height: 140%; text-transform: uppercase"
            >
              <center>
                <b>{{ row.name }}</b
                ><br />
              </center>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <!-- Devider -->
    <v-row>
      <v-col>
        <v-divider class="mx-4 pt-5 pb-5"></v-divider>
      </v-col>
    </v-row>

    <!-- insta -->
  </v-container>
</template>

<script>
import MarqueeText from '../components/MarqueeText.vue';
import loader from './loader.vue'
export default {
  name: 'Home',
  components: {
    MarqueeText,
    loader
  },
  data() {
    return {
      carouselItem: [],
      categoryItem: [],
      rows: [],
      masterRows: [],
    };
  },
  created() {
    this.getApis();
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
    setData(data) {
      console.log('==>', data);
      data.map((x) => (x.images = JSON.parse(x.images)));
      this.masterRows = data;
      this.rows = this.masterRows.slice(0, 4);
      console.log('this.rows', this.rows);
    },
    async selectItem(id) {
      this.$router.push({ name: 'details', params: { id } });
    },
    async getApis() {
      this.busy = true
      try {
        let res = await this.$http.get('/stock/get-stock')
        this.setData(res.data.items)
        this.categoryItem = this.$store.state.settings.categoryItem
        this.carouselItem = this.$store.state.settings.carouselItem
      } catch (error) {
        console.log('ERR', error)
      } finally {
        this.busy = false
      }
    },
  },
};
</script>

<style lang="sass">
.productItem
  cursor: pointer !important
.cool-btn
  background-color: black !important
  color: white !important
  border-radius: 0px !important
</style>
