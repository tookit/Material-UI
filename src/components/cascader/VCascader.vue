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
        v-model="selectedItems"
        @change="handleChange"
      />
    </v-card>
  </v-menu>
</template>
<script>
import VCascaderList from './VCascaderList.vue'
export default {
  name: 'VCascader',
  props: {
    items: Array,
    value: Array
  },
  components: { VCascaderList },
  computed: {
    inputValue() {
      return this.selectedItems
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.selectedItems = val
        }
      }
    }
  },
  data() {
    return {
      selectedItems: this.value
    }
  },
  methods: {
    handleChange({ item, depth }) {
      switch (depth) {
        case 0:
          this.selectedItems = []
          break
        case 1:
          this.selectedItems[2] = 0
          break
        default:
          break
      }
      this.selectedItems[depth] = item
      this.$emit('change', this.selectedItems)
    }
  },
  mounted() {},
  created() {}
}
</script>
