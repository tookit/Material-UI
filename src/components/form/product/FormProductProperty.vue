<template>
  <div>
    <v-card :loading="loading">
      <v-card-text>
        <v-form v-if="!loading">
          <v-container fluid>
            <v-row>
              <v-col :cols="12">
                <v-subheader class="pl-0">
                  From Category
                </v-subheader>
              </v-col>
              <template v-if="item">
                <template v-for="item in catProps">
                  <v-col :cols="4" :key="item.id">
                    <v-autocomplete
                      :items="item.values"
                      outlined
                      :name="item.name"
                      :placeholder="item.name"
                      :label="item.name"
                      item-text="value"
                      item-value="id"
                      v-model="formModel[item.slug]"
                    />
                  </v-col>
                </template>
              </template>
            </v-row>
            <v-row>
              <v-col :cols="12">
                <v-subheader> Specs </v-subheader>
                <div v-if="item" v-html="item.specs" />
              </v-col>
              <v-col :cols="12">
                <v-btn @click="showDialog = true" icon>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="item">
              <template v-for="item in directProps">
                <v-col :cols="4" :key="item.id">
                  <v-autocomplete
                    :items="item.property.values"
                    outlined
                    :name="item.property_name"
                    :placeholder="item.property_name"
                    :label="item.property_name"
                    item-text="value"
                    item-value="id"
                    v-model="formModel[item.property_slug]"
                  />
                </v-col>
              </template>
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

    <v-dialog v-model="showDialog" v-if="!loading">
      <v-card>
        <v-card-title dark tile color="primary"
          >Add direct property
          <v-spacer />
          <v-icon @click="showDialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pa-0" v-if="item">
          <form-direct-property
            @attach="handleAttached"
            :product-id="item.id"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormDirectProperty from '@/components/form/product/FormDirectProperty'
export default {
  name: 'FormProductProperty',
  components: { FormDirectProperty },
  props: {
    item: Object
  },
  data() {
    return {
      loading: false,
      isLoading: false,
      showDialog: false,
      items: [],
      search: null,
      catProps: [],
      formModel: {}
    }
  },
  computed: {
    ...mapGetters(['getSpuProperties', 'getPropUnits', 'getPropTypes']),
    inheritedProps() {
      const { property_values } = this.item
      return property_values && property_values.length > 0
        ? property_values.filter((item) => {
            return item.property.inherited === true
          })
        : []
    },
    directProps() {
      const { property_values } = this.item
      return property_values && property_values.length > 0
        ? property_values.filter((item) => {
            return item.property.inherited === false
          })
        : []
    }
  },
  watch: {
    item: {
      handler(item) {
        if (item) {
          // this.fecthPropertyValues(item)
          if (item && item.categories.length > 0) {
            this.fetchCategoryProps(item)
          }
          this.assignModel(item)
        }
      },
      immediate: true
    },
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return
      // Items have already been requested
      if (this.isLoading) return
      this.isLoading = true
      // Lazily load input items
      this.$store
        .dispatch('fetchProperty', { pageSize: -1 })
        .then(({ data }) => {
          this.item.property_values = data
          this.isLoading = false
        })
    }
  },
  methods: {
    assignModel(data) {
      if (data.property_values.length > 0) {
        data.property_values.forEach((item) => {
          this.formModel[item.property_slug] = item.id
        })
      }
    },
    initModel() {
      this.formModel = {}
    },
    handleSubmit() {
      this.loading = true
      if (this.item) {
        this.$store
          .dispatch('attachPropsForProduct', {
            id: this.item.id,
            data: this.formModel
          })
          .then(() => {
            this.loading = false
          })
      }
    },
    fetchCategoryProps(item) {
      const categories = item.categories
      const cat = categories[categories.length - 1]
      this.loading = true
      this.$store
        .dispatch('getPropertyByCategoryId', cat.category_id)
        .then((resp) => {
          this.catProps = resp.data
          this.loading = false
        })
    },

    fecthPropertyValues(item) {
      this.loading = true
      this.$store
        .dispatch('getPropertyValuesByProductId', item.id)
        .then((resp) => {
          this.item.property_values = resp.data
          this.loading = false
        })
    },
    handleAttached() {
      this.fecthPropertyValues(this.item)
    }
  },
  created() {}
}
</script>

<style></style>
