import { Jodit } from 'jodit'

export default {
  name: 'v-jodit',
  props: {
    option: Object,
    value: { type: String, required: true, default: 'placeholder' }
  },

  computed: {},
  watch: {
    value: {
      handler(val) {
        if (this.editor) {
          this.editor.value = val
        }
      }
    }
  },
  mounted() {
    this.editor = new Jodit(this.$refs.editor, this.option)
    this.editor.value = this.value
    this.editor.events.on('change', (newValue) => this.$emit('input', newValue))
  },
  beforeDestroy() {
    this.editor.destruct()
  },

  render(h) {
    const data = {
      staticClass: 'dropzone',
      class: this.classes,
      ref: 'editor',
      attrs: { tabindex: this.disabled ? -1 : 0, name: 'editor' },
      on: this.$listeners
    }
    return h('textarea', data, [this.$slots.default])
  }
}
