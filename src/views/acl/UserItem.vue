<template>
  <div class="page-news-item view">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <form-user :item="item" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FormUser from '@/components/form/acl/FormUser'
export default {
  name: 'UserItem',
  props: {
    id: [Number, String]
  },
  components: {
    FormUser
  },
  data() {
    return {
      item: null
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
      this.$store.dispatch('getUserById', id).then(({ data }) => {
        this.item = data
      })
    }
  }
}
</script>

<style></style>
