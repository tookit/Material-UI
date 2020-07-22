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
              <media @selected="handleSelectMedia" :directory="directory" />
            </v-tab-item>
            <v-tab-item key="seo" value="seo">
              <seo-form
                :item="item"
                :loading="loading"
                :action="updateProduct"
              />
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
import Media from '@/components/media/Index'
import { mapActions } from 'vuex'
export default {
  props: {
    id: [Number, String]
  },
  components: {
    SeoForm,
    Media,
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
      return `${process.env.VUE_APP_BASE_API_HOST}/api/mall/item/${this.id}/image`
    },
    directory() {
      return `fiber/${this.id}`
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
    ...mapActions(['updateProduct']),
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
    },
    handleSelectMedia() {}
  }
}
</script>

<style></style>
