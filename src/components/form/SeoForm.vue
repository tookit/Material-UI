<template>
  <v-card>
    <v-card-title>{{ formTitle }}</v-card-title>
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.meta_title"
                outlined
                name="meta_title"
                placeholder="Meta title"
                label="Meta title"
              ></v-text-field>
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.meta_keywords"
                outlined
                placeholder="Keyword"
                label="Meta Keyword"
              ></v-text-field>
            </v-col>
            <v-col :cols="12">
              <v-textarea
                v-model="formModel.meta_description"
                outlined
                placeholder="Meta description"
                label="Meta description"
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
        meta_title: null,
        meta_keywords: null,
        meta_description: null
      }
    }
  },
  computed: {
    formTitle() {
      return 'SEO'
    }
  },
  watch: {
    item: {
      handler(item) {
        if (item) {
          this.assignModel(item)
        } else {
          this.formModel = {
            meta_title: null,
            meta_keywords: null,
            meta_description: null
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    assignModel(data) {
      this.formModel = {
        meta_title: data.meta_title,
        meta_keywords: data.meta_keywords,
        meta_description: data.meta_description
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
