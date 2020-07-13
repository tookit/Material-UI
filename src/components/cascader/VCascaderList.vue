<template>
  <div class="d-flex">
    <v-list
      class="v-cascader__list pa-0 flex"
      style="border-right: 1px solid #eee"
      tag="ul"
      dense
    >
      <v-list-item-group v-model="selectedItem">
        <template v-for="item in items">
          <v-list-item
            tag="li"
            :key="item.id"
            :value="item.id"
            @click="selectItem(item)"
          >
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
    value: {
      type: Array,
      default: () => []
    }
  },
  components: { VCascaderList },
  data() {
    return {
      selectedItem: null
    }
  },
  computed: {
    selectedChildren() {
      const item = this.items.find((item) => {
        // console.log(item.id, this.selectedItem)
        return item.id == this.selectedItem
      })
      return item ? item.children : []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selectedItem = val.length > 0 ? val[this.depth] : null
      },
      immediate: true
    }
  },
  methods: {
    selectItem({ id, name }) {
      this.$emit('change', { id, depth: this.depth, name })
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
