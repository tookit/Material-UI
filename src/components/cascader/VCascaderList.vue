<template>
  <div class="d-flex">
    <v-list
      class="v-cascader__list pa-0 flex"
      style="border-right: 1px solid #eee"
      tag="ul"
      dense
    >
      <v-list-item-group v-model="selectedItem" @change="handleChange">
        <template v-for="item in items">
          <v-list-item tag="li" :key="item.id" :value="item">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-icon v-if="item.children && item.children.length > 0">
              <v-icon>mdi-chevron-down</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <template v-if="selectedItem && selectedItem.children">
      <v-cascader-list
        v-if="selectedItem.children.length > 0"
        class="flex"
        :depth="depth + 1"
        :items="selectedItem.children"
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
      default: 1
    }
  },
  components: { VCascaderList },
  data() {
    return {
      selectedItem: null
    }
  },
  methods: {
    handleChange(item) {
      window._CASCADER.$emit('change', { item: item, depth: this.depth })
    }
  }
}
</script>

<style lang="scss">
.cascader__list {
  border-right: 1px solid #000;
}
</style>
