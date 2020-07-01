import { escapeHTML } from 'vuetify/lib/util/helpers'

export default {
  methods: {
    // mask text
    getMaskedCharacters(text, search) {
      const searchInput = (search || '').toString().toLocaleLowerCase()
      const index = text.toLocaleLowerCase().indexOf(searchInput)
      if (index < 0) {
        return {
          start: '',
          middle: text,
          end: ''
        }
      } else {
        const start = text.slice(0, index)
        const middle = text.slice(index, index + searchInput.length)
        const end = text.slice(index + searchInput.length)
        return {
          start,
          middle,
          end
        }
      }
    },
    // filterd Text
    getFilteredText(text, search, tag = 'span') {
      text = text || ''
      if (!search) return escapeHTML(text)
      const { start, middle, end } = this.getMaskedCharacters(text, search)
      const middleText = middle === text ? text : this.genHighlight(middle, tag)
      return `${escapeHTML(start)}${middleText}${escapeHTML(end)}`
    },
    genHighlight(text, tag) {
      if (tag === 'mask') {
        return `<mark class="mark">${escapeHTML(text)}</mark>`
      } else {
        return `<span class="v-list-item__mask">${escapeHTML(text)}</span>`
      }
    }
  }
}
