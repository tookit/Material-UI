<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-container fluid>
          <v-row>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.username"
                outlined
                label="Username"
                name="Username"
                placeholder="name"
                :rules="formRules.username"
              />
            </v-col>
            <v-col :cols="6">
              <v-select
                v-model="formModel.type"
                :items="['quote', 'contact', 'subscribe']"
                label="Type"
                placeholder="Type"
                outlined
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
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.mobile"
                label="Mobile"
                outlined
                placeholder="Mobile"
              />
            </v-col>
            <v-col :cols="12">
              <v-textarea
                v-model="formModel.remark"
                label="Remark"
                placeholder="Remark"
                counter
                outlined
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
        username: null,
        type: 'quote',
        email: null,
        ip: null,
        remark: null
      },
      formRules: {}
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
        username: null,
        type: 'quote',
        email: null,
        ip: null,
        remark: null
      }
    },
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$store
          .dispatch('updateQuote', {
            id: this.item.id,
            data: this.formModel
          })
          .then(() => {
            this.loading = false
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
    handleViewList() {
      this.$router.push({
        path: `/mall/quote/list`
      })
    }
  },
  created() {}
}
</script>

<style></style>
