<template>
  <div class="page-news-list">
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
          >
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
              <v-chip small outlined v-for="c in item.categories" :key="c.id">
                {{ c.name }}
              </v-chip>
            </template>
            <template v-slot:item.is_active="{ item }">
              <v-switch v-model="item.is_active" />
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
  name: 'PageNews',
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
  methods: {
    ...mapActions(['fetchNews']),
    fetchRecord(query) {
      this.loading = true
      this.fetchNews(query).then(({ data, meta }) => {
        this.loading = false
        this.items = data
        this.serverItemsLength = meta.total
      })
    },
    handleViewItem(item) {
      this.$router.push({
        path: `/cms/post/${item.id}`
      })
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/cms/post/${item.id}`
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
