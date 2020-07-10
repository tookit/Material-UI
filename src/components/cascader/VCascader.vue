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
        append-icon="mdi-chevron-down"
        :value="inputValue"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-card class="v-cascader d-flex sheet">
      <v-cascader-list :depth="1" :items="items" v-model="selectedValue" />
    </v-card>
  </v-menu>
</template>
<script>
function findAllParent(tree, func, path = [], key = 'id') {
  if (!tree) return []
  for (const data of tree) {
    path.push(data[key])
    if (func(data)) return path
    if (data.children) {
      const findChildren = findAllParent(data.children, func, path, key)
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}
import VCascaderList from './VCascaderList.vue'
export default {
  name: 'VCascader',
  props: {
    items: Array,
    value: [Number, String]
  },
  components: { VCascaderList },
  computed: {},
  data() {
    return {
      inputValue: '',
      selectedValue: [],
      selectedItems: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selectedValue = findAllParent(
          this.items,
          (data) => data.id === val,
          []
        )
        this.inputValue = findAllParent(
          this.items,
          (data) => data.id === val,
          [],
          'name'
        ).join(' / ')
      }
      // immediate: true
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
