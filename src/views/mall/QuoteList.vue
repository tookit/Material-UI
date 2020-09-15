<template>
  <div class="page-product" style="min-height: 90vh">
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
            <v-btn slot="toolbar" icon @click="fetchRecord()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <template v-slot:item.action="{ item }">
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
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
  name: 'PageQuote',
  components: {
    AdvanceTable
  },
  data() {
    return {
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
          text: 'Phone',
          value: 'mobile'
        },
        {
          text: 'Product',
          value: 'product'
        },
        {
          text: 'Remark',
          value: 'remark'
        },
        {
          text: 'Ip',
          value: 'ip'
        },
        {
          text: 'Created',
          value: 'created_at'
        }
      ],
      serverItemsLength: 0,
      itemsPerPage: 15
    }
  },
  methods: {
    ...mapActions(['fetchQuote']),
    fetchRecord(query) {
      this.loading = true
      this.fetchQuote(query).then(({ data, meta }) => {
        this.loading = false
        this.items = data
        this.serverItemsLength = meta.total
      })
    },

    handlePageChanged(page) {
      this.fetchRecord({
        page: page
      })
    }
  },
  created() {
    this.fetchRecord()
  }
}
</script>

<style></style>
