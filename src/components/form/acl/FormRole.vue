<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.name"
                outlined
                name="name"
                placeholder="name"
                label="name"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.slug"
                outlined
                placeholder="Slug"
                label="Slug"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions class="py-3">
      <v-spacer></v-spacer>
      <v-btn :loading="loading" tile color="primary" @click="handleSubmit"
        >save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'FormRole',
  props: {
    item: Object,
    action: Function
  },
  components: {},
  data() {
    return {
      showDialog: false,
      loading: false,
      formModel: {
        name: null,
        slug: null
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
          this.initFormModel()
        }
      },
      immediate: true
    }
  },
  methods: {
    initFormModel() {
      this.formModel = {
        name: null,
        slug: null
      }
    },
    assignModel(data) {
      for (let key in this.formModel) {
        this.formModel[key] = data[key] || null
      }
    },
    handleSubmit() {
      this.loading = true
      if (this.item) {
        this.$store
          .dispatch('updateRole', {
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
          .dispatch('createRole', this.formModel)
          .then(({ data }) => {
            this.loading = false
            this.$router.push({
              path: `/acl/role/item/${data.id}`
            })
          })
          .catch(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style></style>
