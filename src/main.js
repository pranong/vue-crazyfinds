import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { rtdbPlugin } from 'vuefire'

Vue.use(rtdbPlugin)
import MarqueeText from "./components/MarqueeText.vue";

Vue.component("marquee-text", MarqueeText);

Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app')
