<template>
  <div class="page-product-category">
    <v-container>
      <v-row>
        <v-col>
          <v-card :loading="loading">
            <v-toolbar flat>
              <v-btn color="primary" @click="handleCreateItem">Create</v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-treeview
                v-model="tree"
                :items="items"
                activatable
                item-key="id"
                open-on-click
              >
                <template v-slot:append="{ item }">
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
              </v-treeview>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      this.$router.push({
        path: `/mall/category/item/${item.id}`
      })
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/mall/category/item/${item.id}`
      })
    },
    handleDeleteItem() {},
    handlePageChanged(page) {
      this.fetchRecord({
        page: page
      })
    }
  },
  created() {
    this.fetchRecord()
  }
}
</script>

<style></style>
