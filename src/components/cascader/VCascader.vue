<template>
  <div class="v-cascader d-flex">
    <template v-for="(node, key) in nodes">
      <v-cascader-list
        class="flex"
        :items="node"
        :key="key"
        @selected="handleSelectItem"
        v-show="showList(node)"
      />
    </template>
  </div>
</template>
<script>
import VCascaderList from './VCascaderList.vue'
import flattern from '@/utils/flattern'
import _groupBy from 'lodash/groupBy'
export default {
  name: 'VCascader',
  props: {
    items: Array
  },
  components: { VCascaderList },
  computed: {
    nodes() {
      const options = {
        initNode: (node) => node // <= default, consider node => _.clone(node) to avoid mutating the tree
      }
      return _groupBy(flattern(this.items, options), 'depth')
    }
  },
  data() {
    return {
      selectedItem: null,
      selectedItems: []
    }
  },
  methods: {
    handleSelectItem(item) {
      this.selectedItems.push(item)
    },
    showList(node) {
      // const item = node[0]
      return true
    }
  },
  created() {}
}
</script>
