<template>
  <v-container>
    <loader v-show="busy" />
    <v-row>
      <v-col lg="8" sm="12" xs="12" md="8">
        <center>
          <v-carousel
            v-model="currentIndex"
            show-arrows-on-hover
            hide-delimiters
            height="auto"
          >
            <v-carousel-item v-for="(item, i) in form.images" :key="i" fade>
              <v-img
                :src="item.src"
                class="productItem"
                aspect-ratio="1"
                :alt="item.src"
                @click="openViewer()"
              />
            </v-carousel-item>
          </v-carousel>
          <v-sheet class="mx-auto mt-4" max-width="100%">
            <v-slide-group multiple show-arrows v-model="currentIndex">
              <v-slide-item v-for="(n, i) in form.images" :key="i">
                <v-img
                  :src="n.src"
                  :style="n.isSelected ? `opacity: 1` : `opacity: 0.5`"
                  class="ma-4 productItem"
                  height="100"
                  width="100"
                  @click="selectImg(n.id)"
                />
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </center>
      </v-col>
      <image-viewer
        v-show="showViewer"
        :images="form.images"
        :now="currentIndex"
        @exit="onImageExit"
      />
      <v-col
        style="height: 100%; position: sticky; top: 118px"
        lg="4"
        xs="12"
        sm="12"
        md="4"
      >
        <v-row>
          <v-breadcrumbs :items="breadcrumbsItems"></v-breadcrumbs>
        </v-row>
        <v-row>
          <v-col>
            <h3>{{ `${form.name}-${form.size}` }}</h3>
            <a>hookups</a>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="6">
            <h3>$ {{ form.priceA }}</h3>
          </v-col>
          <!-- <v-col col="6" class="text-center">
            <v-text-field
              type="number"
              v-model="form.qty"
              label="Quantity"
              style="width: 50px;"
              required
              :disabled="form.qty < 2"
            ></v-text-field>
          </v-col> -->
        </v-row>
        <v-row>
          <v-col>
            <v-divider class="mx-4"></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            {{ form.description }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider class="mx-4"></v-divider>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn class="mt-5 mb-5 cart-btn" @click="addItemToCart(form)" :disabled="btnDisabled"> {{ isInCart ? 'Cart Added!' : form.status === 'X' ? 'Sold out!' : 'Add to cart'}} </v-btn>
        </v-row>
        <!-- <v-row align="center" justify="center"> -->
        <PayPal
          amount="10.00"
          currency="USD"
          :client="ppCredential"
          :button-style="myStyle"
          env="sandbox"
          v-if="!btnDisabled"
        >
        </PayPal>
        <!-- </v-row> -->
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-divider class="mt-5 mb-5"></v-divider>
      </v-col>
    </v-row>

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
            <router-link :to="`../product/${row.name}`">
              <v-carousel
                hide-delimiters
                :width="isMobile ? 150 : 250"
                :height="isMobile ? 150 : 250"
                :show-arrows="false"
              >
                <v-carousel-item
                  :key="i"
                  :src="row.src"
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
  </v-container>
</template>

<script>
import loader from '../components/loader.vue';
import imageViewer from '../components/imageViewer.vue';
import PayPal from 'vue-paypal-checkout';

export default {
  name: 'Details',

  components: {
    loader,
    PayPal,
    imageViewer,
  },
  data() {
    return {
      busy: false,
      qty: 1,
      form: {},
      ppCredential: {
        sandbox: '<sandbox client id>',
        production: '<production client id>',
      },
      showViewer: false,
      nowImageId: 0,
      currentIndex: 0,
      carouselItem: [],
      categoryItem: [],
      myStyle: {
        label: 'checkout',
        size: 'responsive',
        shape: 'rect',
        color: 'silver',
      },
      btnDisabled: false,
      isInCart: false,
      breadcrumbsItems: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    };
  },
  created() {
    console.log('details');
    this.getStock(this.$route.params.stkId);
    this.categoryItem = this.$store.state.settings.categoryItem;
    console.log("this.categoryItem", this.categoryItem);
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
  },
  activated() {
    console.log('details activated');
  },
  watch: {
    currentIndex: function () {
      console.log('this.currentIndex+1', this.currentIndex + 1);
      this.selectImg(this.currentIndex + 1);
    },
    cartItem: async function() {
      console.log('watch Cart Item')
      if (this.isInCart) {
        console.log('x1')
        let idx = this.cartItem.findIndex(x => x.stkId === this.form.stkId)
        console.log('x2', idx)
        if (idx < 0){
          this.isInCart = false
        } else {
          return
        }
        // check status stock from db
        await this.getStock(this.form.stkId);
      }
    }
  },
  methods: {
    async getStock(stkId) {
      this.busy = true;
      try {
        // let res = await this.$http.get('/stock/get-stock')
        let { data } = await this.$http.post('/stock/get-stock-item', {
          stkId,
        });
        // data.item = data.item.map(x => x.images = JSON.parse(x.images))
        let item = data.items;
        if (!item) {
          throw new Error('No value');
        }
        item.images = JSON.parse(item.images);
        item.images.map((x) => (x.isSelected = false));
        item.images[0].isSelected = true;
        this.form = item;
        console.log('this.form', this.form);
        let idx = this.cartItem.findIndex(x => x.stkId === item.stkId)
        console.log('idx', idx)
        if (item.status === 'X') {
          this.btnDisabled = true
        } else {
          this.btnDisabled = false
        }
        if (idx >= 0) {
          this.isInCart = true
          this.btnDisabled = true
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.busy = false;
      }
    },
    selectImg(id) {
      console.log('id');
      this.form.images.map((x) => (x.isSelected = false));
      for (let i = 0; i < this.form.images.length; i++) {
        console.log(this.form.images[i].id, id);
        console.log(typeof this.form.images[i].id, typeof id);
        if (this.form.images[i].id === id + '') {
          console.log('==>');
          this.form.images[i].isSelected = true;
          this.currentIndex = id - 1;
        }
      }
    },
    openViewer() {
      console.log('onopen viewer');
      this.showViewer = true;
    },
    onImageExit(param) {
      this.selectImg(param + 1);
      this.showViewer = false;
    },
    addItemToCart(item) {
      this.$store.commit('addCart',item)
      this.btnDisabled = true
      this.isInCart = true
    }
  },
};
</script>

<style lang="sass">
.cart-btn
  min-width: 94% !important
  min-height: 50px !important
  background-color: black !important
  color: white !important
  border-radius: 5px !important
.v-carousel-item
  position: absolute
  left: 0
  right: 0
  top: 0
  buttom: 0
.productItem
  cursor: pointer !important
</style>
