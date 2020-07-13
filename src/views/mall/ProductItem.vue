<template>
  <div class="page-mall-item view">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-tabs class="route-tab" v-model="defaultTab">
            <v-tab
              v-for="(item, key) in tabs"
              :key="key"
              v-show="showTab(item)"
              :href="'#' + item.value"
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="defaultTab">
            <v-tab-item key="general" value="general">
              <form-product :item="item" :loading="loading" />
            </v-tab-item>
            <v-tab-item key="media" value="media">
              <media-table
                :items="images"
                :id="id"
                :data-source="fetchImages"
              />
            </v-tab-item>
            <v-tab-item key="seo" value="seo">
              <seo-form :meta="item.meta" :loading="loading" />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FormProduct from '@/components/form/product/FormProduct'
import SeoForm from '@/components/form/SeoForm'
import MediaTable from '@/components/table/MediaTable'
export default {
  props: {
    id: [Number, String]
  },
  components: {
    SeoForm,
    MediaTable,
    FormProduct
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
  computed: {
    uploadAction() {
      return `${process.env.VUE_APP_BASE_API_HOST}/api/mall/category/${this.id}/image`
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
      this.loading = true
      this.$store.dispatch('getProductById', id).then(({ data }) => {
        this.item = data
        this.loading = false
      })
    },
    fetchImages() {
      return this.$store.dispatch('fetchImageByProductId', this.id)
    },
    showTab({ value }) {
      if (this.id) {
        return true
      } else {
        return value === 'general'
      }
    }
  }
}
</script>

<style></style>
