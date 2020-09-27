<template>
  <div class="page-product-category">
    <v-container>
      <v-row>
        <v-col>
          <v-card :loading="loading">
            <v-toolbar flat>
              <v-btn color="primary" @click="handleCreateItem">Create</v-btn>
              <v-btn @click="fetchRecord">Refresh</v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <draggable-treeview
                :value="items"
                activatable
                group="hoge"
                item-key="id"
                ref="tree"
                open-on-click
              >
                <template v-slot:label="{ item }">
                  <v-row>
                    <v-col>
                      <span>{{ item.name }}</span>
                    </v-col>
                    <v-col>
                      <span>{{ item.products_count }}</span>
                    </v-col>
                    <v-col>
                      <span>{{ item.id }}</span>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:append="{ item }">
                  <v-menu v-if="item.id !== 'ID'">
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
                  <span v-else>Action</span>
                </template>
              </draggable-treeview>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title dark tile color="primary">Move to Category</v-card-title>
        <v-card-text>
          <v-cascader name="Category" label="Category" placeholder="Category" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="handleConfirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Sortable from 'sortablejs'
import VCascader from '@/components/cascader/'
import DraggableTreeview from '@/components/tree/DraggableTreeview'

export default {
  name: 'PageCategory',
  components: {
    VCascader,
    DraggableTreeview
  },
  data() {
    return {
      //
      showDialog: false,
      catgoryId: 0,
      tree: [],
      items: [],
      loading: false,
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
      this.items = []
      this.fetchProductCategoryTree(query).then(({ data, meta }) => {
        this.loading = false
        this.items = data
        this.items.unshift({
          name: 'Name',
          products_count: 'Count',
          id: 'ID'
        })
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
    handleMoveItem() {
      this.showDialog = true
    },
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
    },
    handleConfirm() {}
  },
  mounted() {
    this.fetchRecord()
    // const sortable = new Sortable(
    //   document.querySelector('.v-treeview', {
    //     draggable: '.v-treeview-node'
    //   })
    // )
  }
}
</script>

<style></style>
