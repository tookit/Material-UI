<template>
  <v-container class="page-media">
    <v-row>
      <v-col>
        <media />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Media from '@/components/media/Index'
export default {
  name: 'PageMedia',
  components: {
    Media
  }
}
</script>

<style></style>
