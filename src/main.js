import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import axios from 'axios';
import VueAxios from 'vue-axios';

const request = axios.create({
  baseURL: process.env.VUE_APP_API_PATH || `http://localhost:8085/api`,
})
Vue.use(VueAxios, request)

import MarqueeText from './components/MarqueeText.vue';
Vue.component('marquee-text', MarqueeText);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
