import Vue from 'vue'
export default Vue.extend({
  name: 'templateable',
  props: {
    source: Object,
    enableHighlight: Boolean,
    targetLanguage: String
  },
  computed: {
    original() {
      return this.source.original
    }
  }
})
