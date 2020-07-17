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
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.slug"
                readonly
                label="Slug"
                outlined
                placeholder="Slug"
                append-icon="mdi-eye"
                @click:append="handleViewItem"
              />
            </v-col>
            <v-col :cols="12">
              <v-autocomplete
                outlined
                :items="getCmsCategories"
                item-text="name"
                item-value="id"
                name="Category"
                label="Category"
                placeholder="Category"
                v-model="formModel.category_id"
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
            <v-col :cols="12">
              <label for="">Content</label>
              <v-jodit v-model="formModel.content" />
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
import VJodit from '@/components/jodit'
export default {
  name: 'FormNews',
  components: {
    VJodit
  },
  props: {
    item: Object
  },
  data() {
    return {
      loading: false,
      formModel: {
        name: null,
        description: null,
        slug: null,
        content: '',
        category_id: 0
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
          slug: data.slug,
          content: data.content || '',
          category_id: data.category_id
        }
      } else {
        this.formModel = {
          name: null,
          description: null,
          slug: null,
          content: '',
          category_id: 0
        }
      }
    },
    handleSubmit() {
      this.loading = true

      if (this.formModel.id) {
        this.$store
          .dispatch('updateNews', {
            id: this.formModel.id,
            data: this.formModel
          })
          .then(() => {
            this.loading = false
          })
      } else {
        this.$store
          .dispatch('createNews', this.formModel)
          .then(({ data }) => {
            this.loading = false
            this.$router.push({
              path: `/cms/news/item/${data.id}`
            })
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
    }
  },
  created() {}
}
</script>

<style></style>
