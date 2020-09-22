export default {
  data() {
    return {
      page: 1,
      serverItemsLength: 0,
      itemsPerPage: 15
    }
  },
  methods: {
    handlePageChanged(page) {
      this.page = page
      this.t = Date.now()
      this.$router.replace({
        path: this.$route.path,
        query: this.filter
      })
    }
  }
}
