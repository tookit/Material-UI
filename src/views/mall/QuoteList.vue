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
          >
            <v-btn slot="toolbar" icon @click="fetchRecord()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <template v-slot:item.created_at="{ item }">
              {{ new Date(item.created_at).toLocaleString() }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-menu>
                <template v-slot:activator="{ on: menu }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn icon v-on="onTooltip({ ...tooltip, ...menu })">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
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
import TooltipMixin from '@/mixins/Tooltip'
export default {
  name: 'PageQuote',
  components: {
    AdvanceTable
  },
  mixins: [TooltipMixin],
  data() {
    return {
      //
      loading: false,
      items: [],
      filter: {
        page: 1,
        'filter[name]': null
      },
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Type',
          value: 'type'
        },
        {
          text: 'Username',
          value: 'username'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Phone',
          value: 'mobile'
        },
        {
          text: 'Product',
          value: 'product'
        },
        {
          text: 'Remark',
          value: 'remark'
        },
        {
          text: 'Ip',
          value: 'ip'
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
      ],
      serverItemsLength: 0,
      itemsPerPage: 15
    }
  },
  methods: {
    fetchRecord(query) {
      this.loading = true
      this.$store
        .dispatch('fetchQuotes', query)
        .then(({ data, meta }) => {
          this.loading = false
          this.items = data
          this.serverItemsLength = meta.total
        })
        .catch(() => {
          this.loading = false
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
    handleEditItem(item) {
      this.$router.push({
        path: `/mall/quote/item/${item.id}`
      })
    },
    handleDeleteItem(item) {}
  },
  created() {
    this.fetchRecord()
  }
}
</script>

<style></style>
