<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        name="parent_id"
        label="Parent Category"
        placeholder="Parent Category"
        hide-details
        outlined
        readonly
        :value="inputValue"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-card class="v-cascader d-flex sheet">
      <v-cascader-list :depth="1" :items="items" />
    </v-card>
  </v-menu>
</template>
<script>
import VCascaderList from './VCascaderList.vue'
export default {
  name: 'VCascader',
  props: {
    items: Array
  },
  components: { VCascaderList },
  computed: {},
  data() {
    return {
      inputValue: '',
      selectedItems: []
    }
  },
  methods: {
    handleChange({ item, depth }) {
      this.selectedItems[depth - 1] = item
    },
    computeInputValue() {
      const items = this.selectedItems.filter((item) => {
        return item
      })
      this.inputValue = items.map((item) => item.name).join(' / ')
    }
  },
  mounted() {
    window._CASCADER = this
  },
  created() {
    this.$on('change', ({ item, depth }) => {
      if (depth === 1) {
        this.selectedItems = []
      } else if (depth === 2) {
        delete this.selectedItems[depth + 1]
      }
      this.selectedItems[depth - 1] = item
      this.computeInputValue()
    })
  }
}
</script>
