<template>
  <v-app>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <!-- theme setting -->
    <!-- <v-btn small fab dark fixed top="top" right="right" class="setting-fab" color="primary" @click="openThemeSettings">
      <v-icon>mdi-cog</v-icon>
    </v-btn>-->
    <!-- setting drawer -->
    <v-navigation-drawer
      width="450"
      class="setting-drawer"
      temporary
      right
      v-model="rightDrawer"
      hide-overlay
      fixed
    >
      <theme-settings></theme-settings>
    </v-navigation-drawer>
    <!-- global snackbar -->
    <v-snackbar v-model="snackbar.show" top>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import ThemeSettings from '@/components/ThemeSettings'
import Echo from 'laravel-echo'
export default {
  components: {
    ThemeSettings
  },
  data() {
    return {
      rightDrawer: false,
      snackbar: {
        show: false,
        text: '',
        color: ''
      }
    }
  },
  mounted() {
    if (typeof window !== undefined && window.ELEPHANT === undefined) {
      window.ELEPHANT = this
    }
  },
  created() {
    // add app events
    this.$on('AUTH_FAILED', (e) => {
      this.snackbar = {
        show: true,
        text: e.message
      }
      this.$router.push({
        path: '/auth/login'
      })
    })
    this.$on('API_FAILED', (e) => {
      this.snackbar = {
        show: true,
        text: e.reason
      }
    })
    this.$on('SHOW_SNACKBAR', (e) => {
      this.snackbar = {
        show: true,
        text: e.text,
        color: e.color
      }
    })
    // this.initWebsocket()
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0)
      this.rightDrawer = !this.rightDrawer
    },
    initWebsocket() {
      window.Pusher = require('pusher-js')
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: '9002ae97ba006ca29343',
        wsHost: 'local.theopticalfiber.com',
        wsPort: 6001,
        encrypted: false,
        forceTLS: false,
        disableStats: false
      })
      console.log(
        window.Echo.connector.pusher.connection.bind('connected', (e) => {
          console.log(e)
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  min-height: calc(50% - 500px);
}
</style>
