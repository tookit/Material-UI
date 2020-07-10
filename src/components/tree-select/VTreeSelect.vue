<template>
  <div class="v-tree-select">
    <v-menu :close-on-content-click="false" v-model="showMenu">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          outlined
          autocomplete="off"
          label="Category"
          placeholder="Category"
          v-on="on"
          append-icon="mdi-chevron-down"
          v-model="inputValue"
          v-bind="attrs"
        ></v-text-field>
      </template>
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>Selected: </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showMenu = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text style="max-height:300px;overflow:auto">
          <v-treeview
            v-model="selection"
            @input="handleInput"
            :return-object="true"
            selectable
            :items="items"
          ></v-treeview>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showMenu = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
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
export default {
  name: 'v-tree-select',
  props: {
    items: Array,
    selectedItems: Array
  },
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    selection: {
      get() {
        return this.selectedItems
      },
      set(val) {
        this.$emit('change', val)
      }
    },
    inputValue() {
      return this.selection.length > 0
        ? findAllParent(
            this.items,
            (data) => data.id === this.selection[0].id,
            [],
            'name'
          ).join(' / ')
        : ''
    }
  },
  methods: {
    handleItemClick() {},
    handleInput(val) {
      // this.$emit('change', val)
    }
  }
}
</script>
