<template>
  <div>
    <advance-table
      :items="items"
      :headers="headers"
      :loading="loading"
      :server-items-length="serverItemsLength"
      :items-per-page="itemsPerPage"
    >
      <v-btn slot="toolbar" icon @click="handleCreate">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <template v-slot:item.url="{ item }">
        <a :href="item.url" class="glightbox" target="blank">
          <img class="ma-2" :src="item.url" height="50" width="50" />
        </a>
      </template>
      <template v-slot:item.size="{ item }">
        <span>{{ item.size | bytes }}</span>
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
import AdvanceTable from '@/components/table/AdvanceTable'
import ImageForm from '@/components/form/ImageForm'
import { fetchMedia } from '@/api/service'
import bytes from 'bytes'
export default {
  name: 'Media',
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
          text: 'Name',
          value: 'filename'
        },
        {
          text: 'Size',
          value: 'size'
        },
        {
          text: 'Directory',
          value: 'directory'
        },
        {
          text: 'Disk',
          value: 'disk'
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
  filters: {
    bytes: (val) => {
      return bytes(val)
    }
  },
  computed: {
    uploadAction() {
      return `${process.env.VUE_APP_BASE_API_HOST}/api/cms/slider/${this.id}/image`
    }
  },
  methods: {
    fetchMedia(query) {
      this.loading = true
      fetchMedia(query).then(({ data, meta }) => {
        this.loading = false
        this.items = data
        this.serverItemsLength = meta.total
      })
    },
    handleCreate() {
      this.selectedItem = null
      this.showDialog = true
    },
    handleFormCancel() {
      this.showDialog = false
    }
  },
  created() {
    this.fetchMedia()
  }
}
</script>

<style></style>
