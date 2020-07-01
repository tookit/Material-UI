import Vue from 'vue'
import store from '../store/'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)
const opts = {
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  theme: {
    dark: store.getters.getThemeMode === 'dark'
  }
}

export default new Vuetify(opts)
