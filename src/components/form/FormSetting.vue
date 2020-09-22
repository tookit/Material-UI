<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col :cols="12" v-for="(val, key) in formModel" :key="key">
              <v-text-field
                v-model="formModel[key]"
                outlined
                :name="key"
                :placeholder="key"
                :label="key"
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
      formModel: {}
    }
  },
  computed: {},
  watch: {
    item: {
      handler(item) {
        if (item) {
          this.assignModel(item)
        }
      },
      immediate: true
    }
  },
  methods: {
    assignModel(data) {
      this.formModel = data
    },
    initModel() {
      this.formModel = {}
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
      this.showDialog = false
    }
  }
}
</script>

<style></style>
