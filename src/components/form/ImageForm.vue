<template>
  <div>
    <template v-if="item">
      <v-card>
        <v-img class="grey lighten-3" height="450px" :src="item.url" />
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <v-form>
            <v-text-field
              name="name"
              v-model="formModel.filename"
              outlined
              label="Filename"
              placeholder="Filename"
            />
            <v-text-field
              name="title"
              v-model="formModel.custom_properties.title"
              outlined
              label="Title"
              placeholder="Title"
            />
            <v-switch
              v-model="formModel.custom_properties.featured"
              name="featured"
              outlined
              label="Featured"
              placeholder="Featured"
            />
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="py-3">
          <v-spacer></v-spacer>
          <v-btn text @click="$emit('form:cancel')">Cancel</v-btn>
          <v-btn :loading="loading" color="primary" @click="handleSubmit()"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>

    <template v-else>
      <v-card>
        <v-toolbar tile dark color="primary">
          <v-toolbar-title>Upload Image</v-toolbar-title>
          <v-spacer />
          <v-btn @click="$emit('form:cancel')" icon>
            <v-icon>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text>
          <v-dropzone class="v-dropzone" :option="option"> </v-dropzone>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { updateMedia } from '@/api/service'
import VDropzone from '@/components/dropzone'
export default {
  name: 'ImageForm',
  components: {
    VDropzone
  },
  props: {
    item: Object,
    action: String
  },
  data() {
    return {
      loading: false,
      formModel: {
        filename: '',
        custom_properties: {
          title: '',
          featured: false
        }
      },
      attrs: {
        accept: 'image/*'
      }
    }
  },
  computed: {
    ...mapGetters(['getAccessToken']),
    option() {
      return {
        url: this.action,
        headers: {
          Authorization: 'Bearer ' + this.getAccessToken
        },
        testChunks: false
      }
    }
  },
  watch: {
    item: {
      handler(item) {
        if (item) {
          this.formModel.filename = item.name
          if (item.custom_properties !== null) {
            this.formModel.custom_properties = item.custom_properties
          }
        } else {
          this.formModel = {
            filename: '',
            custom_properties: {
              title: '',
              featured: false
            }
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true
      updateMedia(this.item.id, this.formModel)
        .then(() => {
          this.$emit('form:success')
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.v-dropzone {
  border: 2px dashed #0087f7;
}
</style>
