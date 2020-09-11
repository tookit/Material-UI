import sanitizeHtml from 'sanitize-html'

export default {
  methods: {
    filterHtml(string) {
      return sanitizeHtml(string)
    }
  }
}
