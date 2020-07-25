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
            <v-col :cols="6">
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
            <v-col :cols="6">
              <v-switch
                name="Active"
                label="Active"
                placeholder="Active"
                v-model="formModel.is_active"
              />
            </v-col>
            <v-col :cols="12">
              <v-text-field
                v-model="formModel.img"
                outlined
                placeholder="Featrued Image"
                label="Featrued Image"
                append-icon="mdi-image"
                @click:append="handlePickImage"
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
    <v-dialog
      v-model="showDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="primary">
          <v-spacer />
          <v-btn @click="handleCloseDialog" icon>
            <v-icon color="white">mdi-check</v-icon>
          </v-btn>
          <v-btn @click="handleCloseDialog" icon>
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-0">
          <media @selected="handleSelectMedia" :directory="directory" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import VJodit from '@/components/jodit'
import Media from '@/components/media/Index'
export default {
  name: 'FormNews',
  components: {
    VJodit,
    Media
  },
  props: {
    item: Object
  },
  data() {
    return {
      showDialog: false,
      selectedMedia: null,
      loading: false,
      formModel: {
        name: null,
        description: null,
        img: null,
        slug: null,
        content: '',
        is_active: false,
        category_id: 0
      }
    }
  },
  computed: {
    ...mapGetters(['getCmsCategories']),
    formTitle() {
      return this.item ? 'Edit News' : 'Create News'
    },
    directory() {
      return this.item ? `news/${this.item.id}` : `news`
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
          img: data.img,
          content: data.content || '',
          is_active: data.is_active,
          category_id: data.category_id
        }
      } else {
        this.formModel = {
          name: null,
          description: null,
          slug: null,
          content: '',
          img: null,
          is_actvie: false,
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
    },
    handlePickImage() {
      this.showDialog = true
    },
    handleSelectMedia(item) {
      this.selectedMedia = item
    },
    handleCloseDialog() {
      this.showDialog = false
      if (this.selectedMedia) {
        this.formModel.img = this.selectedMedia.url
      }
    }
  },
  created() {}
}
</script>

<style></style>
