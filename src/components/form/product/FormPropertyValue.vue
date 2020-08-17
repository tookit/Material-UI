<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col :cols="12">
              <v-text-field
                v-model="formModel.value"
                outlined
                label="Value"
                name="value"
                placeholder="property value"
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
  name: 'FormPropertyValue',
  components: {},
  props: {
    item: Object,
    propertyId: [Number, String]
  },
  data() {
    return {
      loading: false,
      loadingTags: false,
      search: null,
      tags: [],
      formModel: {
        value: null
      }
    }
  },
  computed: {
    formTitle() {
      return 'Property Value'
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
      } else {
        this.initModel()
      }
    },
    initModel() {
      this.formModel = {
        value: null
      }
    },
    handleSubmit() {
      this.loading = true
      const data = { id: this.propertyId, data: this.formModel }
      this.$store
        .dispatch('attachValueForProperty', data)
        .then(() => {
          this.loading = false
          this.$emit('form:success')
        })
        .catch(() => {
          this.loading = false
          this.$emit('form:error')
        })
    }
  },
  created() {}
}
</script>

<style></style>
