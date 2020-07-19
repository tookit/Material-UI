<template>
  <v-container fluid fill-height>
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
