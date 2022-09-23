<template>
  <v-app>
    <!-- Nav Bar -->
    <v-app-bar :clipped-left="clipped" fixed extension-height="50">
      <!-- Marquee -->
      <v-container class="fill-height" >
        <v-carousel
          cycle
          interval="5000"
          height="50"
          :show-arrows="false"
          hide-delimiters
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <div v-if="slide.url">
                <a :href="slide.url" target="_blank">{{ slide.txt }}</a>
              </div>
              <div v-else>
                {{ slide.txt }}
              </div>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-container>
      <!-- Nav bar -->
      <template #extension>
        <v-toolbar>
          <!-- Title/logo -->
          <router-link to="/" style="padding-left: 50px;" v-if="!((!searchClosed || searchData) && isMobile)">
            <img
              :class="{ hide: (!searchClosed || searchData) && isMobile }"
              class="mr-3"

              src = "https://cdn.shopify.com/s/files/1/0016/4013/6813/files/logo_3c33f7b3-489a-4f17-be41-28a6d3ff2260_180x.png?v=1652131245"
              width="150"
          /></router-link>
          <!-- :src="require('./assets/logo.png')" -->
          <v-divider
            class="mx-4"
            v-if="!isMobile"
            vertical
          ></v-divider>

          <router-link v-if="!isMobile" to="/product/A" style="padding-left: 5px;">Shop</router-link>
          <v-spacer />
          
          <!-- search -->
          <v-text-field
            class="mt-6 expanding-search"
            :class="{ closed: searchClosed && !searchData }"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            @focus="searchClosed = false"
            @blur="searchClosed = true"
            v-model="searchData"
            enterkeyhint="go"
            flat
            dense
            clearable
          ></v-text-field>

          <!-- cart -->
          <v-badge
            bordered
            color="error"
            :content="cart.length"
            bottom
            overlap
            :offset-x="isMobile ? '20' : '70'"
            offset-y="25"
            :style="isMobile ? 'padding-left: 5px;' : 'padding-right: 50px;'"
          >
            <v-btn icon>
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
  
          <!-- Dropdown btn -->
          <div style="padding-right: 10px;" v-if="isMobile">
            <v-menu transition="slide-y-transition" offset-y bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-card class="mt-1">
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                      />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>John Leider</v-list-item-title>
                      <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <router-link to="/product">
                        <v-btn>
                          <v-icon>mdi-heart</v-icon>
                        </v-btn>
                      </router-link>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                  <v-list-item>
                    <v-list-item-action>
                      <v-switch color="purple"></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Enable messages</v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-action>
                      <v-switch color="purple"></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Enable hints</v-list-item-title>
                  </v-list-item>
                </v-list>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn text @click="menu = false"> Cancel </v-btn>
                  <v-btn color="primary" text @click="menu = false"> Save </v-btn>
                </v-card-actions>
              </v-card>

              <!-- <v-list>
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list> -->
            </v-menu>
          </div>
        </v-toolbar>
      </template>
    </v-app-bar>
    <!-- Body -->
    <v-main>
      <v-container class="pt-4">
        <div style="padding-top: 100px;">
          <router-view />
        </div>
      </v-container>
    </v-main>
    <!-- Footer -->
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- others -->
  </v-app>
</template>

<script>
import MarqueeText from "./components/MarqueeText.vue";
export default {
  name: "DefaultLayout",
  components: {
    MarqueeText,
  },
  data() {
    return {
      searchClosed: true,
      searchData: "",
      slides: [
        {txt: 'Follow us on Instagram -> @samrall_worldwide', url: 'http://www.google.com'},
        {txt: '10+ items FREE SHIPPING WORLDWIDE', url: ''},
        {txt: `20% Discount use CODE: 'SAMRALL'`, url: ''},
      ],
      cart: [
        { stkId: "1", itemName: "A", price: "999" },
        { stkId: "2", itemName: "A", price: "999" },
        { stkId: "3", itemName: "A", price: "999" },
        { stkId: "4", itemName: "A", price: "999" },
      ],
      clipped: false,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: "mdi-home",
          title: "T-Shirt",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: "Crazyfinds",
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
  methods: {},
};
</script>
<style lang="sass">
.v-input.expanding-search
  transition: max-width 0.4s
  max-width: 500px
  .v-input__slot
    cursor: pointer !important
    &:before, &:after
      border-color: transparent !important
  &.closed
      max-width: 30px
      .v-input__slot
        background: transparent !important
.hide
  width: 0 !important
.v-toolbar__content, .v-toolbar__extension 
  padding: 0 !important


@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,900&display=swap')

h1 
  font-family: "Poppins"
  font-size: 40px


</style>
