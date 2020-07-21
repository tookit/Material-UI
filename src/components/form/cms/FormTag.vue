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
                placeholder="Name"
                label="Name"
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
            <v-col :cols="12">
              <v-textarea
                v-model="formModel.description"
                outlined
                placeholder="Description"
                label="Description"
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
  name: 'FormTag',
  props: {
    item: Object
  },
  data() {
    return {
      loading: false,
      formModel: {
        name: null,
        slug: null,
        description: null
      }
    }
  },
  computed: {
    formTitle() {
      return 'Tag'
    }
  },
  watch: {
    item: {
      handler(item) {
        if (item) {
          this.assignModel(item)
        } else {
          this.initForm()
        }
      },
      immediate: true
    }
  },
  methods: {
    initForm() {
      this.formModel = {
        name: null,
        slug: null,
        description: null
      }
    },
    assignModel(data) {
      this.formModel = {
        name: data.name,
        slug: data.slug,
        description: data.description
      }
    },
    handleSubmit() {
      this.loading = true
      if (this.item.id) {
        this.$store
          .dispatch('updateTag', {
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
        this.$store.dispatch('createTag', this.formModel).then(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style></style>
