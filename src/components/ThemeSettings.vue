<template>
  <div class="themeSetting">
    <v-toolbar color="primary">
      <v-toolbar-title class="white--text">User Preference</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-layout column>
        <v-flex>
          <v-subheader class="px-1">Show Entity Detail </v-subheader>
          <div class="display-option">
            <v-btn-toggle
              @change="setShowDetailOption"
              tile
              v-model="showDetailOption"
            >
              <v-btn text value="overlay">Overlay</v-btn>
              <v-btn text value="search">Column</v-btn>
            </v-btn-toggle>
          </div>
          <v-subheader class="px-1">Local Storage </v-subheader>
          <div class="display-option">
            <v-btn-toggle tile>
              <v-btn @click="handleClearStorage" text value="search"
                >Reset Local Storage</v-btn
              >
            </v-btn-toggle>
          </div>
          <v-subheader class="px-1">Page Size </v-subheader>
          <div class="display-option d-flex">
            <v-btn-toggle tile class="mr-1" v-model="pageSizeOption">
              <v-btn height="56" text value="search">Search</v-btn>
              <v-btn height="56" text value="table">Table</v-btn>
            </v-btn-toggle>
            <v-combobox
              hide-details
              v-model="setPageSize"
              :items="getSizes"
              label="size"
              outlined
            ></v-combobox>
          </div>
          <v-subheader class="px-1">Color Option</v-subheader>
          <div class="theme-options">
            <v-subheader class="px-1">Sidebar Option</v-subheader>
            <div class="my-3">
              <v-btn-toggle @change="setThemeMode" tile v-model="themeMode">
                <v-btn text value="dark">Dark</v-btn>
                <v-btn text value="light">Light</v-btn>
              </v-btn-toggle>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import colors from 'vuetify/es5/util/colors'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      themeColor: 'blue',
      themeMode: 'light',
      showDetailOption: this.$store.getters.getDetailOption,
      colors: colors,
      pageSizeOption: 'search'
    }
  },
  computed: {
    ...mapGetters(['getPageSize', 'getSizes']),
    themeColorOptions() {
      return [
        {
          key: 'blue',
          value: {
            sideNav: 'blue',
            mainNav: 'blue',
            sideMenu: 'white'
          }
        },
        {
          key: 'teal',
          value: {
            sideNav: 'teal',
            mainNav: 'teal',
            sideMenu: 'white'
          }
        },
        {
          key: 'red',
          value: {
            sideNav: 'red',
            mainNav: 'red',
            sideMenu: 'white'
          }
        },
        {
          key: 'orange',
          value: {
            sideNav: 'orange',
            mainNav: 'orange',
            sideMenu: 'white'
          }
        },
        {
          key: 'purple',
          value: {
            sideNav: 'purple',
            mainNav: 'purple',
            sideMenu: 'white'
          }
        },
        {
          key: 'indigo',
          value: {
            sideNav: 'indigo',
            mainNav: 'indigo',
            sideMenu: 'white'
          }
        },
        {
          key: 'cyan',
          value: {
            sideNav: 'cyan',
            mainNav: 'cyan',
            sideMenu: 'white'
          }
        },
        {
          key: 'pink',
          value: {
            sideNav: 'pink',
            mainNav: 'pink',
            sideMenu: 'white'
          }
        },
        {
          key: 'green',
          value: {
            sideNav: 'green',
            mainNav: 'green',
            sideMenu: 'white'
          }
        }
      ]
    },
    setPageSize: {
      get() {
        return this.getPageSize
      },
      set(size) {
        this.$store.commit('SET_PAGE_SIZE', size)
      }
    }
  },
  watch: {},
  methods: {
    setThemeMode(mode) {
      this.$store.commit('SET_THEME_MODE', mode)
    },
    setShowDetailOption(option) {
      this.$store.commit('SET_DETAIL_OPTION', option)
    },
    handleClearStorage() {
      window.localStorage.clear()
    }
  }
}
</script>
<style lang="sass" scoped>
.color-option
  &--label
    position: relative
    display: block
    cursor: pointer

    & input[type='radio']
      display: none

      &+span
        position: relative

        &>.overlay
          display: none
          position: absolute
          top: 0
          bottom: 0
          right: 0
          left: 0
          width: 100%
          height: 100%
          background-color: rgba(0, 0, 0, 0.3)
          text-align: center
          line-height: 30px
          color: #fff
      &:checked+span>.overlay
        display: block
    & .bg
      background-color: #f1f1f1
  &--item
    overflow: hidden
    display: block
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1)
    margin-bottom: 15px

    &--header
      height: 10px
    &>span
      display: block
      float: left
      width: 50%
      height: 20px
</style>
