<template>
  <v-app>
    <!-- Nav Bar -->
    <div class="my-nav">
      <v-row cols="12" >
        <v-col cols="7" style="display:flex;justify-content: end;align-items: center;" >
          <router-link to="/" style="padding-left: 50px;text-align:right;" v-if="!((!searchClosed || searchData) && isMobile)">
            <img
              class="mr-3"
              style="width: 35%; opacity: .85"
              :src="require('./assets/logo.png')"
          /></router-link>
        </v-col>
        <v-col cols="5" style="display:flex;justify-content: end;align-items: center;">
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
          <v-badge
            bordered
            color="error"
            :content="cartItem.length"
            :value="cartItem.length > 0"
            bottom
            overlap
            :offset-x="isMobile ? '20' : '70'"
            offset-y="25"
            :style="isMobile ? 'padding-left: 5px;' : 'padding-right: 50px;'"
          >
            <v-btn icon 
            @click.stop="drawer = !drawer">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
        </v-col>
      </v-row>
      
    </div>
    <!-- Body -->
    <v-main>
      <v-container >
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
    // // set setting to store
    // await this.$store.dispatch('setSettings')
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
  background-color: aqua
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
.v-toolbar__content, .v-toolbar__extension 
  padding: 0 !important


@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,900&display=swap')

h1 
  font-family: "Poppins"
  font-size: 40px


</style>
