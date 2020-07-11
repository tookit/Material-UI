<template>
  <div class="d-flex">
    <v-list
      class="v-cascader__list pa-0 flex"
      style="border-right: 1px solid #eee"
      tag="ul"
      dense
    >
      <v-list-item-group v-model="selectedItem" @change="selecteItem">
        <template v-for="item in items">
          <v-list-item tag="li" :key="item.id" :value="item.id">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-icon v-if="item.children && item.children.length > 0">
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <template v-if="selectedItem">
      <v-cascader-list
        v-if="selectedChildren"
        class="flex"
        :depth="depth + 1"
        :items="selectedChildren"
        @change="handleChange"
        :value="value"
      />
    </template>
  </div>
</template>
<script>
import VCascaderList from './VCascaderList'
export default {
  name: 'VCascaderList',
  props: {
    items: Array,
    depth: {
      type: [Number],
      default: 0
    },
    value: [Array]
  },
  components: { VCascaderList },
  data() {
    return {
      selectedItem: null
    }
  },
  computed: {
    selectedChildren() {
      const item = this.items.find((item) => item.id === this.selectedItem)
      return item ? item.children : []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selectedItem = val[this.depth]
      },
      immediate: true
    }
  },
  methods: {
    selecteItem(item) {
      this.$emit('change', { item, depth: this.depth })
    },
    handleChange(item) {
      this.$emit('change', item)
    }
  }
}
</script>

<style lang="scss">
.cascader__list {
  border-right: 1px solid #000;
}
</style>
