<template>
  <div class="page-search--layout grey lighten-2">
    <v-tabs class="route-tab">
      <v-tab v-for="(route, key) in routes" :key="key" :to="route.to">{{
        route.text
      }}</v-tab>
    </v-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'TabLayout',
  data() {
    return {
      showDrawer: true,
      routes: [
        {
          text: 'Entity',
          to: { path: '/search/entity' }
        },
        {
          text: 'GEO',
          to: { path: '/search/geo' }
        },
        {
          text: 'File',
          to: { path: '/search/file' }
        }
      ]
    }
  },
  computed: {},
  created() {
    console.log(this.$route)
  }
}
</script>

<style lang="sass" scoped>
.page-search--layout
  min-height: calc(100vh - 64px - 48px)
</style>
