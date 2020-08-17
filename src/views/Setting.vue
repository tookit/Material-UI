<template>
  <v-container class="page-setting">
    <v-row>
      <v-col>
        <form-setting :item="setting" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormSetting from '@/components/form/FormSetting'
export default {
  name: 'PageStting',
  components: {
    FormSetting
  },
  data() {
    return {
      setting: null
    }
  },
  created() {
    this.$store.dispatch('fetchSetting').then(({ data }) => {
      this.setting = data
    })
  }
}
</script>

<style></style>
