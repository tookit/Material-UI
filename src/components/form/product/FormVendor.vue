<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col :cols="12">
              <v-text-field
                v-model="formModel.name"
                outlined
                label="Name"
                name="Name"
                placeholder="name"
              />
            </v-col>
            <v-col :cols="12">
              <v-textarea
                v-model="formModel.description"
                label="Description"
                placeholder="Description"
                counter
                outlined
              />
            </v-col>
            <v-col :cols="12">
              <v-textarea
                v-model="formModel.address"
                label="Address"
                placeholder="Address"
                counter
                outlined
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.webiste"
                label="Website"
                outlined
                placeholder="Website"
                append-icon="mdi-eye"
                @click:append="handleViewItem"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.country"
                readonly
                label="Country"
                outlined
                placeholder="Country"
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
export default {
  name: 'FormVendor',
  components: {},
  props: {
    item: Object
  },
  data() {
    return {
      loading: false,
      loadingTags: false,
      search: null,
      formModel: {
        name: null,
        description: null,
        website: null,
        country: null,
        address: null
      }
    }
  },
  computed: {},
  watch: {
    item: {
      handler(item) {
        this.item ? this.assignModel(item) : this.initModel()
      },
      immediate: true
    }
  },
  methods: {
    assignModel(data) {
      for (let key in this.formModel) {
        this.formModel[key] = data[key] || null
      }
    },
    initModel() {
      this.formModel = {
        name: null,
        description: null,
        website: null,
        country: null,
        address: null
      }
    },
    handleSubmit() {
      this.loading = true
      if (this.item && this.item.id) {
        this.$store
          .dispatch('updateVendor', {
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
          .dispatch('createVendor', this.formModel)
          .then(({ data }) => {
            this.loading = false
            this.$router.push({
              path: `/mall/vendor/item/${data.id}`
            })
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    handleViewItem() {
      if (this.item) {
        window.open(this.item.href, '_blank')
      }
    },
    handleViewReference() {
      if (this.item) {
        window.open(this.item.reference_url, '_blank')
      }
    }
  },
  created() {}
}
</script>

<style></style>
