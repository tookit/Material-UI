<template>
  <div>
    <advance-table :items="items" :headers="headers" :loading="loading">
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
    <v-dialog v-model="showDialog">
      <v-card>
        <v-toolbar dark flat color="primary">
          Property Value
        </v-toolbar>
        <v-card-text class="pa-0">
          <form-property-value
            :propertyId="id"
            :item="selectedItem"
            @form:success="handleFormSuccess"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AdvanceTable from './AdvanceTable'
import FormPropertyValue from '@/components/form/product/FormPropertyValue'
export default {
  name: 'PropertyValueTable',
  props: {
    id: [Number, String] //property id
  },
  components: {
    AdvanceTable,
    FormPropertyValue
  },
  data() {
    return {
      index: null,
      showDialog: false,
      selectedItem: null,
      loading: false,
      items: [],
      headers: [
        {
          text: 'ID',
          value: 'id'
        },

        {
          text: 'Name',
          value: 'value'
        },
        {
          text: 'Sku',
          value: 'uuid'
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
    id: {
      handler() {
        this.fetchRecord()
      },
      immediate: true
    }
  },
  methods: {
    fetchRecord() {
      this.loading = true
      this.$store.dispatch('fetchValueById', this.id).then(({ data }) => {
        this.loading = false
        this.items = data
      })
    },
    handlePageChanged(page) {
      this.fetchRecord({
        page: page
      })
    },
    handleEditItem(item) {
      this.selectedItem = item
      this.showDialog = true
    },
    handleDeleteItem(item) {
      if (window.confirm('Are you sure to delete this?')) {
        this.$store.dispatch('deletePropertyValue', item.id).then(() => {
          this.fetchRecord()
        })
      }
    },
    handleCreateItem() {
      this.selectedItem = null
      this.showDialog = true
    },
    handleFormSuccess() {
      this.showDialog = false
      this.fetchRecord(this.id)
    },
    handleFormCancel() {
      this.showDialog = false
      this.fetchRecord(this.id)
    }
  },
  created() {}
}
</script>

<style></style>
