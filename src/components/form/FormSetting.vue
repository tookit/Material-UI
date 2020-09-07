<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col :cols="12">
              <v-text-field
                v-model="formModel.site_title"
                outlined
                name="site_title"
                placeholder="Site Title"
                label="Site Title"
              />
            </v-col>
            <v-col :cols="12">
              <v-text-field
                v-model="formModel.site_slogan"
                outlined
                placeholder="Slogan"
                label="Slogan"
              />
            </v-col>
            <v-col :cols="12">
              <v-text-field
                v-model="formModel.twiiter"
                outlined
                placeholder="Twiiter"
                label="Twiiter"
              />
            </v-col>
            <v-col :cols="12">
              <v-text-field
                v-model="formModel.facebook"
                outlined
                placeholder="Facebook"
                label="Facebook"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions class="py-3">
      <v-spacer></v-spacer>
      <v-btn text @click="handleAddSetting">New Setting</v-btn>
      <v-btn :loading="loading" tile color="primary" @click="handleSubmit"
        >save</v-btn
      >
    </v-card-actions>
    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title dark tile color="primary">New Setting</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="setting_key"
            outlined
            placeholder="Setting Key"
            label="Setting Key"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="handleConfirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'FormSetting',
  props: {
    item: Object
  },
  data() {
    return {
      showDialog: false,
      loading: false,
      setting_key: null,
      formModel: {
        site_title: null,
        site_slogan: null,
        twitter: null,
        facebook: null
      }
    }
  },
  computed: {},
  watch: {
    item: {
      handler(item) {
        if (item) {
          this.assignModel(item)
        } else {
          this.initModel()
        }
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
        site_title: null,
        site_slogan: null
      }
    },
    handleSubmit() {
      this.loading = true
      this.$store
        .dispatch('updateSetting', this.formModel)
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleAddSetting() {
      this.setting_key = null
      this.showDialog = true
    },
    handleConfirm() {
      this.formModel[this.setting_key] = ''
    }
  }
}
</script>

<style></style>
