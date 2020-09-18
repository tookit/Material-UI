<template>
  <div class="page-mall-item view">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-tabs class="route-tab" v-model="defaultTab" @change="onTabChange">
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
              <media
                @selected="handleSelectMedia"
                :directory="directory"
                :entity-id="id"
                entity="App\Models\Mall\Product"
                @attach="handleAttachMedia"
                show-select
              />
            </v-tab-item>
            <v-tab-item key="property" value="property">
              <form-product-property
                :item="item"
                :loading="loading"
                :action="updateProduct"
              />
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
import FormProductProperty from '@/components/form/product/FormProductProperty'
import SeoForm from '@/components/form/SeoForm'
import Media from '@/components/media/Index'
import { attachMediaForProduct } from '@/api/service'
import { mapActions } from 'vuex'
export default {
  props: {
    id: [Number, String]
  },
  components: {
    SeoForm,
    Media,
    FormProduct,
    FormProductProperty
  },
  data() {
    return {
      defaultTab: this.$route.query ? this.$route.query.tab : 'general',
      tabs: [
        {
          text: 'General',
          value: 'general'
        },
        {
          text: 'Property',
          value: 'property'
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
    onTabChange(tab) {
      this.$router.push({
        path: this.$route.path,
        query: {
          tab: tab,
          t: Date.now()
        }
      })
    },
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
    handleSelectMedia() {},
    handleAttachMedia(item) {
      attachMediaForProduct(this.id, item.id).then(() => {})
    }
  }
}
</script>

<style></style>
