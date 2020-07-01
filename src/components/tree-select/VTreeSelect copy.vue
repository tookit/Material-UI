<template>
  <div class="v-tree-select">
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          outlined
          autocomplete="off"
          label="Category"
          placeholder="Category"
          v-on="on"
          v-model="inputValue"
          v-bind="attrs"
        ></v-text-field>
      </template>
      <v-card>
        <v-toolbar></v-toolbar>
        <v-card-text max-height="450px">
          <v-treeview
            v-model="selection"
            selection-type="leaf"
            selectable
            multiple
            :items="items"
          ></v-treeview>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'v-tree-select',
  props: {
    items: Array
  },
  data() {
    return {
      selection: [],
      inputValue: null
    }
  }
}
</script>
