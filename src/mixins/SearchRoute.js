export default {
  methods: {
    buildRouteQuery() {
      const {
        filterTerms,
        geo,
        keyword,
        rangeFrom,
        rangeTo,
        sortBy,
        sortDesc,
        dateField,
        selectRule,
        dateFilterTab,
        page,
        pageSize,
        index
      } = this.$store.state.search
      const s = JSON.stringify({
        u: new Date().getTime(),
        t: filterTerms,
        g: geo,
        keyword: keyword,
        //date Range
        rangeFrom: rangeFrom,
        rangeTo: rangeTo,
        dateField: dateField,
        dateFilterTab: dateFilterTab,
        // sort
        sortDesc: sortDesc,
        sortBy: sortBy,
        // rule
        rule: selectRule,
        //page
        page,
        pageSize,
        //index
        index: index
      })
      this.$router.push({
        name: 'Search',
        query: {
          s: s
        }
      })
    }
  }
}
