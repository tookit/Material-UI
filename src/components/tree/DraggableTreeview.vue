<template>
  <draggable
    :value="localValue"
    :group="group"
    class="v-treeview v-treeview-draggable"
    :class="themeClassName"
    ghost-class="ghost"
    @input="updateValue"
  >
    <draggable-tree-view-node
      v-for="item in value"
      :key="item.id"
      :group="group"
      :value="item"
      :expand-icon="expandIcon"
      @input="updateItem"
    >
      <template v-slot:prepend="{ item, open }">
        <slot name="prepend" v-bind="{ item, open }"> </slot>
      </template>
      <template v-slot:label="{ item, open }">
        <slot name="label" v-bind="{ item, open }"> </slot>
      </template>
      <template v-slot:append="{ item, open }">
        <slot name="append" v-bind="{ item, open }"> </slot>
      </template>
    </draggable-tree-view-node>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import DraggableTreeViewNode from './DraggableTreeviewNode.vue'
export default {
  components: {
    draggable,
    DraggableTreeViewNode
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    group: {
      type: String,
      default: null
    },
    expandIcon: {
      type: String,
      default: 'mdi-menu-down'
    }
  },
  data() {
    return {
      localValue: [...this.value]
    }
  },
  computed: {
    themeClassName() {
      return this.$vuetify.theme.isDark ? 'theme--dark' : 'theme--light'
    }
  },
  watch: {
    value(value) {
      this.localValue = [...value]
    }
  },
  methods: {
    updateValue(value) {
      this.localValue = value
      this.$emit('input', this.localValue)
    },
    updateItem(itemValue) {
      const index = this.localValue.findIndex((v) => v.id === itemValue.id)
      this.$set(this.localValue, index, itemValue)
      this.$emit('input', this.localValue)
    }
  }
}
</script>
