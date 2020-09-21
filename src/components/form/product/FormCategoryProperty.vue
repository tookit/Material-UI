<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col cols="10">
              <v-autocomplete
                label="Attach Properties"
                placeholder="Find properties"
                :items="items"
                :loading="isLoading"
                :search-input.sync="search"
                item-text="name"
                item-value="id"
                v-model="formModel.properties"
                outlined
                multiple
                chips
                deletable-chips
                clearable
              >
              </v-autocomplete>
            </v-col>
            <v-col :cols="2">
              <v-btn color="primary" tile @click="showDialog = !showDialog"
                >or create</v-btn
              >
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
    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title dark tile color="primary"
          >props
          <v-spacer />
          <v-icon @click="showDialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pa-0">
          <form-property />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import FormProperty from '@/components/form/product/FormProperty'
import SlugifyMixin from '@/mixins/Slugify'
export default {
  name: 'FormCategoryProperty',
  mixins: [SlugifyMixin],
  components: { FormProperty },
  props: {
    categoryId: [Number, String]
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      items: [],
      search: null,
      isLoading: false,
      properties: [],
      formModel: {
        properties: []
      }
    }
  },
  computed: {
    ...mapGetters(['getPropUnits', 'getPropTypes', 'getProperties'])
  },
  watch: {
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
      if (data) {
        for (let key in this.formModel) {
          this.formModel[key] = data[key] || null
        }
      } else {
        this.initModel()
      }
    },
    initModel() {
      this.formModel = {
        propertis: []
      }
    },
    handleSubmit() {
      this.loading = true
      const data = {
        id: this.categoryId,
        data: this.formModel
      }
      this.$store
        .dispatch('attachPropertyForCategory', data)
        .then(() => {
          this.loading = false
          this.$emit('attached')
        })
        .catch(() => {
          this.loading = false
        })
    },

    handleNameChange(val) {
      this.formModel.slug = this.slugify(val.toLowerCase())
    }
  },
  created() {
    this.$store.dispatch('fetchProperty', { pageSize: -1 }).then(({ data }) => {
      this.properties = data
    })
  }
}
</script>

<style></style>
