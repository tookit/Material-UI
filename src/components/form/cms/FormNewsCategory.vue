<template>
  <v-card :loading="loading">
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.name"
                outlined
                label="Name"
                name="Name"
                placeholder="name"
              ></v-text-field>
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.slug"
                readonly
                label="Slug"
                outlined
                placeholder="Slug"
              ></v-text-field>
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
      <v-btn @click="handleSubmit()" :loading="loading" tile color="primary">
        save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FormNewsCategory',
  components: {},
  props: {
    item: Object
  },
  data() {
    return {
      loading: false,
      formModel: {
        name: null,
        description: null,
        slug: null
      }
    }
  },
  computed: {
    ...mapGetters(['getCmsCategories']),
    formTitle() {
      return this.item ? 'Edit News' : 'Create News'
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
      if (data) {
        this.formModel = {
          id: data.id,
          name: data.name,
          description: data.description,
          slug: data.slug
        }
      } else {
        this.formModel = {
          name: null,
          description: null,
          slug: null
        }
      }
    },
    handleSubmit() {
      this.loading = true

      if (this.formModel.id) {
        this.$store
          .dispatch('updateNewsCategory', {
            id: this.formModel.id,
            data: this.formModel
          })
          .then(() => {
            this.loading = false
          })
      } else {
        this.$store
          .dispatch('createNewsCategory', this.formModel)
          .then(({ data }) => {
            this.loading = false
            this.$router.push({
              path: `/cms/category/item/${data.id}`
            })
          })
          .catch(() => {
            this.loading = false
          })
      }
    }
  },
  created() {}
}
</script>

<style></style>
