<template>
  <div class="page-mall-category view">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-tabs class="route-tab" v-model="defaultTab">
            <v-tab
              v-for="(item, key) in tabs"
              :key="key"
              :href="'#' + item.value"
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="defaultTab">
            <v-tab-item key="general" value="general">
              <product-general :item="item" :loading="loading" />
            </v-tab-item>
            <v-tab-item key="media" value="media">
              <media-table :items="images" :id="id" />
            </v-tab-item>
            <v-tab-item key="seo" value="seo">
              <seo-form :item="item" :loading="loading" />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductGeneral from '@/components/form/product/ProductGeneral'
import SeoForm from '@/components/form/SeoForm'
import MediaTable from '@/components/table/MediaTable'
export default {
  props: {
    id: [Number, String]
  },
  components: {
    SeoForm,
    MediaTable,
    ProductGeneral
  },
  data() {
    return {
      defaultTab: 'general',
      tabs: [
        {
          text: 'General',
          value: 'general'
        },
        {
          text: 'Media',
          value: 'media'
        },
        {
          text: 'SEO',
          value: 'seo'
        }
      ],
      loading: false,
      item: null,
      images: []
    }
  },
  watch: {
    id: {
      handler(id) {
        this.fetchRecord(id)
      },
      immediate: true
    }
  },
  methods: {
    fetchRecord(id) {
      this.loading = true
      this.$store.dispatch('getProductById', id).then(({ data }) => {
        this.item = data
        this.loading = false
      })
    }
  }
}
</script>

<style></style>
