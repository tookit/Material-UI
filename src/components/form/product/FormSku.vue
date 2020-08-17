<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <template v-for="item in getSkuProperties">
              <v-col :cols="6" :key="item.id">
                <v-autocomplete
                  v-model="formModel.specs[item.name]"
                  outlined
                  :items="item.values"
                  :label="item.name"
                  :name="item.name"
                  :placeholder="item.name"
                  item-text="value"
                  item-value="value"
                />
              </v-col>
            </template>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.stock"
                outlined
                label="Stock"
                name="Stock"
                placeholder="Stock"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.price"
                outlined
                label="Price"
                name="Price"
                placeholder="Price"
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
export default {
  name: 'FormSku',
  components: {},
  props: {
    item: Object,
    productId: [Number, String]
  },
  data() {
    return {
      loading: false,
      loadingTags: false,
      search: null,
      tags: [],
      formModel: {
        specs: {},
        stock: 0,
        price: 0
      }
    }
  },
  computed: {
    ...mapGetters(['getSkuProperties'])
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
      } else {
        this.initModel()
      }
    },
    initModel() {
      this.formModel = {
        specs: {},
        stock: 0,
        price: 0
      }
    },
    handleSubmit() {
      this.loading = true
      this.$store
        .dispatch('attachSkuForProduct', {
          id: this.productId,
          data: this.formModel
        })
        .then(() => {
          this.loading = false
          this.$emit('form:success')
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  created() {}
}
</script>

<style></style>
