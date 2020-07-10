<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-cascader
                outlined
                :items="getProductCategories"
                v-model="formModel.parent_id"
                item-tex="name"
                @change="handleChange"
                item-value="name"
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
import VCascader from '@/components/cascader/'
export default {
  name: 'FromProductCategory',
  components: { VCascader },
  props: {
    item: Object
  },
  data() {
    return {
      items: [
        {
          text: 'cat-1',
          children: [
            {
              text: 'cat-1-1',
              children: [
                {
                  text: 'cat-1-1-1'
                }
              ]
            }
          ]
        },
        {
          text: 'cat-2',
          children: [
            {
              text: 'cat-2-2'
            }
          ]
        }
      ],
      loading: false,
      formModel: {
        name: null,
        description: null,
        slug: null,
        reference_url: null,
        parent_id: null
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
          this.formModel.parent_id = 2202
        }
      } else {
        this.formModel = {
          name: null,
          description: null,
          slug: null,
          reference_url: null,
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
    handleCategoriesChange(categories) {
      this.formModel.categories = categories
      this.formModel.category_ids = categories.map((item) => {
        return item.id
      })
    },
    handleChange(val) {
      // if (val.item && val.item.id) {
      //   this.formModel.parent_id = val.item.id
      // }
    }
  },
  created() {
    this.$store.dispatch('fetchProductCategoryTree')
  }
}
</script>
