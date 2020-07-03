<template>
  <div>
    <advance-table :items="items" :headers="headers" :loading="loading">
      <v-btn slot="toolbar" icon @click="handleCreate">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <template v-slot:item.url="{ item }">
        <a :href="item.url" class="glightbox" target="blank">
          <img class="ma-2" :src="item.url" height="50" width="50" />
        </a>
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
    <v-dialog v-model="showDialog" width="600">
      <image-form
        :action="uploadAction"
        @form:cancel="handleFormCancel"
        :item="selectedItem"
      />
    </v-dialog>
  </div>
</template>

<script>
import AdvanceTable from './AdvanceTable'
import ImageForm from '@/components/form/ImageForm'
import { deleteImageById } from '@/api/service'
export default {
  name: 'MediaTable',
  props: {
    id: [Number, String],
    dataSource: [Promise, Function],
    uploadAction: [String]
  },
  components: {
    AdvanceTable,
    ImageForm
  },
  data() {
    return {
      index: null,
      showImageDialog: false,
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
          text: 'Image',
          value: 'url'
        },
        {
          text: 'Size',
          value: 'size'
        },
        {
          text: 'Collection',
          value: 'collection_name'
        },
        {
          text: 'Created',
          value: 'created_at'
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
      this.dataSource().then(({ data }) => {
        this.loading = false
        this.items = data
      })
    },
    handleEditItem(item) {
      this.selectedItem = item
      this.showDialog = true
    },
    handleDeleteItem(item) {
      if (window.confirm('Are you sure to delete this ?')) {
        deleteImageById(item.id).then(() => {
          this.fetchRecord()
        })
      }
    },
    handleCreate() {
      this.selectedItem = null
      this.showDialog = true
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
