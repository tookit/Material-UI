<template>
  <div class="page-mall-quote-item view">
    <v-container fluid>
      <v-row>
        <v-col>
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
              <form-quote :item="item" />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FormQuote from '@/components/form/product/FormQuote'
export default {
  props: {
    id: [Number, String]
  },
  components: {
    FormQuote
  },
  data() {
    return {
      defaultTab: 'general',
      tabs: [
        {
          text: 'General',
          value: 'general'
        }
      ],
      loading: false,
      item: null,
      images: []
    }
  },
  computed: {},
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
      this.$store
        .dispatch('getQuoteById', id)
        .then(({ data }) => {
          this.item = data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    showTab({ value }) {
      if (this.id) {
        return true
      } else {
        return value === 'general'
      }
    },
    handleSelectMedia() {}
  }
}
</script>

<style></style>
