<template>
  <v-container fluid fill-height class="elephant-bg">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 lg4>
        <router-view :key="$route.path"></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),

  methods: {}
}
</script>
<style lang="scss" scoped>
.elephant-bg {
  background-image: url('/static/elephant/elephantbg.jpg') !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-color: black !important;
}
</style>
