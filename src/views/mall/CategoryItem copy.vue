<template>
  <div class="page-mall-category view">
    <v-form>
      <v-container fluid>
        <v-row>
          <v-col cols="8">
            <v-card>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-subheader>General</v-subheader>
                  </v-col>
                  <v-col :cols="12">
                    <v-cascader
                      :items="getProductCategories"
                      name="parent_id"
                      label="Parent Category"
                      item-text="name"
                      item-value="id"
                      placeholder="Parent Category"
                      outlined
                    >
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content
                            v-text="data.item"
                          ></v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-content>
                            <v-list-item-title v-html="data.item.name" />
                          </v-list-item-content>
                          <template v-if="data.item.children">
                            <v-list-item-icon>
                              <v-icon>mdi-chevron-down</v-icon>
                            </v-list-item-icon>
                          </template>
                        </template>
                      </template>
                    </v-cascader>
                  </v-col>
                  <v-col :cols="6">
                    <v-text-field
                      v-model="formModel.name"
                      outlined
                      name="name"
                      placeholder="Name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col :cols="6">
                    <v-text-field
                      v-model="formModel.slug"
                      outlined
                      name="slug"
                      placeholder="Slug"
                      label="Slug"
                    />
                  </v-col>
                  <v-col :cols="6">
                    <v-text-field
                      v-model="formModel.description"
                      outlined
                      name="description"
                      placeholder="Description"
                      label="Description"
                    />
                  </v-col>
                  <v-col :cols="6">
                    <v-switch
                      v-model="formModel.is_active"
                      outlined
                      name="name"
                      placeholder="Name"
                      label="Active"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-subheader>SEO</v-subheader>
                  </v-col>
                  <v-col :cols="6">
                    <v-text-field
                      v-model="formModel.meta_title"
                      outlined
                      name="meta_title"
                      placeholder="Meta title"
                      label="Meta title"
                    />
                  </v-col>
                  <v-col :cols="6">
                    <v-text-field
                      v-model="formModel.meta_keyword"
                      outlined
                      placeholder="Keyword"
                      label="Meta Keyword"
                    />
                  </v-col>
                  <v-col :cols="12">
                    <v-textarea
                      v-model="formModel.meta_description"
                      outlined
                      placeholder="Meta description"
                      label="Meta description"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      :loading="loading"
                      color="primary"
                      @click="handleSubmit"
                      >Save</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card>
              <v-card-title>Featured Image</v-card-title>
              <v-card-text>
                <v-dropzone class="v-dropzone" :option="option"> </v-dropzone>
                <div v-if="images" class="mt-3">
                  <v-avatar
                    size="90"
                    tile
                    v-for="media in images"
                    :key="media.uuid"
                  >
                    <img :src="media.url" />
                  </v-avatar>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VDropzone from '@/components/dropzone'
import VCascader from '@/components/cascader'
export default {
  props: {
    id: [Number, String]
  },
  components: { VDropzone, VCascader },
  data() {
    return {
      defaultTab: 'general',
      tabs: [
        {
          text: 'General',
          value: 'general'
        },
        {
          text: 'Media',
          value: 'media'
        },
        {
          text: 'SEO',
          value: 'seo'
        }
      ],
      formModel: {
        name: null,
        slug: null,
        description: null,
        is_active: false,
        meta_title: null,
        meta_keyword: null,
        meta_description: null
      },
      loading: false,
      item: null,
      images: [],
      attrs: {
        accept: 'image/*'
      }
    }
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getProductCategories']),
    option() {
      return {
        url: `/api/mall/category/${this.id}/image`,
        headers: {
          Authorization: 'Bearer ' + this.getAccessToken
        },
        testChunks: false
      }
    }
  },
  watch: {
    id: {
      handler(id) {
        this.fetchRecord(id)
      },
      immediate: true
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true
      if (this.formModel.id) {
        this.$store
          .dispatch('updateProductCategory', {
            id: this.formModel.id,
            data: this.formModel
          })
          .then(() => {
            this.loading = false
          })
      } else {
        this.$store
          .dispatch('createProductCategory', this.formModel)
          .then(() => {
            this.loading = false
          })
      }
    },
    fetchRecord(id) {
      this.loading = true
      this.$store.dispatch('getProductCategoryById', id).then(({ data }) => {
        this.formModel = {
          id: data.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          is_active: data.is_active,
          meta_title: data.meta_title,
          meta_keyword: data.meta_keyword,
          meta_description: data.meta_description
        }
        this.images = data.media
        this.loading = false
      })
    }
  }
}
</script>

<style></style>
