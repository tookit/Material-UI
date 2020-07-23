<template>
  <div class="page-product-list">
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
            :searchValue="filter['filter[name]']"
            @input:change="handleInputChange"
            @search="handleApplyFilter"
          >
            <div slot="filter">
              <v-card flat class="grey lighten-4">
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-cascader
                        name="categories"
                        placeholder="Category"
                        :items="getProductCategories"
                        v-model="categories"
                        @change="handleCategoryChange"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-switch
                        label="Active"
                        v-model="filter['filter[is_active]']"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-switch
                        label="Has Image"
                        v-model="filter['filter[imaged]']"
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
            <template v-slot:item.media="{ item }">
              <v-img
                v-if="item.media.length > 0"
                class="ma-3"
                :src="item.media[0].url"
                width="50"
                height="50"
              />
            </template>
            <template v-slot:item.categories="{ item }">
              <template v-for="(c, key) in item.categories">
                <span :key="key" class="caption">
                  {{ c.name }}
                  <v-icon v-if="key !== item.categories.length - 1" size="12"
                    >mdi-arrow-right</v-icon
                  >
                </span>
              </template>
            </template>
            <template v-slot:item.is_active="{ item }">
              <v-switch
                v-model="item.is_active"
                @change="handleItemStatus(item)"
              />
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
import VCascader from '@/components/cascader/'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PageProduct',
  components: {
    AdvanceTable,
    VCascader
  },
  data() {
    return {
      //
      loading: false,
      items: [],
      filter: {
        'filter[name]': null,
        'filter[is_active]': null,
        'filter[imaged]': null,
        'filter[categories.id]': []
      },
      categories: [],
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Image',
          value: 'media'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Category',
          value: 'categories'
        },
        {
          text: 'Active',
          value: 'is_active'
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
    ...mapGetters(['getProductCategories'])
  },
  watch: {
    '$route.query': {
      handler(query) {
        Object.assign(this.filter, query)
        if (query['filter[categories.id]']) {
          const cids = query['filter[categories.id]']

          this.categories =
            cids.length > 0 ? cids.split(',').map((item) => parseInt(item)) : []
        }
        this.fetchRecord(query)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'deleteProduct']),
    fetchRecord(query) {
      this.loading = true
      this.items = []
      this.fetchProducts(query).then(({ data, meta }) => {
        this.loading = false
        this.items = data
        this.serverItemsLength = meta.total
      })
    },
    handleCreateItem() {
      this.$router.push({
        path: `/mall/product/create`
      })
    },
    handleViewItem(item) {
      window.open(item.href, '_blank')
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/mall/product/item/${item.id}`
      })
    },
    handleDeleteItem({ id }) {
      if (window.confirm('Are you sure to delete this item ?')) {
        this.deleteProduct(id).then(() => {
          this.items = this.items.filter((item) => item.id !== id)
        })
      }
    },
    handleItemStatus(val) {
      this.$store
        .dispatch('updateProduct', {
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
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter
      })
    },

    handleResetFilter() {},
    handleInputChange(val) {
      this.filter['filter[name]'] = val
    }
  },
  created() {}
}
</script>

<style></style>
