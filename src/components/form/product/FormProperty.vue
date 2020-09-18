<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form lazy-validation ref="form">
        <v-container fluid>
          <v-row>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.name"
                outlined
                label="Name"
                name="Name"
                placeholder="name"
                :rules="formRules.name"
                @input="handleNameChange"
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
              />
            </v-col>
            <v-col :cols="6">
              <v-select
                :items="getPropUnits"
                outlined
                name="unit"
                placeholder="Unit"
                label="Unit"
                v-model="formModel.unit"
              />
            </v-col>
            <v-col :cols="6">
              <v-select
                :items="['sku', 'spu']"
                outlined
                name="type"
                placeholder="Type"
                label="Type"
                v-model="formModel.type"
              />
            </v-col>
            <v-col :cols="12">
              <v-combobox
                v-model="formModel.values"
                :items="items"
                :search-input.sync="search"
                hide-selected
                label="Property Value"
                multiple
                persistent-hint
                small-chips
                outlined
                deletable-chips
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
import SlugifyMixin from '@/mixins/Slugify'
export default {
  name: 'FormProperty',
  mixins: [SlugifyMixin],
  components: {},
  props: {
    item: Object
  },
  data() {
    return {
      loading: false,
      loadingTags: false,
      search: null,
      items: [],
      formModel: {
        name: null,
        type: 'spu',
        unit: null,
        slug: null,
        values: []
      },
      formRules: {
        name: [(v) => !!v || 'Name is required']
      }
    }
  },
  computed: {
    ...mapGetters(['getPropUnits', 'getPropTypes'])
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
        this.formModel.values = data.values.map((item) => item.value)
      } else {
        this.initModel()
      }
    },
    initModel() {
      this.formModel = {
        name: null,
        type: 'spu',
        unit: null,
        slug: null,
        values: []
      }
    },
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true

        if (this.item) {
          this.$store
            .dispatch('updateProperty', {
              id: this.item.id,
              data: this.formModel
            })
            .then(() => {
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.$store
            .dispatch('createProperty', this.formModel)
            .then(() => {
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        }
      }
    },

    handleNameChange(val) {
      this.formModel.slug = this.slugify(val.toLowerCase())
    }
  },
  created() {}
}
</script>

<style></style>
