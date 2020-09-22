<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <template v-for="item in getSpuProperties">
              <v-col :cols="12" :key="item.id">
                <v-autocomplete
                  :items="item.values"
                  outlined
                  chips
                  deletable-chips
                  multiple
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
      loadingTags: false,
      search: null,
      tags: [],
      formModel: {}
    }
  },
  computed: {
    ...mapGetters(['getSpuProperties', 'getPropUnits', 'getPropTypes'])
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
      if (data.props) {
        let props = _groupBy(data.props, 'property_slug')
        for (let slug in props) {
          props[slug] = props[slug].map((p) => p.id)
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
    handleNameChange(val) {
      this.formModel.slug = this.slugify(val.toLowerCase())
    }
  },
  created() {
    this.$store.dispatch('fetchProperty', { pageSize: -1 })
  }
}
</script>

<style></style>
