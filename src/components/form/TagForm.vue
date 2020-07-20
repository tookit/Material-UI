<template>
  <v-card>
    <v-card-title>{{ formTitle }}</v-card-title>
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
  name: 'SeoForm',
  props: {
    item: Object,
    action: Function
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
          this.formModel = {
            name: null,
            slug: null,
            description: null
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    assignModel(data) {
      this.formModel = {
        name: data.name || data.name,
        slug: data.slug,
        description: data.description
      }
    },
    handleSubmit() {
      this.action.apply(this, [
        {
          id: this.item.id,
          data: this.formModel
        }
      ])
    }
  }
}
</script>

<style></style>
