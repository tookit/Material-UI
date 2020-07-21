<template>
  <div class="page-tag-list">
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
          >
            <div slot="filter">
              <v-card flat class="grey lighten-4">
                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <v-autocomplete
                        v-model="filter['filter[type]']"
                        outlined
                        placeholder="Type"
                        label="Type"
                        :items="getTagTypes"
                        item-text="text"
                        item-value="value"
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
            <v-btn slot="toolbar" icon @click="handleCreateItem">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PageTags',
  components: {
    AdvanceTable
  },
  data() {
    return {
      //
      loading: false,
      items: [],
      filter: {
        'filter[type]': null
      },
      categories: [],
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
          text: 'Type',
          value: 'type'
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
    ...mapGetters(['getTagTypes'])
  },
  watch: {
    '$route.query': {
      handler(query) {
        Object.assign(this.filter, query)
        this.fetchRecord(query)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['fetchTags']),
    fetchRecord(query) {
      this.loading = true
      this.items = []
      this.fetchTags(query).then(({ data, meta }) => {
        this.loading = false
        this.items = data
        this.serverItemsLength = meta.total
      })
    },
    handleCreateItem() {
      this.$router.push({
        path: `/cms/tags/create`
      })
    },
    handleViewItem(item) {
      this.$router.push({
        path: `/cms/tags/item/${item.id}`
      })
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/cms/tags/item/${item.id}`
      })
    },
    handleDeleteItem() {},
    handleItemStatus(val) {
      this.$store
        .dispatch('updateTags', {
          id: val.id,
          data: { is_active: val.is_active }
        })
        .then(() => {})
    },
    handlePageChanged(page) {
      this.fetchRecord({
        page: page
      })
    },
    handleCategoryChange(val) {
      this.filter['filter[categories.id]'] = val
        .filter((item) => item !== 0)
        .join(',')
      this.categories = val
    },
    // filter
    handleApplyFilter() {
      this.$router.replace({
        path: this.$route.path,
        query: this.filter
      })
    },

    handleResetFilter() {}
  },
  created() {
    this.fetchRecord()
  }
}
</script>

<style></style>
