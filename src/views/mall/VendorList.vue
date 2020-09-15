<template>
  <div class="page-product" style="min-height: 90vh">
    <v-container>
      <v-row>
        <v-col>
          <advance-table
            :items="items"
            :headers="headers"
            :loading="loading"
            :server-items-length="serverItemsLength"
            :items-per-page="itemsPerPage"
            :page.sync="filter['page']"
            @update:page="handlePageChanged"
            :searchValue="filter['filter[name]']"
            @input:change="handleInputChange"
            @search="handleApplyFilter"
          >
            <div slot="filter"></div>
            <v-btn slot="toolbar" icon @click="fetchRecord()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn slot="toolbar" icon @click="handleCreateItem">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <template v-slot:item.website="{ item }">
              <a :href="item.website" target="_blank">{{ item.website }}</a>
            </template>
            <template v-slot:item.created_at="{ item }">
              {{ new Date(item.created_at).toLocaleString() }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-menu>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
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
  name: 'PageQuote',
  components: {
    AdvanceTable
  },
  data() {
    return {
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
          text: 'City',
          value: 'city'
        },
        {
          text: 'Website',
          value: 'website'
        },
        {
          text: 'Created',
          value: 'created_at'
        },
        {
          text: 'Action',
          value: 'action'
        }
      ],
      filter: {
        page: 1,
        'filter[name]': null
      },
      serverItemsLength: 0,
      itemsPerPage: 15,
      actions: [
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
  watch: {
    '$route.query': {
      handler(query) {
        query.page = parseInt(query.page)
        Object.assign(this.filter, query)
        this.fetchRecord(query)
      },
      immediate: true
    }
  },

  methods: {
    fetchRecord(query) {
      console.log(query)
      this.loading = true
      this.$store
        .dispatch('fetchVendors', query)
        .then(({ data, meta }) => {
          this.loading = false
          this.items = data
          this.serverItemsLength = meta.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleCreateItem() {
      this.$router.push({
        path: `/mall/vendor/create`
      })
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/mall/vendor/item/${item.id}`
      })
    },
    handleDeleteItem() {},
    handleApplyFilter() {
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter
      })
    },
    handlePageChanged(page) {
      this.filter.page = page
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter
      })
    },
    handleInputChange(val) {
      this.filter['filter[name]'] = val
    }
  }
}
</script>

<style></style>
