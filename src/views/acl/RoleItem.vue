<template>
  <div class="page-role-item view">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <form-role :item="item" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FormRole from '@/components/form/acl/FormRole'
export default {
  name: 'UserItem',
  props: {
    id: [Number, String]
  },
  components: {
    FormRole
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
      this.$store.dispatch('getRoleById', id).then(({ data }) => {
        this.item = data
      })
    }
  }
}
</script>

<style></style>
