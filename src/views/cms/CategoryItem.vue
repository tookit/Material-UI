<template>
  <div class="page-category-item view">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <form-news-category :item="item" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FormNewsCategory from '@/components/form/cms/FormNewsCategory'
export default {
  name: 'NewsItem',
  props: {
    id: [Number, String]
  },
  components: {
    FormNewsCategory
  },
  data() {
    return {
      item: null
    }
  },
  computed: {},
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
      this.$store.dispatch('getNewsCategoryById', id).then(({ data }) => {
        this.item = data
      })
    }
  }
}
</script>

<style></style>
