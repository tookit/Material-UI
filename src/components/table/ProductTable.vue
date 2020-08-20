<template>
  <div class="product-table">
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
            <v-btn slot="toolbar" icon @click="fetchRecord()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn slot="toolbar" icon @click="handleCreateItem">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <template v-slot:item.media="{ item }">
              <v-img
                v-if="item.media.length > 0"
                @click.stop="showLightbox = true"
                class="ma-3"
                :src="resize(item.media[0].cloud_url, 50, 50)"
                width="50"
                height="50"
              />
            </template>
            <template v-slot:item.flag="{ item }">
              <span>{{ getFlagLabel(item.flag) }}</span>
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
                @change="handleItemStatus('is_active', item.is_active, item.id)"
              />
            </template>
            <template v-slot:item.is_home="{ item }">
              <v-switch
                v-model="item.is_home"
                @change="handleItemStatus('is_home', item.is_home, item.id)"
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
    <vue-easy-lightbox
      :visible="showLightbox"
      :imgs="imgs"
      :index="index"
      @hide="showLightbox = false"
    />
  </div>
</template>

<script>
import AdvanceTable from '@/components/table/AdvanceTable'
import { mapGetters } from 'vuex'
import ResizeMixin from '@/mixins/Resize'
export default {
  name: 'ProductTable',
  props: {
    categoryId: [Number, String]
  },
  components: {
    AdvanceTable
  },
  mixins: [ResizeMixin],
  data() {
    return {
      //
      showLightbox: false,
      index: 0,
      loading: false,
      items: [],
      filter: {
        page: 1,
        pageSize: 15
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
          text: 'Flag',
          value: 'flag'
        },
        {
          text: 'Active',
          value: 'is_active'
        },
        {
          text: 'Home',
          value: 'is_home'
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
    ...mapGetters(['getFlagLabel']),
    imgs() {
      let temp = []
      this.items.forEach((item) => {
        item.media.forEach((m) => {
          temp.push(m.cloud_url)
        })
      })
      return temp
    }
  },
  watch: {
    id: {
      handler(id) {
        this.fetchRecord()
      },
      immediate: true
    }
  },
  methods: {
    fetchRecord(query) {
      const id = this.categoryId
      this.loading = true
      this.items = []
      this.$store
        .dispatch('getProductByCategoryId', { id, query })
        .then(({ data, meta }) => {
          this.loading = false
          this.items = data
          this.serverItemsLength = data.length
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
    handleItemStatus(key, val, id) {
      let data = {}
      data[key] = val
      this.$store
        .dispatch('updateProduct', {
          id: id,
          data: data
        })
        .then(() => {})
    },
    handlePageChanged(page) {
      this.filter.page = page
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter
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
