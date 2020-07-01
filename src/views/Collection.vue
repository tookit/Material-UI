<template>
  <div class="page-collection">
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-toolbar class="grey lighten-3 py-1 px-0" dense flat>
      <v-btn @click.stop="showFilter = !showFilter" icon>
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
      <v-spacer />
    </v-toolbar>
    <v-container class="grey lighten-3 py-0" fluid>
      <v-row>
        <v-col class="col-filter" v-show="showFilter" :cols="computeLeftCol">
          <category-panel @selected:changed="handleCategoryChanged" />
        </v-col>
        <v-col :cols="computeMainCol">
          <v-tabs v-model="defaultTab" @change="handleTabChange">
            <v-tab
              v-for="item in tabs"
              :key="item.value"
              :href="'#' + item.value"
            >
              <v-icon class="mr-1">{{ item.icon }}</v-icon>
              {{ item.text }}
            </v-tab>
          </v-tabs>
          <v-divider />
          <v-tabs-items v-model="defaultTab">
            <v-tab-item key="collection" value="collection">
              <collection-table :selected-category="selectedCategory" />
            </v-tab-item>
            <v-tab-item key="mapping" value="mapping">
              <pipeline-list
                type="mapping"
                :selected-category="selectedCategory"
              />
            </v-tab-item>
            <v-tab-item key="pipeline" value="pipeline">
              <pipeline-list :selected-category="selectedCategory" />
            </v-tab-item>
            <v-tab-item key="scheduled" value="scheduled">
              <scheduled-list
                ref="schedule"
                :selected-category="selectedCategory"
              />
            </v-tab-item>
            <v-tab-item key="history" value="history">
              <history-list :selected-category="selectedCategory" />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import CategoryPanel from '@/components/aggregation/CategoryPanel'
import CollectionTable from '@/components/table/CollectionTable'
import PipelineList from '@/views/pipeline/PipelineList'
import ScheduledList from '@/views/pipeline/ScheduledList'
import HistoryList from '@/views/pipeline/HistoryList'
import { mapGetters } from 'vuex'
export default {
  components: {
    CategoryPanel,
    CollectionTable,
    PipelineList,
    ScheduledList,
    HistoryList
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Collection',
          disabled: false,
          to: {
            path: '/collection'
          }
        }
      ],
      source: '',
      defaultTab: 'collection',
      tabs: [
        {
          text: 'Collections',
          icon: 'mdi-treasure-chest',
          value: 'collection'
        },
        {
          text: 'Mappings',
          icon: 'mdi-folder-sync',
          value: 'mapping'
        },
        {
          text: 'Pipelines',
          icon: 'mdi-pipe',
          value: 'pipeline'
        },
        {
          text: 'Scheduled',
          icon: 'mdi-calendar-clock',
          value: 'scheduled'
        },
        {
          text: 'Jobs',
          icon: 'mdi-history',
          value: 'history'
        }
      ],
      showFilter: true,
      selectedCategory: []
    }
  },
  computed: {
    ...mapGetters([]),
    computeLeftCol() {
      return this.showFilter ? 3 : 0
    },
    computeMainCol() {
      return this.showFilter ? 9 : 12
    }
  },
  watch: {
    '$route.query.tab': {
      handler(tab) {
        this.defaultTab = tab || 'collection'
      },
      immediate: true
    }
  },

  methods: {
    handleGoBack() {
      this.$router.go(-1)
    },
    handleCategoryChanged(items) {
      this.selectedCategory = items
    },
    handleTabChange(tab) {
      this.$router.replace({
        name: 'collection',
        query: {
          tab: tab
        }
      })
    },
    //todo
    handleSaveSource() {
      // this.pipeline - selected pipelien
    }
  },
  created() {
    this.$store.commit('UPDATE_BREADCRUMBS', [
      {
        text: 'Dashboard',
        disabled: false,
        href: '/'
      },
      {
        text: 'Collection',
        disabled: true,
        href: '/collection'
      }
    ])
  }
}
</script>
