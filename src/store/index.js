import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    testStore: 'eieiStore',
    testStore2: 'eieiStore2',
    categoryItem: [],
    carouselItem: [],
    cartItem: [
      {
        stkId: 1,
        name: '1990 Hook-ups Skateboard',
        price: '150'
      },
      {
        stkId: 2,
        name: 'Samrall Co. Dexter Lab',
        price: '150'
      },
      {
        stkId: 3,
        name: '1996 Blink-182',
        price: '150'
      },
      {
        stkId: 4,
        name: '1990 MXPX',
        price: '150'
      },
    ],
    settings: {},
  },
  getters: {
  },
  mutations: {
    setSettings(state, param) {
      state.settings = param
    },
    addCart(state, param) {
      state.cartItem.push(param)
    },
    removeCart(state, param) {
      let idx = state.cartItem.findIndex(x => x.stkId = param.id)
      state.cartItem.splice(idx, 1);
    }
  },
  actions: {
    async setSettings({ state, commit }) {
      if (state.settings === {}) return
      let { data } = await Vue.axios.post('/setting/get-setting')
      console.log('dispatching...')
      let param = {}
      for (let item of data.rows) {
        param[item.tableCode] = JSON.parse(item.datas)
      }
      commit('setSettings', param)
    }
  },
  modules: {
  }
})