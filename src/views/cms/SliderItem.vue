<template>
  <div class="page-slider-item view">
    <v-container fluid>
      <v-row>
        <v-col cols="8">
          <slider-form :item="item" />
        </v-col>
        <v-col cols="4" v-if="id">
          <image-form :action="uploadAction" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SliderForm from '@/components/form/SliderForm'
import ImageForm from '@/components/form/ImageForm'
export default {
  name: 'SliderItem',
  props: {
    id: [Number, String]
  },
  components: {
    SliderForm,
    ImageForm
  },
  data() {
    return {
      item: null
    }
  },
  computed: {
    uploadAction() {
      return `${process.env.VUE_APP_BASE_API_HOST}/api/cms/slider/${this.id}/image`
    }
  },
  watch: {
    id: {
      handler(id) {
        if (id) {
          this.fetchRecord(id)
        }
      },
      immediate: true
    }
  },
  methods: {
    fetchRecord(id) {
      this.$store.dispatch('getSliderById', id).then(({ data }) => {
        this.item = data
      })
    }
  }
}
</script>

<style></style>
