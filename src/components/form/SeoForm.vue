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
      <v-btn tile color="primary">save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SeoForm',
  props: {
    meta: Object,
    action: Function
  },
  data() {
    return {
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
        this.assignModel(item)
      },
      immediate: true
    }
  },
  methods: {
    assignModel(data) {
      this.formModel = data
    }
  }
}
</script>

<style></style>
