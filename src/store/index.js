import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    testStore: 'eieiStore',
    testStore2: 'eieiStore2',
    categoryItem: [],
    carouselItem: [],
    cartItem: [],
    settings: {},
  },
  getters: {
  },
  mutations: {
    setSettings(state, param) {
      console.log('param', param)
      state.settings = param
    },
    addCart(state, param) {
      state.cartItem.push(param)
    },
    removeCart(state, param) {
      console.log(param.stkId)
      let idx = state.cartItem.findIndex(x => x.stkId === param.stkId)
      console.log('idx store', idx)
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