<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-cascader
                :items="getProductCategories"
                v-model="formModel.categories"
                @change="handleCategoryChange"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.name"
                outlined
                label="Name"
                name="name"
                placeholder="Name"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.slug"
                readonly
                label="Slug"
                outlined
                placeholder="Slug"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.featured_img"
                label="Featured Image"
                outlined
                placeholder="Featured Image"
              />
            </v-col>
            <v-col :cols="6">
              <v-switch
                v-model="formModel.is_active"
                readonly
                label="Active"
                outlined
                placeholder="Active"
              />
            </v-col>
            <v-col :cols="12">
              <v-text-field
                v-model="formModel.reference_url"
                readonly
                outlined
                label="Reference"
                placeholder="Reference"
              />
            </v-col>
            <v-col :cols="12"> </v-col>
            <v-col :cols="12">
              <v-textarea
                v-model="formModel.description"
                outlined
                placeholder="Description"
                label="Description"
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
import { mapGetters } from 'vuex'
import { findAllParent } from '@/utils'
import VCascader from '@/components/cascader/'

export default {
  name: 'FromProductCategory',
  components: { VCascader },
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
        featured_img: null,
        is_active: false,
        parent_id: null,
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
        for (let key in this.formModel) {
          this.formModel[key] = data[key] || null
        }
        this.formModel.categories = findAllParent(
          this.getProductCategories,
          (data) => data.id === this.formModel.parent_id,
          [],
          'id'
        )
      } else {
        this.formModel = {
          name: null,
          description: null,
          slug: null,
          reference_url: null,
          featured_img: null,
          is_active: false,
          parent_id: null
        }
      }
    },
    handleSubmit() {
      this.loading = true

      if (this.item) {
        this.$store
          .dispatch('updateProductCategory', {
            id: this.item.id,
            data: this.formModel
          })
          .then(() => {
            this.loading = false
          })
      } else {
        this.$store
          .dispatch('createProductCategory', this.formModel)
          .then(() => {
            this.loading = false
          })
      }
    },
    handleCategoryChange(val) {
      this.formModel.categories = val
    }
  },
  created() {
    this.$store.dispatch('fetchProductCategoryTree')
  }
}
</script>
