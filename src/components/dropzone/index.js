import Dropzone from 'dropzone'
Dropzone.autoDiscover = false
export default {
  name: 'v-dropzone',
  props: {
    option: Object
  },

  computed: {},
  mounted() {
    this.dropzone = new Dropzone(this.$refs.dropzone, this.option)
    this.dropzone.on('success', (e) => {
      this.$emit('success', e)
    })
  },
  render(h) {
    const data = {
      staticClass: 'dropzone',
      class: this.classes,
      ref: 'dropzone',
      attrs: { tabindex: this.disabled ? -1 : 0 },
      on: this.$listeners
    }
    return h('div', data, [this.$slots.default])
  }
}
