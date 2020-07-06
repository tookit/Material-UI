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
              <v-text-field
                v-model="formModel.url"
                outlined
                placeholder="Url"
                label="Url"
              />
            </v-col>
            <v-col :cols="12">
              <v-textarea
                v-model="formModel.descriptioin"
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
  name: 'SliderForm',
  props: {
    item: Object
  },
  data() {
    return {
      loading: false,
      formModel: {
        name: null,
        url: null,
        descriptioin: null
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
          description: null,
          url: null
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
        this.$store.dispatch('createSlider', this.formModel).then(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>
