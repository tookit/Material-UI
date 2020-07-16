<template>
  <div class="page-news-item view">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <form-news :item="item" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FormNews from '@/components/form/cms/FormNews'
export default {
  name: 'NewsItem',
  props: {
    id: [Number, String]
  },
  components: {
    FormNews
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
      this.$store.dispatch('getNewsById', id).then(({ data }) => {
        console.log(data)
        this.item = data
      })
    }
  }
}
</script>

<style></style>
