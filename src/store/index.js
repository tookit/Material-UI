import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
console.log(modules)
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  key: 'elephant',
  storage: window.localStorage,
  modules: ['app', 'auth', 'job', 'project']
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin]
})

export default store
