import Vue from 'vue'
import router from './router/'
import store from './store/'
// import './registerServiceWorker'
import './plugins/storage'
//import './iconfont'
import './theme/default.sass'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueTheMask from 'vue-the-mask'
import uploader from 'vue-simple-uploader'

Vue.use(uploader)
import ConfirmDialog from '@/components/dialog/ConfirmDialog'
Vue.use(ConfirmDialog, { vuetify })
//vue vise
// import Viser from 'viser-vue'
// Vue.use(Viser)
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import 'dropzone/dist/dropzone.css'
import 'jodit/build/jodit.css'
Vue.use(PerfectScrollbar)

Vue.use(VueTheMask)
Vue.config.productionTip = false
const app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
})
app.$mount('#app')
