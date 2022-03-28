<template>
  <v-app>
    <!-- Nav Bar -->
    <v-app-bar dark :clipped-left="clipped" fixed app>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <router-link to="/">
        <img
          :class="{ hide: (!searchClosed || searchData) && isMobile }"
          class="mr-3"
          :src="require('./assets/logo.png')"
          height="40"
      /></router-link>
      <!-- <v-toolbar-title v-text="title" /> -->

      <v-spacer />

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
                  <v-btn
                    :class="fav ? 'red--text' : ''"
                    icon
                    @click="fav = !fav"
                  >
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
                <v-switch v-model="message" color="purple"></v-switch>
              </v-list-item-action>
              <v-list-item-title>Enable messages</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-switch v-model="hints" color="purple"></v-switch>
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

      <v-badge
        bordered
        color="error"
        :content="cart.length"
        bottom
        overlap
        offset-x="20"
        offset-y="25"
      >
        <v-btn icon>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-badge>
      <!-- Login details -->
    </v-app-bar>
    <!-- Body -->
    <v-main>
      <v-container class="pt-4">
        <router-view />
      </v-container>
    </v-main>
    <!-- Footer -->
    <v-footer fixed dark app>
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
      cart: [
        { stkId: "1", itemName: "A", price: "999" },
        { stkId: "2", itemName: "A", price: "999" },
        { stkId: "3", itemName: "A", price: "999" },
        { stkId: "4", itemName: "A", price: "999" },
      ],
      clipped: false,
      drawer: false,
      fixed: false,
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
</style>
