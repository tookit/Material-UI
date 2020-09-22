<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form ref="form">
        <v-container fluid>
          <v-row>
            <v-col :cols="6">
              <v-combobox
                outlined
                label="Name"
                v-model="formModel.name"
                :items="items"
                :loading="isLoading"
                :search-input.sync="searchName"
                placeholder="Property Name"
                item-text="name"
                item-value="name"
                @change="handleNameChange"
                :return-object="false"
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No results matching "<strong>{{ searchName }}</strong
                        >". Press <kbd>enter</kbd> to create a new one
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <v-col :cols="6">
              <v-combobox
                outlined
                label="Value"
                v-model="formModel.value"
                :items="values"
                :loading="isLoading"
                :search-input.sync="searchValue"
                placeholder="Property Value"
                item-text="value"
                item-value="value"
                :return-object="false"
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No results matching "<strong>{{ searchValue }}</strong
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
export default {
  name: 'FormDirectProperty',
  components: {},
  props: {
    productId: [Number, String]
  },
  data() {
    return {
      loading: false,
      isLoading: false,
      searchName: null,
      searchValue: null,
      items: [],
      values: [],
      formModel: {
        name: null,
        value: null
      }
    }
  },
  computed: {
    ...mapGetters(['getProperties'])
  },
  watch: {
    searchName(val) {
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
    handleSubmit() {
      this.loading = true
      const data = { id: this.productId, data: this.formModel }
      this.$store
        .dispatch('attachDirectPropForProduct', data)
        .then(() => {
          this.loading = false
          this.$emit('attach')
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleNameChange(name) {
      this.$store
        .dispatch('fetchProperty', {
          'filter[name]': name
        })
        .then((resp) => {
          this.values = resp.data.length > 0 ? resp.data[0].values : []
        })
    }
  },
  created() {}
}
</script>

<style></style>
