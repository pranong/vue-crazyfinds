import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    testStore: 'eieiStore',
    testStore2: 'eieiStore2',
    categoryItem: [],
    carouselItem: [],
    settings: {},
  },
  getters: {
  },
  mutations: {
    setSettings(state, param) {
      state.settings = param
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