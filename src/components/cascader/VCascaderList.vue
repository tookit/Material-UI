<template>
  <v-list class="v-cascader__list" tag="ul" dense>
    <v-list-item-group v-model="selectedItem" @change="handleChange">
      <template v-for="(item, key) in items">
        <v-list-item
          tag="li"
          :key="key"
          :value="item"
          v-show="showItem(item)"
          :class="'child_of_' + item.parent_id"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  name: 'VCascaderList',
  props: {
    items: Array
  },
  components: {},
  data() {
    return {
      selectedItem: null,
      selectedItems: []
    }
  },

  methods: {
    showItem(item) {
      return item.depth === 1
    },
    handleChange(item) {
      const selector = '.child_of_' + item.id
      document.querySelectorAll(selector).forEach((el) => {
        el.style.display = 'flex'
      })
    }
  }
}
</script>
