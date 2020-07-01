<template>
  <v-card>
    <v-card-title>{{ formTitle }}</v-card-title>
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.name"
                outlined
                label="name"
                name="name"
                placeholder="name"
              ></v-text-field>
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.slug"
                readonly
                label="slug"
                outlined
                placeholder="slug"
              ></v-text-field>
            </v-col>
            <v-col :cols="12">
              <v-text-field
                v-model="formModel.reference_url"
                readonly
                outlined
                label="Reference"
                placeholder="Reference"
              ></v-text-field>
            </v-col>
            <v-col :cols="12">
              <v-tree-select
                :items="getProductCategories"
                :selected-items="formModel.categories"
                @change="handleCategoriesChange"
              />
            </v-col>
            <v-col :cols="12">
              <v-textarea
                v-model="formModel.description"
                outlined
                placeholder="Description"
                label="description"
              />
            </v-col>
            <v-col :cols="12">
              <v-textarea
                outlined
                :rows="10"
                label="sppecs"
                placeholder="Specs"
                v-model="formModel.specs"
              />
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
import VTreeSelect from '@/components/tree-select/VTreeSelect'
import { mapGetters } from 'vuex'
export default {
  name: 'FromProductCategory',
  components: {
    VTreeSelect
  },
  props: {
    item: Object
  },
  data() {
    return {
      loading: false,
      formModel: {
        name: null,
        description: null,
        slug: null,
        reference_url: null,
        specs: null,
        categories: []
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
          reference_url: data.reference_url,
          specs: data.specs,
          categories: data.categories
        }
      } else {
        this.formModel = {
          name: null,
          description: null,
          slug: null,
          reference_url: null,
          specs: null,
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
    }
  },
  created() {
    this.$store.dispatch('fetchProductCategoryTree')
  }
}
</script>

<style></style>
