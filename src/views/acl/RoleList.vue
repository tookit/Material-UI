<template>
  <div class="page-role-list">
    <v-container>
      <v-row>
        <v-col>
          <advance-table
            :items="items"
            :headers="headers"
            :loading="loading"
            :server-items-length="serverItemsLength"
            :items-per-page="itemsPerPage"
            @update:page="handlePageChanged"
            @input:change="handleInputChange"
          >
            <div slot="filter">
              <v-card flat class="grey lighten-4">
                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <v-switch
                        label="Active"
                        v-model="filter['filter[is_active]']"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="handleResetFilter" text>Reset</v-btn>
                  <v-btn @click="handleApplyFilter" color="primary"
                    >Apply</v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>
            <v-btn slot="toolbar" icon @click="handleCreate">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <template v-slot:item.avatar="{ item }">
              <v-avatar v-if="item.avatar" size="50" class="ma-3">
                <img :src="item.avatar" />
              </v-avatar>
            </template>
            <template v-slot:item.categories="{ item }">
              <v-chip small outlined v-for="c in item.categories" :key="c.id">
                {{ c.name }}
              </v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-menu>
                <template v-slot:activator="{ on: menu }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn icon v-on="{ ...tooltip, ...menu }">
                        <v-icon>mdi-dots-vertical</v-icon></v-btn
                      >
                    </template>
                    <span>Action</span>
                  </v-tooltip>
                </template>
                <v-list class="pa-0" dense>
                  <v-list-item
                    v-for="action in actions"
                    :key="action.text"
                    @click="action.click(item)"
                  >
                    <v-list-item-icon class="mr-2">
                      <v-icon small>{{ action.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ action.text }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </advance-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AdvanceTable from '@/components/table/AdvanceTable'
export default {
  name: 'PageROle',
  components: {
    AdvanceTable
  },
  data() {
    return {
      //slider lightbox
      showDialog: false,
      showLightbox: false,
      index: 0,
      filter: {
        'filter[active]': null
      },
      //
      loading: false,
      items: [],
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Slug',
          value: 'slug'
        },
        {
          text: 'Action',
          value: 'action'
        }
      ],
      serverItemsLength: 0,
      itemsPerPage: 15,
      actions: [
        {
          text: 'View Item',
          icon: 'mdi-eye',
          click: this.handleViewItem
        },
        {
          text: 'Edit Item',
          icon: 'mdi-pencil',
          click: this.handleEditItem
        },
        {
          text: 'Delete Item',
          icon: 'mdi-close',
          click: this.handleDeleteItem
        }
      ]
    }
  },
  computed: {
    imgs() {
      return this.items.map((item) => item.img)
    }
  },
  methods: {
    fetchRecord(query) {
      this.loading = true
      this.$store.dispatch('fetchRoles', query).then(({ data, meta }) => {
        this.loading = false
        this.items = data
        this.serverItemsLength = meta.total
      })
    },
    handleCreate() {
      this.$router.push({
        path: `/acl/role/create`
      })
    },
    handleViewItem(item) {
      this.$router.push({
        path: `/acl/role/${item.id}`
      })
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/acl/role/item/${item.id}`
      })
    },
    handleDeleteItem(item) {
      if (window.confirm('Are you sure to delete this')) {
        this.$store.dispatch('deleteRole', item.id).then(() => {
          this.fetchRecord()
        })
      }
    },
    handlePageChanged(page) {
      this.fetchRecord({
        page: page
      })
    },
    handleViewImage(item) {
      this.showLightbox = true
    },
    handleHideLightbox() {
      this.showLightbox = false
    },
    computeImage(url) {
      return url
    },
    // filter
    handleApplyFilter() {
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter
      })
    },

    handleResetFilter() {
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: null
      })
    },
    handleInputChange(val) {
      this.filter['filter[name]'] = val
    }
  },
  created() {
    this.fetchRecord()
  }
}
</script>

<style></style>
