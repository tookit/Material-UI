<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        label="Parent Category"
        placeholder="Parent Category"
        hide-details
        outlined
        readonly
        append-icon="mdi-chevron-down"
        :value="inputValue"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-card class="v-cascader d-flex sheet">
      <v-cascader-list
        :items="items"
        v-model="selectedValue"
        @change="handleChange"
      />
    </v-card>
  </v-menu>
</template>
<script>
import { findAllParent } from '@/utils'
import VCascaderList from './VCascaderList.vue'
export default {
  name: 'VCascader',
  props: {
    items: Array,
    value: [Number, String]
  },
  components: { VCascaderList },
  computed: {},
  data() {
    return {
      inputValue: '',
      selectedValue: [],
      selectedItems: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selectedValue = findAllParent(
          this.items,
          (data) => data.id === val,
          []
        )
        this.inputValue = findAllParent(
          this.items,
          (data) => data.id === val,
          [],
          'name'
        ).join(' / ')
      }
      // immediate: true
    }
  },
  methods: {
    handleChange({ item, depth }) {
      console.log('cascader chanage', item, depth)
      this.selectedItems[depth] = item
    },
    computeInputValue() {
      const items = this.selectedItems.filter((item) => {
        return item
      })
      this.inputValue = items.map((item) => item.name).join(' / ')
    }
  },
  mounted() {},
  created() {}
}
</script>
