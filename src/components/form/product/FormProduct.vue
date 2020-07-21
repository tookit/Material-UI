<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.name"
                outlined
                label="Name"
                name="Name"
                placeholder="name"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.slug"
                readonly
                label="Slug"
                outlined
                placeholder="slug"
                append-icon="mdi-eye"
                @click:append="handleViewItem"
              />
            </v-col>
            <v-col :cols="6">
              <v-switch
                v-model="formModel.is_active"
                label="Active"
                placeholder="Active"
              />
            </v-col>
            <v-col :cols="6">
              <v-switch
                v-model="formModel.is_home"
                label="Home"
                placeholder="Home"
              />
            </v-col>
            <v-col :cols="12">
              <v-text-field
                v-model="formModel.reference_url"
                readonly
                outlined
                label="Reference"
                append-icon="mdi-eye"
                placeholder="Reference"
                @click:append="handleViewReference"
              />
            </v-col>
            <v-col :cols="12">
              <v-autocomplete
                v-model="formModel.tags"
                :loading="loadingTags"
                clearable
                @keydown.enter="handleAddTag"
                :items="tags"
                :search-input.sync="search"
                cache-items
                chips
                multiple
                hide-details
                label="Tags"
                outlined
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      `Enter` Create a new tag
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col :cols="12">
              <v-cascader
                :items="getProductCategories"
                name="Category"
                label="Category"
                placeholder="Category"
                v-model="formModel.categories"
                @change="handleCategoriesChange"
              />
            </v-col>
            <v-col :cols="12">
              <v-textarea
                v-model="formModel.description"
                outlined
                placeholder="Description"
                label="Description"
              />
            </v-col>
            <v-col :cols="12">
              <label for="">Specs</label>
              <v-jodit v-model="formModel.specs" />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions class="py-3">
      <v-spacer></v-spacer>
      <v-btn @click="handleSubmit()" :loading="loading" tile color="primary">
        save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import VJodit from '@/components/jodit'
import VCascader from '@/components/cascader/'
import { fetchTags } from '@/api/service'
export default {
  name: 'FormProduct',
  components: {
    VJodit,
    VCascader
  },
  props: {
    item: Object
  },
  data() {
    return {
      loading: false,
      loadingTags: false,
      search: null,
      tags: [],
      formModel: {
        name: null,
        is_active: null,
        is_home: null,
        description: null,
        slug: null,
        reference_url: null,
        specs: '',
        categories: [],
        tags: []
      }
    }
  },
  computed: {
    ...mapGetters(['getProductCategories']),
    formTitle() {
      return this.item ? 'Edit Product' : 'Create Product'
    }
  },
  watch: {
    item: {
      handler(item) {
        this.assignModel(item)
      },
      immediate: true
    }
  },
  methods: {
    assignModel(data) {
      if (data) {
        this.formModel = {
          id: data.id,
          name: data.name,
          description: data.description,
          slug: data.slug,
          is_active: data.is_active,
          is_home: data.is_home,
          reference_url: data.reference_url,
          specs: data.specs,
          tags: data.tags.map((item) => item.name),
          categories:
            data.categories.length > 0
              ? data.categories.map((item) => item.category_id)
              : []
        }
      } else {
        this.formModel = {
          name: null,
          description: null,
          slug: null,
          is_active: null,
          is_home: null,
          reference_url: null,
          specs: '',
          categories: []
        }
      }
    },
    handleSubmit() {
      this.loading = true

      if (this.formModel.id) {
        this.$store
          .dispatch('updateProduct', {
            id: this.formModel.id,
            data: this.formModel
          })
          .then(() => {
            this.loading = false
          })
      } else {
        this.$store.dispatch('createProduct', this.formModel).then(() => {
          this.loading = false
        })
      }
    },
    handleCategoriesChange(categories) {
      this.formModel.categories = categories
      this.formModel.category_ids = categories.map((item) => {
        return item.id
      })
    },
    handleViewItem() {
      if (this.item) {
        window.open(this.item.href, '_blank')
      }
    },
    handleViewReference() {
      if (this.item) {
        window.open(this.item.reference_url, '_blank')
      }
    },
    handleAddTag(e) {
      const tags = this.formModel.tags
      tags.push(e.target.value)
      this.tags.push({
        text: e.target.value
      })
      this.formModel.tags = tags
      this.search = null
    },
    fetchTags() {
      fetchTags().then(({ data }) => {
        this.tags = data.map((item) => {
          item.text = item.name
          return item
        })
      })
    }
  },
  created() {
    this.$store.dispatch('fetchProductCategoryTree')
    this.fetchTags()
  }
}
</script>

<style></style>
