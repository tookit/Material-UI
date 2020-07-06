<template>
  <div class="d-flex">
    <v-list class="flex">
      <v-list-item-group v-model="selectedItem">
        <template v-for="(item, key) in items">
          <v-list-item :key="key" @click="handleSelectItem">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <v-list class="flex">
      <v-list-item-group v-model="selectedItem">
        <template v-for="(item, key) in items">
          <v-list-item :key="key" @click="handleSelectItem">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <v-select-list
      class="flex"
      :selectedItems="selectedItems"
      :items="items"
      action
    >
    </v-select-list>
  </div>
</template>

<script>
import VSelectList from 'vuetify/lib/components/VSelect/VSelectList' // Extensions
export default {
  props: {
    items: Array
  },
  components: {
    VSelectList
  },
  data() {
    return {
      selectedItem: null,
      selectedItems: []
    }
  },
  methods: {
    handleSelectItem() {}
  }
}
</script>

<style></style>
