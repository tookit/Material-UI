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
                placeholder="Title"
                label="Title"
              />
            </v-col>
            <v-col :cols="6">
              <v-switch
                v-model="formModel.is_active"
                name="is_active"
                placeholder="Active"
                label="Active"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.url"
                outlined
                placeholder="Url"
                label="Url"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.img"
                outlined
                placeholder="Image"
                label="Image"
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
          <media @selected="handleSelectMedia" directory="slider" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Media from '@/components/media/Index'

export default {
  name: 'FormSlider',
  props: {
    item: Object
  },
  components: {
    Media
  },
  data() {
    return {
      selectedMedia: null,
      showDialog: false,
      loading: false,
      formModel: {
        name: null,
        url: null,
        img: null,
        is_active: false,
        description: null
      }
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
      if (data) {
        for (let key in this.formModel) {
          this.formModel[key] = data[key] || null
        }
      } else {
        this.formModel = {
          name: null,
          url: null,
          img: null,
          is_active: false,
          description: null
        }
      }
    },
    handleSubmit() {
      this.loading = true
      if (this.item) {
        this.$store
          .dispatch('updateSlider', {
            id: this.item.id,
            data: this.formModel
          })
          .then(() => {
            this.loading = false
          })
      } else {
        this.$store
          .dispatch('createSlider', this.formModel)
          .then(({ data }) => {
            this.loading = false
            this.$router.push({
              path: `/cms/slider/item${data.id}`
            })
          })
      }
    },
    handlePickImage() {
      this.showDialog = true
    },
    handleCloseDialog() {
      this.showDialog = false
      if (this.selectedMedia) {
        this.formModel.img = this.selectedMedia.url
      }
    },
    fetchImage() {
      return this.$store.dispatch('fetchSlider')
    },
    handleSelectMedia(item) {
      this.selectedMedia = item
    }
  }
}
</script>
