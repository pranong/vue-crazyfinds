<template>
  <v-container>
    <loader v-show="busy"/>
    <v-row>
      <v-col 
          lg="8"
          sm="12"
          md="8">
        <center>
          <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          width="500"/>
        </center>
      </v-col>
      <v-col
          lg="4"
          sm="12"
          md="4">
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
            <h3>$ {{form.priceA}}</h3>
          </v-col>
          <v-col col="6" class="text-center">
            <v-text-field
              type="number"
              v-model="form.qty"
              label="Quantity"
              style="width: 50px;"
              required
              :disabled="form.qty<2"
            ></v-text-field>
          </v-col>
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
          <v-btn class="mt-5 mb-5 cart-btn"> Add to cart </v-btn>
        </v-row>
        <v-row align="center" justify="center">
          <PayPal
            amount="10.00"
            currency="USD"
            :client="ppCredential"
            :button-style="myStyle"
            env="sandbox">
          </PayPal>
        </v-row>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
import loader from '../components/loader.vue'
import PayPal from 'vue-paypal-checkout'

export default {
  name: 'Details',

  components: {
    loader,
    PayPal
  },
  data() {
    return {
      busy: false,
      qty: 1,
      form: {},
      ppCredential: {
        sandbox: '<sandbox client id>',
        production: '<production client id>'
      },
      myStyle: {
        label: "checkout",
        size: "large",
        shape: "rect",
        color: "silver"
      },
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
    // console.log("$route.params.id", this.$route.params.id);
  },
  activated() {
    console.log('details activated');
  },
  methods: {
    async getStock(stkId){
      this.busy = true
      try {
        // let res = await this.$http.get('/stock/get-stock')
        let { data } = await this.$http.post('/stock/get-stock-item', {stkId})
        let item = data.items
        if (!item) {
          throw new Error('No value')
        }
        this.form = item
        console.log('this.form', this.form)
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
  },
};
</script>

<style lang="sass">
.cart-btn
  min-width: 350px !important
  min-height: 50px !important
  background-color: black !important
  color: white !important
  border-radius: 0px !important
</style>
  
