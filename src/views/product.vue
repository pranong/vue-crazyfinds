<template>
  <v-row>
    <v-col cols="12" class="text-center text-h2 text-b">
      <marquee-text>
        <span class="badge badge-success ml-2">0,38%</span> ATX
        <span class="badge badge-danger ml-2">0,16%</span> DAX
        <span class="badge badge-success ml-2">0,04%</span> TecDax
        <span class="badge badge-danger ml-2">0,19%</span> MDAX
        <span class="badge badge-success ml-2">0,03%</span> ESTX50
        <span class="badge badge-info ml-2">0,00%</span> NIKKEI
        <span class="badge badge-success ml-2">0,03%</span> EUR/CHF
      </marquee-text>
    </v-col>
    <v-col
      v-for="index in 12"
      lg="3"
      :key="index"
      sm="6"
      md="4"
      class="text-center"
    >
      <v-container
        class="pa-0 productItem"
        cols="12"
        @click="selectItem(index)"
      >
        <v-badge color="error" tile overlap offset-x="29" offset-y="25">
          <template v-slot:badge> Sale </template>
          <v-badge tile overlap offset-x="20" offset-y="45">
            <template v-slot:badge> XL </template>
            <img
              src="../assets/t.jpg"
              alt="Vuetify.js"
              :width="isMobile ? 150 : 250"
            />
          </v-badge>
        </v-badge>
        <v-col
          class="text-caption pa-0"
          style="line-height: 140%; text-transform: uppercase"
        >
          <b>Vintage Blink-182</b><br />
          <em>$900</em>
        </v-col>
      </v-container>
    </v-col>
    <v-col cols="12" class="text-center mt-5 mb-10">
      <v-btn class="mx-2" fab disabled>
        <v-icon dark> mdi-chevron-left </v-icon>
      </v-btn>
      1
      <v-btn class="mx-2" fab>
        <v-icon dark> mdi-chevron-right </v-icon>
      </v-btn></v-col
    >
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
  </v-row>
</template>

<script>
import MarqueeText from "vue-marquee-text-component";
export default {
  name: "productPage",
  components: {
    MarqueeText,
  },
  data() {
    return {
      drawer: false,
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
    async selectItem(id) {
      this.$router.push({ name: "details", params: { id } });
    },
  },
};
</script>

<style lang="sass">
.productItem
  cursor: pointer !important
</style>
