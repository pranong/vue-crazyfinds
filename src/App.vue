<template>
  <v-app>
    <!-- Nav Bar -->
    <v-app-bar :clipped-left="clipped" fixed extension-height="50" app overflow-hidden>
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
        <v-toolbar class="px-8">
          <!-- Dropdown btn -->
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
                    <router-link to="/collection">
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

          <v-spacer />

          <!-- Title/logo -->
            <!-- <router-link to="/" style="" v-if="!((!searchClosed || searchData) && isMobile)"> -->
              <v-img
                :class="{ hide: (!searchClosed || searchData) && isMobile, centerme: !isMobile }"
                class="mx-4"
                style="width: 50%; opacity: .85"
                :src="require('./assets/logo.png')"
            />
          <!-- </router-link> -->

          <v-spacer />
          
          <!-- search -->
          <v-text-field
            class="mt-6 expanding-search"
            :class="{ closed: searchClosed && !searchData }"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            @focus="searchClosed = false"
            @blur="searchClosed = true"
            @keydown.enter="doSearch()"
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
            :content="cartItem.length"
            :value="cartItem.length > 0"
            bottom
            overlap
            :offset-x="isMobile ? '20' : '70'"
            offset-y="25"
          >
            <v-btn icon 
            @click.stop="drawer = !drawer">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
        </v-toolbar>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      sticky
      temporary
      clipped
      app
      width="50%"
    >
      <v-list nav dense>
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
            <!-- <router-link to="/collection">
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-heart</v-icon>
              </v-btn>
            </router-link> -->
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list v-for="item in cartItem" :key="item.stkId">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.price }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1" @click="$store.commit('removeCart', item)">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click.stop="drawer = !drawer"> Cancel </v-btn>
        <v-btn color="primary" text @click.stop="drawer = !drawer"> Save </v-btn>
      </v-card-actions>
    </v-navigation-drawer>
    <!-- Body -->
    <v-main>
      <v-container class="pt-4">
        <div>
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
  async created() {
    // set setting to store
    await this.$store.dispatch('setSettings')
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
    cartItem() {
      return this.$store.state.cartItem
    },
    cartItemLength() {
      return this.$store.state.cartItem.length
    }
  },
  methods: {
    doSearch() {
      console.log('search jaaa')
      console.log('this.$route.path', this.$route.path)
      if (this.$route.path.includes('collection')) location.reload();
      this.$router.push({ path: `../collection/search?q=${this.searchData})}`}).catch(error => {
        if (error.name != 'NavigationDuplicated') {
          throw error;
        }
      })
      this.searchData = ''
      this.searchClosed = true
    }
  },
};
</script>
<style lang="sass">
.my-nav
  position: fixed
  top: 0
  width: 100%
  padding-top: 20px
  padding-bottom: 20px
  text-align: center
  z-index: 999
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
.centerme
  display: block
  margin-left: 50%
  transform: translate(-50%, 0)
.v-toolbar__content, .v-toolbar__extension 
  padding: 0 !important


@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,900&display=swap')

h1 
  font-family: "Poppins"
  font-size: 40px


</style>
