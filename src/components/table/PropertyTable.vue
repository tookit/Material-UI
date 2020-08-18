<template>
  <advance-table
    :items="items"
    :headers="headers"
    :loading="loading"
    :items-per-page="itemsPerPage"
    @update:page="handlePageChanged"
    @input:change="handleInputChange"
    @search="handleApplyFilter"
  >
    <v-btn slot="toolbar" icon @click="handleRefreshItem">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
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
</template>

<script>
import AdvanceTable from '@/components/table/AdvanceTable'
import ResizeMixin from '@/mixins/Resize'
export default {
  name: 'PropertyTable',
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
          text: 'Unit',
          value: 'unit'
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
    categoryId: {
      handler(id) {
        if (id) {
          this.fetchRecord()
        }
      }
    }
  },
  methods: {
    fetchRecord() {
      this.loading = true
      this.items = []
      this.$store
        .dispatch('getPropertyByCategoryId', this.categoryId)
        .then(({ data }) => {
          this.loading = false
          this.items = data
        })
    },
    handleCreateItem() {
      this.$router.push({
        path: `/mall/property/create`
      })
    },
    handleViewItem(item) {
      window.open(item.href, '_blank')
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/mall/property/item/${item.id}`
      })
    },
    handleDeleteItem({ id }) {
      if (window.confirm('Are you sure to delete this item ?')) {
        this.$store.dispatch('deleteProperty', id).then(() => {
          this.items = this.items.filter((item) => item.id !== id)
        })
      }
    },
    handleRefreshItem() {
      this.fetchRecord()
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

    handleResetFilter() {
      this.$router.replace({
        path: this.$route.path
      })
    },
    handleInputChange(val) {
      this.filter['filter[name]'] = val
    }
  },
  created() {}
}
</script>

<style></style>
