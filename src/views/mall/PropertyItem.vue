<template>
  <div class="page-property-item view">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-tabs class="route-tab" v-model="defaultTab">
            <v-tab
              v-for="(item, key) in tabs"
              :key="key"
              v-show="showTab(item)"
              :href="'#' + item.value"
            >
              {{ item.text }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="defaultTab">
            <v-tab-item key="general" value="general">
              <form-property :item="item" />
            </v-tab-item>
            <v-tab-item key="value" value="value">
              <property-table :id="id"   />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FormProperty from '@/components/form/product/FormProperty'
import PropertyTable from '@/components/table/PropertyTable';
export default {
  props: {
    id: [Number, String]
  },
  components: {
    FormProperty,
    PropertyTable
  },
  data() {
    return {
      loading: false,
      item: null,
      defaultTab: 'general',
      tabs: [
        {
          text: 'General',
          value: 'general'
        },
        {
          text: 'Value',
          value: 'value'
        },

      ],
    }
  },
  computed: {

  },
  watch: {
    id: {
      handler(id) {
        if (id) {
          this.fetchRecord(id)
        }
      },
      immediate: true
    }
  },
  methods: {
    fetchRecord(id) {
      this.loading = true
      this.$store.dispatch('getPropertyById', id).then(({ data }) => {
        this.item = data
        this.loading = false
      })
    },
    fetchValueById(id) {
      return this.$store.dispatch('fetchValueById',id)
    },
    showTab({ value }) {
      if (this.id) {
        return true
      } else {
        return value === 'general'
      }
    }
  }
}
</script>

<style></style>
