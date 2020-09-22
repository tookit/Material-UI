<template>
  <div class="page-mall-category view">
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
              <form-product-category :item="item" />
            </v-tab-item>
            <v-tab-item key="product" value="product">
              <product-table :category-id="id" />
            </v-tab-item>
            <v-tab-item key="property" value="property">
              <property-category-table :category-id="id" />
            </v-tab-item>
            <v-tab-item key="media" value="media">
              <media @selected="handleSelectMedia" :directory="directory" />
            </v-tab-item>
            <v-tab-item key="seo" value="seo">
              <seo-form
                :item="item"
                :loading="loading"
                :action="updateProductCategory"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FormProductCategory from '@/components/form/product/FormProductCategory'
import SeoForm from '@/components/form/SeoForm'
import PropertyCategoryTable from '@/components/table/PropertyCategoryTable'
import ProductTable from '@/components/table/ProductTable'
import Media from '@/components/media/Index'
import { fetchImageByCategoryId } from '@/api/service'
import { mapActions } from 'vuex'
export default {
  props: {
    id: [Number, String]
  },
  components: {
    SeoForm,
    Media,
    PropertyCategoryTable,
    ProductTable,
    FormProductCategory
  },
  data() {
    return {
      showDialog: false,
      defaultTab: 'general',
      tabs: [
        {
          text: 'General',
          value: 'general'
        },
        {
          text: 'product',
          value: 'product'
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
      return `${process.env.VUE_APP_BASE_API_HOST}/api/mall/category/${this.id}/image`
    },
    directory() {
      return `category/${this.id}`
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
    ...mapActions(['updateProductCategory']),
    fetchRecord(id) {
      this.loading = true
      this.$store.dispatch('getProductCategoryById', id).then(({ data }) => {
        this.item = data
        this.loading = false
      })
    },
    fetchImages() {
      return fetchImageByCategoryId(this.id)
    },
    showTab({ value }) {
      if (this.id) {
        return true
      } else {
        return value === 'general'
      }
    },
    handleSelectMedia() {},
    handleAddProp() {}
  }
}
</script>

<style></style>
