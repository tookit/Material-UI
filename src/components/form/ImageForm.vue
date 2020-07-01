<template>
  <div>
    <template v-if="item">
      <v-card>
        <v-img class="grey lighten-3" height="450px" :src="item.url" />
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <v-form>
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
      <uploader :options="options" class="uploader" style="height:400px">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <p>Drop files here to upload or</p>
          <uploader-btn>select files</uploader-btn>
          <uploader-btn :attrs="attrs">select images</uploader-btn>
          <uploader-btn :directory="true">select folder</uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { updateImageById } from '@/api/service'
export default {
  name: 'ImageForm',
  props: {
    item: Object,
    action: String
  },
  data() {
    return {
      loading: false,
      formModel: {
        custom_properties: {
          title: null,
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
    options() {
      return {
        target: this.action,
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
        console.log(item)
        if (item) {
          this.formModel = {
            custom_properties: item.custom_properties
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true
      updateImageById(this.item.id, this.formModel).then((resp) => {
        this.$emit('form:success')
        this.loading = false
      })
    }
  }
}
</script>

<style></style>
