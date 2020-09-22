<template>
  <div
    :class="
      `v-treeview-node v-treeview-node--click ${
        hasChildren ? '' : 'v-treeview-node--leaf'
      }`
    "
  >
    <div class="v-treeview-node__root" @click="open = !open">
      <div
        v-for="index in appendLevel"
        :key="index"
        class="v-treeview-node__level"
      />
      <i
        v-if="hasChildren"
        role="button"
        class="v-icon notranslate v-treeview-node__toggle v-icon--link mdi"
        :class="[
          {
            'v-treeview-node__toggle--open': open,
            'theme--dark': isDark,
            'theme--light': !isDark
          },
          expandIcon
        ]"
      />
      <slot name="prepend" v-bind="{ item: value, open }" />
      <div class="v-treeview-node__label">
        <slot name="label" v-bind="{ item: value, open }">
          {{ value.name }}
        </slot>
      </div>
      <slot name="append" v-bind="{ item: value }" />
    </div>
    <div
      v-if="open"
      class="v-treeview-node__children v-treeview-node__children__draggable"
    >
      <draggable
        :group="group"
        :value="value.children"
        ghost-class="ghost"
        @input="updateValue"
      >
        <treeview-node
          v-for="child in value.children"
          :key="child.id"
          :group="group"
          :value="child"
          :level="level + 1"
          :expand-icon="expandIcon"
          @input="updateChildValue"
        >
          <template v-slot:prepend="{ item, open }">
            <slot name="prepend" v-bind="{ item, open }" />
          </template>
          <template v-slot:label="{ item, open }">
            <slot name="label" v-bind="{ item, open }"></slot>
          </template>
          <template v-slot:append="{ item }">
            <slot name="append" v-bind="{ item }" />
          </template>
        </treeview-node>
      </draggable>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  name: 'TreeviewNode',
  components: {
    Draggable
  },
  props: {
    level: {
      type: Number,
      default: 0
    },
    value: {
      type: Object,
      default: () => ({
        id: 0,
        name: '',
        children: []
      })
    },
    root: {
      type: Boolean
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
      open: false,
      localValue: { ...this.value }
    }
  },
  computed: {
    hasChildren() {
      return this.value.children != null && this.value.children.length > 0
    },
    isDark() {
      return this.$vuetify.theme.isDark
    },
    appendLevel() {
      return this.level + (this.hasChildren ? 0 : 1)
    }
  },
  watch: {
    value(value) {
      this.localValue = { ...value }
    }
  },
  methods: {
    updateValue(value) {
      this.localValue.children = [...value]
      this.$emit('input', this.localValue)
    },
    updateChildValue(value) {
      const index = this.localValue.children.findIndex((c) => c.id === value.id)
      this.$set(this.localValue.children, index, value)
      this.$emit('input', this.localValue)
    }
  }
}
</script>
