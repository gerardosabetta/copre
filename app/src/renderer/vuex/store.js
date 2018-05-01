import Vue from 'vue'
import Vuex from 'vuex'
import paises from './paises'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paises,
    organoName: "Nombre del Órgano",
    topicName: "Nombre del Tópico",
    activeCountry: {},
    speakersList: [],
    speakingCountry: {},
    //Note taking
    notes: [],
    activeNote: {},

    questions: []
  },
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
})
