<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-container fluid>
          <v-row>
            <v-col :cols="12">
              <v-text-field
                v-model="formModel.name"
                outlined
                label="Name"
                name="Name"
                placeholder="name"
                :rules="formRules.name"
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
                v-model="formModel.country"
                label="Country"
                outlined
                placeholder="Country"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.city"
                label="City"
                outlined
                placeholder="City"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.website"
                :rules="formRules.website"
                label="Website"
                outlined
                placeholder="Website"
                append-icon="mdi-eye"
                @click:append="handleViewItem"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.email"
                label="Email"
                outlined
                placeholder="Email"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions class="py-3">
      <v-spacer></v-spacer>
      <v-btn text @click="handleViewList">
        <v-icon>mdi-arrow-left</v-icon>
        Back to List
      </v-btn>
      <v-btn @click="handleSubmit()" :loading="loading" tile color="primary">
        save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { URL } from '@/utils/regex'
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
      valid: true,
      search: null,
      formModel: {
        name: null,
        description: null,
        website: null,
        country: null,
        city: null,
        address: null,
        mobile: null,
        email: null
      },
      formRules: {
        name: [(v) => !!v || 'Name is required'],
        website: [
          (v) => {
            return URL.test(v) || 'Website is not a valid URL'
          }
        ]
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
        city: null,
        address: null,
        mobile: null,
        email: null
      }
    },
    handleSubmit() {
      if (this.$refs.form.validate()) {
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
      }
    },
    handleViewItem() {
      if (this.item) {
        window.open(this.item.href, '_blank')
      }
    },
    handleViewList() {
      this.$router.push({
        path: `/mall/vendor/list`
      })
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
