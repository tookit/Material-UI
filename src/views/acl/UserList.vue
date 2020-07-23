<template>
  <div class="page-user-list">
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
            <v-btn slot="toolbar" icon @click="handleCreate">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <template v-slot:item.img="{ item }">
              <v-img
                @click.stop="handleViewImage"
                v-if="item.img"
                class="ma-3 glightbox"
                :src="computeImage(item.img)"
                width="100"
                height="90"
              />
            </template>
            <template v-slot:item.categories="{ item }">
              <v-chip small outlined v-for="c in item.categories" :key="c.id">
                {{ c.name }}
              </v-chip>
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
import { mapActions } from 'vuex'
export default {
  name: 'PageUser',
  components: {
    AdvanceTable
  },
  data() {
    return {
      //slider lightbox
      showDialog: false,
      showLightbox: false,
      index: 0,

      //
      loading: false,
      items: [],
      headers: [
        {
          text: 'ID',
          value: 'id'
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
          text: 'Mobile',
          value: 'mobile'
        },
        {
          text: 'Gender',
          value: 'gender'
        },
        {
          text: 'Active',
          value: 'active'
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
    imgs() {
      return this.items.map((item) => item.img)
    }
  },
  methods: {
    ...mapActions(['fetchUsers']),
    fetchRecord(query) {
      this.loading = true
      this.fetchUsers(query).then(({ data, meta }) => {
        this.loading = false
        this.items = data
        this.serverItemsLength = meta.total
      })
    },
    handleCreate() {
      this.$router.push({
        path: `/acl/user/create`
      })
    },
    handleViewItem(item) {
      this.$router.push({
        path: `/acl/user/${item.id}`
      })
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/acl/user/item/${item.id}`
      })
    },
    handleItemStatus(val) {
      this.$store
        .dispatch('updateSlider', {
          id: val.id,
          data: { is_active: val.is_active }
        })
        .then(() => {})
    },
    handleDeleteItem(item) {
      if (window.confirm('Are you sure to delete this')) {
        this.$store.dispatch('deleteUser', item.id).then(() => {
          this.fetchRecord()
        })
      }
    },
    handlePageChanged(page) {
      this.fetchRecord({
        page: page
      })
    },
    handleViewImage(item) {
      this.showLightbox = true
    },
    handleHideLightbox() {
      this.showLightbox = false
    },
    computeImage(url) {
      return url
    }
  },
  created() {
    this.fetchRecord()
  }
}
</script>

<style></style>
