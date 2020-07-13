<template>
  <v-card class="advance-table" tile :flat="flat">
    <v-data-table
      tile
      :single-expand="true"
      :expanded.sync="expanded"
      :show-expand="true"
      ref="table"
      single-select
      @keyup.down="handleKeydown"
      :item-key="itemKey"
      :selectable-key="selectableKey"
      multi-sort
      :headers="headers"
      :items="filteredItems"
      :loading="loading"
      :server-items-length="serverItemsLength"
      :items-per-page="itemsPerPage"
      :footer-props="footerProps"
      :page="page"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      @click:row="handleRowClick"
      @update:items-per-page="handlePageSizeChanged"
      @update:page="handlePageChanged"
      @update:sort-by="handleSortBy"
      @update:sort-desc="handleSortDesc"
      v-model="selectedRows"
      :hide-default-header="hideDefaultHeader"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar v-show="!hideFilter" flat dense>
          <v-text-field
            placeholder="Filter"
            light
            solo
            autocomplete="off"
            dense
            single-line
            full-width
            flat
            hide-details
            prepend-inner-icon="mdi-filter-outline"
            v-model="searchInput"
            clearable
          >
          </v-text-field>
          <v-menu
            :max-height="364"
            v-model="showColumnMenu"
            offset-y
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <v-btn v-if="columns.length > 0" icon v-on="on">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon dark v-on="on">mdi-view-column</v-icon>
                  </template>
                  <span>Select column</span>
                </v-tooltip>
              </v-btn>
            </template>
            <div>
              <v-list dense class="pa-0">
                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox
                      v-model="selectedAll"
                      color="primary"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>All</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card tile flat>
                <v-list dense style="overflow: auto;height:248px; padding:0">
                  <v-divider></v-divider>
                  <v-list-item v-for="(item, key) in columns" :key="key">
                    <v-list-item-action>
                      <v-checkbox
                        dense
                        v-model="selectedColumns"
                        color="primary"
                        :value="item"
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-html="getFilteredText(item.text)" />
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-btn-toggle tile v-model="item.sort">
                        <v-btn
                          style="padding:0; min-width: 24px"
                          class="btn-direction"
                          value="desc"
                          small
                        >
                          <v-icon size="18">mdi-sort-descending</v-icon>
                        </v-btn>
                        <v-btn
                          style="padding:0; min-width: 24px"
                          class="btn-direction"
                          value="asc"
                          small
                        >
                          <v-icon size="18">mdi-sort-ascending</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions class="flex-row-reverse">
                  <v-btn text @click="handleApplyColumn">Apply</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-menu>
          <v-menu v-if="items.length > 0" offset-y>
            <template v-slot:activator="{ on }">
              <v-btn v-if="items.length > 0" v-on="on" icon>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon dark v-on="on">mdi-download</v-icon>
                  </template>
                  <span>Export result</span>
                </v-tooltip>
              </v-btn>
            </template>
            <div>
              <v-list dense class="pa-0">
                <v-list-item @click="handleExport('csv')">
                  <v-list-item-content>
                    <v-list-item-title>Export as CSV</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="handleExport('json')">
                  <v-list-item-content>
                    <v-list-item-title>Export as Json</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-menu>
          <slot name="toolbar"></slot>
        </v-toolbar>
        <v-divider></v-divider>
      </template>
      <template
        v-for="(_, name) in $scopedSlots"
        :slot="name"
        slot-scope="slotData"
      >
        <slot :name="name" v-bind="slotData" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import FilterTextMixin from '@/mixins/FilterText'
import { getObjectValueByPath } from 'vuetify/lib/util/helpers'
import exportFromJSON from 'export-from-json'
export default {
  name: 'AdvanceTable',
  mixins: [FilterTextMixin],
  props: {
    hideFilter: {
      type: Boolean,
      default: false
    },
    hideDefaultHeader: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Array
    },
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    searchColumn: {
      type: Array,
      default: () => []
    },
    itemKey: {
      type: String,
      value: '_id'
    },
    sortBy: {
      type: Array,
      default: () => []
    },
    sortDesc: {
      type: Array,
      default: () => []
    },
    selectableKey: {
      type: String
    },
    flat: Boolean,
    loading: Boolean,
    serverItemsLength: Number,
    itemsPerPage: Number,
    page: Number,
    footerProps: Object
  },
  data() {
    return {
      selectedColumns: [],
      selectedAll: false,
      showColumnMenu: false,
      showSortMenu: false,
      searchInput: null,
      selectedRows: []
    }
  },
  computed: {
    filteredItems() {
      if (!this.searchInput || this.searchInput.lenght === 0) {
        return this.items
      } else {
        return this.items.filter((item) => {
          const temp = this.searchColumn.map((key) => {
            const val = getObjectValueByPath(item, key)
            return val || ''
          })
          const text = JSON.stringify(temp)
          const search = this.searchInput.toLowerCase()
          return text.includes(search)
        })
      }
    }
  },

  watch: {
    selectedAll: {
      handler(val) {
        if (val) {
          this.selectedColumns = this.columns.map((h) => {
            return h
          })
        } else {
          this.selectedColumns = []
        }
      },
      immediate: true
    },
    headers: {
      handler(items) {
        const columns = this.columns.map((item) => item.value)
        const selected = items.filter((item) => {
          const value = item.value.replace('_source.', '')
          return columns.includes(value)
        })
        this.selectedColumns = selected.map((item) => {
          return {
            text: item.text,
            value: item.value.replace('_source.', '')
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    handleRowClick(e) {
      this.selectedRows = [e]
      this.$emit('row:click', e)
    },
    handlePageSizeChanged(pageSize) {
      this.$emit('update:items-per-page', pageSize)
    },
    handlePageChanged(page) {
      this.$emit('update:page', page)
    },
    handleSortBy(sort) {
      this.$emit('update:sort-by', sort)
    },
    handleSortDesc(sort) {
      this.$emit('update:sort-desc', sort)
    },
    handleOptionsUpdate() {},
    handleApplyColumn() {
      this.showMenu = false
      this.$emit('column:change', this.selectedColumns)
    },
    handleExport(type) {
      const data = this.items
      const fileName = type + '_' + Date.now()
      const exportType = type
      exportFromJSON({ data, fileName, exportType })
      this.$emit('export', type)
    },
    handleKeydown(e) {
      console.log(e)
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.btn-direction {
  min-width: 28px;
  padding: 0;
}
</style>
