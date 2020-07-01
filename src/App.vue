<template>
  <v-app>
    <transition name="fade" mode="out-in">
      <keep-alive include="graph" v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
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
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0)
      this.rightDrawer = !this.rightDrawer
    }
  }
}
</script>

<style lang="sass" scoped>
.setting-fab
  top: 50% !important
  right: 0 !important
  border-radius: 0
</style>
