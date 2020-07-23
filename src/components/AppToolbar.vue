<template>
  <div class="app-bar">
    <v-app-bar flat dark app>
      <v-spacer></v-spacer>
      <v-toolbar-items class="align-center">
        <v-menu offset-y origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn icon text slot="activator" v-on="on">
              <v-avatar>
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-list class="pa-0">
            <v-list-item
              v-for="(item, index) in profileMenus"
              :to="!item.href ? { name: item.name } : null"
              :href="item.href"
              @click="item.click ? item.click() : null"
              ripple="ripple"
              :disabled="item.disabled"
              :target="item.target"
              rel="noopener"
              :key="index"
            >
              <v-list-item-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>
import Utils from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'AppToolbar',
  components: {},
  data() {
    return {
      showHelpDialog: false,
      showProjectDiaog: false,
      profileMenus: [
        {
          icon: 'mdi-account-circle',
          href: '#',
          title: 'Profile',
          click: this.handleProfile
        },
        {
          icon: 'mdi-cog',
          href: '#',
          title: 'Settings',
          click: this.handleSetting
        },
        {
          icon: 'mdi-logout',
          href: '#',
          title: 'Logout',
          click: this.handleLogut
        }
      ],
      selectedCategories: [],
      selectedProject: null
    }
  },
  computed: {
    ...mapGetters([]),
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    }
  },
  methods: {
    handleViewJob() {
      this.$router.push({
        name: 'Pipelines',
        query: {
          tab: 'history',
          crontab_id: this.getRunNowJob._source.job_id
        }
      })
    },
    handleFullScreen() {
      Utils.toggleFullScreen()
    },
    handleLogut() {
      if (window.confirm('Are you sure to logout?')) {
        this.$store.dispatch('logout')
        window.ELEPHANT.$emit('SHOW_SNACKBAR', {
          text: 'Logout successfull',
          color: 'success'
        })
        this.$router.push('/auth/login')
      }
    },
    handleSetting() {
      window.ELEPHANT.openThemeSettings()
    },
    handleProfile() {}
  },
  created() {}
}
</script>
<style lang="scss" scoped></style>
