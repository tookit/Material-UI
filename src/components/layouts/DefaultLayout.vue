<template>
  <div class="app dashboard">
    <app-drawer class="app--drawer" ref="drawer" />
    <!-- <router-view class="sidebar" name="sidebar" /> -->
    <app-toolbar class="app--toolbar" />
    <v-main>
      <router-view />
      <!-- App Footer -->
      <v-footer class="pa-3 app--footer">
        <span>Netpune UI &copy; {{ new Date().getFullYear() }}</span>
        <v-spacer />
        <span class="caption mr-1">Remember All The Things &trade;</span>
      </v-footer>
    </v-main>
    <!-- Go to top -->
    <app-fab />
  </div>
</template>

<script>
import AppDrawer from '@/components/AppDrawer'
import AppToolbar from '@/components/AppToolbar'
import AppFab from '@/components/AppFab'

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab
  },

  data() {
    return {}
  },
  methods: {},
  created() {}
}
</script>

<style lang="sass" scoped>
.page-wrapper
  min-height: calc(100vh - 64px - 48px )
</style>
