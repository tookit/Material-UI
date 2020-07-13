<template>
  <div class="page-product-category" style="min-height: 90vh">
    <v-container>
      <v-row>
        <v-col>
          <advance-table
            :items="items"
            :headers="headers"
            :loading="loading"
            :expanded="expanded"
            :items-per-page="itemsPerPage"
            @update:page="handlePageChanged"
          >
            <template v-slot:item.featured_img="{ item }">
              <v-img :src="item.featrued_img" :height="90" :width="90"></v-img>
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
import { mapActions } from 'vuex'
export default {
  name: 'PageProduct',
  components: {
    AdvanceTable
  },
  data() {
    return {
      //
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
    handleViewItem(item) {
      this.$router.push({
        path: `/mall/category/${item.id}`
      })
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/mall/category/${item.id}`
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
