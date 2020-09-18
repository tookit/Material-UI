<template>
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
          </v-row>
          <v-row>
            <v-col :cols="12">
              <v-subheader> Specs </v-subheader>
              <div v-if="item" v-html="item.specs" />
            </v-col>
            <v-col :cols="12">
              <v-btn text>
                <v-icon @click="handleAddProps">mdi-plus</v-icon>
                Add Direct
              </v-btn>
            </v-col>
            <v-col :cols="6">
              <v-combobox
                outlined
                label="name"
                :items="items"
                :loading="isLoading"
                :search-input.sync="search"
                placeholder="Property Name"
                item-text="name"
                item-value="id"
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No results matching "<strong>{{ search }}</strong
                        >". Press <kbd>enter</kbd> to create a new one
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <v-col :cols="6">
              <v-text-field
                outlined
                label="value"
                placeholder="Property Value"
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
import _groupBy from 'lodash/groupBy'
export default {
  name: 'FormProductProperty',
  components: {},
  props: {
    item: Object
  },
  data() {
    return {
      loading: false,
      isLoading: false,
      items: [],
      search: null,
      catProps: [],
      formModel: {},
      props: []
    }
  },
  computed: {
    ...mapGetters(['getSpuProperties', 'getPropUnits', 'getPropTypes'])
  },
  watch: {
    item: {
      handler(item) {
        if (item) {
          this.fetchCategoryProps(item)
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
          this.items = data
          this.isLoading = false
        })
    }
  },
  methods: {
    assignModel(data) {
      if (data.props) {
        let props = _groupBy(data.props, 'property_slug')
        for (let slug in props) {
          props[slug] = props[slug].find((p) => p.id)
        }
        this.formModel = props
      } else {
        this.initModel()
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
      const cats = item.categories
      if (cats.length > 0) {
        const cat = cats[cats.length - 1]
        this.$store
          .dispatch('getPropertyByCategoryId', cat.category_id)
          .then((resp) => {
            this.catProps = resp.data
          })
      }
    },

    handleAddProps() {}
  },
  created() {}
}
</script>

<style></style>
