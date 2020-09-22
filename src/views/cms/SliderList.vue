<template>
  <div class="page-slider-list">
    <v-container>
      <v-row>
        <v-col>
          <advance-table
            :items="items"
            :headers="headers"
            :loading="loading"
            :server-items-length="serverItemsLength"
            :items-per-page="itemsPerPage"
            :page.sync="filter['page']"
            :searchValue="filter['filter[name]']"
            @update:page="handlePageChanged"
            @input:change="handleInputChange"
            @search="handleApplyFilter"
          >
            <v-btn slot="toolbar" icon @click="fetchRecord()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
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
                      <v-btn icon v-on="onTooltip({ ...tooltip, ...menu })">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
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
import TooltipMixin from '@/mixins/Tooltip'
export default {
  name: 'PageSlider',
  components: {
    AdvanceTable
  },
  mixins: [TooltipMixin],
  data() {
    return {
      //slider lightbox
      showDialog: false,
      showLightbox: false,
      index: 0,
      filter: {
        page: 1,
        'filter[is_active]': true,
        'filter[name]': null
      },
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
          value: 'img'
        },
        {
          text: 'Title',
          value: 'name'
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
  computed: {
    imgs() {
      return this.items.map((item) => item.img)
    }
  },
  watch: {
    '$route.query': {
      handler(query) {
        const filter = Object.assign(this.filter, query)
        filter.page = parseInt(filter.page)
        this.fetchRecord(query)
      },
      immediate: true
    }
  },
  methods: {
    fetchRecord(query) {
      this.loading = true
      this.$store
        .dispatch('fetchSlider', query)
        .then(({ data, meta }) => {
          this.loading = false
          this.items = data
          this.serverItemsLength = meta.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleCreate() {
      this.$router.push({
        path: `/cms/slider/create`
      })
    },
    handleViewItem(item) {
      this.$router.push({
        path: `/cms/slider/${item.id}`
      })
    },
    handleEditItem(item) {
      this.$router.push({
        path: `/cms/slider/item/${item.id}`
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
        this.$store.dispatch('deleteSliderById', item.id).then(() => {
          this.fetchRecord()
        })
      }
    },

    handleViewImage() {
      this.showLightbox = true
    },
    handleHideLightbox() {
      this.showLightbox = false
    },
    computeImage(url) {
      return url
    },
    handleApplyFilter() {
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter
      })
    },
    handlePageChanged(page) {
      this.filter.page = page
      this.filter.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter
      })
    },
    handleInputChange(val) {
      this.filter['filter[name]'] = val
    }
  },
  created() {}
}
</script>

<style></style>
