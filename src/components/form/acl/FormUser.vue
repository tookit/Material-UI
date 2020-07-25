<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.username"
                outlined
                name="username"
                placeholder="Username"
                label="Username"
              />
            </v-col>
            <v-col :cols="6">
              <v-select
                v-model="formModel.gender"
                outlined
                placeholder="Gender"
                label="Gender"
                :items="['male', 'female']"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.email"
                outlined
                placeholder="Email"
                label="Email"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.mobile"
                outlined
                placeholder="Mobile"
                label="Mobile"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.password"
                outlined
                placeholder="Password"
                label="Password"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.password_confirmation"
                outlined
                placeholder="Password Confirmation"
                label="Password Confirmation"
              />
            </v-col>
            <v-col :cols="6">
              <v-text-field
                v-model="formModel.avatar"
                outlined
                placeholder="Avatar"
                label="Avatar"
                append-icon="mdi-image"
                @click:append="handlePickImage"
              />
            </v-col>
            <v-col :cols="6">
              <v-switch
                v-model="formModel.active"
                outlined
                placeholder="Active"
                label="Active"
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
          <media @selected="handleSelectMedia" directory="avatar" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Media from '@/components/media/Index'
export default {
  name: 'FormUser',
  props: {
    item: Object,
    action: Function
  },
  components: {
    Media
  },
  data() {
    return {
      showDialog: false,
      loading: false,
      formModel: {
        username: null,
        email: null,
        avatar: null,
        gender: 'male',
        mobile: null,
        active: false,
        password: null,
        password_confirmation: null
      }
    }
  },
  computed: {},
  watch: {
    item: {
      handler(item) {
        if (item) {
          this.assignModel(item)
        } else {
          this.initFormModel()
        }
      },
      immediate: true
    }
  },
  methods: {
    initFormModel() {
      this.formModel = {
        username: null,
        email: null,
        avatar: null,
        gender: 'male',
        mobile: null,
        active: false,
        password: null,
        password_confirmation: null
      }
    },
    assignModel(data) {
      for (let key in this.formModel) {
        this.formModel[key] = data[key] || null
      }
    },
    handleSubmit() {
      this.loading = true
      if (this.item) {
        this.$store
          .dispatch('updateUser', {
            id: this.item.id,
            data: this.formModel
          })
          .then(() => {
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        this.$store
          .dispatch('createUser', this.formModel)
          .then(({ data }) => {
            this.loading = false
            this.$router.push({
              path: `/acl/user/item/${data.id}`
            })
          })
          .catch(() => {
            this.loading = false
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
    handleSelectMedia() {}
  }
}
</script>

<style></style>
