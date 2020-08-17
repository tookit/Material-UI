<template>
  <div>
    <advance-table
      :items="items"
      :headers="headers"
      :loading="loading"
      :server-items-length="serverItemsLength"
      :items-per-page="itemsPerPage"
      @update:page="handlePageChanged"
      @row:click="handleRowClick"
    >
      <div slot="filter">
        <v-card flat class="grey lighten-4">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  outlined
                  name="directory"
                  placeholder="Directory"
                  :items="directories"
                  v-model="filter['filter[directory]']"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="handleResetFilter" text>Reset</v-btn>
            <v-btn @click="handleApplyFilter" color="primary">Apply</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <v-btn slot="toolbar" icon @click="fetchMedia">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn slot="toolbar" icon @click="handleCreate">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <template v-slot:item.cloud_url="{ item }">
        <a :href="item.cloud_url" class="glightbox" target="blank">
          <img
            class="ma-2"
            :src="resize(item.cloud_url, 50, 50)"
            @click.stop="showLightbox = true"
            height="50"
            width="50"
          />
        </a>
      </template>
      <template v-slot:item.size="{ item }">
        <span>{{ item.size | bytes }}</span>
      </template>
      <template v-slot:item.product="{ item }">
        <span v-if="item.product.length > 0">{{ item.product[0].name }}</span>
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
      <form-media
        :action="uploadAction"
        :entity-id="entityId"
        :entity="entity"
        @form:cancel="handleFormCancel"
        @form:success="handleUploadSuccess"
        :item="selectedItem"
      />
    </v-dialog>
    <vue-easy-lightbox
      :visible="showLightbox"
      :imgs="imgs"
      :index="index"
      @hide="showLightbox = false"
    />
  </div>
</template>

<script>
import AdvanceTable from '@/components/table/AdvanceTable'
import FormMedia from '@/components/form/FormMedia'
import { fetchMedia, deleteMedia } from '@/api/service'
import bytes from 'bytes'
import _merge from 'lodash/merge'
import ResizeMixin from '@/mixins/Resize'
export default {
  name: 'Media',
  props: {
    directory: String,
    entityId: [Number, String],
    entity: String,
    attachAction: Function
  },
  mixins: [ResizeMixin],
  components: {
    AdvanceTable,
    FormMedia
  },
  data() {
    return {
      showLightbox: false,
      index: 0,
      showDialog: false,
      selectedItem: null,
      loading: false,
      directories: ['fiber', 'slider', 'fact'],
      filter: {
        'filter[directory]': this.directory
      },
      items: [],
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Image',
          value: 'cloud_url'
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
          text: 'Product',
          value: 'product'
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
          text: 'Featured',
          value: 'custom_properties.featured'
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
          text: 'Attach  Entity',
          icon: 'mdi-link-variant',
          click: this.handleAttachItem
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
      return `${process.env.VUE_APP_BASE_API_HOST}/api/media?dir=${this.directory}`
    },
    imgs() {
      return this.items.map((item) => {
        return item.cloud_url
      })
    }
  },

  watch: {
    // '$route.query': {
    //   handler(query) {
    //     if (query) {
    //       Object.assign(this.filter, query)
    //       this.fetchMedia(_merge(query, this.filter))
    //     }
    //   },
    //   immediate: true
    // },
    directory: {
      handler(dir) {
        this.filter['filter[directory]'] = dir
        this.fetchMedia(this.filter)
      },
      immediate: true
    }
  },
  methods: {
    fetchMedia(query) {
      this.loading = true
      this.items = []
      fetchMedia(_merge(query, this.filter)).then(({ data, meta }) => {
        this.loading = false
        this.items = data
        this.serverItemsLength = meta.total
      })
    },
    handlePageChanged(page) {
      this.fetchMedia({
        page: page
      })
    },
    handleCreate() {
      this.selectedItem = null
      this.showDialog = true
    },
    handleEditItem(item) {
      this.selectedItem = item
      this.showDialog = true
    },
    handleDeleteItem(item) {
      if (window.confirm('Are you sure to delete this?')) {
        deleteMedia(item.id).then(() => {
          this.fetchMedia()
        })
      }
    },
    handleFormCancel() {
      this.showDialog = false
      this.fetchMedia()
    },
    handleUploadSuccess() {
      // attach entity
    },
    handleRowClick(e) {
      this.$emit('selected', e)
    },
    handleAttachItem(item) {
      this.$emit('attach', item)
    },
    // filter
    handleApplyFilter() {
      this.$router.replace({
        path: this.$route.path,
        query: this.filter
      })
    },

    handleResetFilter() {}
  }
}
</script>

<style></style>
