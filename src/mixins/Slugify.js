import Slugify from 'slugify'

export default {
  methods: {
    slugify(string) {
      return Slugify(string)
    }
  }
}
