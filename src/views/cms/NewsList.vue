<template>
  <div class="page-cms-news-list">
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
            :searchValue="filter['filter[name]']"
            @update:page="handlePageChanged"
            @input:change="handleInputChange"
            @search="handleApplyFilter"
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
            <v-btn slot="toolbar" icon @click="fetchRecord()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn slot="toolbar" icon @click="handleCreateItem">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <template v-slot:item.media="{ item }">
              <v-img
                v-if="item.media.length > 0"
                class="ma-3"
                :src="item.media[0].url"
                width="50"
                height="50"
              />
            </template>
            <template v-slot:item.category="{ item }">
              <span class="caption">
                {{ item.category.name }}
              </span>
            </template>
            <template v-slot:item.created_at="{ item }">
              <span>
                {{ new Date(item.created_at).toLocaleString() }}
              </span>
            </template>
            <template v-slot:item.is_active="{ item }">
              <v-switch
                v-model="item.is_active"
                @change="handleItemStatus(item)"
              />
            </template>
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
import { mapActions, mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/Tooltip'
export default {
  name: 'PageNews',
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
        'filter[is_active]': true,
        'filter[name]': null
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
          text: 'Category',
          value: 'category'
        },
        {
          text: 'Active',
          value: 'is_active'
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
  computed: {},
  watch: {
    '$route.query': {
      handler(query) {
        const filter = Object.assign(this.filter, query)
        filter.page = parseInt(filter.page)
        this.fetchRecord(query)
      },
      immediate: true
    }
  },
  methods: {
    fetchRecord(query) {
      this.loading = true
      this.$store
        .dispatch('fetchNews', query)
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
        path: `/cms/news/create`
      })
    },
    handleViewItem(item) {
      this.$router.push({
        path: `/cms/news/item/${item.id}`
      })
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/cms/news/item/${item.id}`
      })
    },
    handleDeleteItem() {},
    handleItemStatus(val) {
      this.$store
        .dispatch('updateNews', {
          id: val.id,
          data: { is_active: val.is_active }
        })
        .then(() => {})
    },
    handleCategoryChange(val) {
      this.filter['filter[categories.id]'] = val
        .filter((item) => item !== 0)
        .join(',')
      this.categories = val
    },
    // filter
    handleApplyFilter() {
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter
      })
    },

    handleResetFilter() {},
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
