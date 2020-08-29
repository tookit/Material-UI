<template>
  <div class="page-product-category">
    <v-container>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="items"
            :single-expand="true"
            :expanded.sync="expanded"
            item-key="id"
            show-expand
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Expandable Table</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-switch
                  v-model="singleExpand"
                  label="Single expand"
                  class="mt-2"
                ></v-switch>
              </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">More info about {{ item.name }}</td>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <ul class="sortable">
      <li class="item"><span class="my-handle">::</span> list item text one</li>
      <li class="item"><span class="my-handle">::</span> list item text two</li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Sortable from 'sortablejs'
export default {
  name: 'PageProduct',
  components: {},
  data() {
    return {
      //
      tree: [],
      loading: false,
      items: [],
      expanded: [],
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Image',
          value: 'featured_img'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Count',
          value: 'product_count'
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
          text: 'Add Child',
          icon: 'mdi-plus',
          click: this.handleAddChild
        },
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
          text: 'Move Item',
          icon: 'mdi-pencil',
          click: this.handleMoveItem
        },
        {
          text: 'Delete Item',
          icon: 'mdi-close',
          click: this.handleDeleteItem
        }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchProductCategoryTree']),
    fetchRecord(query) {
      this.loading = true
      this.fetchProductCategoryTree(query).then(({ data, meta }) => {
        this.loading = false
        this.items = data
        // this.serverItemsLength = meta.total
      })
    },
    handleCreateItem() {
      this.$router.push({
        path: `/mall/category/create`
      })
    },
    handleAddChild(item) {
      this.$router.push({
        path: `/mall/category/create`,
        query: {
          parent_id: item.id
        }
      })
    },
    handleViewItem(item) {
      window.open(item.href, '_blank')
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/mall/category/item/${item.id}`
      })
    },
    handleMoveItem() {},
    handleDeleteItem(item) {
      if (window.confirm('Are you sure to delete this item')) {
        this.$store
          .dispatch('deleteProductCategory', item.id)
          .then(() => {
            this.fetchRecord()
          })
          .catch(() => {
            this.fetchRecord()
          })
      }
    },
    handlePageChanged(page) {
      this.fetchRecord({
        page: page
      })
    }
  },
  mounted() {
    this.fetchRecord()
    const sortable = new Sortable(
      document.querySelector('.v-treeview', {
        draggable: '.v-treeview-node'
      })
    )
  }
}
</script>

<style></style>
