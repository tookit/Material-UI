<template>
  <v-card class="elevation-1 pa-3 page--login">
    <v-card-text>
      <v-form>
        <v-text-field
          append-icon="mdi-account-box"
          name="username"
          autocomplete="off"
          label="Username"
          placeholder="email"
          type="text"
          v-model="model.email"
          v-on:keyup.enter="login"
          dense
          outlined
          class="mb-2"
        ></v-text-field>
        <v-text-field
          append-icon="mdi-key-variant"
          autocomplete="off"
          name="password"
          label="Password"
          placeholder="Password"
          id="password"
          type="password"
          v-model="model.password"
          v-on:keyup.enter="login"
          dense
          outlined
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="flex-row-reverse pa-0">
      <v-btn class="px-4" large dark @click="handleLogin" :loading="loading"
        ><v-icon class="mr-2">mdi-login-variant</v-icon> Login</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    model: {
      email: 'wangqiangshen@gmail.com',
      password: 'secret'
    }
  }),

  methods: {
    handleLogin() {
      this.loading = true
      this.$store
        .dispatch('login', this.model)
        .then(() => {
          this.loading = false
          window.ELEPHANT.$emit('SHOW_SNACKBAR', {
            text: 'Authentication Successful',
            color: 'success'
          })
          this.$router.push({
            path: '/'
          })
        })
        .catch(() => {
          this.loading = false
          window.ELEPHANT.$emit('SHOW_SNACKBAR', {
            text: 'Authentication Failed',
            color: 'error'
          })
        })
    }
  }
}
</script>
